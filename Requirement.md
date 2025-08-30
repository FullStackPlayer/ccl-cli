# 背景

我已经有一个开源项目 [claude-code-launcher](https://github.com/FullStackPlayer/claude-code-launcher)，最终生成和发布的是跨平台二进制可执行文件（windows 平台下是 ccl.exe，其余平台是 ccl）。程序本身没有问题，但是用户下载后还需要自己配置 PATH 系统变量才能以全局 cli 方式使用。

# 目标

我希望能够简化用户将 ccl 安装成本机全局 cli 的过程，让他们仅需运行一个命令即可完成安装。考虑到 claude code 的运行环境，我决定使用 npm 包的形式来实现，所以我需要你帮我开发一个 npm 项目，包名叫做 ccl-cli，支持用户通过 `npm install -g ccl-cli` 方式安装成全局命令。

# 注意

1. 使用原生 js 语言
2. 注意区分处理不同平台下的兼容性问题：
- "bin" 字段告诉 npm 在全局安装时，将 bin/ccl 链接到系统的 PATH 中，作为 ccl 命令。
- "os" 和 "cpu" 字段确保 npm 只在支持的平台上安装。
- "preferGlobal": true 是一个提示，告诉用户这个包更适合全局安装。
3. bin 目录下放置不同平台的可执行文件
4. 在 package.json 中使用 scripts 和 postinstall 钩子，它会在安装后运行一个脚本，根据操作系统复制正确的可执行文件到 bin/ccl
5. 注意 darwin 平台下也要注意区分 arm 和 x86 两种情况
6. 记得 Unix-like 系统要自动设置可执行权限