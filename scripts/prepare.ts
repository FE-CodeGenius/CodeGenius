import { gitInitSimpleHooks } from "@/command/git-init-hooks";
import { loggerWarring } from "@/shared";

async function prepare() {
  try {
    await gitInitSimpleHooks(process.cwd());
  } catch (error) {
    loggerWarring(error);
  }
}

prepare();
