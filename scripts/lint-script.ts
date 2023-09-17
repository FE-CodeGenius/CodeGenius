import { eslintFix } from "./../src/command/eslint-fix";
import { loggerWarring } from "../src/shared";
import { esLintOptions } from "../src/shared/config";

async function lint() {
  try {
    await Promise.all([eslintFix(process.cwd(), esLintOptions)]);
  } catch (error) {
    loggerWarring(error);
  }
}

lint();
