import type { CAC } from "cac";

export interface SetupSet {
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

export interface EsLintOptions {
  eslintrc: string;
  paths: string[];
  staged: boolean;
}
