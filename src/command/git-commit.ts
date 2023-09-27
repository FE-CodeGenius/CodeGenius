import type { CAC } from "cac";
import enquirer from "enquirer";

import { ACTIVATION, gitCommitScopes, gitCommitTypes } from "@/config";
import { execCommand, loadConfigModule, loggerInfo } from "@/helper";
import { GitCommitOptions } from "@/types";

const mergeConfig = async () => {
  const config = await loadConfigModule();
  const commands = config && config?.commands;
  if (commands && commands.commit) {
    const { gitCommitTypes: types, gitCommitScopes: scopes } = commands.commit;
    return {
      types: types && types.length > 0 ? types : gitCommitTypes,
      scopes: scopes && scopes.length > 0 ? scopes : gitCommitScopes,
    };
  }
  return {
    types: gitCommitTypes,
    scopes: gitCommitScopes,
  };
};

const generateEnquirer = async (): Promise<
  Pick<GitCommitOptions, Exclude<keyof GitCommitOptions, "emoji">>
> => {
  const { types, scopes } = await mergeConfig();
  const typesChoices = types.map(({ emoji, code, description }) => {
    const formatCode = `${code}:`.padEnd(20);
    return {
      name: `${emoji} ${code}`,
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

  const result = await enquirer.prompt<GitCommitOptions>([
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
    {
      name: "emoji",
      type: "confirm",
      message: "要在提交信息中显示内置的 emoji 表情吗?",
    },
  ]);
  return {
    type: result.emoji ? result.type : result.type.split(" ")[1],
    scope: result.scope,
    description: result.description,
  };
};

export const gitCommit = async (content: string) => {
  if (ACTIVATION) {
    loggerInfo(`gitCommit 参数信息: \n${JSON.stringify(content)}`);
  }
  await execCommand("git", ["commit", "-m", content], { stdio: "inherit" });
};

export default function gitCommitInstaller(cli: CAC) {
  return {
    name: "gitCommitInstaller",
    setup: () => {
      cli
        .command("commit", "生成 angualr 规范的提交信息")
        .option("-t, --type <type>", "添加修改类型")
        .option("-s, --scope <scope>", "填写修改范围")
        .option("-d, --description <description>", "填写修改描述")
        .action(async (options) => {
          const { type, scope, description } = options;
          let content = "";
          if (!type || !scope || !description) {
            const result = await generateEnquirer();
            content = `${result.type}(${result.scope}): ${result.description}`;
          } else {
            content = `${type}(${scope}): ${description}`;
          }
          await gitCommit(content);
        });
    },
  };
}
