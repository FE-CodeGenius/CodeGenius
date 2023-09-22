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

| 命令       | 参数                                                                                     | 默认值    | 功能描述                                            |
| ---------- | ---------------------------------------------------------------------------------------- | --------- | --------------------------------------------------- |
| commit     | --no-emoji                                                                               | true      | 生成 angualr 规范的提交信息                         |
| verify     | --                                                                                       | --        | 校验 COMMIT_EDITMSG 中的信息是否符合 Angualr 规范   |
| clear      | --pattern \<pattern\>                                                                    | './dist/' | 运行 rimraf 删除不再需要的文件或文件夹              |
| hooks      | --                                                                                       | --        | 新增或修改 simple-git-hooks 配置后需要重新初始化    |
| depcheck   | --                                                                                       | --        | 运行 npm-check 检查过时的、不正确的和未使用的依赖项 |
| run        | --                                                                                       | --        | 列出可以运行的全部脚本                              |
| registry   | --                                                                                       | --        | 切换 NPM 镜像地址                                   |
| fix        | --pattern \<pattern\>                                                                    | './src'   | 运行 eslint 静态扫描和修复代码中存在的问题          |
| format     | --pattern \<pattern\>                                                                    | './src'   | 运行 prettier 格式化代码风格                        |
| create     | --                                                                                       | --        | 运行 npm create 快速创建基础项目                    |
| template   | -n, --project-name \<project-name\>, -f, --framework \<framework\>,                      | --        | 快速创建 CodeGenius 基础项目                        |
| lighthouse | --url \<url\>                                                                            | --        | 运行 lighthouse 分析及收集 Web 应用的性能指标       |
| lighthouse | -n, --name \<name\>,-e, --email \<email\>,--rule-name \<regexp\>,--rule-email \<regexp\> | --        | 设置或校验 git user 信息是否规范                    |

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
