import { gitInitSimpleHooks } from "../src/command/git-init-hooks";
async function prepare() {
  await Promise.all([gitInitSimpleHooks(process.cwd())]);
}

prepare();
