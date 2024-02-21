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
    name: 'if need husky(gitHooks) for your project',
    task(option, taskIns) {
      const { name } = option;
      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'confirmation',
            message: 'if need husky(gitHooks) for your project',
            default: false, // 默认为 "No"
          },
        ])
        .then((answers) => {
          if (answers.confirmation) {
            fs.mkdir(
              path.resolve(process.cwd(), name),
              { recursive: true },
              (err) => {
                fs.copyFile(
                  path.resolve(__dirname, '../template/package.json'),
                  path.resolve(process.cwd(), `${name}/package.json`),
                  (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }
                    taskIns.complete();
                  },
                );
              },
            );
          } else {
            taskIns.complete();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // // 是否提交前检测
      // if (resolve('husky').prompt) {
      //   let sourceobj =
      //     JSON.parse(
      //       fs.readFileSync(
      //         path.resolve(__dirname, '../template/package.json'),
      //         'utf8',
      //       ),
      //     ) || {};
      //   let targetobj =
      //     JSON.parse(
      //       fs.readFileSync(
      //         path.join(process.cwd(), `${name}/package.json`),
      //         'utf8',
      //       ),
      //     ) || {};
      //   let mergeObj = deepMerge(targetobj, sourceobj);

      //   fs.writeFile(
      //     path.join(process.cwd(), `${name}/package.json`),
      //     JSON.stringify(mergeObj, null, 2),
      //     (err) => {
      //       if (err) {
      //         console.error(err);
      //         return;
      //       }
      //     },
      //   );
      // }
    },
  },
  {
    name: 'create vue project and init husky ',
    task(option, taskIns) {
      const { name } = option;

      execSync(`vue create ${name}`, { stdio: 'inherit' });

      const spinner = _spinner('initing husky...');

      try {
        execSync(`cd ${name} && npx husky-init`, {
          stdio: 'inherit',
        });
        removeDir(path.resolve(process.cwd(), `${name}/.husky`));
        fs.copySync(
          path.resolve(__dirname, '../template/.husky'),
          path.resolve(process.cwd(), `${name}/.husky`),
        );
        // console.log('husky init finished!');
        console.log('\n');
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
        return;
      }
      // createVueProject(name);
      // // 获取生成的项目目录
      // function createVueProject(name) {
      //   if (isexists(process.cwd(), name)) {
      //     if (isexists(__dirname, 'merge')) {
      //       mergeDirectories(
      //         path.join(process.cwd(), name),
      //         path.join(__dirname, 'merge'),
      //       );
      //       console.log('merge  successful!');
      //       removeDir(path.join(__dirname, 'merge'));
      //     }
      //   } else {
      //     console.log('no file and is not a directory');
      //     process.exit(1);
      //   }
      // taskIns.complete();
      // }
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
      result.splice(routerAndstoreInd, 1);
      result.splice(
        routerAndstoreInd,
        0,
        { name: 'router', prompt: true },
        { name: 'store', prompt: true },
      );
      const shared = result.filter((answer) => answer.name === 'shared')[0];
      const multiple = result.filter((answer) => answer.name === 'multiple')[0];
      const copyfilelist = ['index.html', 'index.vue', 'main.js'];
      if (!shared.prompt) {
        copyfilelist[2] = 'main1.js';
      }
      const spinner_1 = _spinner('create build config ......');
      const moduleName = result.pop().name;
      copyTemplateConfig(
        name,
        result.filter((answers) => answers.prompt),
        () => {
          spinner_1.stop();
          copyFileSync(name, moduleName, copyfilelist);

          // 创建build目录并拷贝
          if (isexists(process.cwd(), `${name}/build`)) {
            removeDir(path.resolve(process.cwd(), `${name}/build`));
          }
          makeDir(process.cwd(), `${name}/build`);
          fs.copy(
            path.resolve(__dirname, '../build'),
            path.resolve(process.cwd(), `${name}/build`),
            {
              filter: (src) =>
                !multiple.prompt ? !/multiple/.test(src) : true,
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
