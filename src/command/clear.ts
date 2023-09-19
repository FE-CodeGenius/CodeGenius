import { execCommand, loggerInfo } from "@/shared/index";
import { ACTIVATION } from "@/shared/config";

export const clear = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo("clear 参数信息: \n");
    console.table(paths);
  }
  await execCommand("npx", ["rimraf", "--glob", ...paths], {
    stdio: "inherit",
  });
};
