import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import type { Options } from "execa";

import execa from "execa";
import {
  lightYellow,
  lightGreen,
  lightRed,
  bgGreen,
  bgLightYellow,
  bgLightGreen,
  bgLightRed,
} from "kolorist";

import { ACTIVATION, FRAMEWORKS, TEMPLATES } from "@/shared/config";

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
    console.log(bgGreen(`[CODEG INFO]:`), content);
  }
};

export const loggerWarring = (content: string | unknown) => {
  if (ACTIVATION) {
    console.log(
      lightYellow(`[CODEG WARRING]:`),
      bgLightYellow(content as string),
    );
  }
};

export const loggerSuccess = (content: string) => {
  if (ACTIVATION) {
    console.log(bgLightGreen(`[CODEG SUCCESS]:`), lightGreen(content));
  }
};

export const loggerError = (content: string | unknown) => {
  if (ACTIVATION) {
    console.log(bgLightRed(`[CODEG ERROR]:`), lightRed(content as string));
  }
};

export const printInfo = (content: string) => {
  console.log(bgGreen(`[CODEG INFO]:`), content);
};

export const printWarring = (content: string) => {
  console.log(bgLightYellow(`[CODEG WARRING]:`), lightYellow(content));
};

export const printSuccess = (content: string) => {
  console.log(bgLightGreen(`[CODEG SUCCESS]:`), lightGreen(content));
};

export const printError = (content: string | unknown) => {
  console.log(bgLightRed(`[CODEG ERROR]:`), lightRed(content as string));
};

/**
 * 根据后缀列表过滤获取合法的文件列表
 * @param fileList
 * @param suffixes
 * @returns
 */
export function getFiilesBySuffixes(
  fileList: string[],
  suffixes: string[],
): string[] {
  const paths: string[] = [];

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];

    for (let j = 0; j < suffixes.length; j++) {
      const extension = suffixes[j];

      if (file.endsWith(extension)) {
        paths.push(file);
        break;
      }
    }
  }
  return paths;
}

/**
 * 获取目录列表下所有的文件列表
 *
 * @param paths
 * @returns
 */
export function getEveryFiles(paths: string[]): string[] {
  const fileList: string[] = [];
  function traverseDirectory(dirPath: string) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        traverseDirectory(filePath);
      } else {
        fileList.push(filePath);
      }
    });
  }

  paths.forEach((dirPath) => {
    traverseDirectory(dirPath);
  });

  return Array.from(new Set(fileList));
}

/**
 * 获取指定目录后暂存区所有符合给定后缀的文件列表
 * @param cwd
 * @param staged
 * @param paths
 * @param suffix
 * @returns
 */
export const getEveryFilesBySuffixes = async (
  cwd: string,
  staged: boolean,
  paths: string[],
  suffix: string[],
) => {
  let files: string[] = [];
  if (staged) {
    const result = await execCommand("git", [
      "diff",
      "--name-only",
      "--diff-filter=d",
      "--cached",
    ]);
    files = result?.split("\n").map((path) => `${cwd}/${path}`) || [];
  } else {
    files = getEveryFiles(paths.map((path) => `${cwd}/${path}`));
  }
  return getFiilesBySuffixes(files, suffix);
};

export function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, "");
}

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
