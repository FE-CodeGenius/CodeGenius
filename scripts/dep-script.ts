import { npmDepCheck } from "@codegenius/depcheck-plugin";

async function cmv() {
  await npmDepCheck();
}

cmv();
