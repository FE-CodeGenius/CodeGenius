import { execCommand } from "@/shared/index";
import { action, command } from "@/shared/reflect";
import { BaseCommand } from "@/shared/types";

export const npmDepCheck = async () => {
  await execCommand("npx", ["npm-check"], {
    stdio: "inherit",
  });
};

@command("depcheck", "运行 npm-check 检查过时的、不正确的和未使用的依赖项")
export class NpmDepCheckCommand extends BaseCommand {
  @action
  protected async action(): Promise<void> {
    await npmDepCheck();
  }
}
