const os = require('os');
exports.getNetWorkInterface = function () {
  return os.networkInterfaces();
};
