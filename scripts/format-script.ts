import { loggerWarring } from "../src/shared";
import { prettierFormatOptions } from "../src/shared/config";
import { prettierFormat } from "../src/command/prettier-format";

async function format() {
  try {
    await Promise.all([prettierFormat(process.cwd(), prettierFormatOptions)]);
  } catch (error) {
    loggerWarring(error);
  }
}

format();
