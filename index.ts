import { command, args, action, metadata } from "./src/decorator/index";

@command("quantity", "运行 cloc 分析并统计代码量")
export class QuantityCommand {
  @args({
    rawName: "-p, --path <path>",
    description: " 设置识别路径",
  })
  path: string = "";

  @args({
    rawName: "-i, --ignore <path>",
    description: "设置忽略路径",
  })
  ignore: string = "";

  @action
  async action() {}
}

@command("clear", " 清理无效文件")
export class ClaerCommand {
  @args({
    rawName: "-p, --path <path>",
    description: " 设置识别路径",
  })
  path: string = "";

  @action
  async action() {}
}

console.log(Reflect.getMetadata("QuantityCommand", metadata));
console.log(Reflect.getMetadata("ClaerCommand", metadata));