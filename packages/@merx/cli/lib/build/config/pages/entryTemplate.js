const { getMultiFile } = require('@vuecli-build/cli-shared-utils');

const getPath = (path) => {
  return getMultiFile(path.resolve(__dirname, path));
};
module.exports = {
  entry: {
    path: '../src/pages/main.js',
    show: true,
    entries: getPath(this.path) || [],
  },
  template: {
    path: '../src/pages/index.html',
    show: true,
    templates: getPath(this.path) || [],
  },
};
