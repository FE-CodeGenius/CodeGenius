import { CommitScope, CommitType } from "@/types";

export const eslintGlob = ["./src"];

export const ACTIVATION = process.env.CG_DEBUG === "activation";

export const gitCommitTypes: Array<CommitType> = [
  {
    emoji: "🎉",
    code: "feat",
    description: "增加新功能/特性",
  },
  {
    emoji: "🐛",
    code: "fix",
    description: "修复bug",
  },
  {
    emoji: "📚",
    code: "docs",
    description: "更新文档",
  },
  {
    emoji: "🚀",
    code: "perf",
    description: "性能优化",
  },
  {
    emoji: "✨",
    code: "refactor",
    description: "重构代码",
  },
  {
    emoji: "🎨",
    code: "style",
    description: "调整代码格式/样式",
  },
  {
    emoji: "🚧",
    code: "build",
    description: "构建相关的修改",
  },
  {
    emoji: "🔧",
    code: "chore",
    description: "杂项/琐碎任务的修改",
  },
  {
    emoji: "💅",
    code: "ci",
    description: "持续集成相关的修改",
  },
  {
    emoji: "✅",
    code: "test",
    description: "添加/修改测试",
  },
];

export const gitCommitScopes: Array<CommitScope> = [
  {
    name: "app",
    description: "应用整体",
  },
  {
    name: "core",
    description: "核心模块",
  },
  {
    name: "feature",
    description: "具体功能模块",
  },
  {
    name: "docs",
    description: "文档",
  },
  {
    name: "test",
    description: "测试相关",
  },
  {
    name: "config",
    description: "配置文件",
  },
  {
    name: "build",
    description: "构建过程",
  },
  {
    name: "ui",
    description: "用户界面",
  },
];

export const defaultCommands = [
  {
    display: "version",
    command: "--version",
    description: "查看版本号",
  },
  {
    display: "help",
    command: "--help",
    description: "查看帮助信息",
  },
];

export const DEFAULT_CONFIG_FILES = ["codeg.config.js", "codeg.config.mjs"];
