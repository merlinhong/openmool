/**
 * @file meta.js
 */

const { log } = require('console');

module.exports = {
  prompts: {
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
    tool: {
      type: 'confirm',
      message: 'if need a tool library for your project',
    },
    pages: {
      type: 'input',
      message: 'please tell me your module directory name',
      default: 'pages',
    },
  },
  complete: async (option, taskIns) => {
    const { name, result } = option;

    const mergeContent = require('../util/mergeContent');
    const { isexists, makeDir, removeDir, _spinner } = require('../util');
    const path = require('path');
    const fs = require('fs-extra');

    const resolve = (type) => {
      const filter = (result, typeArr) =>
        result.filter((answer) => typeArr.includes(answer.name));
      return filter(result, [
        'client',
        'assets',
        'shared',
        'tool',
        'vant',
      ]).find((item) => item.name === type);
    };

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

    let addContent = '';
    let templateDir = '../template';
    let temporaryDir = '../template/temporary'; // 临时待拷贝的文件夹
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
    if (resolve('shared').prompt) {
      addContent = `import '@shared/config.js';\n`;
    }
    // 公共css文件
    if (resolve('assets').prompt) {
      addContent += `import '@assets/css/common.css';\n`;
    }
    // 客户端
    if (resolve('client').prompt === 'mobile') {
      option.result.unshift({ name: 'lib', prompt: true });
      addContent += `import loaderLibrary from '@tool/loadlibrary';\n`;
      if (resolve('vant').prompt) {
        addContent += `import 'vant/lib/icon/local.css';\nloaderLibrary({\n   inject: 'head',\n    src: './lib/vconsole.min.js',\n    type: 'js'\n})\n`;
      }
    }
    // 工具库
    if (resolve('tool').prompt) {
      fs.copySync(
        path.resolve(__dirname, '../../../cli-shared-utils/util'),
        path.join(process.cwd(), `${name}/src/tool`),
      );
    }
    mergeContent(temporaryDir, addContent, splitStr, () => {
      taskIns.complete();
    });
  },
};
