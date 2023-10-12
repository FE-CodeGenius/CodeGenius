import { describe, expect, it } from "vitest";
import { execCommand, loadConfigForUnConfig } from "@/helper";

describe("helper.ts", () => {
  it("loadConfigForUnConfig", async () => {
    const config = await loadConfigForUnConfig();
    expect(config).toMatchInlineSnapshot(`
      {
        "commands": {
          "fix": {
            "paths": [
              "./src",
              "./scripts",
            ],
          },
        },
        "plugins": [
          {
            "command": "clear",
            "describe": "运行 rimraf 删除不再需要的文件或文件夹",
            "name": "clear",
            "setup": [Function],
          },
          {
            "command": "quantity",
            "describe": "运行 cloc 分析并统计代码量",
            "name": "quantity",
            "setup": [Function],
          },
          {
            "command": "depcheck",
            "describe": "运行 depcheck 检查过时的、不正确的和未使用的依赖项",
            "name": "depcheck",
            "setup": [Function],
          },
          {
            "command": "lighthouse",
            "describe": "运行 lighthouse 分析及收集 Web 应用的性能指标",
            "name": "lighthouse",
            "setup": [Function],
          },
          {
            "command": "create",
            "describe": "运行 npm create 快速创建基础项目",
            "name": "create",
            "setup": [Function],
          },
          {
            "command": "hooks",
            "describe": "新增或修改 simple-git-hooks 配置后需要重新初始化",
            "name": "hooks",
            "setup": [Function],
          },
          {
            "command": "gituser",
            "describe": "设置或校验 git user 信息是否规范",
            "name": "gituser",
            "setup": [Function],
          },
          {
            "command": "registry",
            "describe": "切换 NPM 镜像地址",
            "name": "registry",
            "setup": [Function],
          },
          {
            "command": "verify",
            "describe": "校验 COMMIT_EDITMSG 中的信息是否符合 Angualr 规范",
            "name": "verify",
            "setup": [Function],
          },
          {
            "command": "template",
            "describe": "运行 cg 生成 CodeGenius 内置模板项目",
            "name": "template",
            "setup": [Function],
          },
          {
            "command": "format",
            "describe": "运行 prettier 格式化代码风格",
            "name": "format",
            "setup": [Function],
          },
          {
            "command": "impsort",
            "describe": "运行 eslint 对模块导入进行分组&按字母排序",
            "name": "impsort",
            "setup": [Function],
          },
        ],
      }
    `);
  });
  
  it("execCommand", async () => {
    const content = await execCommand("node", ["--version"]);
    expect(content).toMatchInlineSnapshot('"v16.17.0"');
  })
});
