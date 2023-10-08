import { gitInitSimpleHooks } from "@codegenius/hooks-plugin";

async function prepare() {
  gitInitSimpleHooks();
}

prepare();
