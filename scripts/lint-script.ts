import { eslintFix } from "@/command/eslint-fix";
import { checkGitUserEmail } from "@/command/git-user";
import { prettierFormat } from "@/command/prettier-format";
import { execCommand } from "@/helper";
import { impSort } from "@/command/eslint-import-sort";

async function lint() {
  await checkGitUserEmail("^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$");
  await prettierFormat(["./src/", "./scripts/"]);
  await execCommand("git", ["add", "."]);
  await eslintFix(["./src/", "./scripts/"]);
  await impSort(["./src/", "./scripts/"]);
}

lint();
