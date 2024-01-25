/**
 * @file tasks.js
 */
const { execSync, exec } = require('child_process');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
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
    task(next, name) {
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
          next();
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
    name: 'this action of project name existed ',
    task(next, option) {
      const { name } = option;
      if (isexists(process.cwd(), name)) {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'operate',
              message: 'The project name is already existed,pick an action:',
              choices: ['overwrite', 'merge', 'cancel'],
              filter: (val) => {
                const map = {
                  overwrite: 2,
                  merge: 1,
                  cancel: 0,
                };
                return map[val];
              },
            },
          ])
          .then((answers) => {
            // 退出
            if (answers.operate == 0) {
              process.exit(1);
            }
            // 合并
            if (answers.operate == 1) {
              // 合并本地配置文件
              try {
                if (isexists(__dirname, 'merge')) {
                  removeDir(path.join(__dirname, 'merge'));
                }
                moveDir(process.cwd(), __dirname, name);
              } catch (error) {
                console.log('file permission denied ', error);
                process.exit(1);
              }
            }
            // 重写
            if (answers.operate == 2) {
              removeDir(path.join(process.cwd(), name));
            }
            next();
          });
        return;
      }
      next();
    },
  },
  {
    name: 'create vue project and merge ',
    task(next, option) {
      const { name } = option;
      const spinner = _spinner(' overwriting...');
      spinner.stop();
      execSync(`vue create ${name}`, { stdio: 'inherit' });
      createVueProject(name);
      // 获取生成的项目目录
      function createVueProject(name) {
        if (isexists(process.cwd(), name)) {
          if (isexists(__dirname, 'merge')) {
            mergeDirectories(
              path.join(process.cwd(), name),
              path.join(__dirname, 'merge'),
            );
            console.log('merge  successful!');
            removeDir(path.join(__dirname, 'merge'));
          }
        } else {
          console.log('no file and is not a directory');
          process.exit(1);
        }
        next();
      }
    },
  },
  {
    name: 'question the prompt to user and handle the answer',
    task(next, option) {
      require('../create/inquirer').prompt(option, {
        complete: (fn) => {
          option.next = next;
          fn(option);
        },
      });
    },
  },
  {
    name: 'build config',
    task(next, option) {
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
      const spinner_1 = _spinner('generate build config ......');
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
                },
              );
            })
            .catch((err) => {
              console.log(err);
            });
          spinner_1.succeed('create build successful!');
        },
      );
    },
  },
];
