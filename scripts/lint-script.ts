import { eslintFix } from "@/command/eslint-fix";
import { prettierFormat } from "@/command/prettier-format";
import { execCommand, printError } from "@/shared";

async function lint() {
  try {
    await prettierFormat(["./src/", "./scripts/"]);
    await execCommand("git", ["add", "."], {
      stdio: "inherit",
    });
    await eslintFix(["./src/", "./scripts/"]);
  } catch (error) {
    printError(error);
  }
}

lint();
