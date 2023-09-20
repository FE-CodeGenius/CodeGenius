import type { CAC } from "cac";

import enquirer from "enquirer";

import { execCommand, loggerInfo } from "@/shared/index";
import { ACTIVATION, projectSources } from "@/shared/config";
import { ProjectSource } from "@/shared/types";

interface PromptResult {
  command: string;
}

export const createProject = async (sources: ProjectSource[]) => {
  if (ACTIVATION) {
    loggerInfo("createProject 参数信息: \n");
    console.table(sources);
  }

  const sourceChoices = sources.map(({ name, description }) => {
    const formatName = `${name}:`.padEnd(15);
    return {
      name: name,
      message: `${formatName}${description}`,
    };
  });

  const result = await enquirer.prompt<PromptResult>([
    {
      name: "command",
      type: "select",
      message: "请选择提交类型",
      choices: sourceChoices,
    },
  ]);

  await execCommand("npm", ["create", result.command], {
    stdio: "inherit",
  });
};

export default function createProjectInstaller(cli: CAC) {
  return {
    name: "createProjectInstaller",
    setup: () => {
      cli
        .command("create", "运行 npm create 快速创建基础项目")
        .action(async () => {
          await createProject(projectSources);
        });
    },
  };
}
