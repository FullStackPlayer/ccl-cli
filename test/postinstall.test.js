const { test, describe } = require('node:test');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Test cases for postinstall script
test('should have a postinstall script file', () => {
  const scriptPath = path.join(__dirname, '..', 'scripts', 'postinstall.js');
  assert.strictEqual(fs.existsSync(scriptPath), true, 'postinstall.js should exist');
});

test('should have a bin directory', () => {
  const binPath = path.join(__dirname, '..', 'bin');
  assert.strictEqual(fs.existsSync(binPath), true, 'bin directory should exist');
});

test('should have executable files in the correct locations', () => {
  // 在新的架构中，可执行文件由子包提供，不在主包中
  // 这里我们只测试命令转发器是否存在
  const binPath = path.join(__dirname, '..', 'bin');
  assert.strictEqual(fs.existsSync(path.join(binPath, 'ccl')), true, 'bin/ccl should exist');
});

// 更新测试以适应新的 postinstall 脚本
describe('Postinstall Script Functionality Tests', () => {
  test('postinstall script should contain platform selection logic', () => {
    const scriptPath = path.join(__dirname, '..', 'scripts', 'postinstall.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    
    // 检查脚本是否包含平台检测逻辑
    assert.strictEqual(scriptContent.includes('process.platform'), true, 'Script should detect platform');
    assert.strictEqual(scriptContent.includes('process.arch'), true, 'Script should detect architecture');
    
    // 检查脚本是否包含子包安装逻辑
    assert.strictEqual(scriptContent.includes('npm install -g'), true, 'Script should install sub-packages');
    
    // 检查脚本是否包含子包映射（使用实际脚本中的命名）
    assert.strictEqual(scriptContent.includes('ccl-cli-darwin-arm64'), true, 'Script should reference darwin-arm64 sub-package');
    assert.strictEqual(scriptContent.includes('ccl-cli-darwin-x64'), true, 'Script should reference darwin-x64 sub-package');
    assert.strictEqual(scriptContent.includes('ccl-cli-linux-x64'), true, 'Script should reference linux-x64 sub-package');
    assert.strictEqual(scriptContent.includes('ccl-cli-windows-x64'), true, 'Script should reference windows-x64 sub-package');
  });
});