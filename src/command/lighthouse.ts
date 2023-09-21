import type { CAC } from "cac";

import fs from "fs-extra";

import { execCommand, loggerInfo } from "@/shared/index";
import { ACTIVATION } from "@/shared/config";

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

export default function lighthouseInstaller(cli: CAC) {
  return {
    name: "lighthouseInstaller",
    setup: () => {
      cli
        .command("lighthouse", "运行 lighthouse 分析及收集 Web 应用的性能指标")
        .option("--url <url>", "Web 应用地址")
        .action(async (options) => {
          if (options.url) {
            await lighthouse(options.url);
          }
        });
    },
  };
}
