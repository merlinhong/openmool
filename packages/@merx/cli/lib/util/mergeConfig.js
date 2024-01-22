const fs = require('fs-extra');
const deepMerge = require('deepMerge');

class MergeFile {
  constructor(targetFile, sourceFile) {
    this.targetFile = targetFile;
    this.parseToJson = '';
    this.sourceParseToObj = this.parseFile(sourceFile)[0];
    this.sourceParseToJson = this.parseFile(sourceFile)[1];
    this.targetParseToObj = this.parseFile(targetFile)[0];
    this.targetParseToJson = this.parseFile(targetFile)[1];
  }
  parseFile(file) {
    let parseToObj;
    let parseToJson;
    if (/(^\.|\.js$)/.test(file)) {
      parseToObj = require(file) || {};
    }
    if (/(\.json$)/.test(file)) {
      parseToObj = JSON.parse(fs.readFileSync(file, 'utf8')) || {};
    }
    parseToJson = fs.readFileSync(file, 'utf8') || '';

    return [parseToObj, parseToJson];
  }
  isrepeat(ctx1, ctx2) {
    return JSON.stringify(ctx1) === JSON.stringify(ctx2);
  }
  getModuleExportUp(json) {
    let ind1 = json.indexOf('module.exports');
    let modulExportsJson = '';
    if (ind1 != -1) {
      modulExportsJson = json.substring(0, ind1);
    }
    return modulExportsJson;
  }
  merge() {
    let mergeConfig = {};
    let mergeModuleExports = '';
    let sourceModuleExports = '';
    let targetModuleExports = '';
    try {
      if (!this.isrepeat(this.targetParseToObj, this.sourceParseToObj)) {
        mergeConfig = deepMerge(this.targetParseToObj, this.sourceParseToObj);
      } else {
        mergeConfig = this.targetParseToObj;
      }
      targetModuleExports = this.getModuleExportUp(this.targetParseToJson);
      sourceModuleExports = this.getModuleExportUp(this.sourceParseToJson);
      mergeModuleExports = [
        ...new Set([targetModuleExports, sourceModuleExports]),
      ].join('');
      // 将合并后的对象转为 JSON 格式的字符串
      let jsonStr = JSON.stringify(mergeConfig, null, 2);
      if (/(^\.|\.js$)/.test(this.targetFile)) {
        jsonStr = mergeModuleExports + '\n' + 'module.exports=' + jsonStr;
      }
      // 将新的对象写入到文件中
      fs.writeFile(this.targetFile, jsonStr, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    } catch (error) {
      console.error('config file merge fail:', 'permisson fail', error);
    }
  }
}

// 合并现有文件的配置到目标文件中
module.exports = function mergeConfig(targetFile, sourceFile, cb) {
  new MergeFile(targetFile, sourceFile).merge({});
};
