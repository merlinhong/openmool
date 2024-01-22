/**
 * @file index.js
 */

module.exports = class Task {
  constructor(task, option) {
    this._task = task;
    this._index = 0;
    this._status = 'ready';
    this._option = option;
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    console.log(333, this._index);
  }
  run() {
    // this.task
    this._status = 'running';
    this._startTask(0);
    return this._promise;
  }
  _startTask(index) {
    this._task[index].task(this.next.bind(this), this._option);
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
  }
};
