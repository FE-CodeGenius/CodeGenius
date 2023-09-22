import { execCommand } from "@/shared/index";
import path from "node:path";
import { BaseCommand } from "@/shared/types";
import { action, args, command } from "@/shared/reflect";

@command("quantity", "运行 cloc 分析并统计代码量")
export class QuantityCommand extends BaseCommand {
  @args({
    rawName: "-p, --path <path>",
    description: "设置代码路径",
    default: ".",
  })
  path: string | undefined;

  @action
  protected async action(options: { path: string }): Promise<void> {
    const { path: dir } = options;
    const root = path.join(process.cwd(), dir);
    await execCommand("npx", ["cloc", root], {
      stdio: "inherit",
    });
  }
}
