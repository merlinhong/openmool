const path = require('path');

exports.resolve = function (dir) {
  return path.resolve(process.cwd(), './' + dir);
};
