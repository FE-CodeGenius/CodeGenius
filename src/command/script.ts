import path from "node:path";

import type { CAC } from "cac";
import enquirer from "enquirer";
import fsExtra from "fs-extra";

import { generateScripts } from "@/helper";
import { execCommand } from "@/helper";
import { CommandOptions } from "@/types";

export async function scriptRun() {
  const { scripts } = fsExtra.readJsonSync(
    path.join(process.cwd(), "scripts.config.json"),
  );

  const scriptChoices = scripts.map((script: CommandOptions) => {
    const formatCmd = `${script.cmd}`.padEnd(15);
    return {
      name: script.script,
      message: `${formatCmd} ${script.desc}`,
    };
  });

  const result = await enquirer.prompt<{ script: string }>([
    {
      name: "script",
      type: "select",
      message: "请选择项目运行脚本",
      choices: scriptChoices,
    },
  ]);

  if (result.script) {
    const scripts = result.script.split("&&").map((v) => v.trim());
    for (const script of scripts) {
      if (script.startsWith("npx")) {
        const cmd = script.split(" ")[0];
        const args = script.split(" ").slice(1);
        await execCommand(cmd, args, { stdio: "inherit" });
      } else {
        await execCommand("npx", script.split(" "), { stdio: "inherit" });
      }
    }
  }
}

export default function scriptRunInstaller(cli: CAC) {
  return {
    name: "scriptRunInstaller",
    setup: () => {
      cli
        .command("script", "代理运行 package.scripts 脚本")
        .action(async () => {
          await generateScripts();
          await scriptRun();
        });
    },
  };
}
