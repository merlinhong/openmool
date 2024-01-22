/*
 * @作者: 陆宇豪
 * @创建时间: 2022-04-12 09:26:04
 * @修改时间: 2022-04-12 16:21:46
 * @版本: [1.0]
 * @版权: 国泰新点软件股份有限公司
 * @描述: ejsm ejs业务中间层，经过评估不做目前ejs的改造，通过中间层个性化，并且做埋点，不涉及底层代码，不做复杂处理
 */

import appInfo from './modulejson';
let ejsm = Object.assign({}, ejs);
let middle = {
  openApp(options) {
    let url = options.relativeUrl;
    let app = options.miniApp;
    let nowApp;

    if (app) {
      nowApp = appInfo[app.appName];
    }

    if (ejs.os.xm) {
      if (nowApp) {
        options.appid = nowApp.xm;
        options.relativeUrl = getFullUrlByParams(
          `./index.html#/${nowApp.routerUrl[app.urlName]}`,
          app.params,
        );
      }
      if (!('params' in options)) {
        options.params = {};
      }
      // if (!('isShowHome' in options)) {
      //     options.isShowHome = false;
      // }
      console.log(options);
      xm.openApp(options);
    } else {
      if (url) {
        url.replace(/.\/index.html#\//g, '../');
      }
      ejs.page.open({
        pageUrl: url,
        useRouter: true,
        pageStyle: 1,
        orientation: 1,
        data: {},
      });
    }
  },
};

/**
 * 将json参数拼接到url中
 * @param {String} url url地址
 * @param {Object} data 需要添加的json数据
 * @param {Boolean} type 是否相对路径
 * @return {String} 返回最终的url
 */

function getFullUrlByParams() {
  var url =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var data = arguments.length > 1 ? arguments[1] : undefined;

  var extrasDataStr = '';

  console.log(data);
  if (data) {
    Object.keys(data).forEach(function (item) {
      if (extrasDataStr.indexOf('?')) {
        extrasDataStr += '?';
      } else {
        extrasDataStr += '&';
      }

      extrasDataStr += ''.concat(item, '=').concat(data[item]);
    });
  }

  url += extrasDataStr;

  return url;
}

ejsm = Object.assign({ mid: middle }, ejs);

window.ejsm = ejsm;
