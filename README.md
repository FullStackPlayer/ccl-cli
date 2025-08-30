# ccl-cli-installer

Claude Code Launcher CLI 安装器

## 简介

ccl-cli-installer 是一个 npm 包，用于将 [claude-code-launcher](https://github.com/FullStackPlayer/claude-code-launcher) 安装为系统全局命令行工具。

## 架构设计

本项目采用分层架构设计：
- **主包 (ccl-cli-installer)**: 负责架构检测、子包安装和命令转发
- **子包**: 按平台架构命名(如 ccl-cli-darwin-arm64)，每个子包只包含对应架构的二进制文件

## 安装

```bash
npm install -g ccl-cli-installer
```

安装过程中会自动检测您的平台架构并安装对应的子包。

## 使用

安装完成后，您可以在终端中直接使用 `ccl` 命令：

```bash
ccl --version
ccl --help
```

## 平台支持

- Windows (x64)
- macOS (x64 和 arm64)
- Linux (x64)

## 工作原理

1. 安装主包时，postinstall 脚本会检测当前平台架构
2. 自动安装对应的平台特定子包
3. 使用 `ccl` 命令时，会自动转发到对应平台的可执行文件

## 注意事项

- 安装后会根据您的操作系统自动配置相应的可执行文件
- 如果遇到任何问题，请确保您的系统满足 claude-code-launcher 的运行要求