import { gitCommitVerify } from "../src/command/git-commit-verify";

async function cmv() {
  await Promise.all([gitCommitVerify()]);
}

cmv();
