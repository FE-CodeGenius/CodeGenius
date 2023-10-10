# CodeGenius

旨在帮助开发者轻松管理优质代码的命令行开发包

## 大纲

https://pmm-rust.vercel.app/?username=OSpoon&resp=CodeGenius

## 安装

本地安装

```bash
npm i code-genius
```

全局安装

```bash
npm i -g code-genius
```

帮助信息

```bash
code-genius --help
```

## commit 命令

生成 **Angualr** 规范的提交信息, 支持命令模式, 询问模式和 **API** 模式;

使用场景: 用于没有安装其他插件且对 **Angualr** 规范不熟悉的情况下生成提交信息.

### 命令模式

```bash
codeg commit -t fix -s feat -d 修复xx功能的xxBug
```

| 选项                              | 描述         |
| --------------------------------- | ------------ |
| -t, --type \<type\>               | 添加修改类型 |
| -s, --scope \<scope\>             | 填写修改范围 |
| -d, --description \<description\> | 填写修改描述 |
| -a, --ask                         | 启用询问模式 |

### 询问模式

```bash
# 启动询问模式
codeg commit --ask
```

```
# 询问过程
1. 请选择提交类型
2. 请选择提交范
3. 请输入提交描述
4. 要在提交信息中显示内置的 emoji 表情吗?
```

### API 模式

仅对 `git commit -m "xxx"` 包装, 无提交规范生成.

```typescript
import { gitCommit } from "code-genius";

(async () => {
  await gitCommit("fix", "feat", "修复xx功能的xxBug");
})();
```

### 配置文件

```typescript
# 覆盖默认的 `gitCommitTypes` 和 `gitCommitScopes` 配置
import { defineConfig } from "code-genius";

export default defineConfig({
  commands: {
    commit: {
      gitCommitTypes: [
        {
          emoji: "🎉",
          code: "feat",
          description: "增加新功能/特性",
        },
      ],
      gitCommitScopes: [
        {
          emoji: "🐛",
          code: "fix",
          description: "修复bug",
        },
      ],
    },
  },
});
```

## fix 命令

运行 `eslint` 静态扫描和修复代码中存在的问题, 仅支持命令模式;

使用场景: 用于替代 `eslint --fix`, 功能雷同, 可以使用 **API** 模式来运行命令.

### 命令模式

```bash
# 检测和修改 src 文件夹中的代码
codeg fix
```

```bash
# 检测和修改 src 和 components 文件夹中的代码
codeg fix -p ./src -p ./components
```

| 选项                      | 描述         |
| ------------------------- | ------------ |
| -p, --pattern \<pattern\> | 设置匹配规则 |

PS: 依赖 `eslint` CLI 模式, 同时对项目配置的 `.eslintignore` 和 `.eslintrc.json` 生效.

### 配置文件

```typescript
# 覆盖默认的 `fix` 配置
import { defineConfig } from "code-genius";

export default defineConfig({
  commands: {
    fix: {
      paths: ["./src", "./scripts"],
    },
  },
});
```

## script 命令

代理运行 `package.scripts` 脚本, 仅支持询问模式;

使用场景: 用于项目有大量 `scripts` 的情况, 可以生成单独的配置文件用来注册每个 `script` 的作用, 并通过询问模式来执行对应的 `script`.

### 询问模式

```bash
# 启动询问模式
codeg script
```

```
# 询问过程

1. 请选择项目运行脚本
```

PS: 第一次使用 `script` 命令会初始化 `scripts.config.json`, 可以为它增加对应的描述, 以后每次使用均会同步 `package.scripts` 的变化.

## 更多命令

更多命令可以通过插件的形式进行组合, 这样可以为不同的项目定制不同的 CLI 功能, 避免额外的功能在使用上造成负担.

```javascript
// codeg.config.mjs code-genius 项目已配置的插件
import { defineConfig } from "code-genius";
import { clearInstaller } from "@codegenius/clear-plugin";
import { quantityInstaller } from "@codegenius/quantity-plugin";
import { npmDepCheckInstaller } from "@codegenius/depcheck-plugin";
import { lighthouseInstaller } from "@codegenius/lighthouse-plugin";
import { createProjectInstaller } from "@codegenius/create-plugin";
import { gitInitSimpleHooksInstaller } from "@codegenius/hooks-plugin";
import { gitUserInstaller } from "@codegenius/git-user-plugin";
import { npmRegistryInstaller } from "@codegenius/registry-plugin";
import { gitCommitVerifyInstaller } from "@codegenius/verify-plugin";
import { templateInstaller } from "@codegenius/template-plugin";
import { prettierFormatInstaller } from "@codegenius/format-plugin";
import { impSortInstaller } from "@codegenius/impsort-plugin";

export default defineConfig({
  commands: {
    fix: {
      paths: ["./src", "./scripts"],
    },
  },
  plugins: [
    clearInstaller({
      files: ["./dist"],
    }),
    quantityInstaller(),
    npmDepCheckInstaller(),
    lighthouseInstaller(),
    createProjectInstaller(),
    gitInitSimpleHooksInstaller(),
    gitUserInstaller({
      ruleEmail: "^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$",
    }),
    npmRegistryInstaller(),
    gitCommitVerifyInstaller(),
    templateInstaller(),
    prettierFormatInstaller({
      files: ["./src", "./scripts"],
    }),
    impSortInstaller({
      files: ["./src", "./scripts"],
    }),
  ],
});
```

## 执照

MIT License

Copyright (c) 2023 小鑫同学

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
