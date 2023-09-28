import { gitCommit } from "../dist/index.mjs";

(async () => {
  await gitCommit("fix", "feat", "修复xx功能的xxBug");
})();
