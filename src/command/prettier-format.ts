import path from "node:path";
import fs from "node:fs";

import {
  execCommand,
  getEveryFilesBySuffixes,
  loggerError,
  loggerInfo,
} from "./../shared/index";
import { PrettierFormatOptions } from "../shared/types";
import { ACTIVATION } from "../shared/config";

export const prettierFormat = async (
  cwd = process.cwd(),
  options: PrettierFormatOptions,
) => {
  const { prettierrc, staged, paths, suffix } = options;

  if (ACTIVATION) {
    loggerInfo("prettierFormat 参数信息: \n");
    console.table(cwd);
    console.table(options);
  }

  try {
    const config = path.join(cwd, prettierrc);

    let configArgs: string[] = [];
    if (fs.existsSync(config)) {
      configArgs = ["--config", config];
    }

    // 获取需要处理的文件
    const files = await getEveryFilesBySuffixes(cwd, staged, paths, suffix);

    // 运行 write 命令,重写代码风格
    await execCommand("npx", ["prettier", ...configArgs, "--write", ...files], {
      stdio: "inherit",
    });
  } catch (error) {
    loggerError(error);
  }
};
