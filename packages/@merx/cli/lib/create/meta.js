/**
 * @file meta.js
 */

const { stdout } = require('process');

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
    const deepMerge = require('deepMerge');
    const fs = require('fs-extra');
    const { execSync, exec } = require('child_process');

    const resolve = (type) => {
      const filter = (result, typeArr) =>
        result.filter((answer) => typeArr.includes(answer.name));
      return filter(result, [
        'client',
        'assets',
        'shared',
        'tool',
        'vant',
        'husky',
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

    // 是否提交前检测
    if (resolve('husky').prompt) {
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

          // const spinner = _spinner('init husky...');
          // spinner.stop();

          exec(
            `cd ${name} && npx husky-init && npm install`,
            (err, stdout, stderr) => {
              if (err) {
                console.log(err);
                return;
              }
              // spinner.succeed('husky init finished!');
              removeDir(path.resolve(process.cwd(), `${name}/.husky`));
              fs.copySync(
                path.resolve(__dirname, '../template/.husky'),
                path.resolve(process.cwd(), `${name}/.husky`),
              );
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
            },
          );
        },
      );
    }

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
