import { execa } from "execa";
import type { Options } from "execa";
import { consola } from "consola";
import process from "node:process";

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
