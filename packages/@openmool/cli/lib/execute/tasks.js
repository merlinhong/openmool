/**
 * @file tasks.js
 */
const { execSync, exec } = require('child_process');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const deepMerge = require('deepMerge');

const {
  mergeDirectories,
  isexists,
  removeDir,
  makeDir,
  moveDir,
  copyTemplateConfig,
  copyFileSync,
  _spinner,
} = require('../util/index');

// 创建目录守卫函数
const makedirSquard = (main, dir, callback) => {
  if (isexists(main, dir)) {
    removeDir(path.resolve(main, dir));
  }
  callback && callback();
};

module.exports = [
  {
    // 任务名称
    name: 'checking if install @vue/cli',
    task(option, taskIns) {
      exec('vue --version', (err, stdout, stderr) => {
        if (err) {
          console.error(`执行命令出错: ${err}`);
          return;
        }
        if (
          stdout.includes('@vue/cli') ||
          /\d+(\.\d+){1,3}([.-]\w+)?/.test(stdout) ||
          stdout.includes('vue/cli')
        ) {
          taskIns.complete();
        } else {
          inquirer
            .prompt([
              {
                type: 'confirm',
                name: 'confirmation',
                message: 'you have no install VUE CLI, is install VUE CLI now?',
                default: false, // 默认为 "No"
              },
            ])
            .then((answers) => {
              if (answers.confirmation) {
                console.log('npm install @vue/cli -g');
                execSync('npm install @vue/cli -g', { stdio: 'inherit' });
              } else {
                process.exit(1);
              }
            });
        }
      });
    },
  },
  {
    name: 'init project config',
    task(option, taskIns) {
      const { name } = option;
      const spinner = _spinner(
        'creating vue project. The may take a while...\n',
      );
      const configFile = [
        'shared',
        'router',
        'store',
        'mock',
        '.husky',
        'temporary',
        'multiple.json',
        'plugin.json',
        'main.js',
        'main1.js',
        'package.json',
        '_.eslintrc.js',
      ];
      makedirSquard(process.cwd(), name, () => {
        fs.mkdir(
          path.resolve(process.cwd(), `${name}/src`),
          { recursive: true },
          async (err) => {
            const fileArr = [];

            await fs.copy(
              path.resolve(__dirname, `../template/`),
              path.resolve(process.cwd(), `${name}`),
              {
                filter(src) {
                  const mt1 = src.match(
                    /\/template\/(\S\.?[a-z]*(\.[a-z]*)?(\.[a-z]*)?)|$/,
                  )[1];

                  if (!fileArr.includes(mt1) && !configFile.includes(mt1)) {
                    fileArr.push(mt1);
                  }
                  if (!configFile.includes(mt1)) {
                    return true;
                  } else {
                    return false;
                  }
                },
              },
            );
            // 防止触发eslint校验，读取_.eslintrc.js源文件内容写入项目,

            const fileContents = fs.readFileSync(
              path.resolve(__dirname, `../template/_.eslintrc.js`),
              'utf8',
            );

            // 将源文件内容写入目标文件
            fs.writeFileSync(
              path.resolve(process.cwd(), `${name}/.eslintrc.js`),
              fileContents,
              'utf8',
            );
            console.log(`create .eslintrc.js finish`);
            fileArr.map((file) => {
              if (file == 'assets' || file == 'pages') {
                fs.moveSync(
                  path.resolve(process.cwd(), `${name}/${file}`),
                  path.resolve(process.cwd(), `${name}/src/${file}`),
                );
              }
              // console.log(file);

              file && console.log(`create ${file} finish`);
            });
            setTimeout(() => {
              spinner.succeed('init project finished!\n');
              taskIns.complete();
            }, 2000);
          },
        );
      });
    },
  },
  {
    name: 'question the prompt to user and handle the answer',
    task(option, taskIns) {
      require('../create/inquirer').prompt(option, {
        complete: (fn) => {
          fn(option, taskIns);
        },
      });
    },
  },
  {
    name: 'build config',
    task(option, taskIns) {
      const { name, result } = option;
      const routerAndstoreInd = result.findIndex(
        (answer) => answer.name === 'routerAndstore',
      );
      if (result[routerAndstoreInd].prompt) {
        result.splice(routerAndstoreInd, 1);
        result.splice(
          routerAndstoreInd,
          0,
          { name: 'router', prompt: true },
          { name: 'store', prompt: true },
        );
      }

      console.log('result', result);
      const subpackage = result.filter(
        (answer) => answer.name === 'subpackage',
      )[0];

      const spinner_1 = _spinner('create build config ......');
      copyTemplateConfig(
        name,
        result.filter((answers) => answers.prompt),
        () => {
          spinner_1.stop();
          // 创建build目录并拷贝
          if (isexists(process.cwd(), `${name}/build`)) {
            removeDir(path.resolve(process.cwd(), `${name}/build`));
          }
          makeDir(process.cwd(), `${name}/build`);
          fs.copy(
            path.resolve(__dirname, '../../../cli-service/build'),
            path.resolve(process.cwd(), `${name}/build`),
            {
              filter: (src) =>
                !subpackage.prompt ? !/multiple/.test(src) : true,
            },
          )
            .then(() => {
              // 引入vuecli的build配置
              fs.writeFile(
                path.resolve(process.cwd(), `${name}/vue.config.js`),
                `const config = require('./build');\nconst options = process.env.NODE_ENV === 'production' ? config.build : config.dev;\n\nmodule.exports = options;`,
                (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                  spinner_1.succeed('create build successful!');
                },
              );
            })
            .catch((err) => {
              console.log(err);
            });
        },
      );
    },
  },
];
