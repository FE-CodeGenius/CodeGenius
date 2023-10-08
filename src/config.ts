import { blue, green, yellow } from "kolorist";

import {
  CommitScope,
  CommitType,
  Framework,
  GitUserOptions,
  KeyValue,
  ProjectSource,
} from "@/types";

export const clearGlob = ["./dist", "./node_modules"];

export const impSortGlob = ["./src"];

export const formatGlob = ["./src"];

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

export const npmRegisters: Array<KeyValue> = [
  {
    key: "npm",
    value: "https://registry.npmjs.org/",
  },
  {
    key: "yarn",
    value: "https://registry.yarnpkg.com/",
  },
  {
    key: "tencent",
    value: "https://mirrors.cloud.tencent.com/npm/",
  },
  {
    key: "cnpm",
    value: "https://r.cnpmjs.org/",
  },
  {
    key: "taobao",
    value: "https://registry.npmmirror.com/",
  },
  {
    key: "npmMirror",
    value: "https://skimdb.npmjs.com/registry/",
  },
];

export const projectSources: Array<ProjectSource> = [
  {
    name: "npx code-genius template",
    display: "code-genius",
    description: "创建由 CodeGenius 内置的新的项目",
  },
  {
    name: "npm create vite@latest",
    display: "vite@latest",
    description: "创建由 Vite 驱动的新的项目",
  },
  {
    name: "npm create vue@latest",
    display: "vue@latest",
    description: "创建由 Vite 驱动的 Vue3 项目",
  },
  {
    name: "npm create vue@legacy",
    display: "vue@legacy",
    description: "创建由 Vite 驱动的 Vue2 项目(支持 IE11)",
  },
];

export const FRAMEWORKS: Framework[] = [
  {
    name: "vue",
    display: "Vue",
    color: green,
    variants: [
      {
        framework: "vue",
        name: "vue",
        display: "JavaScript",
        color: yellow,
      },
      {
        framework: "vue",
        name: "vue-ts",
        display: "TypeScript",
        color: blue,
      },
      {
        framework: "vue",
        name: "vue-ts-codeg",
        display: "TypeScriptForCodeG",
        color: yellow,
      },
    ],
  },
];

export const TEMPLATES = FRAMEWORKS.map(
  (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name],
).reduce((a, b) => a.concat(b), []);

export const fileIgnore = ["package.json", "_gitignore"];

export const gitUserOptions: GitUserOptions = {
  name: "",
  email: "",
  ruleName: "[\\s\\S]*",
  ruleEmail:
    "^[a-zA-Z0-9._%+-]+@(163|qq|126|139|sina|sohu|yeah|gmail)\\.(com|net)$",
};

export const commands = [
  {
    command: "commit --ask",
    description: "生成 angualr 规范的提交信息",
  },
  {
    command: "verify",
    description: "校验 COMMIT_EDITMSG 中的信息是否符合 Angualr 规范",
  },
  {
    command: "fix",
    description: "运行 eslint 静态扫描和修复代码中存在的问题",
  },
  {
    command: "impsort --ask",
    description: "运行 eslint 对模块导入进行分组&按字母排序",
  },
  {
    command: "format",
    description: "运行 prettier 格式化代码风格",
  },
  {
    command: "template",
    description: "运行 cg 生成 CodeGenius 内置模板项目",
  },
  {
    command: "script",
    description: "代理执行 package.scripts 脚本",
  },
  {
    display: "help",
    command: "--help",
    description: "查看 CodeGenius 终端命令",
  },
  {
    display: "version",
    command: "--version",
    description: "查看 CodeGenius 版本信息",
  },
];

export const DEFAULT_CONFIG_FILES = ["codeg.config.js", "codeg.config.mjs"];
