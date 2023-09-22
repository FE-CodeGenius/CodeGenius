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

async function printCurrentGitUser() {
  const name = await execCommand("git", ["config", "user.name"]);
  const email = await execCommand("git", ["config", "user.email"]);
  printInfo(`\ngit config info:\n user.name: ${name}\n user.email: ${email}`);
}

export const gitUser = async (options: GitUserOptions) => {
  if (ACTIVATION) {
    loggerInfo("gitUser 参数信息: \n");
    console.table(options);
  }

  const { name, email, ruleName, ruleEmail } = options;
  const nameRegExp = new RegExp(ruleName!);
  const emailRegExp = new RegExp(ruleEmail!, "i");

  await printCurrentGitUser();

  if (name) {
    if (!nameRegExp.test(name)) {
      printWarring(`设置失败(user.name), ${name} 不符合规范`);
    } else {
      await execCommand("git", ["config", "user.name", name], {
        stdio: "inherit",
      });
      const result = await execCommand("git", ["config", "user.name"]);
      printInfo(`更新成功(user.name): ${result}`);
    }
  }

  if (email) {
    if (!emailRegExp.test(email)) {
      printWarring(`设置失败(user.email), ${email} 不符合规范`);
    } else {
      await execCommand("git", ["config", "user.email", email], {
        stdio: "inherit",
      });
      const result = await execCommand("git", ["config", "user.email"]);
      printInfo(`更新成功(user.email): ${result}`);
    }
  }

  if (!name && !email) {
    const username = await execCommand("git", ["config", "user.name"]);
    if (!nameRegExp.test(username)) {
      printError(`${username} 不符合 ${ruleName} 规范`);
      process.exit(1);
    }
    const useremail = await execCommand("git", ["config", "user.email"]);
    if (!emailRegExp.test(useremail)) {
      printError(`${useremail} 不符合 ${ruleEmail} 规范`);
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
        .option("--rule-name <regexp>", "设置 user.name 匹配规则(转义字符串)", {
          default: gitUserOptions.ruleName,
        })
        .option(
          "--rule-email <regexp>",
          "设置 user.email 匹配规则(转义字符串)",
          {
            default: gitUserOptions.ruleEmail,
          },
        )
        .action(async (options) => await gitUser(options));
    },
  };
}
