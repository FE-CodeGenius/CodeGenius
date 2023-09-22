import type { CAC } from "cac";

import createProjectInstaller from "./command/create-project";
import clearInstaller from "./command/clear";
import gitCommitInstaller from "./command/git-commit";
import gitCommitVerifyInstaller from "./command/git-commit-verify";
import gitInitSimpleHooksInstaller from "./command/git-init-hooks";
import npmDepCheckInstaller from "./command/npm-dep-check";
import npmRunInstaller from "./command/npm-run";
import npmRegistryInstaller from "./command/npm-registry";
import eslintFixInstaller from "./command/eslint-fix";
import prettierFormatInstaller from "./command/prettier-format";
import templateInstaller from "./command/template";
import lighthouseInstaller from "./command/lighthouse";
import gitUserInstaller from "./command/git-user";

export function cmdInstaller(cli: CAC) {
  gitCommitInstaller(cli).setup();
  gitCommitVerifyInstaller(cli).setup();
  clearInstaller(cli).setup();
  gitInitSimpleHooksInstaller(cli).setup();
  npmDepCheckInstaller(cli).setup();
  npmRunInstaller(cli).setup();
  npmRegistryInstaller(cli).setup();
  eslintFixInstaller(cli).setup();
  prettierFormatInstaller(cli).setup();
  createProjectInstaller(cli).setup();
  templateInstaller(cli).setup();
  lighthouseInstaller(cli).setup();
  gitUserInstaller(cli).setup();
}
