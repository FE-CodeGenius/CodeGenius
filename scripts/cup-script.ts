import { loggerWarring } from "../src/shared";
import { clear } from "./../src/command/clear";

async function clearDist() {
  try {
    await clear(["./dist"]);
  } catch (error) {
    loggerWarring(error);
  }
}

clearDist();
