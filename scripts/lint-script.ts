import { eslintFix } from "@/command/eslint-fix";
import { gitUser } from "@/command/git-user";
import { prettierFormat } from "@/command/prettier-format";
import { execCommand } from "@/shared";

async function lint() {
  await gitUser({ ruleEmail: "^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$" });
  await prettierFormat(["./src/", "./scripts/"]);
  await execCommand("git", ["add", "."]);
  await eslintFix(["./src/", "./scripts/"]);
}

lint();
