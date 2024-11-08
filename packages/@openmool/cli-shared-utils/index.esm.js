/*
 * 作者: merlinhong
 * 版本: [1.0]
 * 描述: 工具函数库
 */
import { ajax, ajaxAll } from './util/util/request';
import upload from './util/upload';
import base64 from './util/base64';
import MyDate from './util/date';
import math from './util/math';
import storage from './util/storage';
import string from './util/string';
import loaderLibrary from './util/loadlibrary';
import cookie from './util/cookie';
import _ from './util/lodash';
import deepClone from './util/cloneDeep';
import { type } from './util/type';
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

  let dd = (() => {
    return userAgent.match(/DingTalk/i) || false;
  })();

  let h5 = (() => {
    return !dd || false;
  })();

  return {
    android,
    version,
    isBadAndroid,
    ios,
    iphone,
    ipad,
    dd,
    h5,
  };
})();

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
const getParamByUrl = (key) => {
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
  _,
  deepClone,
  type,
  isObject,
  isPlainObject,
  ajax,
  ajaxAll,
  extend,
  uuid,
  getParamByUrl,
  getFullUrlByParams,

  os,
  loaderLibrary,
  isNull,
  base64,
  MyDate,
  math,
  storage,
  string,
  each,
  upload,
  getPathSuffix,
  sm2,
  cookie,
};
