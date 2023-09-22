import { execCommand, loggerInfo } from "@/shared/index";
import { ACTIVATION, eslintGlob } from "@/shared/config";
import { action, args, command } from "@/shared/reflect";
import { BaseCommand } from "@/shared/types";

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

@command("fix", "运行 eslint 静态扫描和修复代码中存在的问题")
export class EslintFixCommand extends BaseCommand {
  @args({
    rawName: "-p, --pattern <pattern>",
    description: "设置匹配规则设置匹配规则",
    default: [...eslintGlob],
  })
  pattern: string | undefined;

  @action
  protected async action(options: { pattern: string }): Promise<void> {
    const patterns =
      typeof options.pattern === "string" ? [options.pattern] : options.pattern;
    await eslintFix(patterns);
  }
}
