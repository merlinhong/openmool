const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');
let isExist = (item, dir, filename) => {
    return new Promise((resolve, reject) => {
        let file = path.resolve(__dirname, `../../src/pages/${item}/${dir}/${filename}.js`);
        let ml_header = '';
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
    let moduleName, h5Type;
    const argv = options.processArgv;

    if (
        argv.length > 3 &&
        argv[argv.length - 1].substring(2) !== 'ALL' &&
        argv[argv.length - 1].substring(2) !== 'Module'
    ) {
        moduleName = argv[argv.length - 1].substring(2);
    }

    h5Type = argv[3] ? argv[3].substring(2) : '';

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
            if (moduleName && h5Type !== 'h5') {
                // 如果指定模块，只构建指定模块
                if (moduleName === filename) {
                    configRouters.push(filename);
                }
            } else {
                configRouters.push(filename);
            }
        });

        if (configRouters.length >= 1) {
            let header = '';
            let ml_header = '';
            let compute = '';
            let ml_compute = '';
            let routerHookReg = new RegExp('// configRouters hook([\\s\\S]+?)', 'g');
            let storeHookReg = new RegExp('// storeModules hook([\\s\\S]+?)', 'g');
            let regArray = ['css', 'img', 'component', '.vue'];

            if (content.match(routerHookReg)) {
                // 路由文件解析
                let getCon = async () => {
                    for (let index = 0; index < configRouters.length; index++) {
                        let item = configRouters[index];
                        let dir = '';
                        // 至多一层router
                        const multiplRouters = fs.readdirSync(path.resolve(__dirname, `../../src/pages/${item}`));
                        for (let i = 0; i < multiplRouters.length; i++) {
                            dir = multiplRouters[i];
                            // if (regArray.indexOf(dir) != -1) {
                            //     return;
                            // }
                            await isExist(item, dir, 'router')
                                .then(() => {
                                    ml_header += `import ${dir} from '../pages/${item}/${dir}/router.js';\n`;
                                    ml_compute += `multiplRouters = multiplRouters.concat(${dir});\n`;
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                        console.log('ml_compute', ml_compute);
                        header += `import ${item} from '../pages/${item}/router.js';\n`;
                        compute += `configRouters = configRouters.concat(${item});\n`;
                        con = ml_header + header + content;
                        con = con.replace(routerHookReg, ml_compute + compute).trim();
                        console.log('con',con);
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
            } else if (content.match(storeHookReg)) {
                // store文件解析
                let isExist = (item) => {
                    return new Promise((resolve) => {
                        let file = path.resolve(__dirname, `../../src/pages/${item}/store.js`);

                        // 判断store.js是否存在
                        fs.access(file, fs.constants.F_OK, (fsErr) => {
                            if (!fsErr) {
                                header += `import ${item} from '../pages/${item}/store.js';\n`;
                                compute += `configStore = configStore.concat(${item});\n`;
                            }
                            resolve();
                        });
                    });
                };
                let afuc = async () => {
                    compute += 'let configStore = [];\n';

                    for (let i = 0; i < configRouters.length; i++) {
                        let item = configRouters[i];

                        await isExist(item);
                    }

                    con = header + content;

                    compute += `if(configStore.length > 0){
                        configStore.forEach((e, n) => {
                            storeModules[e.moduleName] = e;
                        });
                    }
                   `;

                    con = con.replace(storeHookReg, compute).trim();

                    if (!con) {
                        con = content;
                    }

                    callback(null, con);
                };

                afuc();
            }
        }
    });
};
