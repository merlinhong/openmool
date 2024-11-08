const fs = require('fs-extra');
const path = require('path');
exports.indexURL = function (name, buildEnv) {
  let indexURL;

  // h5调试时，name为h5，排除
  if (buildEnv && buildEnv !== 'h5') {
    const pluginPath = path.join(__dirname, '../plugin.json');
    let plugin = '';
    let exists = fs.existsSync(pluginPath);

    if (exists) {
      plugin = require(pluginPath);
    }
    plugin.forEach((e) => {
      if (e.moduleName === name) {
        indexURL = e.indexURL;
      }
    });
  } else {
    indexURL = '';
  }

  if (!indexURL) {
    indexURL = name;
  }

  return indexURL;
};
