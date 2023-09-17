import { execa } from "execa";
import type { Options } from "execa";
import { consola } from "consola";
import process from "node:process";
import { green, lightYellow, lightGreen, lightRed } from "kolorist";
import { ACTIVATION } from "./config";

export const execCommand = async (
  cmd: string,
  args: string[],
  options?: Options
) => {
  try {
    const res = await execa(cmd, args, options);
    return res?.stdout?.trim() || "";
  } catch (error) {
    if (error instanceof Error) {
      consola.error(error.message);
    } else {
      consola.error(error);
    }
  }
};

export class PrettyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    if (typeof Error.captureStackTrace === "function")
      Error.captureStackTrace(this, this.constructor);
    else this.stack = new Error(message).stack;
  }
}

export function handleError(error: unknown) {
  if (error instanceof PrettyError) consola.error(error.message);

  process.exitCode = 1;
}

export const loggerInfo = (content: string) => {
  if (ACTIVATION) {
    console.log(green(`[INFO]： ${content}`));
  }
};

export const loggerWarring = (content: string) => {
  if (ACTIVATION) {
    console.log(lightYellow(`[WARRING]： ${content}`));
  }
};

export const loggerSuccess = (content: string) => {
  console.log(lightGreen(`[SUCCESS]： ${content}`));
};

export const loggerError = (content: string | unknown) => {
  console.log(lightRed(`[ERROR]： ${content}`));
};
