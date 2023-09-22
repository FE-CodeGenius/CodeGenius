import { gitCommitVerify } from "@/command/git-commit-verify";

async function cmv() {
  await gitCommitVerify();
}

cmv();
