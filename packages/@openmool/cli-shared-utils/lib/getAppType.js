const fs = require('fs-extra');
const path = require('path');

exports.appType = function (name) {
  let type;

  // h5调试时，name为h5，排除
  if (name && name !== 'h5' && name !== '') {
    const pluginPath = path.join(__dirname, '../plugin.json');
    let plugin = '';
    let exists = fs.existsSync(pluginPath);

    if (exists) {
      plugin = require(pluginPath);
    }
    plugin.forEach((e) => {
      if (e.moduleName === name) {
        type = e.miniH5Type;
      }
    });
  } else {
    type = 'app';
  }

  return type;
};
