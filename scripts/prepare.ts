import { gitInitSimpleHooks } from "../src/command/git-init-hooks";
import { loggerWarring } from "../src/shared";

async function prepare() {
  try {
    await gitInitSimpleHooks(process.cwd());
  } catch (error) {
    loggerWarring(error);
  }
}

prepare();
