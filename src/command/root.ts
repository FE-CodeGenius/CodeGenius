import type { CAC } from "cac";
import enquirer from "enquirer";
import updateNotifier from "simple-update-notifier";

import { commands } from "@/config";
import { execCommand } from "@/helper";

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
      message: "请选择待执行的 CodeG 命令",
      choices: commandChoices,
    },
  ]);
  await execCommand("codeg", [result.command, "--ask"], { stdio: "inherit" });
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
