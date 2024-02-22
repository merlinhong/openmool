/**
 * @file meta.js
 */

module.exports = {
  prompts: {
    husky: {
      type: 'confirm',
      message: 'if use husky for your project',
    },
    routerAndstore: {
      type: 'confirm',
      message: `if need configure module's own route and store(subpackage)? (recommond)`,
    },
    subpackage: {
      type: 'confirm',
      message: 'if need to build single or multiple packages',
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
    tool: {
      type: 'confirm',
      message: 'if need a tool library for your project',
    },
  },
  complete: async (option, taskIns) => {
    const { name, result } = option;

    const mergeContent = require('../util/mergeContent');
    const { isexists, makeDir, removeDir, _spinner } = require('../util');
    const deepMerge = require('deepMerge');
    const path = require('path');
    const fs = require('fs-extra');

    let packageJson = {
      name,
      version: '1.0.1',
    };

    const resolve = (type) => {
      const filter = (result, typeArr) =>
        result.filter((answer) => typeArr.includes(answer.name));
      return filter(result, [
        'client',
        'shared',
        'tool',
        'vant',
        'husky',
        'subpackage',
      ]).find((item) => item.name === type);
    };

    const isSubpackage = result.filter(
      (answer) => answer.name === 'routerAndstore',
    )[0].prompt;

    if (resolve('husky').prompt) {
      packageJson.devDependencies = {
        '@commitlint/cli': '^16.3.0',
        '@commitlint/config-conventional': '^16.2.4',
        '@commitlint/cz-commitlint': '^16.3.0',
        '@commitlint/format': '^12.1.1',
        '@commitlint/prompt-cli': '^16.3.0',
        husky: '8.0.3',
        'lint-staged': '^14.0.1',
      };

      const spinner = _spinner('initing husky...\n');

      try {
        fs.copySync(
          path.resolve(__dirname, '../template/.husky'),
          path.resolve(process.cwd(), `${name}/.husky`),
        );
        // console.log('husky init finished!');
        spinner.succeed('husky init finished!');

        // 写入配置文件
        fs.writeFileSync(
          path.resolve(process.cwd(), `${name}/.lintstagedrc.js`),
          `module.exports = {\n  '**/*.{js,mjs,cjs,ts,cts,mts}': ['prettier --write', 'eslint --cache']\n  };
            `,
          'utf8',
        );
        // 写入配置文件
        fs.writeFileSync(
          path.resolve(process.cwd(), `${name}/commitlint.config.js`),
          `module.exports = {\n  extends: ['@commitlint/config-conventional']\n  };
            `,
          'utf8',
        );
        taskIns.complete();
      } catch (error) {
        console.log(error);
      }
    }

    let addContent = '';
    let temporaryDir = '../template/temporary'; // 临时待拷贝的文件夹
    let splitStr = '// configMain hook';
    let mainpath = isSubpackage ? '/main.js' : '/main1.js';
    // makedirSquard(__dirname, temporaryDir);

    // 先确定模板

    // 全局配置文件
    if (resolve('shared').prompt) {
      addContent = `import '@shared/config.js';\n`;
    }
    // 添加公共css文件
    addContent += `import '@assets/css/common.css';\n`;

    // 客户端
    if (resolve('client').prompt === 'mobile') {
      option.result.unshift({ name: 'lib', prompt: true });
      addContent += `import loaderLibrary from '@tool/loadlibrary';\n`;
      if (resolve('vant').prompt) {
        addContent += `import 'vant/lib/icon/local.css';\nloaderLibrary({\n   inject: 'head',\n    src: './lib/vconsole.min.js',\n    type: 'js'\n})\n`;
        packageJson.dependencies = {
          vant: '^2.12.7',
        };
      }
    }
    // 工具库
    if (resolve('tool').prompt) {
      fs.copySync(
        path.resolve(__dirname, '../../../cli-shared-utils/util'),
        path.join(process.cwd(), `${name}/src/tool`),
      );
    }
    if (resolve('subpackage').prompt) {
      fs.copySync(
        path.resolve(__dirname, '../template/multiple.json'),
        path.resolve(process.cwd(), `${name}/multiple.json`),
      );
      fs.copySync(
        path.resolve(__dirname, '../template/plugin.json'),
        path.resolve(process.cwd(), `${name}/plugin.json`),
      );
    }
    // 写入package.json文件
    fs.readFile(
      path.resolve(__dirname, '../template/package.json'),
      'utf8',
      (err, json) => {
        let data = deepMerge(JSON.parse(json), packageJson);
        const newData = JSON.stringify(data, null, 2);
        fs.writeFileSync(
          path.resolve(process.cwd(), `${name}/package.json`),
          newData,
        );
      },
    );
    // 合并入口文件并写入

    mergeContent(
      temporaryDir + mainpath,
      addContent,
      splitStr,
      async (mergeData) => {
        fs.writeFile(
          path.resolve(process.cwd(), `${name}/src/pages${mainpath}`),
          mergeData,
          async (err) => {
            if (err) {
              console.error(err);
              return;
            }
            taskIns.complete();
          },
        );
      },
    );
  },
};
