import type { CAC } from "cac";

import rootInstaller from "./command/root";
import createProjectInstaller from "./command/create-project";
import clearInstaller from "./command/clear";
import gitCommitInstaller from "./command/git-commit";
import gitCommitVerifyInstaller from "./command/git-commit-verify";
import gitInitSimpleHooksInstaller from "./command/git-init-hooks";
import npmDepCheckInstaller from "./command/npm-dep-check";
import npmRegistryInstaller from "./command/npm-registry";
import eslintFixInstaller from "./command/eslint-fix";
import prettierFormatInstaller from "./command/prettier-format";
import templateInstaller from "./command/template";
import lighthouseInstaller from "./command/lighthouse";
import gitUserInstaller from "./command/git-user";
import quantityInstaller from "./command/quantity";

export function cmdInstaller(cli: CAC) {
  rootInstaller(cli).setup();
  gitCommitInstaller(cli).setup();
  gitCommitVerifyInstaller(cli).setup();
  gitUserInstaller(cli).setup();
  gitInitSimpleHooksInstaller(cli).setup();
  npmRegistryInstaller(cli).setup();
  clearInstaller(cli).setup();
  npmDepCheckInstaller(cli).setup();
  eslintFixInstaller(cli).setup();
  prettierFormatInstaller(cli).setup();
  createProjectInstaller(cli).setup();
  templateInstaller(cli).setup();
  lighthouseInstaller(cli).setup();
  quantityInstaller(cli).setup();
}
