import Util from './index';
import qs from 'qs';
import axios from 'axios';
import ejsFetch from './request.fetch';
import { Toast } from 'vant';
import refreshToken from './request.refresh';
import Cookie from './cookie';

const defaultSettings = {
  type: 'post',
  url: '',
  data: '',
  dataType: 'json',
  timeout: 10000,
  headers: {},
  contentType: 'application/x-www-form-urlencoded',
  withCredentials: false,
  delay: 0,
  isAutoProxy: Config.ajax.isAutoProxy,
  baseURL: '',
  transformRequest: [],
  transformResponse: [],
  paramsSerializer: null,
  adapter: null,
  params: null,
  xsrfCookieName: '',
  xsrfHeaderName: '',
  uploading: function () {},
  downloading: function () {},
  maxContentLength: 2000,
  validateStatus: null,
  auth: null,
  proxy: null,
  isUseEjsFetchAjax: Config.isUseEjsFetchAjax,
  success: () => {},
  error: () => {},
  complete: () => {},
};

// 声明一个数组用于存储每个下拉刷新ajax请求的取消函数
let pending = [];
// 构造函数，用于取消接口请求
let CancelToken = axios.CancelToken;
// 将已中断或已完成的下拉刷新请求从队列中移除
let removePending = () => {
  for (let p in pending) {
    if (Object.prototype.hasOwnProperty.call(pending, p)) {
      //当前数组中存在请求时执行取消函数
      pending[p].f('canceled');
      //把这条记录从数组中移除
      pending.splice(p, 1);
    }
  }
};
// 该请求是否是下拉刷新请求
let isMinirefresh = false;

let params = {};
const setHeader = function (key, value) {
  const { headers } = params;

  headers[key] = value;
};
// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];
// 请求次数，如果大于最大请求次数则会直接进入错误回调，防止无限循环
let requestCount = 0;

/**
 * 判断组件是否大于某版本
 * @param {String} pluginName 组件名称
 * @param {String} version 需要判断的版本
 * @return {Boolean} 返回布尔值
 */
function pluginVersion(pluginName, version) {
  return new Promise(function (resolve, reject) {
    ejs.runtime.getPluginVersion({
      pluginName: pluginName,
      success: function (result) {
        if (result.version >= version) {
          resolve(true);
        } else {
          reject(false);
        }
      },
      error: function () {
        reject(false);
      },
    });
  });
}
axios.interceptors.request.use(
  async (config) => {
    if (isMinirefresh) {
      // 标识为下拉刷新请求时，需要取消上一次下拉刷新请求
      removePending();
      // 存储此次下拉刷新请求的取消函数
      config.cancelToken = new CancelToken((c) => {
        pending.push({ f: c });
      });
    }

    if (config.isAutoProxy) {
      const token = await getToken();

      if (typeof token === 'string') {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (!ejs.os.ejs) {
        config.withCredentials = true;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  function (response) {
    const { status } = response;

    if (status === 403) {
      const config = response.config;

      if (!isRefreshing) {
        isRefreshing = true;

        // 说明token过期了,刷新token
        return refreshToken(requestCount)
          .then(() => {
            requestCount++;

            isRefreshing = false;
            // 获取当前失败的请求
            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach((cb) => cb());
            // 重试完了别忘了清空这个队列
            requests = [];

            return axios(config);
          })
          .catch(() => {
            //   超过最大次数，返回登陆页面
            isRefreshing = false;
            if (ejs.os.ejs) {
              ejs.auth.logoutUserWithAlert({
                title: '提醒',
                message: '用户身份失效，请重新登录',
              });
            } else if (Config.token.isUseSelfToken) {
              Config.token.refreshToken && Config.token.refreshToken();
            }

            // 刷新token失败，跳转到首页重新登录吧
            return response;
          });
      }

      // 正在刷新token，返回一个未执行resolve的promise
      return new Promise((resolve) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        requests.push(() => {
          resolve(axios(config));
        });
      });
    } else if (status === 401) {
      if (ejs.os.ejs) {
        ejs.auth.logoutUserWithAlert({
          title: '提醒',
          message: '用户身份失效，请重新登录',
        });
      }
    } else if (status === 417) {
      // ejs框架版本需大于3.5.0
      pluginVersion(ejs.os.ios ? 'EJSFramework' : 'ejs', '3.5.0').then(
        function () {
          ejs.auth.logoutUserWithAlert({
            title: '提醒',
            message:
              '您的账号已在其他设备登录，若不是本人操作，请尽快修改密码！',
            success: function () {},
            error: function () {},
          });
        },
      );
    } else if (status === 429) {
      // 429状态进入，用于验证频繁请求
      const { responseText } = response;
      const config = response.config;

      if (!isRefreshing) {
        isRefreshing = true;

        // 说明token过期了,刷新token
        return refreshToken(requestCount, responseText)
          .then(() => {
            requestCount++;

            isRefreshing = false;
            // 获取当前失败的请求
            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach((cb) => cb());
            // 重试完了别忘了清空这个队列
            requests = [];

            return axios(config);
          })
          .catch(() => {
            //   超过最大次数，返回登陆页面
            isRefreshing = false;
            if (ejs.os.ejs) {
              pluginVersion(ejs.os.ios ? 'EJSFramework' : 'ejs', '3.5.0').then(
                function () {
                  ejs.auth.logoutUserWithAlert({
                    title: '提醒',
                    message: '用户身份失效，请重新登录',
                  });
                },
              );
            } else if (Config.token.isUseSelfToken) {
              Config.token.refreshToken && Config.token.refreshToken();
            }

            return response.data;
          });
      }

      // 正在刷新token，返回一个未执行resolve的promise
      return new Promise((resolve) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        requests.push(() => {
          resolve(axios(config));
        });
      });
    }

    if (isMinirefresh) {
      // 下拉刷新请求完成，从数组中移除
      removePending();
    }

    return response;
  },
  function (error) {
    //网络超时异常处理
    if (
      error.code === 'ECONNABORTED' ||
      error.message === 'Network Error' ||
      error.message.includes('timeout')
    ) {
      ejs.ui.closeWaiting();
      ejs.ui.toast('请求超时，请稍后重试');
    }

    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

function getToken() {
  return new Promise((resolve, reject) => {
    if (ejs.os.ejs) {
      ejs.auth.getToken({
        success: function (result) {
          resolve(result.access_token);
        },
        error(err) {
          reject(new Error(err));
        },
      });
    } else if (Config.token.isUseSelfToken) {
      if (ejs.os.xm) {
        // iam  Token获取
        ejs.storage.getShareItem({
          key: 'xmtoken',
          success: function (result) {
            let xmtoken = result.xmtoken || '';

            if (xmtoken) {
              resolve(xmtoken);
            } else {
              xm.getAuthCode({ type: 'iam' }).then((res) => {
                var data = {
                  appId: Config.h5Env && Config.h5Env.appId,
                  appSecret: Config.h5Env && Config.h5Env.appSecret,
                  ssoToken: res.encryptedString,
                };

                data = {
                  params: JSON.stringify(data),
                };
                ajax({
                  url: Config.serverUrl + 'shinemo/getToken',
                  data: data,
                  isAutoProxy: false,
                  success: function (result) {
                    if (result.status && Number(result.status) === 1) {
                      let token = result.data.token;
                      console.log('token', token);
                      ejs.storage.setShareItem({
                        xmtoken: result.data.token,
                        success: function (result) {
                          resolve(token);
                        },
                        error: function (error) {},
                      });
                    } else {
                      const message =
                        result.message || '令牌失效,请重新开启认证';

                      reject({
                        message: message,
                      });
                    }
                  },
                  error: function (err) {
                    reject(err);
                  },
                });
              });
            }
          },
          error: function (error) {},
        });

        /*xm.getStorage({ key: 'xmtoken', isGlobal: true })
                    .then((result) => {
                        if (result) {
                            if (result.indexOf("'") != -1 || result.indexOf('"') != -1) {
                                resolve(JSON.parse(result));
                            } else {
                                resolve(result);
                            }
                        } else {
                            ajax({
                                url: Config.serverUrl + 'shinemo/getStillToken',
                                data: {
                                    params: JSON.stringify({
                                        logidid: Config.tokenLogidid
                                    })
                                },
                                isAutoProxy: false,
                                success: function (result) {
                                    xm.setStorage({ key: 'xmtoken', value: result.data.token, isGlobal: true }).then(
                                        () => {
                                            resolve(result.data.token);
                                        }
                                    );
                                },
                                error: function (err) {
                                    reject(err);
                                }
                            });
                        }
                    })
                    .catch((result) => {
                        ajax({
                            url: Config.serverUrl + 'shinemo/getStillToken',
                            data: {
                                params: JSON.stringify({
                                    logidid: Config.tokenLogidid
                                })
                            },
                            isAutoProxy: false,
                            success: function (result) {
                                xm.setStorage({ key: 'xmtoken', value: result.data.token, isGlobal: true }).then(() => {
                                    resolve(result.data.token);
                                });
                            },
                            error: function (err) {
                                reject(err);
                            }
                        });
                    });*/
      } else {
        if (Config.isProduction) {
          // 主要用于在浏览器调试 外网和内网环境
          Config.token.getToken().then((token) => {
            if (typeof token === 'string') {
              resolve(token);
            } else {
              reject(new Error());
            }
          });

          return;
        }
        ejs.storage.getShareItem({
          key: 'xmtoken',
          success: function (result) {
            let xmtoken = result.xmtoken || '';

            if (xmtoken) {
              resolve(xmtoken);
            } else {
              ajax({
                url: Config.serverUrl + 'shinemo/getStillToken',
                data: {
                  params: JSON.stringify({
                    logidid: Config.tokenLogidid,
                  }),
                },
                isAutoProxy: false,
                success: function (result) {
                  let token = result.data.token;

                  ejs.storage.setShareItem({
                    xmtoken: result.data.token,
                    success: function (result) {
                      resolve(token);
                    },
                    error: function (error) {},
                  });
                },
                error: function (err) {
                  reject(err);
                },
              });
            }
          },
          error: function (error) {},
        });
      }
    } else {
      let token = Cookie.get('access_token') || '';

      resolve(token);
    }
  });
}
async function ajax(options) {
  options = Util.extend(defaultSettings, options);
  isMinirefresh = options.isMinirefresh || false;

  params = {
    url: options.url,
    method: options.type,
    data: options.data,
    headers: options.headers,
    baseURL: options.baseURL,
    responseType: options.dataType,
    withCredentials: options.withCredentials,
    transformRequest: options.transformRequest,
    transformResponse: options.transformResponse,
    params: options.params,
    paramsSerializer: options.paramsSerializer,
    timeout: options.timeout,
    adapter: options.adapter,
    auth: options.auth,
    onUploadProgress: options.uploading,
    onDownloadProgress: options.downloading,
    maxContentLength: options.maxContentLength,
    validateStatus: options.validateStatus,
    proxy: options.proxy,
  };

  const {
    delay,
    contentType,
    headers,
    isAutoProxy,
    error,
    success,
    complete,
    beforeSend,
    isUseEjsFetchAjax,
  } = options;

  // 设置重试延迟
  axios.defaults.retryDelay = delay;

  // 采用原生fetch代理所有ajax
  if (ejs.os.ejs && isUseEjsFetchAjax) {
    axios.defaults.adapter = ejsFetch;
  }

  for (const key in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, key)) {
      setHeader(key, headers[key]);
    }
  }

  if (contentType) {
    setHeader('Content-Type', contentType);
    if (Object.prototype.toString.call(options.data) !== '[object FormData]') {
      if (!contentType.match('application/json')) {
        params.data = qs.stringify(options.data);
      }
    } else {
      // 表单提交类型
      params.data = options.data;
    }
  }

  axios.defaults.isAutoProxy = isAutoProxy;

  if (typeof beforeSend === 'function') {
    beforeSend(axios);
  }

  return new Promise((resolve, reject) => {
    axios(params)
      .then((response) => {
        const { status, statusText, data } = response;

        if (
          (status !== 200 && statusText !== 'OK') ||
          typeof data.errcode === 'number' ||
          data.error
        ) {
          if (Config.ajax.isAutoErrToast) {
            Toast(data.errmsg);
          }
          reject(data);
          error && error(data);
        } else {
          success && success(data, response);
          resolve(data, response);
        }
      })
      .catch((err) => {
        if (isMinirefresh && err.message === 'canceled') {
          // 如果是下拉刷新请求取消，不需要走error回调
          return;
        }

        error && error(err);
        reject(err);
      })
      .then(() => {
        complete();
      });
  });
}

function ajaxAll(...args) {
  return axios.all(args);
}

export { ajax, ajaxAll };
