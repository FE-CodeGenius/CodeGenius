import fs from "fs-extra";

import { execCommand, loggerInfo } from "@/shared/index";
import { ACTIVATION } from "@/shared/config";
import { action, args, command } from "@/shared/reflect";
import { BaseCommand } from "@/shared/types";

async function getReportfile(url: string) {
  const _url = new URL(url);
  const files = await fs.readdirSync(process.cwd());
  return files.filter(
    (f) => f.startsWith(_url.hostname) && f.endsWith("report.html"),
  );
}

export const lighthouse = async (url: string) => {
  if (ACTIVATION) {
    loggerInfo("lighthouse 参数信息: \n");
    console.table(url);
  }

  const histories = await getReportfile(url);
  for (const history of histories) {
    await fs.removeSync(history);
  }

  await execCommand(
    "npx",
    [
      "lighthouse",
      url,
      "--output=html",
      `--output-path=./${new URL(url).hostname}-report.html`,
      "--view",
    ],
    {
      stdio: "inherit",
    },
  );
};

@command("lighthouse", "运行 lighthouse 分析及收集 Web 应用的性能指标")
export class LighthouseCommand extends BaseCommand {
  @args({
    rawName: "--url <url>",
    description: "Web 应用地址",
    default: "",
  })
  url: string | undefined;

  @action
  protected async action(options: { url: string }): Promise<void> {
    if (options.url) {
      await lighthouse(options.url);
    }
  }
}
