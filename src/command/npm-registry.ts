import Ajv from "ajv";
import type { CAC } from "cac";
import enquirer from "enquirer";

import { ACTIVATION, npmRegisters } from "@/config";
import { execCommand, loggerInfo, printInfo, printWarring } from "@/helper";
import { RegistryOptions } from "@/types";

const schema = {
  type: "object",
  properties: {
    registry: { type: "string" },
  },
  required: ["registry"],
};

const printCurrentRegistry = async (isBefore = true) => {
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

const generateEnquirer = async (): Promise<RegistryOptions> => {
  await printCurrentRegistry();

  const registersChoices = npmRegisters.map(({ key, value }) => {
    const formatKey = `${key}:`.padEnd(15);
    return {
      name: value,
      message: `${formatKey}${value}`,
    };
  });

  const result = await enquirer.prompt<RegistryOptions>([
    {
      name: "url",
      type: "select",
      message: "请选择 NPM 镜像",
      choices: registersChoices,
    },
  ]);

  return {
    url: result.url,
  };
};

export const npmRegistry = async (registry: string) => {
  if (ACTIVATION) {
    loggerInfo(`npmRegistry 参数信息: \n ${JSON.stringify(registry)}`);
  }

  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate({
    registry,
  });
  if (!valid && validate.errors && validate.errors?.length > 0) {
    throw new Error(validate.errors[0].message);
  }

  await execCommand("npm", ["config", "set", "registry", registry], {
    stdio: "inherit",
  });
  await printCurrentRegistry();
};

export default function npmRegistryInstaller(cli: CAC) {
  return {
    name: "npmRegistryInstaller",
    setup: () => {
      cli
        .command("registry", "切换 NPM 镜像地址")
        .option("-u, --url <url>", "镜像地址")
        .option("-a, --ask", "启用询问模式")
        .action(async (options) => {
          const { url, ask } = options;
          let registryUrl = "";
          if (ask) {
            const result = await generateEnquirer();
            registryUrl = result.url;
          } else {
            registryUrl = url;
          }
          await npmRegistry(registryUrl);
        });
    },
  };
}
