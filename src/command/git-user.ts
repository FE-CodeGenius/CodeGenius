import type { CAC } from "cac";

import {
  execCommand,
  loggerInfo,
  printError,
  printInfo,
  printWarring,
} from "@/helper";
import { ACTIVATION, gitUserOptions } from "@/config";

export async function setGitUserName(name: string, ruleName: string) {
  if (ACTIVATION) {
    loggerInfo(
      `setGitUserName 参数信息: \n ${JSON.stringify({
        name,
        ruleName,
      })}`,
    );
  }
  const nameRegExp = new RegExp(ruleName!);
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

export async function setGitUserEmail(email: string, ruleEmail: string) {
  if (ACTIVATION) {
    loggerInfo(
      `setGitUserEmail 参数信息: \n ${JSON.stringify({
        email,
        ruleEmail,
      })}`,
    );
  }
  const emailRegExp = new RegExp(ruleEmail!, "i");
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

export async function checkGitUserInfo(ruleName: string, ruleEmail: string) {
  if (ACTIVATION) {
    loggerInfo(
      `checkGitUserInfo 参数信息: \n ${JSON.stringify({
        ruleName,
        ruleEmail,
      })}`,
    );
  }
  const nameRegExp = new RegExp(ruleName!);
  const emailRegExp = new RegExp(ruleEmail!, "i");
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

export default function gitUserInstaller(cli: CAC) {
  return {
    name: "gitUserInstaller",
    setup: () => {
      cli
        .command("gituser", "设置或校验 git user 信息是否规范")
        .alias("git-user")
        .alias("gitu")
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
        .action(async (options) => {
          console.log(options);
          const { name, email, ruleName, ruleEmail } = options;
          if (!name && !email) {
            await checkGitUserInfo(ruleName, ruleEmail);
          }
          if (name) {
            await setGitUserName(name, ruleName);
          }
          if (email) {
            await setGitUserName(email, ruleEmail);
          }
        });
    },
  };
}
