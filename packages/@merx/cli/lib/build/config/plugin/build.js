// webpack的自定义打包插件
const path = require('path');
const fs = require('fs-extra');
const archiver = require('archiver');
const chokidar = require('chokidar');
const { isMultiple, getMultipleCompileData } = require('../multiple');
var argv = require('minimist')(process.argv.slice(2));
// let ENV = process.env.NODE_ENV;
let rootArr = process.argv;
// let root;
// let moduleType;
let onlyOne;
let appId;
let isDebug;

// if (argv.target === 'wc') {
//     // 卡片模式
//     const cardName = process.argv[process.argv.length - 1].split('/');

//     root = cardName[cardName.length - 2];
//     appId = argv.name;
//     // 卡片模式
//     moduleType = 'mp-epoint-card';
//     isDebug = /debug/.test(rootArr[3]);
// } else {
let moduleName = process.m8Argv?.moduleName || '';

// root = moduleName;
let moduleType = process.m8Argv?.moduleType || '';
// }

class buildPlugin {
  constructor(plugin) {
    this.plugin = plugin;
  }
  _zip(moduleName, zipName, cb) {
    // 获取需要压缩的文件的路径
    const zipPath = moduleName ? `dist/${moduleName}` : 'dist/';
    let out;

    // 压缩文件存放路径
    if (zipName) {
      fs.ensureDirSync('zip');
      out = fs.createWriteStream(`zip/${zipName}.zip`);
    } else {
      out = fs.createWriteStream(`${zipPath}.zip`);
    }

    const archive = archiver('zip', {
      zlib: {
        level: 9,
      }, // Sets the compression level.
    });

    out.on('close', function () {
      cb && cb(moduleName || zipName);
    });
    archive.pipe(out);
    archive.directory(zipPath, '');
    archive.finalize();
  }
  apply(compiler) {
    if (!onlyOne) {
      onlyOne = true;
      compiler.hooks.done.tap('done', async () => {
        // 声明目标数组，模块名称数组变量
        let target;

        if (moduleName !== 'Module' && moduleName !== 'ALL') {
          if (this.plugin !== '') {
            if (moduleType === 'card') {
              target = this.plugin.filter((item) => {
                var cId = item.appId || item.cardId;
                var version = item.version.replace(/\./g, '-');

                return (
                  appId === cId + '-' + version || appId === cId + '-' + 'debug'
                );
              });
            }
            if (moduleType === 'app') {
              target = this.plugin.filter((item) => {
                var name = item.indexURL.split('/')[0];

                return (
                  name === moduleName &&
                  item.moduleName === moduleName &&
                  item.miniH5Type !== 'card'
                );
              });
            }
          }
        } else {
          // 打包项目不作模块拆分
          target = this.plugin;
        }
        // 构建完成后拆分plugin
        if (target !== '') {
          if (moduleType === 'app') {
            target.map((item) => {
              let Config = {
                indexURL: `h5://${item.appId}/index.html#/${item.indexURL}`,
                appId: item.appId,
                minEJSVersion: item.minEJSVersion,
                version: item.version,
                window: item.window || {},
                miniH5Type: item.miniH5Type || '',
                updateType: item.updateType || '',
                cardList: item.cardList || [],
                versionName: item.versionName || item.version,
                keepInMemory: item.keepInMemory || 'alive',
                keepInterval: item.keepInterval || 3600,
              };

              if (Array.isArray(item.pages)) {
                Config.pages = item.pages;
              }

              if (moduleName === 'Module') {
                fs.writeFile(
                  `dist/${item.moduleName}/plugin.json`,
                  JSON.stringify(Config),
                  'utf8',
                  function (error) {
                    if (error) {
                      throw new Error('error', error);
                    }
                  },
                );
              } else if (moduleName !== 'Module' && moduleName !== 'ALL') {
                fs.writeFileSync(
                  'dist/plugin.json',
                  JSON.stringify(Config),
                  'utf8',
                  function (error) {
                    if (error) {
                      throw new Error('error', error);
                    }
                  },
                );
                this._zip('', moduleName, () => {
                  fs.stat(
                    `./zip/${moduleName}.zip`,
                    async function (err, stats) {
                      if (stats && stats.size !== 0) {
                        fs.moveSync(
                          `./zip/${moduleName}.zip`,
                          `./dist/${moduleName}.zip`,
                        );
                      }
                    },
                  );
                });
              } else if (moduleName === 'ALL') {
                fs.copySync('plugin.json', 'dist/plugin.json');
              }
            });
          } else if (moduleType === 'card') {
            // 卡片小程序构建压缩内容
            await fs.remove('./zip');
            await fs.ensureDir('./zip');
            await fs.remove('./dist/demo.html');
            const cardId = target[0].cardId || target[0].appId;
            const cardVersion = isDebug
              ? 'debug'
              : target[0].version.replace(/\./g, '-') || '';

            await fs.remove('./dist/demo.html');
            await fs.writeFile(
              'dist/plugin.json',
              JSON.stringify(target[0]),
              'utf8',
              function (error) {
                if (error) {
                  throw new Error('error', error);
                }
              },
            );
            // 移动小程序卡片内置资源
            await fs.copy('./build/minih5inner/vue.js', './dist/lib/vue.js');
            await fs.copy('./build/minih5inner/css', './dist/css');
            await fs.copy('./public/', './dist', {
              filter(src) {
                if (/cardlist/.test(src) || /comdto/.test(src)) {
                  return false;
                }

                return true;
              },
            });
            // 创建小程序卡片页面模板
            await fs.outputFile(
              './dist/index.html',
              `
                        <!DOCTYPE html><html lang="en">
                        <head>
                        <meta charset="UTF-8">
                        <!-- H5页面窗口自动调整到设备宽度，并控制用户缩放页面 -->
                        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover"        name="viewport" />
                            <title></title>
                            <link rel="stylesheet" href="./css/vant.css" />
                            <script src="./lib/vue.js"></script>
                            <script src="./${cardId}-${cardVersion}.min.js"></script>
                        </head>
                        <body>
                        <${cardId}-${cardVersion}></${cardId}-${cardVersion}>
                        </body>
                        <script>
                            document.querySelector('${cardId}-${cardVersion}').shadowRoot.querySelector('div').insertAdjacentHTML('beforeend', '<style>@import "./css/common.css";</style>')
                            document.querySelector('${cardId}-${cardVersion}').shadowRoot.querySelector('div').insertAdjacentHTML('beforeend', '<style>@import "./css/vant.css";</style>')
                        </script>
                        </html>`,
            );
            const watcher = chokidar.watch(
              `./dist/${cardId}-${cardVersion}.js`,
              {
                persistent: true,
              },
            );

            const waitFileBuildFinish = function () {
              return new Promise((resolve) => {
                fs.stat(
                  `./dist/${cardId}-${cardVersion}.min.js`,
                  async function (err, stats) {
                    if (err) {
                      resolve(await waitFileBuildFinish());
                    } else {
                      //文件大小
                      if (stats.size === 0) {
                        resolve(await waitFileBuildFinish());
                      } else {
                        setTimeout(() => {
                          resolve(stats.size);
                        }, 1000);
                      }
                    }
                  },
                );
              });
            };
            // 等待.min文件构建完成后再执行后续操作
            const buildFinish = await waitFileBuildFinish();

            if (buildFinish > 0) {
              watcher.on('unlink', () => {
                this._zip('', moduleName, async () => {
                  await fs.moveSync(
                    `./zip/${moduleName}.zip`,
                    `./dist/${moduleName}.zip`,
                  );
                });
                watcher.close();
              });
              fs.remove(`./dist/${cardId}-${cardVersion}.js`);
            }
          }
        }
        // 生成多模块构建信息
        if (isMultiple()) {
          var multipleCompileData = getMultipleCompileData();

          if (multipleCompileData) {
            fs.writeFileSync(
              path.resolve(__dirname, '../dist/multiple.json'),
              JSON.stringify(multipleCompileData, 4),
              'utf8',
            );
          }
        }
      });
    }
  }
}
module.exports = { buildPlugin, moduleType };
