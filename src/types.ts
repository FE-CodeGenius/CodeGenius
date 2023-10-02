import type { CAC } from "cac";

export type ColorFunc = (str: string | number) => string;

export interface CommitType {
  emoji: string;
  code: string;
  description: string;
}

export interface CommitScope {
  name: string;
  description: string;
}

export interface KeyValue {
  key: string;
  value: string;
}

export interface ProjectSource {
  name: string;
  display: string;
  description: string;
}

export interface TemplateOptions {
  projectName: string;
  framework: string;
}

export interface FrameworkVariant {
  framework: string;
  name: string;
  display: string;
  color: ColorFunc;
  customCommand?: string;
}

export interface Framework {
  name: string;
  display: string;
  color: ColorFunc;
  variants: FrameworkVariant[];
}

export interface GitUserOptions {
  name?: string;
  email?: string;
  ruleName?: string;
  ruleEmail?: string;
}

export interface CommitOptions {
  gitCommitTypes?: Array<CommitType>;
  gitCommitScopes?: Array<CommitScope>;
}

export type Plugins = Array<
  (
    cli: CAC,
    config: CodeGeniusOptions | undefined,
  ) => {
    name: string;
    setup: () => void;
  }
>;

export interface CodeGeniusOptions {
  commands?: {
    commit?: CommitOptions;
    clear?: ClearOptions;
    gituser?: Pick<GitUserOptions, "ruleName" | "ruleEmail">;
    fix?: { paths: string[] };
    format?: { paths: string[] };
    impsort?: { paths: string[] };
  };
}

export interface GitCommitOptions {
  emoji: boolean;
  type: string;
  scope: string;
  description: string;
}

export interface ClearOptions {
  files: Array<string>;
}

export interface ImpSortOptions {
  files: Array<string>;
}

export interface RegistryOptions {
  url: string;
}

export type CommandOptions = {
  /**
   * 指令
   */
  cmd: string;
  /**
   * 要执行的脚本
   */
  script: string;

  /**
   * 描述
   */
  desc: string;
};
