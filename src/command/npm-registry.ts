import type { CAC } from "cac";

import enquirer from "enquirer";

import { printInfo, printWarring, execCommand } from "@/shared/index";
import { npmRegisters } from "@/shared/config";

interface PromptResult {
  registry: string;
}

const printCurrentRegistry = async (isBefore: boolean = true) => {
  printInfo(`${isBefore ? "当前" : "最新"} NPM 镜像地址（全局）：`);
  await execCommand("npm", ["config", "get", "registry", "-g"], {
    stdio: "inherit",
  });
  printInfo(`${isBefore ? "当前" : "最新"} NPM 镜像地址（非全局）：`);
  await execCommand("npm", ["config", "get", "registry"], {
    stdio: "inherit",
  });
  printWarring("PS: 非全局查询结果受`.npmrc`影响会不准确。");
};

export const npmRegistry = async () => {
  await printCurrentRegistry();

  const registersChoices = npmRegisters.map(({ key, value }) => {
    const formatKey = `${key}:`.padEnd(15);
    return {
      name: value,
      message: `${formatKey}${value}`,
    };
  });

  const result = await enquirer.prompt<PromptResult>([
    {
      name: "registry",
      type: "select",
      message: "请选择新 NPM 镜像",
      choices: registersChoices,
    },
  ]);
  await execCommand("npm", ["config", "set", "registry", result.registry], {
    stdio: "inherit",
  });

  await printCurrentRegistry();
};

export default function npmRegistryInstaller(cli: CAC) {
  return {
    name: "npmRegistryInstaller",
    setup: () => {
      cli.command("registry", "切换 NPM 镜像地址").action(async () => {
        await npmRegistry();
      });
    },
  };
}
