import type { CAC } from "cac";

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
