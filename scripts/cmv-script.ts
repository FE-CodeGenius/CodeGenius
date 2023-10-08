import { gitCommitVerify } from "@codegenius/verify-plugin";

async function cmv() {
  await gitCommitVerify();
}

cmv();
