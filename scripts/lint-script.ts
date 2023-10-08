import { prettierFormat } from "@codegenius/format-plugin";
import { checkGitUserEmail } from "@codegenius/git-user-plugin";
import { impSort } from "@codegenius/impsort-plugin";

import { eslintFix } from "@/command/eslint-fix";
import { execCommand } from "@/helper";

async function lint() {
  await checkGitUserEmail("^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$");
  await prettierFormat(["./src/", "./scripts/"]);
  await eslintFix(["./src/", "./scripts/"]);
  await impSort(["./src/", "./scripts/"]);
  await execCommand("git", ["add", "."]);
}

lint();
