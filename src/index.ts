import clearInstaller, { clear } from "@/command/clear";
import createProjectInstaller, {
  createProject,
} from "@/command/create-project";
import eslintFixInstaller, { eslintFix } from "@/command/eslint-fix";
import impSortInstaller, { impSort } from "@/command/eslint-import-sort";
import gitCommitInstaller, { gitCommit } from "@/command/git-commit";
import gitCommitVerifyInstaller, {
  gitCommitVerify,
} from "@/command/git-commit-verify";
import gitInitSimpleHooksInstaller, {
  gitInitSimpleHooks,
} from "@/command/git-init-hooks";
import gitUserInstaller, {
  checkGitUserEmail,
  checkGitUserName,
  setGitUserEmail,
  setGitUserName,
} from "@/command/git-user";
import lighthouseInstaller, { lighthouse } from "@/command/lighthouse";
import npmDepCheckInstaller, { npmDepCheck } from "@/command/npm-dep-check";
import npmRegistryInstaller, { npmRegistry } from "@/command/npm-registry";
import prettierFormatInstaller, {
  prettierFormat,
} from "@/command/prettier-format";
import quantityInstaller, { quantity } from "@/command/quantity";
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
} from "@/helper";

import { Plugins } from "./types";

export * from "./config";
export * from "./types";

export const plugins = [
  rootInstaller,
  gitCommitInstaller,
  gitCommitVerifyInstaller,
  gitUserInstaller,
  gitInitSimpleHooksInstaller,
  npmRegistryInstaller,
  clearInstaller,
  npmDepCheckInstaller,
  eslintFixInstaller,
  impSortInstaller,
  prettierFormatInstaller,
  createProjectInstaller,
  templateInstaller,
  lighthouseInstaller,
  quantityInstaller,
  scriptRunInstaller,
] as Plugins;

export {
  checkGitUserEmail,
  checkGitUserName,
  clear,
  createProject,
  defineConfig,
  eslintFix,
  gitCommit,
  gitCommitVerify,
  gitInitSimpleHooks,
  impSort,
  lighthouse,
  npmDepCheck,
  npmRegistry,
  prettierFormat,
  quantity,
  root,
  setGitUserEmail,
  setGitUserName,
  template,
};

export { execCommand, loggerError, loggerInfo, printError,printInfo };
