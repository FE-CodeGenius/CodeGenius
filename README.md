# CodeGenius

旨在帮助开发者轻松管理优质代码的命令行开发包

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

### 命令模式

```bash
codeg commit -t fix -s feat -d 修复xx功能的xxBug
```

| 选项                              | 描述         |
| --------------------------------- | ------------ |
| -t, --type \<type\>               | 添加修改类型 |
| -s, --scope \<scope\>             | 填写修改范围 |
| -d, --description \<description\> | 填写修改描述 |

### 询问模式

```bash
# 启动询问模式
codeg commit
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
  await gitCommit("fix(feat): 修复xx功能的xxBug");
})();
```

## verify 命令

校验 `COMMIT_EDITMSG` 中的信息是否符合 **Angualr** 规范, 支持命令模式和 **API** 模式;

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

### 询问模式

```bash
# 启动询问模式
codeg clear
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

## hooks 命令

新增或修改 `simple-git-hooks` 配置后需要重新初始化, 支持命令模式和 **API** 模式;

### 命令模式

```bash
codeg hooks
```

### API 模式

```typescript
import { gitInitSimpleHooks } from "code-genius";

(async () => {
  await gitInitSimpleHooks();
})();
```

## depcheck 命令

运行 `npm-check` 检查过时的、不正确的和未使用的依赖项, 支持命令模式和 **API** 模式;

### 命令模式

```bash
codeg depcheck
```

### API 模式

```typescript
import { npmDepCheck } from "code-genius";

(async () => {
  await npmDepCheck();
})();
```

## registry 命令

切换 **NPM** 镜像地址, 支持命令模式, 询问模式和 API 模式;

### 命令模式

```bash
# 设置 npm 官方源
codeg registry -u https://registry.npmjs.org/
```

### 询问模式

```bash
# 启动询问模式
codeg registry
```

```
# 询问过程
1. 请选择 NPM 镜像
```

### API 模式

仅对 `npm config set registry xxx` 包装, 无其它配置.

```typescript
import { npmRegistry } from "code-genius";

(async () => {
  await npmRegistry("https://registry.npmjs.org/");
})();
```

## gituser 命令

设置或校验 `git user` 信息是否规范, 支持命令模式和 **API** 模式;

### 命令模式

```bash
# 在默认规则下设置 email 信息
codeg gituser -e zxin088@gmail.com

# 在指定规则下设置 email 信息
codeg gituser -e zxin088@qq.com --rule-email '^[a-zA-Z0-9._%+-]+@(qq)\.(com)$'
```

```bash
# 在默认规则下校验 user 和 email 信息
codeg gituser

# 在指定规则下校验 user 和 email 信息
codeg gituser --rule-email '^[a-zA-Z0-9._%+-]+@(qq)\.(com)$'
```

| 选项                    | 描述                                 |
| ----------------------- | ------------------------------------ |
| -n, --name \<name\>     | 设置 user.name                       |
| -e, --email \<email\>   | 设置 user.email                      |
| --rule-name \<regexp\>  | 设置 user.name 匹配规则(转义字符串)  |
| --rule-email \<regexp\> | 设置 user.email 匹配规则(转义字符串) |

- **--rule-name 默认 :** `[\s\S]*`
- **--rule-email 默认 :** `^[a-zA-Z0-9._%+-]+@(163|qq|126|139|sina|sohu|yeah|gmail)\.(com|net)$`

### API 模式

```typescript
import { setGitUserName, setGitUserEmail, checkGitUserInfo } from "code-genius";

(async () => {
  await setGitUserName("OSpoon", "[\\s\\S]*");
  await setGitUserEmail(
    "zxin088@gmail.com",
    "^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$"
  );
  await checkGitUserInfo("[\\s\\S]*", "^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$");
})();
```

## 命令

| 命令       | 参数                                                                | 默认值  | 功能描述                                      |
| ---------- | ------------------------------------------------------------------- | ------- | --------------------------------------------- |
| fix        | --pattern \<pattern\>                                               | './src' | 运行 eslint 静态扫描和修复代码中存在的问题    |
| format     | --pattern \<pattern\>                                               | './src' | 运行 prettier 格式化代码风格                  |
| create     | --                                                                  | --      | 运行 npm create 快速创建基础项目              |
| template   | -n, --project-name \<project-name\>, -f, --framework \<framework\>, | --      | 快速创建 CodeGenius 基础项目                  |
| lighthouse | --url \<url\>                                                       | --      | 运行 lighthouse 分析及收集 Web 应用的性能指标 |
| quantity   | -p, --path <path>                                                   | --      | 运行 cloc 分析并统计代码量                    |

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
