/*
 * 作者: merlinhong
 * 版本: [1.0]
 * 描述: 多模块打包功能
 */
const fs = require('fs-extra');
const path = require('path');
const proConfig = { isH5Multiple: true };

/**
 * description: 获取多模块配置
 * return {Object} 多模块配置
 */
const getMultipleToArray = () => {
  const multipleArray = {};
  // 判断multiple.json是否存在
  const multiplePath = path.resolve(__dirname, '../../multiple.json');
  const isExistMultiple = fs.existsSync(multiplePath);

  if (isExistMultiple) {
    const multipleJson = fs.readJsonSync(multiplePath);

    if (multipleJson) {
      for (let i = 0; i < multipleJson.length; i++) {
        const item = multipleJson[i];
        const pages = item.multiplePages;

        multipleArray[item.multipleName] = pages;
      }
    }
  }

  return multipleArray;
};
/**
 * description: 判断是否是多模块打包
 * return {Boolean} 是否是多模块打包
 */
const isMultiple = () => {
  const isH5Multiple = proConfig.isH5Multiple;
  const moduleType = process.m8Argv?.moduleType || 'h5';
  const multipleName = process.m8Argv?.multipleName || '';

  return isH5Multiple && moduleType === 'h5' && multipleName;
};

/**
 * description: 设置多模块打包数据
 * param {String} multipleName 多模块名称
 * param {Array} multiplePages 多模块页面
 */
const setMultipleCompileData = (multipleName, multiplePages) => {
  process.m8Argv.multipleData = {
    multipleName,
    multiplePages,
  };
};

/**
 * description: 获取多模块打包数据
 * return {Object} 多模块打包数据
 */
const getMultipleCompileData = () => {
  return process.m8Argv?.multipleData;
};

module.exports = {
  getMultipleToArray,
  isMultiple,
  setMultipleCompileData,
  getMultipleCompileData,
};
