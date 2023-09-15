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

## 终端命令

| 命令   | 参数             | 功能描述                                       |
| ------ | ---------------- | ---------------------------------------------- |
| cm     | --noEmoji        | 帮助生成规范的 git 提交内容                    |
| cmv    | --               | 帮助验证 git commit 的内容是否符合规范         |
| cup    | --ignore <match> | 清理运行时生成的文件                           |
| ihooks | --               | 使用且有修改 git-simple-hooks 后需要重新初始化 |

## API

| 序号 | API                                 | 参数                                                                                   | 返回            |
| ---- | ----------------------------------- | -------------------------------------------------------------------------------------- | --------------- |
| 1    | `gitCommit(types, scopes, options)` | `types: Array<CommitType>`, `scopes: Array<CommitScope>`, `options: GitCommitOptions)` | `Promise<void>` |
| 2    | `gitCommitVerify()`                 | `--`                                                                                   | `Promise<void>` |
| 3    | `cleanUp(paths)`                    | `paths: string[]`                                                                      | `Promise<void>` |
| 4    | `gitInitSimpleHooks(cwd)`           | `cwd?: string`                                                                         | `Promise<void>` |

## API 示例

gitCommit()

```typescript
// ./index.ts
import { gitCommit, gitCommitScopes, gitCommitTypes } from "code-genius";

gitCommit(gitCommitTypes, gitCommitScopes, { enableEmoji: true });

// 运行
npx esno index.ts
```

gitCommitVerify()

```typescript
// ./index.ts
import { gitCommitVerify } from "code-genius";

gitCommitVerify();

// 运行
npx esno index.ts
```

cleanUp()

```typescript
// ./index.ts
import { cleanUp, cleanUpDirs } from "code-genius";

cleanUp(cleanUpDirs);

// 运行
npx esno index.ts
```

gitInitSimpleHooks()

```typescript
// ./index.ts
import { gitInitSimpleHooks, cwd } from "code-genius";

gitInitSimpleHooks(cwd);

// 运行
npx esno index.ts
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
