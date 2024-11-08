import axios, { AxiosRequestConfig, AxiosProgressEvent, ResponseType, AxiosError } from "axios";
import { StateEnum } from "../types";
// import { commonStore } from "@/store/common";
import { type } from "./type.js";
import qs from "qs";
import { cookie } from "./cookie.js";
// 环境变量获取当前URL
const { VITE_APP_BASE_API } = import.meta.env;
export type AxiosResponseError = AxiosError;
// 请求默认配置项
export interface DEFAULTSETTING {
  // 请求类型
  type?: string;

  // 请求路径
  url: string;

  //请求体
  data?: JSON | Object;

  //请求超时时间
  timeout?: number | undefined;

  // 请求头
  headers?: Record<string, any>;

  //contenttype
  contentType?: string;

  // 返回的响应类型
  responseType?: ResponseType;

  //跨域成功携带cookie
  withCredentials?: boolean;

  // 请求根路径，如果遇到跨域问题到vite.config配好代理后在baseURL处修改逻辑
  baseURL?: string;

  // 文件上传的file对象集合
  files?: Array<{ file?: File; name?: string }>;

  //上传进度
  uploading?: ((progressEvent: AxiosProgressEvent) => void) | undefined;

  //下载进度
  downloading?: ((progressEvent: AxiosProgressEvent) => void) | undefined;

  onDownloadProgress?: ((progressEvent: AxiosProgressEvent) => void) | undefined;

  onUploadProgress?: ((progressEvent: AxiosProgressEvent) => void) | undefined;

  //请求成功回调
  success?: Function;

  //请求报错回调
  error?: Function;

  //请求完成回调
  complete?: Function;
}

export const defaultSettings: DEFAULTSETTING = {
  type: "post",
  url: "",
  data: "",
  headers: {
    "x-token":cookie.get('woAuth'),
  },
  timeout: 120000,
  contentType: "application/x-www-form-urlencoded",
  withCredentials: true,
  baseURL: VITE_APP_BASE_API,
  uploading: function () {},
  downloading: function () {},
  success: () => {},
  error: () => {},
  complete: () => {},
};

let params: AxiosRequestConfig<Object | JSON> = {};

const setHeader = function (key: string, value: string): void {
  const headers = params.headers as Record<string, string>;
  headers[key] = value;
};

let getCsrfToken = false;
// 挂起的请求
const pauseList: ((cancle: boolean) => void)[] = [];

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // const common = commonStore();

    // config.headers["CsrfToken"] = common.token;

    // 当请求token时，其他请求都需要挂起
    if (config.url === "/csrfToken") {
      getCsrfToken = true;
      return config;
    } else if (!getCsrfToken) {
      return config;
    } else {
      return new Promise((resolve, reject) => {
        if (getCsrfToken === true) {
          pauseList.push((cancle = false) => {
            if (!cancle) {
              // config.headers["CsrfToken"] = common.token;
              resolve(config);
            } else {
              reject("get csrf_token error");
            }
          });
        }
      });
    }
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);
// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    

    // 将请求头的Date保存，用来作为当前时间的标准，避免本地切换时区导致时间不准确
    sessionStorage.setItem("honorCloudManagement-nowTime", response.headers.date);
    // 当csrfToken获取成功时，触发之前挂起的请求
    if (response.config.url === "/csrfToken") {
      getCsrfToken = false;
      // const common = commonStore();
      // common.updateToken(response.data.data);

      pauseList.forEach((ele) => {
        ele(false);
      });
    }
    return response || {};
  },
  (error) => {
    

    if (error.config?.url === "/csrfToken") {
      getCsrfToken = false;
      pauseList.forEach((ele) => {
        ele(true);
      });
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const res = error.response || {};
    const status = parseInt(res.status);
    if (res.data.code == StateEnum.NOT_AUTH) return ElMessage.error({ grouping: true, message: res.data.message });

    switch (status) {
      // 400 请求参数错误
      case StateEnum.INVALID_REQUEST:
        ElMessage.error({ grouping: true, message: res.data.desc || "请求参数错误" });
        break;
      // 403 权限不足
      case StateEnum.FORBIDDEN:
        ElMessage.error({ grouping: true, message: "您的权限不足" });
        break;
      // 401 未登录
      case StateEnum.UNAUTHORIZED:
        ElMessage.error({ grouping: true, message: "未登录" });
        break;
      // 404 资源不存在或资源不属于该用户
      case StateEnum.NOT_FOUND:
        ElMessage.error({ grouping: true, message: "资源不存在" });
        break;
      // 500 服务器发生错误，用户将无法判断发出的请求是否成功
      case StateEnum.INTERNAL_SERVER_ERROR:
        ElMessage.error({ grouping: true, message: "服务器发生错误" });
        break;
      default:
        ElMessage.error({ grouping: true, message: error.message });
        break;
    }
    return Promise.reject(error);
  },
);
export async function request<T = CommonResponse>(options: DEFAULTSETTING): Promise<T> {
  options = Object.assign({}, defaultSettings, options);

  params = {
    url: options.url,
    method: options.type,
    data: options.data,
    headers: options.headers,
    baseURL: options.baseURL,
    responseType: options.responseType,
    withCredentials: options.withCredentials,
    timeout: options.timeout,
    onUploadProgress: options.uploading,
    onDownloadProgress: options.downloading,
  };

  const { contentType, headers, error, success, complete } = options;

  for (const key in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, key)) {
      setHeader(key, headers[key]);
    }
  }

  if (contentType) {
    setHeader("Content-Type", contentType);
    if (Object.prototype.toString.call(options.data) !== "[object FormData]") {
      

      if (!contentType.match("application/json")) {
        if (options.type == "get" && type(options.data) === "object") {
          params.url += "?";
          for (const key in options.data) {
            if (Object.prototype.hasOwnProperty.call(options.data, key)) {
              const val = options.data[key as keyof typeof options.data];
              params.url += `${key}=${val}&`;
            }
          }
        } else {
          params.data = qs.stringify(options.data);
        }
      }
    } else {
      // 表单提交类型
      params.data = options.data;
    }
  }

  return new Promise((resolve, reject) => {
    axios(params)
      .then((response) => {
        

        const { status, statusText, data } = response;
        if ((status !== 200 && statusText !== "OK") || typeof data.errcode === "number" || data.error) {
          reject(data);
          error && error(data);
        } else {
          success && success(data, response);
          resolve(data);
        }
      })
      .catch((err) => {
        error && error(err);
        reject(err);
      })
      .then(() => {
        complete && complete();
      });
  });
}
