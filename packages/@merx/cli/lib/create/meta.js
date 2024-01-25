/**
 * @file meta.js
 */

module.exports = {
  prompts: {
    husky: {
      type: 'confirm',
      message: 'if need pre-commit hook for git',
    },
    routerAndstore: {
      type: 'confirm',
      message: `if need configure module's own route and store(subpackage)? (recommond)`,
    },
    multiple: {
      type: 'confirm',
      message: 'if need to build multiple packages at once',
    },
    shared: {
      type: 'confirm',
      message: 'if need to create a globalConfig file ',
    },
    client: {
      type: 'list',
      message: ' please choose your client(mobile or pc)',
      choices: ['mobile', 'pc'],
    },
    vant: {
      type: 'confirm',
      when: 'mobile',
      message: 'if need to use vant component library',
    },
    assets: {
      type: 'confirm',
      message: 'if need assets of common css ',
    },
    pages: {
      type: 'input',
      message: 'please tell me your module directory name',
      default: 'pages',
    },
  },
  complete: async (option) => {
    const { name, result, next } = option;

    const mergeContent = require('../util/mergeContent');
    const { isexists, makeDir, removeDir } = require('../util');

    const path = require('path');
    const deepMerge = require('deepMerge');
    const fs = require('fs-extra');
    const client = result.filter((answer) => answer.name === 'client')[0];
    const assets = result.filter((answer) => answer.name === 'assets')[0];
    const shared = result.filter((answer) => answer.name === 'shared')[0];
    const husky = result.filter((answer) => answer.name === 'husky')[0];
    const isSubpackage = result.filter(
      (answer) => answer.name === 'routerAndstore',
    )[0].prompt;

    // 创建目录守卫函数
    const makedirSquard = (main, dir) => {
      if (isexists(main, dir)) {
        removeDir(path.resolve(main, dir));
      }
      makeDir(main, dir);
    };

    if (husky.prompt) {
      let sourceobj =
        JSON.parse(
          fs.readFileSync(
            path.resolve(__dirname, '../template/package.json'),
            'utf8',
          ),
        ) || {};
      let targetobj =
        JSON.parse(
          fs.readFileSync(
            path.join(process.cwd(), `${name}/package.json`),
            'utf8',
          ),
        ) || {};
      let mergeObj = deepMerge(targetobj, sourceobj);

      // 将新的对象写入到文件中
      fs.writeFile(
        path.join(process.cwd(), `${name}/package.json`),
        JSON.stringify(mergeObj, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }

          makedirSquard(process.cwd(), `${name}/.husky`);
          fs.copySync(
            path.resolve(__dirname, '../template/.husky'),
            path.resolve(process.cwd(), `${name}/.husky`),
          );

          // 拷贝配置文件
          fs.copyFileSync(
            path.resolve(__dirname, '../template/.lintstagedrc.cjs'),
            path.resolve(process.cwd(), `${name}/..lintstagedrc.cjs`),
          );
          fs.copyFileSync(
            path.resolve(__dirname, '../template/commitlint.config.js'),
            path.resolve(process.cwd(), `${name}/commitlint.config.js`),
          );
        },
      );
    }

    let addContent = '';
    let templateDir = '../template';
    let temporaryDir = '../template/temporary';
    let splitStr = '// configMain hook';

    makedirSquard(__dirname, temporaryDir);

    // 先确定模板
    templateDir += isSubpackage ? '/main.js' : '/main1.js';
    temporaryDir += isSubpackage ? '/main.js' : '/main1.js';
    await fs.copy(
      path.resolve(__dirname, templateDir),
      path.resolve(__dirname, temporaryDir),
    );
    // 全局配置文件
    if (shared.prompt) {
      addContent = `import '@shared/config.js';\n`;
    }
    // 公共css文件
    if (assets.prompt) {
      addContent += `import '@assets/css/common.css';\n`;
    }
    // 客户端
    if (client.prompt === 'mobile') {
      option.result.unshift({ name: 'lib', prompt: true });
      addContent += `import loaderLibrary from '@tool/loadlibrary';\n`;
      const vant = result.filter((answer) => answer.name === 'vant')[0];
      if (vant.prompt) {
        addContent += `import 'vant/lib/icon/local.css';\nloaderLibrary({\n   inject: 'head',\n    src: './lib/vconsole.min.js',\n    type: 'js'\n})\n`;
      }
    }
    mergeContent(temporaryDir, addContent, splitStr, () => {
      next();
    });
  },
};
