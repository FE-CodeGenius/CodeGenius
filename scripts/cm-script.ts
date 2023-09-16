import { gitCommit } from "../src/command/git-commit";
import { gitCommitScopes, gitCommitTypes } from "../src/shared/config";

async function cmv() {
  await Promise.all([
    gitCommit(gitCommitTypes, gitCommitScopes, {
      enableEmoji: false,
    }),
  ]);
}

cmv();
