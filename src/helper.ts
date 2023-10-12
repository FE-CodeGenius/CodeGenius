import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

import { CAC } from "cac";
import type { Options } from "execa";
import execa from "execa";
import { loadConfig } from "unconfig";

import { DEFAULT_CONFIG_FILES, defaultCommands } from "@/config";
import { printError } from "@/logger";
import { BuiltInPlugins, CodeGeniusOptions, CommandOptions } from "@/types";

import rootInstaller from "./command/root";

export const execCommand = async (
  cmd: string,
  args: string[],
  options?: Options,
) => {
  const res = await execa(cmd, args, options);
  return res?.stdout?.trim() || "";
};

export function handleError(error: unknown) {
  error && printError((error as Error).message);
  process.exit(1);
}

/**
 * 用户配置工厂函数
 * @param config
 * @returns
 */
export const defineConfig = (config: CodeGeniusOptions): CodeGeniusOptions =>
  config;

/**
 * 动态加载用户配置文件
 */
export async function loadConfigModule(): Promise<
  CodeGeniusOptions | undefined
> {
  let resolvedPath: string | undefined;
  for (const filename of DEFAULT_CONFIG_FILES) {
    const filePath = path.resolve(process.cwd(), filename);
    if (!fs.existsSync(filePath)) continue;
    resolvedPath = filePath;
    break;
  }

  if (!resolvedPath) return;
  const moduleURL = pathToFileURL(resolvedPath).href;
  return (await import(moduleURL)).default;
}

/**
 * 使用 unconfig 加载配置文件
 * @returns
 */
export async function loadConfigForUnConfig() {
  const { config } = await loadConfig<CodeGeniusOptions | undefined>({
    sources: [
      {
        files: "codeg.config",
        extensions: ["ts", "mts", "cts", "js", "mjs", "cjs", "json", ""],
      },
    ],
    merge: false,
  });
  return config;
}

/**
 * 用于循环注册指令
 * @param cli
 * @param config
 */
export async function setup(cli: CAC, plugins: BuiltInPlugins) {
  const uconfig = await loadConfigForUnConfig();
  const commands: Array<CommandOptions> = [];
  // 实例化内部命令
  const builtInPluginsIns = plugins.map((fn) => fn(uconfig?.commands));
  // 整合外部命令后进行挂载
  for (const pluginIns of builtInPluginsIns.concat(uconfig?.plugins || [])) {
    if (pluginIns.command && pluginIns.describe) {
      commands.push({
        display: pluginIns.name || pluginIns.command,
        command: pluginIns.command,
        description: pluginIns.describe,
      });
    }
    pluginIns.setup(cli);
  }
  // 特殊处理
  rootInstaller(commands.concat(defaultCommands)).setup(cli);
}
