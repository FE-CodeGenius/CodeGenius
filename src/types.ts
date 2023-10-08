import type { CAC } from "cac";

export interface CommitType {
  emoji: string;
  code: string;
  description: string;
}

export interface CommitScope {
  name: string;
  description: string;
}

export interface CommitOptions {
  gitCommitTypes?: Array<CommitType>;
  gitCommitScopes?: Array<CommitScope>;
}

export interface CodeGeniusOptions {
  commands?: {
    commit?: CommitOptions;
    fix?: { paths: string[] };
  };
  plugins?: Plugins;
}

export type BuiltInPlugins = Array<
  (
    cli: CAC,
    config: CodeGeniusOptions | undefined,
  ) => {
    name: string;
    setup: () => void;
  }
>;

export type Plugins = Array<{ name: string; setup: (cli: CAC) => void }>;

export interface GitCommitOptions {
  emoji: boolean;
  type: string;
  scope: string;
  description: string;
}

export type CommandOptions = {
  cmd: string;
  script: string;
  desc: string;
};
