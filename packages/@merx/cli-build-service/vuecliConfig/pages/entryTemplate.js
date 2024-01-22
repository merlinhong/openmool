const { getMultiFile } = require('@ml/cli-shared-utils');

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
  showCaseEntry: {
    path: '../src/showcase/main.js',
    showCaseEntries: [],
    show: false,
    run: function () {
      if (this.show) {
        this.showCaseEntries = getPath(this.path);
      }
    },
  },
  showCaseTemplate: {
    path: '../src/showcase/index.html',
    show: false,
    showCaseTemplates: [],
    run: function () {
      if (this.show) {
        this.showCaseTemplates = getPath(this.path);
      }
    },
  },
};
