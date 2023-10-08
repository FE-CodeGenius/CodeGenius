import { clear } from "@codegenius/clear-plugin";

import { loggerWarring } from "@/helper";

async function clearDist() {
  try {
    await clear(["./dist"]);
  } catch (error) {
    loggerWarring(error);
  }
}

clearDist();
