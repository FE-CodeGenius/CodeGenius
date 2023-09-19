import enquirer from "enquirer";

import { ACTIVATION } from "@/shared/config";
import { CommitScope, CommitType } from "@/shared/types";
import { loggerInfo, execCommand } from "@/shared/index";
interface PromptResult {
  type: string;
  scope: string;
  description: string;
}

interface GitCommitOptions {
  emoji: boolean;
}

export const gitCommit = async (
  types: Array<CommitType>,
  scopes: Array<CommitScope>,
  options: GitCommitOptions,
) => {
  if (ACTIVATION) {
    loggerInfo("gitCommit 参数信息: \n");
    console.table(types);
    console.table(scopes);
    console.table(options);
  }
  const { emoji: emojiStatus } = options;
  const typesChoices = types.map(({ emoji, code, description }) => {
    const formatCode = `${code}:`.padEnd(20);
    return {
      name: emojiStatus ? `${emoji}${code}` : code,
      message: `${emoji}${formatCode}${description}`,
    };
  });

  const scopesChoices = scopes.map(({ name, description }) => {
    const formatName = `${name}:`.padEnd(20);
    return {
      name,
      message: `${formatName.padEnd(20)} ${description}`,
    };
  });

  const result = await enquirer.prompt<PromptResult>([
    {
      name: "type",
      type: "select",
      message: "请选择提交类型",
      choices: typesChoices,
    },
    {
      name: "scope",
      type: "select",
      message: "请选择提交范围",
      choices: scopesChoices,
    },
    {
      name: "description",
      type: "text",
      message: "请输入提交描述",
    },
  ]);

  const content = `${result.type}(${result.scope}): ${result.description}`;
  await execCommand("git", ["commit", "-m", content], { stdio: "inherit" });
};
