/* eslint-disable camelcase */
/*
 * 作者: 吴松泽
 * 创建时间: 2021-07-28 09:45:40
 * 修改时间: 2022-05-26 09:38:55
 * 版本: [1.0]
 * 版权: 国泰新点软件股份有限公司
 * 描述: 刷新token代码
 */

import { ajax } from './request';
import Cookie from './cookie';
// 最大请求次数
const MAX_REQUEST_COUNT = 2;

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

function h5Refresh() {
  return new Promise((resolve, reject) => {
    if (ejs.os.xm) {
      console.log('-----------refreshToken-----------');
      // iam  Token获取
      xm.getAuthCode({ type: 'iam' }).then((res) => {
        var data = {
          appId: Config.h5Env && Config.h5Env.appId,
          appSecret: Config.h5Env && Config.h5Env.appSecret,
          ssoToken: res.encryptedString,
        };

        console.log('-----------refreshData-----------');
        console.log(data);

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

              ejs.storage.setShareItem({
                xmtoken: result.data.token,
                success: function (result) {
                  resolve(token);
                },
                error: function (error) {},
              });
            } else {
              const message = result.message || '令牌失效,请重新开启认证';

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
  });
}

function h5Refresh1() {
  return new Promise((resolve, reject) => {
    var data = {
      // 'client_id': '07057b7b-4faf-4ec7-a125-f5e8ce14de27',
      client_id: Config.h5Env && Config.h5Env.clientId,
      refresh_token: Cookie.get('refresh_token') || '',
      // 'client_secret': 'ad083d79-aab0-41f9-81d0-f59fb97b5674',
      client_secret: Config.h5Env && Config.h5Env.clientSecret,
      grant_type: 'refresh_token',
    };

    data = {
      params: JSON.stringify(data),
    };
    // var ssoUrl = Cookie.get('h5Home_sso_url');
    ejs.storage.getItem({
      key: 'h5Home_sso_url',
      success: function (res) {
        const ssoUrl = res.h5Home_sso_url;

        ajax({
          url: ssoUrl + '/rest/oauth2/token',
          data: data,
          isAutoProxy: false,
          success: function (result) {
            if (result.status && Number(result.status.code) === 1) {
              var resToken = result.custom;

              Cookie.set('refresh_token', resToken.refresh_token);
              Cookie.set('access_token', resToken.access_token);

              resolve(resToken.access_token);
            } else {
              const message = (result.status && result.status.text) || '';

              reject({
                message: message,
              });
            }
          },
          error: function (err) {
            reject(err);
          },
        });
      },
    });
  });
}

// 刷新token
async function refreshToken(count, xhrError) {
  return new Promise((resolve, reject) => {
    if (count < MAX_REQUEST_COUNT) {
      if (ejs.os.ejs) {
        // 429状态进入，用于验证频繁请求
        if (xhrError) {
          pluginVersion('EJSFramework', '3.5.0')
            .then(function () {
              ejs.util.invokePluginApi({
                path: 'workplatform.provider.serverOperation',
                dataMap: {
                  method: 'validateoperationratelimit',
                  errorinfo: JSON.parse(xhrError).customverification,
                },
                success: function () {
                  resolve();
                },
                error: function (err) {
                  reject(new Error(err));
                },
              });
            })
            .catch(function (err) {
              reject(new Error(err));
            });
        } else {
          //   原生刷新token
          ejs.auth.refreshToken({
            success: function () {
              resolve();
            },
            error(err) {
              reject(new Error(err));
            },
          });
        }
      } else {
        h5Refresh()
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject(new Error());
          });
      }
    } else {
      // token刷新次数超过最大次数
      reject(new Error());
    }
  });
}

export default refreshToken;
