import type { CAC } from "cac";

import {
  execCommand,
  loggerInfo,
  printError,
  printInfo,
  printWarring,
} from "@/shared/index";
import { ACTIVATION, gitUserOptions } from "@/shared/config";
import { GitUserOptions } from "..";

async function printCurrentGitUser(isBefore: boolean = true) {
  printInfo(`${isBefore ? "当前" : "最新"}使用的 Git UserName :`);
  await execCommand("git", ["config", "user.name"], {
    stdio: "inherit",
  });
  printInfo(`${isBefore ? "当前" : "最新"}使用的 Git UserEmail :`);
  await execCommand("git", ["config", "user.email"], {
    stdio: "inherit",
  });
}

export const gitUser = async (options: GitUserOptions) => {
  if (ACTIVATION) {
    loggerInfo("gitUser 参数信息: \n");
    console.table(options);
  }

  const { name, email, ruleName, ruleEmail } = options;
  const nameRegExp = new RegExp(ruleName!);
  const emailRegExp = new RegExp(ruleEmail!, "i");

  await printCurrentGitUser(true);

  if (name) {
    if (!nameRegExp.test(name)) {
      printWarring(`因输入的 ${name} 不符合 name 规则, 未能成功设置 name`);
    } else {
      await execCommand("git", ["config", "user.name", name], {
        stdio: "inherit",
      });
      printInfo(`最新使用的 Git UserName :`);
      await execCommand("git", ["config", "user.name"], {
        stdio: "inherit",
      });
    }
  }

  if (email) {
    if (!emailRegExp.test(email)) {
      printWarring(`因输入的 ${email} 不符合 email 规则, 未能成功设置 email`);
    } else {
      await execCommand("git", ["config", "user.email", email], {
        stdio: "inherit",
      });
      printInfo(`最新使用的 Git UserEmail :`);
      await execCommand("git", ["config", "user.email"], {
        stdio: "inherit",
      });
    }
  }

  if (!name && !email) {
    const username = await execCommand("git", ["config", "user.name"]);
    if (!nameRegExp.test(username)) {
      printError("Git 配置的 user.name 不符合规范, 请更换");
      process.exit(1);
    }

    const useremail = await execCommand("git", ["config", "user.email"]);
    if (!emailRegExp.test(useremail)) {
      printError("Git 配置的 user.email 不符合规范, 请更换");
      process.exit(1);
    }
  }
};

export default function gitUserInstaller(cli: CAC) {
  return {
    name: "gitUserInstaller",
    setup: () => {
      cli
        .command("git-user", "设置或校验 git user 信息是否规范")
        .option("-n, --name <name>", "设置 user.name")
        .option("-e, --email <email>", "设置 user.email")
        .option("--rule-name [regexp]", "设置 user.name 匹配规则(转义字符串)", {
          default: gitUserOptions.ruleName,
        })
        .option(
          "--rule-email [regexp]",
          "设置 user.email 匹配规则(转义字符串)",
          {
            default: gitUserOptions.ruleEmail,
          },
        )
        .action(async (options) => {
          console.log(options);
          await gitUser(options);
        });
    },
  };
}
