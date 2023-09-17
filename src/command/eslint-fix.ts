import path from "node:path";

import {
  execCommand,
  getEveryFilesBySuffixes,
  loggerError,
  loggerInfo,
} from "./../shared/index";
import { ACTIVATION } from "../shared/config";
import { EsLintOptions } from "../shared/types";

export const eslintFix = async (
  cwd = process.cwd(),
  options: EsLintOptions,
) => {
  try {
    const { eslintrc, staged, paths, suffix } = options;

    if (ACTIVATION) {
      loggerInfo("eslintFix 参数信息: \n");
      console.table(cwd);
      console.table(options);
    }

    const config = path.join(cwd, eslintrc);

    // 获取需要处理的文件
    const files = await getEveryFilesBySuffixes(cwd, staged, paths, suffix);

    await execCommand(
      "npx",
      [
        "eslint",
        "--fix",
        "--fix-type",
        "problem",
        "--fix-type",
        "suggestion",
        "--config",
        config,
        ...files,
      ],
      {
        stdio: "inherit",
      },
    );
  } catch (error) {
    loggerError(error);
  }
};
