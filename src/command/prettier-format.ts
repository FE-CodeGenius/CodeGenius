import {
  execCommand,
  getLintFiles,
  loggerError,
  loggerInfo,
} from "./../shared/index";
import { PrettierFormatOptions } from "../shared/types";
import { ACTIVATION } from "../shared/config";

export const prettierFormat = async (
  cwd = process.cwd(),
  options: PrettierFormatOptions,
) => {
  const { staged, paths, suffix } = options;

  if (ACTIVATION) {
    loggerInfo("prettierFormat 参数信息: \n");
    console.table(cwd);
    console.table(options);
  }

  try {
    const files = await getLintFiles(cwd, staged, paths, suffix);
    if (files.length > 0) {
      const result = await execCommand("npx", [
        "prettier",
        "--debug-check",
        ...files,
      ]);
      if (result) {
        await execCommand(
          "npx",
          ["prettier", "--write", ...result.split("\n")],
          {
            stdio: "inherit",
          },
        );
        await execCommand("git", ["add", ...result.split("\n")], {
          stdio: "inherit",
        });
      }
    }
  } catch (error) {
    loggerError(error);
  }
};
