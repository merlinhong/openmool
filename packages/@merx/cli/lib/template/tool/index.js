/*
 * 作者: 吴松泽
 * 创建时间: 2020-07-29 20:20:26
 * 修改时间: 2021-08-24 19:47:51
 * @最后修改: 吴松泽
 * 版本: [1.0]
 * 版权: 国泰新点软件股份有限公司
 * 描述: Util库
 */
import { ajax, ajaxAll } from './request';
import upload from './upload';
import base64 from './base64';
import charset from './charset';
import MyDate from './date';
import imagescale from './imagescale';
import math from './math';
import sha1 from './sha1';
import sha256 from './sha256';
import storage from './storage';
import string from './string';
import sm2 from './sm2';
import loaderLibrary from './loadlibrary';
import cookie from './cookie';
const ejsVer = Config.ejsVer;

const os = (() => {
  const { userAgent, appVersion } = window.navigator;

  let version = null;
  let isBadAndroid = false;
  let ios = false;

  let android = (() => {
    const result = userAgent.match(/(Android);?[\s/]+([\d.]+)?/);

    if (result) {
      version = result[2];
      isBadAndroid = !/Chrome\/\d/.test(appVersion);

      return true;
    }

    return false;
  })();

  let iphone = (() => {
    const result = userAgent.match(/(iPhone\sOS)\s([\d_]+)/);

    if (result) {
      ios = true;
      version = result[2].replace(/_/g, '.');

      return true;
    }

    return false;
  })();

  let ipad = (() => {
    const result = userAgent.match(/(iPad).*OS\s([\d_]+)/);

    if (result) {
      ios = true;
      version = result[2].replace(/_/g, '.');

      return true;
    }

    return false;
  })();

  let ejs = (() => {
    return userAgent.match(/EpointEJS/i) || false;
  })();

  let dd = (() => {
    return userAgent.match(/DingTalk/i) || false;
  })();

  let h5 = (() => {
    return (!ejs && !dd) || false;
  })();

  return {
    android,
    version,
    isBadAndroid,
    ios,
    iphone,
    ipad,
    ejs,
    dd,
    h5,
  };
})();

/**
 * 打开页面
 * @param {String} url 要打开的地址
 */
const openPage = (url) => {
  const { location } = window;
  const { pathname } = location;

  let openUrl = null;

  if (typeof pathname === 'string') {
    if (url.indexOf('http') !== -1) {
      openUrl = url;
    } else {
      const pathArr = pathname.split('/');

      pathArr.length -= 1;
      openUrl = `${location.protocol}//${location.host}${pathArr.join(
        '/',
      )}/${url}`;
    }
  }

  if (os.ejs) {
    ejsVer === 3 ? ejs.page.open(openUrl) : ejs.page.openPage(openUrl);
  } else {
    location.href = openUrl;
  }
};

const extend = (...args) => Object.assign({}, ...args);

const uuid = (options) => {
  options = options || {};

  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuidArr = [];
  let i;
  let radix = options.radix || chars.length;
  let len = options.len || 32;
  const type = options.type || 'default';

  len = Math.min(len, 36);
  len = Math.max(len, 4);
  radix = Math.min(radix, 62);
  radix = Math.max(radix, 2);

  if (len) {
    for (i = 0; i < len; i++) {
      uuidArr[i] = chars[0 | (Math.random() * radix)];
    }

    if (type === 'default') {
      len > 23 && (uuidArr[23] = '-');
      len > 18 && (uuidArr[18] = '-');
      len > 13 && (uuidArr[13] = '-');
      len > 8 && (uuidArr[8] = '-');
    }
  }

  return uuidArr.join('');
};

/**
 * 从 URL 截取参数
 * @param {String} key 关键字
 * @returns {String} 返回参数
 */
const getExtraDataByKey = (key) => {
  var url = window.location.href;
  var params = {},
    query = url.substring(url.indexOf('?') + 1),
    arr = query.split('&'),
    rt;

  if (arr && Array.isArray(arr)) {
    arr.forEach(function (item) {
      var tmp = item.split('='),
        keys = tmp[0],
        val = tmp[1];

      if (typeof params[keys] === 'undefined') {
        params[keys] = val;
      } else if (typeof params[keys] === 'string') {
        params[keys] = [params[keys], val];
      } else {
        params[keys].push(val);
      }
    });
  }

  rt = key ? params[key] : params;
  // 匹配到 %xx%xx%xx 的情况进行中文decode
  if (/(%[A-Za-z0-9]{2}){3}/.test(rt)) {
    rt = decodeURI(rt);
  }

  return rt;
};

/**
 * 数据处理
 * @param {Object} response 处理数据
 * @param {Object} options 配置项
 * @returns {Boolean} data or true
 */
const dataProcess = (response, options) => {
  if (typeof response !== 'object') {
    throw new Error(`response的类型为 ${typeof response}`);
  }

  let dataPath = options.dataPath;
  let data = null;

  const handler = (pathAssembly) => {
    let result = null;

    pathAssembly.forEach((path, index) => {
      let resolvePathData = result ? result[path] : response[path];

      if (resolvePathData) {
        result = resolvePathData;
      } else if (index === pathAssembly.length - 1) {
        result = undefined;
      }
    });

    return result;
  };

  if (dataPath) {
    if (Array.isArray(dataPath)) {
      dataPath.forEach((e) => {
        data = handler(e.split('.'));
      });

      return data;
    }

    return handler(dataPath.split('.'));
  }

  return undefined;
};

/**
 * 判断值是否为空
 * @param {String} value 值
 * @returns {Boolean} 验证结果
 */
const isNull = (value) => {
  return value === null || value === undefined;
};

/**
 * 遍历对象或数组
 * @param {Object} arr 对象和数组
 * @param {Function} callback 回调函数
 */
const each = (arr, callback) => {
  callback = typeof callback === 'function' ? callback : function () {};

  if (typeof arr === 'object') {
    for (let i = 0, len = arr.length; i < len; i++) {
      const item = arr[i];

      callback(i, item);
    }
  }
};
let class2type = {};

const type = function (obj) {
  return obj === null || obj === undefined
    ? String(obj)
    : class2type[{}.toString.call(obj)] || 'object';
};

each(
  [
    'Boolean',
    'Number',
    'String',
    'Function',
    'Array',
    'Date',
    'RegExp',
    'Object',
    'Error',
  ],
  function (i, name) {
    class2type['[object ' + name + ']'] = name.toLowerCase();
  },
);

const isObject = function (obj) {
  return type(obj) === 'object';
};

const isPlainObject = function (obj) {
  return (
    exports.isObject(obj) &&
    !exports.isWindow(obj) &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};
/**
 * 得到一个项目的根路径,只适用于混合开发
 * h5模式下例如:http://id:端口/项目名/
 * @param {String} reg 项目需要读取的基本目录
 * @return {String} 项目的根路径
 */
const getProjectBasePath = function (reg) {
  reg = reg || '/pages/';
  var basePath = '';
  var obj = window.location;
  var patehName = obj.pathname;
  // h5
  var contextPath = '';

  // 兼容pages
  // 普通浏览器
  contextPath = patehName.substr(0, patehName.lastIndexOf(reg) + 1);
  // 暂时放一个兼容列表，兼容一些固定的目录获取
  var pathCompatibles = ['/html/', '/'];

  for (
    var i = 0, len = pathCompatibles.length;
    i < len && (!contextPath || contextPath === '/');
    i++
  ) {
    var regI = pathCompatibles[i];

    // 这种获取路径的方法有一个要求,那就是所有的html必须在regI文件夹中,并且regI文件夹中不允许再出现regI目录
    contextPath = patehName.substr(0, patehName.lastIndexOf(regI) + 1);

    if (regI === '/') {
      // 最后的根目录单独算
      var path = patehName;

      if (/^\//.test(path)) {
        // 如果是/开头
        path = path.substring(1);
      }
      contextPath = '/' + path.split('/')[0] + '/';
    }
  }
  // 兼容在网站根路径时的路径问题
  basePath = obj.protocol + '//' + obj.host + (contextPath || '/');

  return basePath;
};
/**
 * 得到一个全路径
 * @param {String} path 路径
 * @return {String} 返回全路径
 */
const getFullPath = (path) => {
  // 全路径
  if (/^(http|https|ftp|epth5|\/\/)/g.test(path)) {
    return path;
  }
  // 是否是相对路径
  var isRelative = /^(\.\/|\.\.\/)/.test(path);

  // 非相对路径，页面路径默认从html目录开始
  path = isRelative ? path : getProjectBasePath() + path;

  return path;
};
/**
 * 将json参数拼接到url中
 * @param {String} url 地址
 * @param {Object} jsonObj 数据
 * @param {Boolean} isTpye 是否相对路径
 * @return {String} 返回最终的url
 */
const getFullUrlByParams = (url, jsonObj, isTpye) => {
  url = url || '';
  url = isTpye === true ? url : getFullPath(url);
  // 将jsonObj拼接到url上
  var extrasDataStr = '';

  if (jsonObj) {
    for (var item in jsonObj) {
      if (Object.prototype.hasOwnProperty.call(jsonObj, item)) {
        if (extrasDataStr.indexOf('?') === -1 && url.indexOf('?') === -1) {
          extrasDataStr += '?';
        } else {
          extrasDataStr += '&';
        }
        extrasDataStr += item + '=' + jsonObj[item];
      }
    }
  }
  url = url + extrasDataStr;

  return url;
};
/**
 * 得到文件的后缀
 * @param {String} path 路径
 * @return {String} 返回后缀
 */
const getPathSuffix = function (path) {
  var dotPos = path.lastIndexOf('.');
  var suffix = path.substring(dotPos + 1);

  return suffix;
};

export default {
  openPage,
  ajax,
  ajaxAll,
  extend,
  uuid,
  getExtraDataByKey,
  os,
  dataProcess,
  loaderLibrary,
  isNull,
  base64,
  charset,
  MyDate,
  imagescale,
  math,
  sha1,
  sha256,
  storage,
  string,
  each,
  upload,
  getFullUrlByParams,
  getPathSuffix,
  sm2,
  type,
  isObject,
  isPlainObject,
  cookie,
};
