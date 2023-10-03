import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

import { CAC } from "cac";
import type { Options } from "execa";
import execa from "execa";
import fsExtra from "fs-extra";
import { bgYellow, gray, green, red, yellow } from "kolorist";

import {
  ACTIVATION,
  DEFAULT_CONFIG_FILES,
  FRAMEWORKS,
  TEMPLATES,
} from "@/config";

import { CodeGeniusOptions, CommandOptions, Plugins } from "./types";

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
    console.log(bgYellow("[CODEG INFO HINT]:"), gray(content as string));
  }
};

export const loggerWarring = (content: string | unknown) => {
  if (ACTIVATION) {
    console.log(bgYellow("[CODEG WARRING HINT]:"), yellow(content as string));
  }
};

export const loggerSuccess = (content: string) => {
  if (ACTIVATION) {
    console.log(bgYellow("[CODEG SUCCESS HINT]:"), green(content as string));
  }
};

export const loggerError = (content: string | unknown) => {
  if (ACTIVATION) {
    console.log(bgYellow("[CODEG ERROR HINT]:"), red(content as string));
  }
};

export const printInfo = (content: string) => {
  console.log(bgYellow("[CODEG INFO HINT]:"), gray(content as string));
};

export const printWarring = (content: string) => {
  console.log(bgYellow("[CODEG WARRING HINT]:"), yellow(content as string));
};

export const printSuccess = (content: string) => {
  console.log(bgYellow("[CODEG SUCCESS HINT]:"), green(content as string));
};

export const printError = (content: string | unknown) => {
  console.log(bgYellow("[CODEG ERROR HINT]:"), red(content as string));
};

export function isValidPackageName(projectName: string) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName,
  );
}

export function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z0-9-~]+/g, "-");
}

export function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

export function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

export function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

export function isEmptyDir(projectName: string) {
  const targetDir = path.join(process.cwd(), projectName);
  return !fs.existsSync(targetDir) || isEmpty(targetDir);
}

export function isValidFramework(framework: string) {
  return typeof framework === "string" && TEMPLATES.includes(framework);
}

export function getVariantByFramework(framework: string) {
  return FRAMEWORKS.find((v) => v.name === framework)?.variants || [];
}

export function isValidVariant(framework: string) {
  const variants = getVariantByFramework(framework);
  return variants.length > 0;
}

/**
 * 生成随机串
 * @param length
 * @returns
 */
export function generateRandom(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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
export async function cmdInstaller(cli: CAC, plugins: Plugins) {
  const userConfig = await loadConfigModule();
  for (const plugin of plugins) {
    plugin(cli, userConfig).setup();
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
    const configScript = mergedScripts.find(
      (itemB) => itemB.cmd === pkgScript.cmd,
    );

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
