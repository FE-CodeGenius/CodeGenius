import eslintFixInstaller, { eslintFix } from "@/command/eslint-fix";
import gitCommitInstaller, { gitCommit } from "@/command/git-commit";
import rootInstaller from "@/command/root";
import scriptRunInstaller from "@/command/script";

import { BuiltInPlugins } from "./types";

export * from "./config";
export * from "./helper";
export * from "./types";

export const plugins = [
  rootInstaller,
  gitCommitInstaller,
  eslintFixInstaller,
  scriptRunInstaller,
] as BuiltInPlugins;

export { eslintFix, gitCommit };
