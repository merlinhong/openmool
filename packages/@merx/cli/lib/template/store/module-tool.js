/*
 * 作者: hongjia
 * 版本: [1.0]
 * 描述: 获取各模块下store.js状态信息
 */
// 第一个参数的当前目录，第二个参数是否匹配子目录，第三次参数正则匹配store.js结尾的文件
const manageFiles = require.context('../pages/', true, /store\.js$/);

let configStore = [];

let moduleName, h5Type;
// eslint-disable-next-line no-undef
const argv = processArgv;

if (
  argv.length > 3 &&
  argv[argv.length - 1].substring(2) != 'ALL' &&
  argv[argv.length - 1].substring(2) != 'Module'
) {
  moduleName = argv[argv.length - 1].substring(2);
}
h5Type = argv[3] ? argv[3].substring(2) : '';

manageFiles.keys().forEach((key) => {
  //    如果是当前文件，则跳过
  if (key === './index.js') {
    return;
  }
  // 如果指定模块，只构建指定模块路由
  if (moduleName && h5Type !== 'h5') {
    if (new RegExp(moduleName).test(key)) {
      configStore = configStore.concat(manageFiles(key).default); // 读取出文件中的default模块
    }
  } else {
    configStore = configStore.concat(manageFiles(key).default); // 读取出文件中的default模块
  }
});

let storeModulesObj = {};

configStore.forEach((e, n) => {
  storeModulesObj[e.moduleName] = e;
});

export default storeModulesObj;
