const path = require('path');
const pageParams = require('./entryTemplate');
const fs = require('fs-extra');

const ENV = process.env.NODE_ENV;

// 构建时情况node_modules/.cache缓存文件，防止构建时被缓存影响
if (ENV === 'production') {
  try {
    fs.emptyDirSync(path.resolve(process.cwd(), 'node_modules/.cache'));
  } catch (e) {
    console.error(e);
  }
}

/** 纯函数
 *  打包入口配置对象
 * @param {Object} options
 * @returns {Object} 返回多个打包入口的配置对象pages
 */
function Pages(options) {
  const {
    entry: { entries },
    template: { templates },
  } = options;

  let pages = {};

  let dir;

  if (entries && Array.isArray(entries)) {
    entries.forEach((entry, index) => {
      dir = 'index';
      const template = templates[index];
      pages[dir] = {
        entry,
        template: template || 'public/index.html',
        // filename: `${dir}.html`,
      };
    });
  }
  return pages;
}
module.exports = Pages(pageParams);
