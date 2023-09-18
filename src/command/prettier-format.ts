import { execCommand, loggerInfo } from "./../shared/index";
import { ACTIVATION } from "../shared/config";

export const prettierFormat = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo("prettierFormat 参数信息: \n");
    console.table(paths);
  }

  await execCommand("npx", ["prettier", "--write", ...paths], {
    stdio: "inherit",
  });
};
