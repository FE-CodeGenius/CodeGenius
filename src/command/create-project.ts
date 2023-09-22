import enquirer from "enquirer";

import { execCommand, loggerInfo } from "@/shared/index";
import { ACTIVATION, projectSources } from "@/shared/config";
import { BaseCommand, ProjectSource } from "@/shared/types";
import { action, command } from "@/shared/reflect";
interface PromptResult {
  command: string;
}

export const createProject = async (sources: ProjectSource[]) => {
  if (ACTIVATION) {
    loggerInfo("createProject 参数信息: \n");
    console.table(sources);
  }

  const sourceChoices = sources.map(({ name, display, description }) => {
    const formatDisplay = `${display}:`.padEnd(20);
    return {
      name: name,
      message: `${formatDisplay}${description}`,
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
  const commands = result.command.split(" ");

  await execCommand(commands[0], [...commands.slice(1)], {
    stdio: "inherit",
  });
};

@command("create", "运行 npm create 快速创建基础项目")
export class CreateProjectCommand extends BaseCommand {
  @action
  protected async action(): Promise<void> {
    await createProject(projectSources);
  }
}
