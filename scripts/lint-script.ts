import { checkGitUserEmail } from "@codegenius/git-user-plugin";

import { eslintFix } from "@/command/eslint-fix";
import { impSort } from "@/command/eslint-import-sort";
import { prettierFormat } from "@/command/prettier-format";
import { execCommand } from "@/helper";

async function lint() {
  await checkGitUserEmail("^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$");
  await prettierFormat(["./src/", "./scripts/"]);
  await eslintFix(["./src/", "./scripts/"]);
  await impSort(["./src/", "./scripts/"]);
  await execCommand("git", ["add", "."]);
}

lint();
