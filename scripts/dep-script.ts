import { npmDepCheck } from "@/command/npm-dep-check";

async function cmv() {
  await npmDepCheck();
}

cmv();
