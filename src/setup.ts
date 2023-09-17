import { eslintFix } from "./command/eslint-fix";
import type { CAC } from "cac";

import {
  cleanUpDirs,
  cwd,
  esLintOptions,
  gitCommitScopes,
  gitCommitTypes,
} from "./shared/config";
import { SetupSet } from "./shared/types";

import { gitCommitVerify } from "./command/git-commit-verify";
import { gitCommit } from "./command/git-commit";
import { gitInitSimpleHooks } from "./command/git-init-hooks";
import { cleanUp } from "./command/cheanup";
import { npmRun } from "./command/npm-run";

export const setupSet: SetupSet = {
  cmSetup: (cli: CAC) => {
    cli
      .command("cm", "Help generate canonical git commit content")
      .option("--noEmoji", "Disable emoji", {
        default: false,
      })
      .action(async (options) => {
        const { noEmoji } = options;
        await gitCommit(gitCommitTypes, gitCommitScopes, {
          enableEmoji: !noEmoji,
        });
      });
  },
  cmvSetup: (cli: CAC) => {
    cli
      .command(
        "cmv",
        "Help verify whether the content of git commit complies with the specification"
      )
      .action(async () => {
        await gitCommitVerify();
      });
  },
  cupSetup: (cli: CAC) => {
    cli
      .command("cup", "Clean files generated during runtime")
      .option("--ignore <path>", "ignore path", {
        default: [...cleanUpDirs],
      })
      .action(async (options) => {
        const { ignore } = options;
        await cleanUp(ignore);
      });
  },
  initSimpleHooks: (cli: CAC) => {
    cli
      .command(
        "ihooks",
        "Need to re-initialize after modifying simple-git-hooks"
      )
      .action(async () => {
        await gitInitSimpleHooks();
      });
  },
  npmRunSetup: (cli: CAC) => {
    cli.command("run", "Run the script listed").action(async () => {
      await npmRun();
    });
  },
  eslintFix: (cli: CAC) => {
    cli
      .command("lint", "Inspecte the code and try to fix it.")
      .option("--eslintrc <file>", "eslintrc file", {
        default: esLintOptions.eslintrc,
      })
      .option("--path <path>", "Inspecte path", {
        default: esLintOptions.paths,
      })
      .option("--staged", "Inspecte staged files", {
        default: false,
      })
      .option("--suffix <suffix>", "Inspecte files with specified suffixes", {
        default: ".js,.jsx,.ts,.tsx",
      })
      .action(async (options) => {
        const { eslintrc, staged, path, suffix } = options;
        console.log(suffix)
        await eslintFix(cwd, {
          eslintrc,
          staged,
          paths: typeof path === "string" ? [path] : path,
          suffix: suffix.split(",")
        });
      });
  },
};
