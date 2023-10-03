import path from "node:path";
import { performance } from "node:perf_hooks";

import Ajv from "ajv";
import type { CAC } from "cac";
import enquirer from "enquirer";
import fs from "fs-extra";

import { ACTIVATION, clearGlob } from "@/config";
import { execCommand, loggerInfo, printInfo } from "@/helper";
import { ClearOptions, CodeGeniusOptions } from "@/types";

const schema = {
  type: "object",
  properties: {
    paths: { type: "array" },
  },
  required: ["paths"],
};

const mergeConfig = async (config: CodeGeniusOptions) => {
  const commands = config && config?.commands;
  if (commands && commands.clear) {
    const { files } = commands.clear;
    return {
      paths: files && files.length > 0 ? files : clearGlob,
    };
  }
  return {
    paths: clearGlob,
  };
};

const generateEnquirer = async (
  config: CodeGeniusOptions,
): Promise<ClearOptions> => {
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

  const { paths } = await mergeConfig(config);
  const fileMultiChoices = files.map((v) => {
    return {
      name: `./${v.file}`,
      message: `${v.file}`,
      hint: paths.includes(`./${v.file}`) ? "建议清理" : "",
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

  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate({
    paths,
  });
  if (!valid && validate.errors && validate.errors?.length > 0) {
    throw new Error(validate.errors[0].message);
  }

  await execCommand("npx", ["rimraf", "--glob", ...paths], {
    stdio: "inherit",
  });
  printInfo("清理结束");
};

export default function clearInstaller(cli: CAC, config: CodeGeniusOptions) {
  return {
    name: "clearInstaller",
    setup: () => {
      cli
        .command("clear", "运行 rimraf 删除不再需要的文件或文件夹")
        .option("-p, --pattern <pattern>", "设置匹配规则")
        .option("-a, --ask", "启用询问模式")
        .action(async (options) => {
          const { pattern, ask } = options;
          let paths = [];
          if (ask) {
            const result = await generateEnquirer(config);
            paths = result.files;
          } else {
            paths = typeof pattern === "string" ? [pattern] : pattern;
          }
          const start = performance.now();
          await clear(paths);
          const getTime = () => `${(performance.now() - start).toFixed(2)}ms`;
          loggerInfo(`😁 clear 命令执行结束, 共用时: ${getTime()}`);
        });
    },
  };
}
