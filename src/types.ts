import type { CAC } from "cac";

export type ColorFunc = (str: string | number) => string;
export interface CommandSet {
  [key: string]: (cli: CAC) => void;
}

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyOptions {
  // TODO
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClearOptions {
  // TODO
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HooksOptions {
  // TODO
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DepcheckOptions {
  // TODO
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegistryOptions {
  // TODO
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GituserOptions {
  // TODO
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TemplateOptions {
  // TODO
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FixOptions {
  // TODO
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FormatOptions {
  // TODO
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ImpsortOptions {
  // TODO
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ScriptOptions {
  // TODO
}

export interface CodeGeniusOptions {
  plugins?: Array<
    (cli: CAC) => {
      name: string;
      setup: () => void;
    }
  >;
  commands?: {
    commit?: CommitOptions;
    verify?: VerifyOptions;
    clear?: ClearOptions;
    hooks?: HooksOptions;
    depcheck?: DepcheckOptions;
    registry?: RegistryOptions;
    gituser?: GituserOptions;
    template?: TemplateOptions;
    fix?: FixOptions;
    format?: FormatOptions;
    impsort?: ImpsortOptions;
    script?: ScriptOptions;
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
