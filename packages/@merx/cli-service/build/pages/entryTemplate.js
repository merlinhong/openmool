const { getMultiFile } = require('@vuecli-build/cli-shared-utils');
const path = require('path');

module.exports = {
  entry: {
    path: '../../src/pages/main.js',
    entries: getMultiFile(path.resolve(__dirname, '../../src/pages/main.js')),
  },
  template: {
    path: '../../src/pages/index.html',
    templates: getMultiFile(
      path.resolve(__dirname, '../../src/pages/index.html'),
    ),
  },
};
