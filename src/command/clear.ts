import path from "node:path";

import type { CAC } from "cac";
import enquirer from "enquirer";
import fs from "fs-extra";

import { ACTIVATION, clearGlob } from "@/config";
import { execCommand, loggerInfo, printInfo } from "@/helper";
import { ClearOptions } from "@/types";

const generateEnquirer = async (): Promise<ClearOptions> => {
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
      hint: clearGlob.includes(`./${v.file}`) ? "建议清理" : "",
    };
  });
  const result = await enquirer.prompt<ClearOptions>([
    {
      name: "files",
      type: "multiselect",
      message: "请选择需要清理的文件/夹",
      choices: fileMultiChoices,
    },
  ]);
  return {
    files: result.files,
  };
};

export const clear = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo(`clear 参数信息: \n ${JSON.stringify(paths)}`);
  }
  await execCommand("npx", ["rimraf", "--glob", ...paths], {
    stdio: "inherit",
  });
  printInfo("清理结束");
};

export default function clearInstaller(cli: CAC) {
  return {
    name: "clearInstaller",
    setup: () => {
      cli
        .command("clear", "运行 rimraf 删除不再需要的文件或文件夹")
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
          await clear(paths);
        });
    },
  };
}
