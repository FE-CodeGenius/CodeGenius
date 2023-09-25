import { gitCommit } from "../src/index";

(async () => {
  await gitCommit("fix(feat): 修复xx功能的xxBug");
})();
