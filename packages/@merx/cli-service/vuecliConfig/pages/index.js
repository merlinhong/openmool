const path = require('path');
const pageParams = require('./entryTemplate');
const fs = require('fs-extra');

const ENV = process.env.NODE_ENV;
const isDevBuildShowcase = 0;
const isProBuildShowcase = 0;
for (const i in pageParams) {
  if (Object.prototype.hasOwnProperty.call(pageParams, i)) {
    pageParams[i].run();
  }
}

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
 * @param {Boolean} isDevBuildShowcase 入口集合
 * @param {Boolean} isProBuildShowcase index.htm模块集合
 * @param {String} env 打包环境全局变量
 * @param {Object} options
 * @returns {Object} 返回多个打包入口的配置对象pages
 */
function Pages(isDevBuildShowcase = 0, isProBuildShowcase = 0, env, options) {
  const {
    entry: { entries },
    template: { templates },
    showCaseEntry: { showCaseEntries },
    showCaseTemplate: { showCaseTemplates },
  } = options;

  let pages = {};

  let dir;

  let getDirName = function (_path) {
    let dir = '';

    if (_path) {
      const _pathArray = _path.split('/');

      dir = _pathArray[_pathArray.length - 2];
    }

    return dir;
  };
  if (entries && Array.isArray(entries)) {
    entries.forEach((entry, index) => {
      dir = 'index';
      const template = templates[index];

      pages[dir] = {
        entry,
        template: template || 'public/index.html',
        filename: `${dir}.html`,
      };
    });

    if (isProBuildShowcase && Array.isArray(showCaseEntries)) {
      showCaseEntries.forEach((entry, index) => {
        const dirPath = getDirName(entry);
        const template = showCaseTemplates[index];

        pages[dirPath] = {
          entry,
          template,
          filename: `${dirPath}.html`,
        };
      });
    }
  }

  if (
    env === 'development' &&
    isDevBuildShowcase &&
    showCaseEntries &&
    Array.isArray(showCaseEntries)
  ) {
    showCaseEntries.forEach((entry, index) => {
      const dirPath = getDirName(entry);
      const template = showCaseTemplates[index];

      pages[dirPath] = {
        entry: entry,
        template: template,
        filename: `${dirPath}.html`,
      };
    });
  }

  return pages;
}
const pages = Pages(isDevBuildShowcase, isProBuildShowcase, ENV, pageParams);
module.exports = pages;
