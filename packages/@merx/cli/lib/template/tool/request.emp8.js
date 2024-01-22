/*
 * 作者: 吴松泽
 * 创建时间: 2022-01-11 15:43:08
 * 修改时间: 2022-01-20 16:49:58
 * 版本: [1.0]
 * 版权: 国泰新点软件股份有限公司
 * 描述: 获取EMP8平台系统参数信息
 */
import sm2 from './sm2';
import { ajax } from './request';
const sm2Pubkey =
  '04A2C5ABFE372540F0CFAB644776B1CEC911F21739042D9FDF8326324357790DBA3E3900338DE4FFDBA48204A176D444687904422180E0B1E3AF316C4CA09AA704';
const getAppKey = (function () {
  let key = '';
  const getKey = () => {
    return new Promise((resolve, reject) => {
      if (ejs.os.ejs) {
        ejs.runtime.getAppKey({
          success: function (res) {
            key = res.appKey;
            resolve(res.appKey);
          },
          error: function (err) {
            console.error(err);
            reject(err);
          },
        });
      } else {
        key = (Config.h5Env && Config.h5Env.clientId) || '';
        resolve(key);
      }
    });
  };
  const result = async function () {
    if (key === '') {
      // 第一次请求异步获取数据并返回
      await getKey();

      return key;
    }

    // 直接返回已缓存的数据
    return key;
  };

  return result;
})();

// 请求参数加密
function entry(text) {
  return new Promise((resolve, reject) => {
    if (ejs.os.ejs) {
      ejs.runtime.securityType({
        success: function (result) {
          if (Number(result.type) !== 0) {
            // 使用ejs容器加密
            ejs.util.encrypt({
              text: JSON.stringify(text),
              success: function (enRes) {
                var encodeRes = encodeURIComponent(enRes.text);

                resolve(encodeRes);
              },
              error: function (error) {
                console.error(JSON.stringify(error));
                reject(error);
              },
            });
          } else {
            var res = JSON.stringify(text);

            resolve(res);
          }
        },
        error: function (error) {
          console.error(JSON.stringify(error));
          reject(error);
        },
      });
    } else {
      const message = JSON.stringify(text);
      const encryptText = sm2.encrypt(message, sm2Pubkey, 0);

      resolve(encryptText);
    }
  });
}
const commonAjax = async (opt, isAutoRequest = true) => {
  return new Promise((resolve) => {
    getAppKey().then(async (res) => {
      var data = opt.data;
      var isEncrypt = opt.isEncrypt === false ? false : true;

      opt.data = {
        params: isEncrypt ? await entry(data) : JSON.stringify(data),
      };
      opt.headers = {
        clientid: res,
      };
      if (isAutoRequest) {
        return ajax(opt);
      }
      resolve(opt);
    });
  });
};

const getEmpParams = () => {
  return new Promise((resolve, reject) => {
    if (!Config.h5Env.empServerUrl) {
      console.error('请设置empServerUrl接口地址');

      return;
    }

    commonAjax({
      url: ejs.os.xm
        ? Config.h5Env.empServerUrl + '/mobile/system/appstartparams'
        : './epoint-onm-rest/rest' + '/mobile/system/appstartparams',
      data: {
        appguid: Config.h5Env.clientId,
        platform: ejs.os.ios ? '5' : '2',
        version: '8.2.0',
      }, // 版本标识（8.2.0版本必填，固定值为  8.2.0）,
      isAutoProxy: false, // 注意：需要为false
      success: (data) => {
        if (data && data.status && Number(data.status.code) === 1) {
          resolve(data.custom);
        } else {
          reject(data.status);
        }
      },
      error: (err) => {
        reject(err);
      },
      complete: () => {
        ejs.ui.closeWaiting();
      },
    });
  });
};

const saveEmpParams = () => {
  return new Promise((resolve) => {
    if (Config.h5Env && Config.h5Env.isSaveEmpParams) {
      getEmpParams()
        .then(async (empData) => {
          // 存储sso_url
          ejs.storage.setItem({
            emp_sso_url: empData.sso_url,
          });
          // 存储EMP平台系统参数
          var obj = {};

          for (const key in empData.params) {
            if (Object.hasOwnProperty.call(empData.params, key)) {
              obj[`emp_${key}`] = empData.params[key];
            }
          }
          await ejs.storage.setItem(obj);

          resolve();
        })
        .finally(() => {
          resolve();
        });
    } else {
      resolve();
    }
  });
};

export default saveEmpParams;
