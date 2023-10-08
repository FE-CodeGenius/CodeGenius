import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

import { CAC } from "cac";
import type { Options } from "execa";
import execa from "execa";
import fsExtra from "fs-extra";
import { blue, green, red, yellow } from "kolorist";

import { ACTIVATION, DEFAULT_CONFIG_FILES } from "@/config";

import { BuiltInPlugins, CodeGeniusOptions, CommandOptions } from "./types";

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

export const loggerInfo = (content: string) => {
  if (ACTIVATION) {
    console.log(blue("[CODEG INFO HINT]:"), content as string);
  }
};

export const loggerWarring = (content: string | unknown) => {
  if (ACTIVATION) {
    console.log(yellow("[CODEG WARRING HINT]:"), content as string);
  }
};

export const loggerSuccess = (content: string) => {
  if (ACTIVATION) {
    console.log(green("[CODEG SUCCESS HINT]:"), content as string);
  }
};

export const loggerError = (content: string | unknown) => {
  if (ACTIVATION) {
    console.log(red("[CODEG ERROR HINT]:"), content as string);
  }
};

export const printInfo = (content: string) => {
  console.log(blue("[CODEG INFO HINT]:"), content as string);
};

export const printWarring = (content: string) => {
  console.log(yellow("[CODEG WARRING HINT]:"), content as string);
};

export const printSuccess = (content: string) => {
  console.log(green("[CODEG SUCCESS HINT]:"), content as string);
};

export const printError = (content: string | unknown) => {
  console.log(red("[CODEG ERROR HINT]:"), content as string);
};

/**
 * 用户配置工厂函数
 * @param config
 * @returns
 */
export const defineConfig = (config: CodeGeniusOptions): CodeGeniusOptions =>
  config;

/**
 * 用于循环注册指令
 * @param cli
 * @param config
 */
export async function setup(cli: CAC, plugins: BuiltInPlugins) {
  const userConfig = await loadConfigModule();
  for (const plugin of plugins) {
    plugin(cli, userConfig).setup();
  }
  for (const ins of userConfig?.plugins || []) {
    ins.setup(cli);
  }
}

/**
 * 用于转换 scripts 结构
 * @param scripts
 * @returns
 */
export function genScriptConfig(scripts: { [key: string]: string }) {
  return Object.keys(scripts).map((key) => {
    return {
      cmd: key,
      script: scripts[key],
      desc: "describe the function of this cmd command",
    };
  });
}

/**
 * 用于合并两份 scripts.config.json 数据
 * @param pkgScripts
 * @param configScripts
 * @returns
 */
export function syncScripts(
  pkgScripts: Array<CommandOptions>,
  configScripts: Array<CommandOptions>,
) {
  const mergedScripts = [...configScripts];

  for (const pkgScript of pkgScripts) {
    const configScript = mergedScripts.find((i) => i.cmd === pkgScript.cmd);

    if (configScript) {
      if (configScript.script !== pkgScript.script) {
        configScript.script = pkgScript.script;
      }
    } else {
      mergedScripts.push(pkgScript);
    }
  }

  const scripts = mergedScripts.filter((configScript) => {
    return pkgScripts.find((i) => i.cmd === configScript.cmd);
  });

  return scripts;
}

/**
 * 读取 package.json 解析并生成 scripts.config.json 配置文件
 */
export const generateScripts = async () => {
  const pkg = await fsExtra.readJSONSync(
    path.join(process.cwd(), "package.json"),
  );
  let configContent = genScriptConfig(pkg.scripts);
  const configfile = path.join(process.cwd(), "scripts.config.json");
  if (fs.existsSync(configfile)) {
    const { scripts } = await fsExtra.readJSONSync(configfile);
    configContent = syncScripts(configContent, scripts);
  }
  await fsExtra.outputFileSync(
    configfile,
    JSON.stringify(
      {
        scripts: configContent,
      },
      null,
      2,
    ),
  );
  printInfo("代理脚本 scripts.config.json 已完成同步");
};

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
