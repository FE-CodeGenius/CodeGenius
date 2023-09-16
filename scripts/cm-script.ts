import { gitCommit } from "../src/command/git-commit";
import { gitCommitScopes, gitCommitTypes } from "../src/shared/config";

async function cmv() {
  try {
    await Promise.all([
      gitCommit(gitCommitTypes, gitCommitScopes, {
        enableEmoji: false,
      }),
    ]);
  } catch (error) {
    console.warn(error);
  }
}

cmv();
