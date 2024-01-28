const path = require('path');
const mergeConfig = require('./mergeConfig');
const fs = require('fs-extra');
const { ora } = require('@vuecli-build/cli-shared-utils');
const permitConfiglist = [
  'jsconfig.json',
  'package.json',
  'babel.config.js',
  '.babelrc',
  '.eslintrc',
  '.eslintrc.js',
  'eslintrc.js',
  // 'vue.config.js',
  '.prettierrc',
];
exports._spinner = function (text) {
  const spinner = ora('Loading...').start();
  spinner.text = text;
  return spinner;
};
// 移除文件夹
exports.removeDir = function (path) {
  try {
    fs.rmSync(path, { recursive: true });
  } catch (error) {
    console.error('文件夹删除失败:', error);
  }
};
exports.makeDir = function (dir, name) {
  fs.mkdirSync(path.join(dir, name), { recursive: true });
};
exports.moveDir = function (source, target, name, merge = 'merge') {
  console.log(path.join(source, name), path.join(target, `./${merge}`));
  fs.moveSync(path.join(source, name), path.join(target, `./${merge}`));
};

exports.isexists = function isexists(local, name) {
  return name && fs.existsSync(path.join(local, name));
};
exports.copyTemplateConfig = function (name, result, cb) {
  let sourcepath = path.resolve(__dirname, '../template');
  const targetdir = fs
    .readdirSync(sourcepath)
    .filter((filepath) => result.map((i) => i.name).includes(filepath));
  for (const dir of targetdir) {
    fs.copySync(
      path.resolve(__dirname, `../template/${dir}`),
      path.join(process.cwd(), `${name}/src/${dir}`),
    );
  }
  setTimeout(() => {
    cb && cb();
  }, 2000);
};
exports.copyFileSync = function (name, dirname, copyfilelist) {
  let templatePath = '../template/';
  for (const dir of copyfilelist) {
    if (dir.indexOf('main') != -1) {
      templatePath += 'temporary/';
    }
    fs.copySync(
      path.resolve(__dirname, templatePath + dir),
      path.join(
        process.cwd(),
        `${name}/src/${dirname}/${dir.replace(/\d/, '')}`,
      ),
    );
  }
  fs.rmSync(path.join(process.cwd(), `${name}/src/main.js`), {
    recursive: true,
  });
  fs.rmSync(path.join(process.cwd(), `${name}/src/App.vue`), {
    recursive: true,
  });
};

// 合并文件夹
exports.mergeDirectories = function mergeDirectories(targetDir, sourceDir) {
  try {
    // 读取源文件夹和目标文件夹中的所有文件列表
    const sourceFiles = fs
      .readdirSync(sourceDir)
      .filter((file) => file !== 'node_modules' && file != '.git');
    const targetFiles = fs
      .readdirSync(targetDir)
      .filter((file) => file !== 'node_modules' && file != '.git');

    // 复制源文件夹中的每个文件到目标文件夹中
    for (const file of sourceFiles) {
      // 获取每个目录文件的全路径
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      console.log(sourcePath, targetPath);
      if (fs.statSync(sourcePath).isDirectory()) {
        // 如果是子文件夹，则递归调用自身来合并子文件夹中的内容

        if (!targetFiles.includes(file)) {
          // 如果目标文件夹中不存在该子文件夹，则直接复制到目标文件夹中
          fs.mkdirSync(targetPath);
          mergeDirectories(targetPath, sourcePath);
        } else {
          // 如果目标文件夹中已存在该子文件夹，则递归地合并两个子文件夹
          const subTargetDir = path.join(targetDir, file);
          mergeDirectories(subTargetDir, sourcePath);
        }
      } else {
        // 如果是文件，则合并到目标文件中并去重处理
        if (targetFiles.includes(file) && permitConfiglist.includes(file)) {
          mergeConfig(targetPath, sourcePath);
        } else {
          // 如果目标文件夹中不存在该文件，则直接复制到目标文件夹中
          fs.copySync(sourcePath, targetPath);
        }
      }
    }
  } catch (error) {
    console.error('文件夹合并失败:', error);
  }
};
