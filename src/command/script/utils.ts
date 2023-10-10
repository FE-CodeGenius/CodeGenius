import fs from "node:fs";
import path from "node:path";

import fsExtra from "fs-extra";

import { printInfo } from "@/logger";
import { CommandOptions } from "@/types";

/**
 * 用于转换 scripts 结构
 * @param scripts
 * @returns
 */
export function genScriptConfig(scripts: { [key: string]: string }) {
  return Object.keys(scripts).map((key) => {
    return {
      command: key,
      display: scripts[key],
      description: "description the function of this cmd command",
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
      (i) => i.command === pkgScript.command,
    );

    if (configScript) {
      if (configScript.display !== pkgScript.display) {
        configScript.display = pkgScript.display;
      }
    } else {
      mergedScripts.push(pkgScript);
    }
  }

  const scripts = mergedScripts.filter((configScript) => {
    return pkgScripts.find((i) => i.command === configScript.command);
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
