import { eslintFix } from "./../src/command/eslint-fix";
import { execCommand, loggerWarring } from "../src/shared";
import { esLintOptions, prettierFormatOptions } from "../src/shared/config";
import { prettierFormat } from "../src/command/prettier-format";

async function lint() {
  try {
    await prettierFormat(process.cwd(), prettierFormatOptions);
    await execCommand("git", ["add", "."]);
    await eslintFix(process.cwd(), esLintOptions);
  } catch (error) {
    loggerWarring(error);
  }
}

lint();
