import { loggerWarring } from "@/shared/index";
import { npmDepCheck } from "@/command/npm-dep-check";

async function cmv() {
  try {
    await npmDepCheck();
  } catch (error) {
    loggerWarring(error);
  }
}

cmv();
