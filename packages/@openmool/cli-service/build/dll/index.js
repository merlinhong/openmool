/*
 * 作者: merlinhong
 * 版本: [1.0]
 * 描述: 外置dll文件
 */
const path = require('path');
// const proConfig = require('../../src/shared/config').Config;
const proConfig = require('../../src/shared/config');

const dllPlugin = (buildType) => {
  console.log('buildType', buildType);
  let entry = {};

  // 如果为小程序或小程序卡片，外置dll文件
  if (buildType === 'app') {
    entry.m8dll = [
      'vue/dist/vue.esm.js',
      'vue-router',
      // 'axios',
      'vuex',
      'vant',
      // 'mockjs/dist/mock.js',
      // 'crypto-js',
      'core-js',
      'qs',
      // 'axios-mock-adapter',
      path.resolve(__dirname, '../../src/tool/sm2.js'),
    ];
  }
  // 是否外置config.js文件
  if (proConfig.isExternalConfig && buildType !== 'card') {
    entry.config = [path.resolve(__dirname, '../../src/shared/config.js')];
  }

  return {
    inject: true, // 设为 true 就把 DLL bundles 插到 index.html 里
    filename: '[name].dll.js',
    context: path.resolve(__dirname, '../../'), // AutoDllPlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
    entry,
  };
};

module.exports = dllPlugin;
