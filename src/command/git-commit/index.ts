import Ajv from "ajv";
import type { CAC } from "cac";
import enquirer from "enquirer";

import { ACTIVATION, gitCommitScopes, gitCommitTypes } from "@/config";
import { execCommand } from "@/helper";
import { loggerInfo } from "@/logger";
import {
  CommandsOptions,
  CommitScope,
  CommitType,
  GitCommitOptions,
} from "@/types";

const schema = {
  type: "object",
  properties: {
    type: { type: "string" },
    scope: { type: "string" },
    description: { type: "string" },
  },
  required: ["type", "scope", "description"],
};

const generateEnquirer = async (
  types: Array<CommitType>,
  scopes: Array<CommitScope>,
): Promise<
  Pick<GitCommitOptions, Exclude<keyof GitCommitOptions, "emoji">>
> => {
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
      required: true,
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

export const gitCommit = async (
  type: string,
  scope: string,
  description: string,
) => {
  if (ACTIVATION) {
    loggerInfo(
      `gitCommit 参数信息: \n${JSON.stringify({
        type,
        scope,
        description,
      })}`,
    );
  }

  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate({
    type,
    scope,
    description,
  });
  if (!valid && validate.errors && validate.errors?.length > 0) {
    throw new Error(validate.errors[0].message);
  }
  await execCommand(
    "git",
    ["commit", "-m", `${type}(${scope}): ${description}`],
    { stdio: "inherit" },
  );
};

export default function gitCommitInstaller(config: CommandsOptions) {
  const { commit } = config;
  return {
    name: "commit",
    describe: "生成 angualr 规范的提交信息",
    command: "commit --ask",
    setup: (cli: CAC) => {
      cli
        .command("commit", "生成 angualr 规范的提交信息")
        .option("-t, --type <type>", "添加修改类型")
        .option("-s, --scope <scope>", "填写修改范围")
        .option("-d, --description <description>", "填写修改描述")
        .option("-a, --ask", "启用询问模式")
        .action(async (options) => {
          const { type, scope, description, ask } = options;
          const types = commit?.gitCommitTypes || gitCommitTypes;
          const scopes = commit?.gitCommitScopes || gitCommitScopes;
          if (ask) {
            const result = await generateEnquirer(types, scopes);
            await gitCommit(result.type, result.scope, result.description);
          } else {
            await gitCommit(type, scope, description);
          }
        });
    },
  };
}
