import { gitInitSimpleHooks } from "@/command/git-init-hooks";

async function prepare() {
  gitInitSimpleHooks();
}

prepare();
