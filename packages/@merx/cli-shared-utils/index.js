[
  'derServerConfig',
  'getAppType',
  'getDirectoryName',
  'getFileName',
  'getMultiFile',
  'getIndexUrl',
  'resolve',
  'getNetWorkInterface',
  'isObject',
  'leven',
].forEach((m) => {
  Object.assign(exports, require(`./lib/${m}`));
});

exports.chalk = require('chalk');
exports.semver = require('semver');
exports.ora = require('ora');
