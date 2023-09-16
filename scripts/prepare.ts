import { gitInitSimpleHooks } from "../src/command/git-init-hooks";

async function prepare() {
  try {
    await Promise.all([gitInitSimpleHooks(process.cwd())]);
  } catch (error) {
    console.warn(error);
  }
}

prepare();
