const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');
const proConfig = require('../../src/shared/config');

const {
  getMultipleToArray,
  isMultiple,
  setMultipleCompileData,
} = require('../multiple');
let isExist = (item, filename) => {
  return new Promise((resolve, reject) => {
    let file = path.resolve(
      __dirname,
      `../../src/pages/${item}/${filename}.js`,
    );

    // 判断文件是否存在
    fs.access(file, fs.constants.F_OK, (fsErr) => {
      if (!fsErr) {
        resolve();
      } else {
        reject(item);
      }
    });
  });
};
module.exports = function (content) {
  const options = loaderUtils.getOptions(this);
  const callback = this.async(); // 异步loader，一般支持采用异步方式写loader
  let con = '';
  let moduleName = process.m8Argv?.moduleName || '';
  let moduleType = process.m8Argv?.moduleType || 'h5';
  let multipleName = process.m8Argv?.multipleName || '';
  const multipleArray = getMultipleToArray();
  const isMultipleFlag = isMultiple();
  fs.readdir(path.resolve(__dirname, '../../src/pages'), function (err, files) {
    if (err) {
      console.error(err);

      return;
    }
    let regArray = ['index.html', 'index.vue', 'main.js', '.DS_Store'];
    let configRouters = [];

    files.forEach((filename) => {
      if (regArray.indexOf(filename) > -1) {
        return;
      }
      if (isMultipleFlag) {
        if (Object.keys(multipleArray).length === 0) {
          throw new Error(
            '使用 multiple 请检查 multiple.json 文件是否配置正确',
          );
        }
        console.log('44mu', multipleArray, multipleArray[multipleName]);
        if (multipleArray[multipleName]) {
          // 模块在多模块列表内构建
          if (multipleArray[multipleName].indexOf(filename) > -1) {
            configRouters.push(filename);
          }
        } else {
          configRouters.push(filename);
        }
        console.log('mul', configRouters);
      } else if (moduleName && moduleType !== 'h5') {
        // 如果指定模块，只构建指定模块
        if (moduleName === filename) {
          configRouters.push(filename);
        }
      } else {
        configRouters.push(filename);
      }
    });

    if (configRouters.length >= 1) {
      // 保存使用多模块构建的模块信息
      if (isMultipleFlag) {
        setMultipleCompileData(multipleName, configRouters);
      }
      let header = '';
      let compute = '';
      let routerHookReg = new RegExp('// configRouters hook([\\s\\S]+?)', 'g');
      let storeHookReg = new RegExp('// storeModules hook([\\s\\S]+?)', 'g');
      let mockHookReg = new RegExp('// mockData hook([\\s\\S]+?)', 'g');

      let getCon = async () => {
        if (content.match(routerHookReg)) {
          for (let i = 0; i < configRouters.length; i++) {
            let item = configRouters[i];

            await isExist(item, 'router')
              .then(() => {
                header += `import ${item} from '../pages/${item}/router.js';\n`;
                compute += `configRouters = configRouters.concat(${item});\n`;
              })
              .catch((res) => {
                if (moduleName && moduleName === res) {
                  // 如果指定了模块，但是模块下没有路由文件，报错
                  throw new Error(
                    `\n\n指定构建的${moduleName}模块下没有路由文件！请解决此问题后重新构建！\n\n`,
                  );
                }
              });
          }

          con = header + content;

          con = con.replace(routerHookReg, compute).trim();
        } else if (content.match(storeHookReg)) {
          // store文件解析
          compute += 'let configStore = [];\n';

          for (let i = 0; i < configRouters.length; i++) {
            let item = configRouters[i];

            await isExist(item, 'store')
              .then(() => {
                header += `import ${item} from '../pages/${item}/store.js';\n`;
                compute += `configStore = configStore.concat(${item});\n`;
              })
              .catch(() => {});
          }

          con = header + content;

          compute += `if(configStore.length > 0){
                        configStore.forEach((e, n) => {
                            storeModules[e.moduleName] = e;
                        });
                    }
                   `;

          con = con.replace(storeHookReg, compute).trim();
        } else if (content.match(mockHookReg)) {
          if (proConfig.isMock) {
            if (
              process.env.NODE_ENV === 'development' ||
              (process.env.NODE_ENV === 'production' &&
                !proConfig.isProductionExternalMock)
            ) {
              for (let i = 0; i < configRouters.length; i++) {
                let item = configRouters[i];

                await isExist(item, 'mock')
                  .then(() => {
                    header += `import ${item} from '../src/pages/${item}/mock.js';\n`;
                    compute += `mockData = mockData.concat(${item});\n`;
                  })
                  .catch(() => {});
              }
              con = header + content;
              con = con.replace(mockHookReg, compute).trim();
            }
          }
        }
      };

      // 路由文件解析
      let afuc = async () => {
        await getCon();
        if (!con) {
          con = content;
        }

        callback(null, con);
      };
      afuc();
    } else {
      throw new Error('\n\n没有找到匹配的模块！请解决此问题后重新构建！\n\n');
    }
  });
};
