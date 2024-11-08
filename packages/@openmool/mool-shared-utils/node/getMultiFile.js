const glob = require('glob');

exports.getMultiFile = function (_path) {
  const entries = [];

  glob.sync(_path).forEach((entry) => {
    entries.push(entry);
  });

  return entries;
};
