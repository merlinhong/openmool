/**
 * @file index.js
 */
class Task {
  constructor(tasklistinstance, taskFn) {
    this.tasklistinstance = tasklistinstance;
    this.taskFn = taskFn;
  }
  run(option) {
    this.taskFn(this.getContext(), this);
  }
  complete(option) {
    this.tasklistinstance.next();
  }
  getContext() {
    return this.tasklistinstance.getContext();
  }
  error() {}
}

module.exports = class TaskList {
  constructor(task, option) {
    this._task = task;
    this._index = 0;
    this._status = 'ready';
    this._option = option;
    this._context = Object.create(option);
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }
  run() {
    // this.task
    this._status = 'running';
    this._startTask(0);
    return this._promise;
  }
  getContext() {
    return this._context;
  }
  _startTask(index) {
    // this._task[index].task(this.next.bind(this), this._option);
    const { task, name } = this._task[index];
    new Task(this, task).run();
  }
  next() {
    this._index++;
    if (this._index >= this._task.length) {
      this.done();
    } else {
      this._startTask(this._index);
    }
  }
  done() {
    this._status = 'done';
    // this._reject('任务执行完成');
    this._resolve(this._context);
  }
};
