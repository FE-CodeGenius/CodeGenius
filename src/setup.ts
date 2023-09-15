import type { CAC } from "cac";

import { cleanUpDirs, gitCommitScopes, gitCommitTypes } from "./shared/config";
import { SetupSet } from "./shared/types";

import { gitCommitVerify } from "./command/git-commit-verify";
import { gitCommit } from "./command/git-commit";
import { gitInitSimpleHooks } from "./command/git-init-hooks";
import { cleanUp } from "./command/cheanup";

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
      .option("--ignore <match>", "ignore match", {
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
        "Need to re-initialize after modifying git-simple-hooks"
      )
      .action(async () => {
        await gitInitSimpleHooks();
      });
  },
};
