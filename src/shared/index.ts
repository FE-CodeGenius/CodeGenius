import { execa } from "execa";
import fs from "fs";
import path from "path";
import type { Options } from "execa";
import { consola } from "consola";
import process from "node:process";
import { green, lightYellow, lightGreen, lightRed } from "kolorist";
import { ACTIVATION } from "./config";

export const execCommand = async (
  cmd: string,
  args: string[],
  options?: Options
) => {
  try {
    const res = await execa(cmd, args, options);
    return res?.stdout?.trim() || "";
  } catch (error) {
    if (error instanceof Error) {
      consola.error(error.message);
    } else {
      consola.error(error);
    }
  }
};

export class PrettyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    if (typeof Error.captureStackTrace === "function")
      Error.captureStackTrace(this, this.constructor);
    else this.stack = new Error(message).stack;
  }
}

export function handleError(error: unknown) {
  if (error instanceof PrettyError) consola.error(error.message);

  process.exitCode = 1;
}

export const loggerInfo = (content: string) => {
  if (ACTIVATION) {
    console.log(green(`[INFO]： ${content}`));
  }
};

export const loggerWarring = (content: string) => {
  if (ACTIVATION) {
    console.log(lightYellow(`[WARRING]： ${content}`));
  }
};

export const loggerSuccess = (content: string) => {
  console.log(lightGreen(`[SUCCESS]： ${content}`));
};

export const loggerError = (content: string | unknown) => {
  console.log(lightRed(`[ERROR]： ${content}`));
};

export function filterFiles(
  fileList: string[],
  allowedExtensions: string[]
): string[] {
  const filteredFiles: string[] = [];

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];

    for (let j = 0; j < allowedExtensions.length; j++) {
      const extension = allowedExtensions[j];

      if (file.endsWith(extension)) {
        filteredFiles.push(file);
        break;
      }
    }
  }
  return filteredFiles;
}

export function getAllFiles(dirPaths: string[]): string[] {
  const fileList: string[] = [];
  function traverseDirectory(dirPath: string) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // 如果是文件夹，则递归遍历
        traverseDirectory(filePath);
      } else {
        // 如果是文件，则将文件路径添加到列表中
        fileList.push(filePath);
      }
    });
  }

  dirPaths.forEach((dirPath) => {
    traverseDirectory(dirPath);
  });

  const uniqueFiles = Array.from(new Set(fileList));
  return uniqueFiles;
}

export const getLintFiles = async (
  cwd: string,
  staged: boolean,
  paths: string[],
  suffix: string[]
) => {
  let files: string[] = [];
  if (staged) {
    const result = await execCommand("git", [
      "diff",
      "--name-only",
      "--cached",
    ]);
    files = result?.split("\n").map((path) => `${cwd}/${path}`) || [];
  } else {
    files = getAllFiles(paths.map((path) => `${cwd}/${path}`));
  }
  return filterFiles(files, suffix);
};
