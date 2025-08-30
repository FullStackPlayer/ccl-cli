const { test, describe } = require('node:test');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Test suite for project structure
describe('Project Structure Tests', () => {
  const projectRoot = path.join(__dirname, '..');
  
  test('should have required project files', () => {
    const requiredFiles = [
      'package.json',
      'index.js',
      'README.md'
    ];
    
    requiredFiles.forEach(file => {
      const filePath = path.join(projectRoot, file);
      assert.strictEqual(fs.existsSync(filePath), true, `${file} should exist`);
    });
  });

  test('should have required directories', () => {
    const requiredDirs = [
      'bin',
      'scripts',
      'test'
    ];
    
    requiredDirs.forEach(dir => {
      const dirPath = path.join(projectRoot, dir);
      assert.strictEqual(fs.existsSync(dirPath), true, `${dir} directory should exist`);
    });
  });

  test('should have postinstall script with correct structure', () => {
    const scriptPath = path.join(projectRoot, 'scripts', 'postinstall.js');
    assert.strictEqual(fs.existsSync(scriptPath), true, 'postinstall.js should exist');
    
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    
    // 检查脚本是否包含必要的模块
    assert.strictEqual(scriptContent.includes('child_process'), true, 'Script should use child_process module');
    assert.strictEqual(scriptContent.includes('execSync'), true, 'Script should use execSync function');
    
    // 检查脚本是否包含平台检测
    assert.strictEqual(scriptContent.includes('process.platform'), true, 'Script should detect platform');
    assert.strictEqual(scriptContent.includes('process.arch'), true, 'Script should detect architecture');
  });


  test('should have bin directory with ccl file', () => {
    const binPath = path.join(projectRoot, 'bin');
    assert.strictEqual(fs.existsSync(binPath), true, 'bin directory should exist');
    
    const cclPath = path.join(binPath, 'ccl');
    assert.strictEqual(fs.existsSync(cclPath), true, 'bin/ccl should exist');
  });

  test('should have package.json with correct configuration', () => {
    const packagePath = path.join(projectRoot, 'package.json');
    assert.strictEqual(fs.existsSync(packagePath), true, 'package.json should exist');
    
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // 检查必需字段
    assert.strictEqual(typeof packageJson.name, 'string', 'package.json should have name');
    assert.strictEqual(typeof packageJson.version, 'string', 'package.json should have version');
    assert.strictEqual(typeof packageJson.description, 'string', 'package.json should have description');
    assert.strictEqual(typeof packageJson.main, 'string', 'package.json should have main');
    
    // 检查 bin 配置
    assert.strictEqual(typeof packageJson.bin, 'object', 'package.json should have bin object');
    assert.strictEqual(packageJson.bin.ccl, './bin/ccl', 'package.json should have correct bin configuration');
    
    // 检查脚本
    assert.strictEqual(typeof packageJson.scripts, 'object', 'package.json should have scripts object');
    assert.strictEqual(typeof packageJson.scripts.postinstall, 'string', 'package.json should have postinstall script');
    assert.strictEqual(typeof packageJson.scripts.test, 'string', 'package.json should have test script');
    
    // 检查平台限制
    assert(Array.isArray(packageJson.os), 'package.json should have os array');
    assert(Array.isArray(packageJson.cpu), 'package.json should have cpu array');
    
    // 检查 preferGlobal
    assert.strictEqual(packageJson.preferGlobal, true, 'package.json should have preferGlobal set to true');
  });
});