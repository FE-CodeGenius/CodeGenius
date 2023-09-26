import { clear } from "@/command/clear";
import { loggerWarring } from "@/helper";

async function clearDist() {
  try {
    await clear(["./dist"]);
  } catch (error) {
    loggerWarring(error);
  }
}

clearDist();
