import eslintFixInstaller, { eslintFix } from "@/command/eslint-fix/index";
import gitCommitInstaller, { gitCommit } from "@/command/git-commit/index";
import scriptRunInstaller from "@/command/script/index";

import { BuiltInPlugins } from "./types";

export * from "./config";
export * from "./helper";
export * from "./logger";
export * from "./types";

export const plugins = [
  gitCommitInstaller,
  eslintFixInstaller,
  scriptRunInstaller,
] as BuiltInPlugins;

export { eslintFix, gitCommit };
