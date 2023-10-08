import eslintFixInstaller, { eslintFix } from "@/command/eslint-fix";
import impSortInstaller, { impSort } from "@/command/eslint-import-sort";
import gitCommitInstaller, { gitCommit } from "@/command/git-commit";
import gitCommitVerifyInstaller, {
  gitCommitVerify,
} from "@/command/git-commit-verify";
import prettierFormatInstaller, {
  prettierFormat,
} from "@/command/prettier-format";
import rootInstaller, { root } from "@/command/root";
import scriptRunInstaller from "@/command/script";
import templateInstaller, { template } from "@/command/template";
import {
  defineConfig,
  execCommand,
  loggerError,
  loggerInfo,
  printError,
  printInfo,
  printSuccess,
  printWarring,
} from "@/helper";

import { BuiltInPlugins } from "./types";

export * from "./config";
export * from "./types";

export const plugins = [
  rootInstaller,
  gitCommitInstaller,
  gitCommitVerifyInstaller,
  eslintFixInstaller,
  impSortInstaller,
  prettierFormatInstaller,
  templateInstaller,
  scriptRunInstaller,
] as BuiltInPlugins;

export {
  defineConfig,
  eslintFix,
  gitCommit,
  gitCommitVerify,
  impSort,
  prettierFormat,
  root,
  template,
};

export {
  execCommand,
  loggerError,
  loggerInfo,
  printError,
  printInfo,
  printSuccess,
  printWarring,
};
