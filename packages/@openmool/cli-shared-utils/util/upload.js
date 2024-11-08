import Util from './index';
import { ajax } from './request';

/**
 * 文件上传
 * @param {Object} options 上传文件配置项
 * @returns {Object} ajax Promise
 */
const upload = (options) => {
  const files = options.files;
  const formdata = new FormData();
  const data = options.data;

  // 如果是string，则直接塞入params
  if (typeof data === 'string') {
    formdata.append('params', data);
  } else {
    // 序列化参数
    serial(formdata, data);
  }

  /**
   * 序列化参数
   * object序列化成 params[guid]:12345
   * string序列化成 params:{guid: 12345}
   * @param {Object} formData 参数
   * @param {Object} rtnData 对象
   * @param {Object} scope 域
   */
  function serial(formData, rtnData, scope) {
    for (const key in rtnData) {
      if (Object.prototype.hasOwnProperty.call(rtnData, key)) {
        let type = Util.type(rtnData[key]);
        let newKey;

        if (scope) {
          newKey = `${scope}[${
            Util.isObject(rtnData) || type === 'object' || type === 'array'
              ? key
              : ''
          }]`;
        }
        let target = rtnData[key];

        if (!scope && Array.isArray(rtnData)) {
          formData.append(rtnData.name, rtnData.value);
        } else if (typeof target === 'object' || Array.isArray(target)) {
          serial(formData, target, newKey || key);
        } else {
          formData.append(newKey || key, target);
        }
      }
    }
  }

  if (Array.isArray(files)) {
    files.forEach((e) => {
      formdata.append(e.name, e.file);
    });
  }

  options.contentType = 'multipart/form-data';
  options.data = formdata;

  return ajax(options);
};

export default upload;
