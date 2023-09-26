import path from "node:path";

import type { CAC } from "cac";
import enquirer from "enquirer";
import { ESLint } from "eslint";
import fs from "fs-extra";

import { ACTIVATION, impSortGlob } from "@/config";
import { loggerInfo, printError, printSuccess } from "@/helper";
import { ImpSortOptions } from "@/types";

const generateEnquirer = async (): Promise<ImpSortOptions> => {
  const files = fs
    .readdirSync(path.join(process.cwd(), "."))
    .filter((v) => !v.startsWith("."))
    .map((file) => {
      return {
        sort: fs.statSync(path.join(process.cwd(), file)).isFile() ? 1 : 0,
        file,
      };
    });
  files.sort((v1, v2) => v1.sort - v2.sort);
  const fileMultiChoices = files.map((v) => {
    return {
      name: `./${v.file}`,
      message: `${v.file}`,
      hint: impSortGlob.includes(`./${v.file}`) ? "建议尝试修复" : "",
    };
  });
  const result = await enquirer.prompt<ImpSortOptions>([
    {
      name: "files",
      type: "multiselect",
      message: "请选择需要尝试修复的文件/夹",
      choices: fileMultiChoices,
    },
  ]);
  return {
    files: result.files,
  };
};

export const impSort = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo(`impSort 参数信息: \n ${JSON.stringify(paths)}`);
  }

  const eslint = new ESLint({
    fix: true,
    overrideConfig: {
      plugins: ["simple-import-sort"],
      rules: {
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
      },
    },
  });

  const results = await eslint.lintFiles([...paths]);
  await ESLint.outputFixes(results);
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = await formatter.format(results);
  if (!resultText) {
    printSuccess("模块导入顺序已修复完毕");
  } else {
    printError(resultText);
  }
};

export default function impSortInstaller(cli: CAC) {
  return {
    name: "impSortInstaller",
    setup: () => {
      cli
        .command("impsort", "运行 eslint 对模块导入进行分组&按字母排序")
        .option("-p, --pattern <pattern>", "设置匹配规则")
        .action(async (options) => {
          const { pattern } = options;
          let paths = [];
          if (!pattern) {
            const result = await generateEnquirer();
            paths = result.files;
          } else {
            paths =
              typeof options.pattern === "string"
                ? [options.pattern]
                : options.pattern;
          }
          await impSort(paths);
        });
    },
  };
}
