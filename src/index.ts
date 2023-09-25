import rootInstaller, { root } from "@/command/root";
import createProjectInstaller, {
  createProject,
} from "@/command/create-project";
import clearInstaller, { clear } from "@/command/clear";
import gitCommitInstaller, { gitCommit } from "@/command/git-commit";
import gitCommitVerifyInstaller, {
  gitCommitVerify,
} from "@/command/git-commit-verify";
import gitInitSimpleHooksInstaller, {
  gitInitSimpleHooks,
} from "@/command/git-init-hooks";
import npmDepCheckInstaller, { npmDepCheck } from "@/command/npm-dep-check";
import npmRegistryInstaller, { npmRegistry } from "@/command/npm-registry";
import eslintFixInstaller, { eslintFix } from "@/command/eslint-fix";
import prettierFormatInstaller, {
  prettierFormat,
} from "@/command/prettier-format";
import templateInstaller, { template } from "@/command/template";
import lighthouseInstaller, { lighthouse } from "@/command/lighthouse";
import gitUserInstaller, {
  setGitUserName,
  setGitUserEmail,
  checkGitUserName,
  checkGitUserEmail,
} from "@/command/git-user";
import quantityInstaller, { quantity } from "@/command/quantity";
import { defineConfig } from "@/helper";

export {
  root,
  createProject,
  clear,
  gitCommit,
  gitCommitVerify,
  gitInitSimpleHooks,
  npmDepCheck,
  npmRegistry,
  eslintFix,
  prettierFormat,
  template,
  lighthouse,
  setGitUserName,
  setGitUserEmail,
  checkGitUserName,
  checkGitUserEmail,
  quantity,
};

export default defineConfig({
  plugins: [
    rootInstaller,
    gitCommitInstaller,
    gitCommitVerifyInstaller,
    gitUserInstaller,
    gitInitSimpleHooksInstaller,
    npmRegistryInstaller,
    clearInstaller,
    npmDepCheckInstaller,
    eslintFixInstaller,
    prettierFormatInstaller,
    createProjectInstaller,
    templateInstaller,
    lighthouseInstaller,
    quantityInstaller,
  ],
});
