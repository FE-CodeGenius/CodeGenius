import { eslintFix } from "./../src/command/eslint-fix";
import { execCommand, loggerWarring } from "../src/shared";
import { prettierFormat } from "../src/command/prettier-format";

async function lint() {
  try {
    await prettierFormat(["./src/", "./scripts/"]);
    await execCommand("git", ["add", "."]);
    await eslintFix(["./src/", "./scripts/"]);
  } catch (error) {
    loggerWarring(error);
  }
}

lint();
