import { execCommand, loggerInfo } from "@/shared/index";
import { ACTIVATION, clearGlob } from "@/shared/config";
import { action, args, command } from "@/shared/reflect";
import { BaseCommand } from "@/shared/types";

export const clear = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo("clear 参数信息: \n");
    console.table(paths);
  }
  await execCommand("npx", ["rimraf", "--glob", ...paths], {
    stdio: "inherit",
  });
};

@command("clear", "运行 rimraf 删除不再需要的文件或文件夹")
export class ClearCommand extends BaseCommand {
  @args({
    rawName: "-p, --pattern <pattern>",
    description: "设置配置规则",
    default: [...clearGlob],
  })
  path: string | undefined;

  @action
  protected async action(options: { pattern: string }): Promise<void> {
    const patterns =
      typeof options.pattern === "string" ? [options.pattern] : options.pattern;
    await clear(patterns);
  }
}
