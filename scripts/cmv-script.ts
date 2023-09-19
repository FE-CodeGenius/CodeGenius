import { loggerWarring } from "@/shared/index";
import { gitCommitVerify } from "@/command/git-commit-verify";

async function cmv() {
  try {
    await Promise.all([gitCommitVerify()]);
  } catch (error) {
    loggerWarring(error);
  }
}

cmv();
