import { loggerWarring } from './../src/shared/index';
import { gitCommitVerify } from "../src/command/git-commit-verify";

async function cmv() {
  try {
    await Promise.all([gitCommitVerify()]);
  } catch (error) {
    loggerWarring(error);
  }
}

cmv();
