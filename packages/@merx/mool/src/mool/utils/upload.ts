import { type } from "./type.js";
import CryptoJS from "crypto-js";
import  {request, DEFAULTSETTING } from "./request.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

interface HEAD extends Record<string, string> {
  // UTC日期
  "APP-DATE": string;
  // appid
  "APP-ID": string;
  // 算法类型
  "APP-SIGN-ALGOS": string;
  // 签名
  "APP-SIGN": string;
}

const genHeader = (options: DEFAULTSETTING): HEAD => {
  const { url, data, contentType } = options;
  dayjs.extend(utc);
  const path = "/api/content/v1/file" + url;

  const APPDATE = dayjs.utc().format().replace(/-|:/g, "");

  const APPKEY = "05920cdb00109342569aa29b798832f1";

  const APPID: string = "browsertest";

  let body = "";
  if (contentType == "application/json") {
    body = JSON.stringify(data);
  }
  const SHA256 = CryptoJS.SHA256(`${path}|POST|${body}|${APPDATE}|${APPID}|${APPKEY}`);
  const APPSIGN = CryptoJS.enc.Hex.stringify(SHA256);
  
  
  return {
    "APP-ID": APPID,
    "APP-DATE": APPDATE,
    "APP-SIGN-ALGOS": "sha256",
    "APP-SIGN": APPSIGN,
  };
};

/**
 * 文件上传,不传header默认使用内容管理平台接口的headers
 * @param {Object} options 上传文件配置项
 * @returns {Object} ajax Promise
 */
const upload = <T = CommonResponse>(options: DEFAULTSETTING): Promise<T> => {
  const files = options.files || [];
  const formdata = new FormData();
  const data = options.data as Record<string, string | object>;
  // 如果是string，则直接塞入params
  if (typeof data === "string") {
    formdata.append("params", data);
  } else {
    // 序列化参数
    if (options.contentType !== "application/json") {
      serial(formdata, data, "");
    }
  }

  /**
   * 序列化参数
   * object序列化成 params[guid]:12345
   * string序列化成 params:{guid: 12345}
   * @param {Object} formData 参数
   * @param {Object} rtnData 对象
   * @param {string} scope 域
   */
  function serial(formData: FormData, rtnData: Record<string, string | object>, scope: string) {
    for (const key in rtnData) {
      if (Object.prototype.hasOwnProperty.call(rtnData, key)) {
        let _type = type(rtnData[key]);
        let newKey = type(rtnData) === "object" || _type === "object" || _type === "array" ? key : "";
        if (scope) {
          newKey = !/\[.*\]$/.test(scope) ? `${scope}[${newKey}]` : `${scope}.${newKey}`;
        }
        let target = rtnData[key];
        if ((typeof target === "object" || Array.isArray(target)) && type(target) != "file") {
          serial(formData, target as Record<string, string | object>, newKey || key);
        } else {
          formData.append(newKey || key, target as string | File);
        }
      }
    }
  }
  if (Array.isArray(files)) {
    files.forEach((e) => {
      if (e.name && e.file) {
        formdata.append(e.name, e.file);
      }
    });
  }

  options.baseURL = "/api/content/v1/file";
  options.contentType = options.contentType || "multipart/form-data";
  if (options.contentType == "application/json") {
    options.data = options.data;
  } else {
    options.data = formdata;
  }
  options.headers = options.headers || genHeader(options);
  return request(options);
};

export default upload;
