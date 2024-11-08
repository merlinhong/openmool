const TaskList = require('../execute/index');
const tasks = require('../execute/tasks');

process.on('exit', (code) => {
  // 在程序退出时执行的逻辑
});

module.exports = (name, option) => {
  new TaskList(tasks, { name })
    .run()
    .then((option) => {
      // process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};
