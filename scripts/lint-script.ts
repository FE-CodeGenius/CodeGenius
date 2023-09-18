import { eslintFix } from "./../src/command/eslint-fix";
import { execCommand, loggerWarring } from "../src/shared";
import { prettierFormat } from "../src/command/prettier-format";

async function lint() {
  try {
    await prettierFormat(["./src/", "./scripts/"]);
    await eslintFix(["./src/", "./scripts/"]);
    await execCommand("git", ["add", "."]);
  } catch (error) {
    loggerWarring(error);
  }
}

lint();
