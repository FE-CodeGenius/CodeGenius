import type { CAC } from "cac";
import { getMetadata } from "./shared/reflect";

import { CreateProjectCommand } from "./command/create-project";
import { ClearCommand } from "./command/clear";
import { GitCommitCommand } from "./command/git-commit";
import { GitCommitVerifyCommand } from "./command/git-commit-verify";
import { GitInitSimpleHooksCommand } from "./command/git-init-hooks";
import { NpmDepCheckCommand } from "./command/npm-dep-check";
import { NpmRunCommand } from "./command/npm-run";
import { NpmRegistryCommand } from "./command/npm-registry";
import { EslintFixCommand } from "./command/eslint-fix";
import { PrettierFormatCommand } from "./command/prettier-format";
import { TemplateCommand } from "./command/template";
import { LighthouseCommand } from "./command/lighthouse";
import { GitUserCommand } from "./command/git-user";
import { QuantityCommand } from "./command/quantity";

const commandClasses = [
  GitCommitCommand,
  GitCommitVerifyCommand,
  NpmDepCheckCommand,
  NpmRegistryCommand,
  NpmRunCommand,
  ClearCommand,
  GitInitSimpleHooksCommand,
  EslintFixCommand,
  PrettierFormatCommand,
  CreateProjectCommand,
  TemplateCommand,
  LighthouseCommand,
  GitUserCommand,
  QuantityCommand,
];

export async function initCommands(cli: CAC) {
  commandClasses.forEach((clazz) => {
    const data = getMetadata(clazz.name);
    const { cmd, description, action } = data;
    const argKeys = Object.keys(data).filter(
      (key) => !["cmd", "description", "action"].includes(key),
    );
    const command = cli.command(cmd, description);
    argKeys.forEach((key) => {
      command.option(data[key].rawName, data[key].description, {
        default: data[key].default,
      });
    });
    command.action(action);
  });
}
