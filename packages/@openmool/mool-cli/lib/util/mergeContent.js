const fs = require('fs-extra');
const path = require('path');
module.exports = (mergePath, mergeContent, splitStr, cb) => {
  let splitStrIndex = '';
  let updatedContent = '';
  fs.readFile(path.resolve(__dirname, mergePath), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    splitStrIndex = data.indexOf(splitStr);
    updatedContent = `${data.substring(
      0,
      splitStrIndex,
    )}${mergeContent}${data.substring(splitStrIndex)}`;
    cb && cb(updatedContent);
  });
};
