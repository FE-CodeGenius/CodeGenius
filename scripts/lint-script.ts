import { eslintFix } from "@/command/eslint-fix";
import { prettierFormat } from "@/command/prettier-format";
import { execCommand, loggerWarring } from "@/shared";

async function lint() {
  try {
    await prettierFormat(["./src/", "./scripts/"]);
    await execCommand("git", ["add", ","]);
    await eslintFix(["./src/", "./scripts/"]);
  } catch (error) {
    loggerWarring(error);
  }
}

lint();
