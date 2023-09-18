import { loggerWarring } from "../src/shared/index";
import { npmDepCheck } from "../src/command/npm-dep-check";

async function cmv() {
  try {
    await npmDepCheck();
  } catch (error) {
    loggerWarring(error);
  }
}

cmv();
