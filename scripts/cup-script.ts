import { cleanUpDirs } from "../src/shared/config";
import { cleanUp } from "./../src/command/cheanup";

async function cmv() {
  await Promise.all([cleanUp(cleanUpDirs)]);
}

cmv();
