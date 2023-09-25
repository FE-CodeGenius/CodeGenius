import { loggerWarring } from "@/helper";
import { clear } from "@/command/clear";

async function clearDist() {
  try {
    await clear(["./dist"]);
  } catch (error) {
    loggerWarring(error);
  }
}

clearDist();
