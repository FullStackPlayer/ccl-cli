const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 获取当前操作系统和架构
const platform = process.platform;
const arch = process.arch;

// 定义子包映射
const subPackages = {
  'darwin-arm64': 'ccl-cli-darwin-arm64',
  'darwin-x64': 'ccl-cli-darwin-x64',
  'linux-x64': 'ccl-cli-linux-x64',
  'win32-x64': 'ccl-cli-win32-x64'
};

// 生成子包名称
function getSubPackageName() {
  const key = `${platform}-${arch}`;
  return subPackages[key] || null;
}

// 安装子包
function installSubPackage(packageName) {
  try {
    console.log(`Installing ${packageName}...`);
    execSync(`npm install -g ${packageName}`, { stdio: 'inherit' });
    console.log(`${packageName} installed successfully!`);
    return true;
  } catch (error) {
    console.error(`Failed to install ${packageName}:`, error.message);
    return false;
  }
}

// 主逻辑
function main() {
  const subPackageName = getSubPackageName();
  
  if (!subPackageName) {
    console.error(`Unsupported platform: ${platform}-${arch}`);
    process.exit(1);
  }
  
  console.log(`Detected platform: ${platform}-${arch}`);
  
  // 安装对应的子包
  if (installSubPackage(subPackageName)) {
    console.log('ccl-cli setup completed successfully!');
  } else {
    console.error('Failed to setup ccl-cli. Please try again.');
    process.exit(1);
  }
}

main();