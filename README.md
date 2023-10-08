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

## verify 命令

校验 `COMMIT_EDITMSG` 中的信息是否符合 **Angualr** 规范, 支持命令模式和 **API** 模式;

使用场景: 用于校验正在执行 `git commit` 时所提交的信息是否符合规范.

### 命令模式

```bash
codeg verify
```

### API 模式

```typescript
import { gitCommitVerify } from "code-genius";

(async () => {
  await gitCommitVerify();
  console.log("Git 提交信息校验通过, 正在执行后续逻辑...");
})();
```

## clear 命令

运行 `rimraf` 删除不再需要的文件或文件夹, 支持命令模式, 询问模式和 **API** 模式;

使用场景: 用于删除可以通过项目运行自动生成的文件, 如: `dist` 目录, 还有顽固的 `node_modules`.

### 命令模式

```bash
# 删除 dist 文件夹
codeg clear -p ./dist

# 删除 dist 和 node_modules 两个文件夹
codeg clear -p ./dist -p ./node_modules
```

| 选项                      | 描述         |
| ------------------------- | ------------ |
| -p, --pattern \<pattern\> | 设置匹配规则 |
| -a, --ask                 | 启用询问模式 |

### 询问模式

```bash
# 启动询问模式
codeg clear --ask
```

```
# 询问过程
1. 请选择需要清理的文件/夹
```

### API 模式

```typescript
import { clear } from "code-genius";

(async () => {
  await clear(["./dist"]);
})();
```

### 配置文件

```typescript
# 覆盖默认的 `files` 配置
import { defineConfig } from "code-genius";

export default defineConfig({
  commands: {
    clear: {
      files: ["./dist"]
    },
  },
});
```

## template 命令

基于 **CodeGenius** 内置模板快速创建新项目, 仅支持询问模式;

使用场景: 用于创建青睐 **CodeGenius** 模板的新的项目 (目前模板为 `vitejs` 内置, 主要在模拟功能, 模板后续更新后可用).

### 询问模式

```bash
# 启动询问模式(默认)
codeg template
```

```
# 询问过程
1. 请输入项目名称
2. 请输入 package name
3. 请选择下列的有效模板
4. 请选择下列的有效变体
```

```bash
# 启动询问模式(带参)
codeg template -n project-salkdyfT -f vue
```

| 选项                                | 描述     |
| ----------------------------------- | -------- |
| -n, --project-name \<project-name\> | 项目名称 |
| -f, --framework \<framework\>       | 项目框架 |

```
# 询问过程
1. 请输入项目名称 (-n 输入则仅需确认)
2. 请输入 package name
3. 请选择下列的有效模板 (-f 输入有效则跳过)
4. 请选择下列的有效变体
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

## format 命令

运行 `prettier` 格式化代码风格, 仅支持命令模式;

使用场景: 用于替代 `prettier --write`, 功能雷同, 可以使用 **API** 模式来运行命令.

### 命令模式

```bash
# 格式化 src 文件夹下的文件
codeg format
```

```bash
# 格式化 src 和 components 文件夹下的文件
codeg format -p ./src -p ./components
```

| 选项                      | 描述         |
| ------------------------- | ------------ |
| -p, --pattern \<pattern\> | 设置匹配规则 |

PS: 依赖 `prettier` CLI 模式, 同时对项目配置的 `.prettierignore` 和 `.prettierrc.json` 生效.

### 配置文件

```typescript
# 覆盖默认的 `format` 配置
import { defineConfig } from "code-genius";

export default defineConfig({
  commands: {
    format: {
      paths: ["./src", "./scripts"],
    },
  },
});
```

## impsort 命令

运行 `eslint` 对模块导入进行分组&按字母排序, 支持命令模式, 询问模式和 API 模式;

使用场景: 用于通过 `simple-import-sort` 插件来对导入模块进行排序且未直接配置插件到 `.eslintrc` 情况.

### 命令模式

```bash
# 尝试修复 src 文件夹中模块的导入顺序
codeg impsort -p ./src

# 尝试修复 src 和 components 文件夹中模块的导入顺序
codeg impsort -p ./src -p ./components
```

| 选项                      | 描述         |
| ------------------------- | ------------ |
| -p, --pattern \<pattern\> | 设置匹配规则 |
| -a, --ask                 | 启用询问模式 |

### 询问模式

```bash
# 启动询问模式
codeg impsort --ask
```

```
# 询问过程
1. 请选择需要尝试修复的文件/夹
```

### API 模式

```typescript
import { impSort } from "../src/index";

(async () => {
  await impSort(["./src"]);
})();
```

PS: 依赖 `eslint` API 模式, 依赖 `simple-import-sort` 插件的同时依旧会读取项目配置的 `.eslintignore` 和 `.eslintrc.json` 文件, 使用 `impsort` 的同时将同步进行 `fix` 检测和修复.

### 配置文件

```typescript
# 覆盖默认的 `impsort` 配置
import { defineConfig } from "code-genius";

export default defineConfig({
  commands: {
    format: {
      impsort: ["./src", "./scripts"],
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
