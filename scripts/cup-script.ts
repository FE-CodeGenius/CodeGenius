import { cleanUpDirs } from "../src/shared/config";
import { cleanUp } from "./../src/command/cheanup";

async function cmv() {
  try {
    await Promise.all([cleanUp(cleanUpDirs)]);
  } catch (error) {
    console.warn(error);
  }
}

cmv();
