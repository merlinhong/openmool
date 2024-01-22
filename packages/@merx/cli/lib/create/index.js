const Task = require('../execute/index');
const tasks = require('../execute/tasks');

process.on('exit', (code) => {
  // 在程序退出时执行的逻辑
});

module.exports = (name, option) => {
  console.log('正在执行vue命令创建项目...');
  new Task(tasks, { name }).run();
};
