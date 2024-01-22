/**
 * @file meta.js
 */

module.exports = {
  prompts: {
    showcase: {
      type: 'confirm',
      message: 'if need showcase(a demo directory for vue project )?',
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
    const client = result.filter((answer) => answer.name === 'client')[0];
    const assets = result.filter((answer) => answer.name === 'assets')[0];
    const shared = result.filter((answer) => answer.name === 'shared')[0];
    const isSubpackage = result.filter(
      (answer) => answer.name === 'routerAndstore',
    )[0].prompt;
    const mergeContent = require('../util/mergeContent');
    const { isexists, makeDir, removeDir } = require('../util');
    const path = require('path');
    const fs = require('fs-extra');
    let addContent = '';
    let templateDir = '../template';
    let temporaryDir = '../template/temporary';
    let splitStr = '// configMain hook';
    if (isexists(__dirname, temporaryDir)) {
      removeDir(path.resolve(__dirname, temporaryDir));
    }
    makeDir(__dirname, temporaryDir);

    // 先确定模板
    templateDir += isSubpackage ? '/main.js' : '/main1.js';
    temporaryDir += isSubpackage ? '/main.js' : '/main1.js';
    await fs.copy(
      path.resolve(__dirname, templateDir),
      path.resolve(__dirname, temporaryDir),
    );
    // 全局配置文件
    if (shared.prompt) {
      addContent = `import '@shared/config.js';`;
    }
    // 公共css文件
    if (assets.prompt) {
      addContent = `import '@assets/css/common.css';\n`;
    }
    // 客户端
    if (client.prompt === 'mobile') {
      option.result.unshift({ name: 'lib', prompt: true });
      addContent = `import loaderLibrary from '@tool/loadlibrary';\n`;
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
