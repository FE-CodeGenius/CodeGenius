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

export interface GitCommitOptions {
  emoji: boolean;
  type: string;
  scope: string;
  description: string;
}

export type CommandOptions = {
  display: string;
  command: string;
  description: string;
};

export interface CommandsOptions {
  commit?: CommitOptions;
  fix?: { paths: string[] };
}

export interface CodeGeniusOptions {
  commands?: CommandsOptions;
  plugins?: Plugins;
}

export type BuiltInPlugin = (options?: CommandsOptions) => {
  name: string;
  describe?: string;
  command?: string;
  setup: (cli: CAC) => void;
};

export type BuiltInPlugins = Array<BuiltInPlugin>;

export type Plugins = Array<{
  name: string;
  describe?: string;
  command?: string;
  setup: (cli: CAC) => void;
}>;
