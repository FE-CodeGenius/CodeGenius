import { ESLint } from "eslint";
import path from "node:path";

import {
  execCommand,
  loggerError,
  loggerInfo,
  loggerSuccess,
} from "./../shared/index";
import { ACTIVATION } from "../shared/config";
import { EsLintOptions } from "../shared/types";

export const eslintFix = async (
  cwd = process.cwd(),
  options: EsLintOptions
) => {
  try {
    const { eslintrc, staged, paths } = options;

    if (ACTIVATION) {
      loggerInfo("eslintFix 参数信息: \n");
      console.table(cwd);
      console.table(staged);
      console.table(options);
    }

    const eslint = new ESLint({
      fix: true,
      fixTypes: ["problem", "suggestion"],
      useEslintrc: false,
      overrideConfigFile: path.join(cwd, eslintrc),
    });

    let files: string[] = [];
    if (staged) {
      const result = await execCommand("git", [
        "diff",
        "--name-only",
        "--cached",
      ]);
      files =
        result
          ?.split("\n")
          .map((path) => `${cwd}/${path}`)
          .filter(
            (path) =>
              path.endsWith(".js") ||
              path.endsWith(".jsx") ||
              path.endsWith(".ts") ||
              path.endsWith(".tsx")
          ) || [];
    } else {
      files = paths.map((path) => `${cwd}/${path}`);
    }

    const results = await eslint.lintFiles(files);
    await ESLint.outputFixes(results);
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    if (resultText) {
      loggerError(`💥eslint check fail! ${resultText}`);
      process.exit(1);
    } else {
      loggerSuccess("🎉 eslint check success!");
    }
  } catch (error: unknown) {
    loggerError(error);
  }
};
