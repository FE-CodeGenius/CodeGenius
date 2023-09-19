import { execCommand, loggerInfo } from "@/shared/index";
import { ACTIVATION } from "@/shared/config";

export const eslintFix = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo("eslintFix 参数信息: \n");
    console.table(paths);
  }

  await execCommand(
    "npx",
    ["eslint", "--fix", "--fix-type", "problem,suggestion", ...paths],
    {
      stdio: "inherit",
    },
  );
};
