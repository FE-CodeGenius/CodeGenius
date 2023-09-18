import { eslintFix } from "./../src/command/eslint-fix";
import { prettierFormat } from "../src/command/prettier-format";
import { loggerWarring } from "../src/shared";

async function lint() {
  try {
    await prettierFormat(["./src/", "./scripts/"]);
    await eslintFix(["./src/", "./scripts/"]);
  } catch (error) {
    loggerWarring(error);
  }
}

lint();
