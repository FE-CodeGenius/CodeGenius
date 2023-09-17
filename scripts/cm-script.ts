import { gitCommit } from "../src/command/git-commit";
import { loggerWarring } from "../src/shared";
import { gitCommitScopes, gitCommitTypes } from "../src/shared/config";

async function cmv() {
  try {
    await Promise.all([
      gitCommit(gitCommitTypes, gitCommitScopes, {
        enableEmoji: false,
      }),
    ]);
  } catch (error) {
    loggerWarring(error);
  }
}

cmv();
