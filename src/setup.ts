import { prettierFormat } from "./command/prettier-format";
import { eslintFix } from "./command/eslint-fix";
import type { CAC } from "cac";

import {
  clearGlob,
  eslintGlob,
  formatGlob,
  gitCommitScopes,
  gitCommitTypes,
} from "./shared/config";

import { CommandSet } from "./shared/types";

import { gitCommitVerify } from "./command/git-commit-verify";
import { gitCommit } from "./command/git-commit";
import { gitInitSimpleHooks } from "./command/git-init-hooks";
import { clear } from "./command/clear";
import { npmRun } from "./command/npm-run";
import { npmDepCheck } from "./command/npm-dep-check";
import { npmRegistry } from "./command/npm-registry";

export const commandSet: CommandSet = {
  gitCommitCmd: (cli: CAC) => {
    cli
      .command("commit", "生成 angualr 规范的提交信息")
      .option("--no-emoji", "禁用 emoji")
      .action(async (options) => {
        const { emoji } = options;
        await gitCommit(gitCommitTypes, gitCommitScopes, {
          emoji,
        });
      });
  },
  gitCommitVerifyCmd: (cli: CAC) => {
    cli
      .command("verify", "校验 COMMIT_EDITMSG 中的信息是否符合 Angualr 规范")
      .action(async () => {
        await gitCommitVerify();
      });
  },
  clearCmd: (cli: CAC) => {
    cli
      .command("clear", "运行 rimraf 删除不再需要的文件或文件夹")
      .option("-p, --pattern <pattern>", "设置配置规则", {
        default: [...clearGlob],
      })
      .action(async (options) => {
        const patterns =
          typeof options.pattern === "string"
            ? [options.pattern]
            : options.pattern;
        await clear(patterns);
      });
  },
  initSimpleGitHooksCmd: (cli: CAC) => {
    cli
      .command("hooks", "新增或修改 simple-git-hooks 配置后需要重新初始化")
      .action(async () => {
        await gitInitSimpleHooks();
      });
  },
  npmDepCheck: (cli: CAC) => {
    cli
      .command(
        "depcheck",
        "运行 npm-check 检查过时的、不正确的和未使用的依赖项"
      )
      .action(async () => {
        await npmDepCheck();
      });
  },
  npmRunCmd: (cli: CAC) => {
    cli.command("run", "列出可以运行的全部脚本").action(async () => {
      await npmRun();
    });
  },
  npmRegistryCmd: (cli: CAC) => {
    cli.command("registry", "切换 NPM 镜像地址").action(async () => {
      await npmRegistry();
    });
  },
  eslintFixCmd: (cli: CAC) => {
    cli
      .command("fix", "运行 eslint 静态扫描和修复代码中存在的问题")
      .option("-p, --pattern <pattern>", "设置匹配规则", {
        default: [...eslintGlob],
      })
      .action(async (options) => {
        const patterns =
          typeof options.pattern === "string"
            ? [options.pattern]
            : options.pattern;
        await eslintFix(patterns);
      });
  },
  prettierFormatCmd: (cli: CAC) => {
    cli
      .command("format", "运行 prettier 格式化代码风格")
      .option("-p, --pattern <pattern>", "设置匹配规则", {
        default: [...formatGlob],
      })
      .action(async (options) => {
        const patterns =
          typeof options.pattern === "string"
            ? [options.pattern]
            : options.pattern;
        await prettierFormat(patterns);
      });
  },
};
