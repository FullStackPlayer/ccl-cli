const { test, describe } = require('node:test');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// 测试命令转发器功能
describe('Command Forwarding Tests', () => {
  test('should have command forwarding script', () => {
    const scriptPath = path.join(__dirname, '..', 'bin', 'ccl');
    assert.strictEqual(fs.existsSync(scriptPath), true, 'Command forwarding script should exist');
    
    // 检查是否包含必要的模块
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    assert.strictEqual(scriptContent.includes('child_process'), true, 'Script should use child_process module');
    assert.strictEqual(scriptContent.includes('spawn'), true, 'Script should use spawn function');
  });

  test('should have correct shebang', () => {
    const scriptPath = path.join(__dirname, '..', 'bin', 'ccl');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    assert.strictEqual(scriptContent.startsWith('#!/usr/bin/env node'), true, 'Script should have correct shebang');
  });

  test('should handle different platforms', () => {
    const scriptPath = path.join(__dirname, '..', 'bin', 'ccl');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    
    // 检查是否包含平台检测逻辑
    assert.strictEqual(scriptContent.includes('process.platform'), true, 'Script should detect platform');
    assert.strictEqual(scriptContent.includes('process.arch'), true, 'Script should detect architecture');
    
    // 检查是否包含平台特定的命令
    assert.strictEqual(scriptContent.includes('ccl-darwin-arm64'), true, 'Script should handle darwin-arm64');
    assert.strictEqual(scriptContent.includes('ccl-darwin-x64'), true, 'Script should handle darwin-x64');
    assert.strictEqual(scriptContent.includes('ccl-linux-x64'), true, 'Script should handle linux-x64');
    assert.strictEqual(scriptContent.includes('ccl-windows-x64'), true, 'Script should handle windows-x64');
  });

  test('should have error handling', () => {
    const scriptPath = path.join(__dirname, '..', 'bin', 'ccl');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    
    // 检查是否包含错误处理逻辑
    assert.strictEqual(scriptContent.includes('handleError'), true, 'Script should have error handling function');
    assert.strictEqual(scriptContent.includes('ENOENT'), true, 'Script should handle ENOENT errors');
  });
});