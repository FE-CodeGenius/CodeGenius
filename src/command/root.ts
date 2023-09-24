import type { CAC } from "cac";

import enquirer from "enquirer";
import updateNotifier from "simple-update-notifier";

import { execCommand } from "@/shared/index";
import { commands } from "@/shared/config";
import pkg from "../../package.json";

interface PromptResult {
  command: string;
}

export const root = async () => {
  updateNotifier({ pkg });
  const commandChoices = commands.map(({ display, command, description }) => {
    const formatCommand = `${display || command}`.padEnd(15);
    return {
      name: command,
      message: `${formatCommand}${description}`,
    };
  });
  const result = await enquirer.prompt<PromptResult>([
    {
      name: "command",
      type: "select",
      message: "请选择正确执行的 CodeG 命令",
      choices: commandChoices,
    },
  ]);
  await execCommand("codeg", [result.command], { stdio: "inherit" });
};

export default function rootInstaller(cli: CAC) {
  return {
    name: "rootInstaller",
    setup: () => {
      cli
        .command("[root]", "启动 CodeGenius 命令行选项模式 ")
        .alias("start")
        .alias("dev")
        .action(async () => {
          await root();
        });
    },
  };
}
