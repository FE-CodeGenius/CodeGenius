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
import npmRegistryInstaller, { npmRegistry } from "@/command/npm-registry";
import prettierFormatInstaller, {
  prettierFormat,
} from "@/command/prettier-format";
import rootInstaller, { root } from "@/command/root";
import scriptRunInstaller from "@/command/script";
import templateInstaller, { template } from "@/command/template";
import { defineConfig, execCommand, loggerInfo, printInfo } from "@/helper";

import { BuiltInPlugins } from "./types";

export * from "./config";
export * from "./types";

export const plugins = [
  rootInstaller,
  gitCommitInstaller,
  gitCommitVerifyInstaller,
  gitUserInstaller,
  gitInitSimpleHooksInstaller,
  npmRegistryInstaller,
  eslintFixInstaller,
  impSortInstaller,
  prettierFormatInstaller,
  createProjectInstaller,
  templateInstaller,
  lighthouseInstaller,
  scriptRunInstaller,
] as BuiltInPlugins;

export {
  checkGitUserEmail,
  checkGitUserName,
  createProject,
  defineConfig,
  eslintFix,
  gitCommit,
  gitCommitVerify,
  gitInitSimpleHooks,
  impSort,
  lighthouse,
  npmRegistry,
  prettierFormat,
  root,
  setGitUserEmail,
  setGitUserName,
  template,
};

export { execCommand, loggerInfo, printInfo };
