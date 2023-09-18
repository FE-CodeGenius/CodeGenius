import { printInfo, printWarring } from "./../shared/index";
import enquirer from "enquirer";
import { execCommand } from "../shared";
import { npmRegisters } from "../shared/config";

interface PromptResult {
  registry: string;
}

export const npmRegistry = async () => {
  printInfo("当前 NPM 镜像地址（全局）：");
  await execCommand("npm", ["config", "get", "registry", "-g"], {
    stdio: "inherit",
  });
  printInfo("当前 NPM 镜像地址（非全局）");
  await execCommand("npm", ["config", "get", "registry"], {
    stdio: "inherit",
  });
  printWarring("PS: 非全局查询结果受`.npmrc`影响会不准确。");

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

  printInfo("最新 NPM 镜像地址（全局）：");
  await execCommand("npm", ["config", "get", "registry", "-g"], {
    stdio: "inherit",
  });
  printInfo("最新 NPM 镜像地址（非全局）");
  await execCommand("npm", ["config", "get", "registry"], {
    stdio: "inherit",
  });
  printWarring("PS: 非全局查询结果受`.npmrc`影响会不准确。");
};
