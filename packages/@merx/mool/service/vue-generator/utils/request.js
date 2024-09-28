`
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
export function request<T = CommonResponse<{ rows: any[]; total: number }>>(
    params: AxiosRequestConfig & { success?: (data: T, res: AxiosResponse) => void, fail?: (res: AxiosResponse) => void },
  ): Promise<T> {
    const { success, fail } = params;
    
    if (!params.headers || !params.headers["content-type"].match("application/json")) {
      if (params.method == "GET") {
        params.headers = {
          "content-type": "application/x-www-form-urlencoded",
        };
        const searchParams = new URLSearchParams();
  
        Object.keys(params.data).forEach((key) => {
          console.log(key, params.data[key]);
          if (Array.isArray(params.data[key])) {
            params.data[key].forEach((item: any) => {
              searchParams.append(key, item);
            });
          } else {
            searchParams.append(key, params.data[key]);
          }
        });
        params.url += `?${searchParams.toString()}`;
      } else {
        // params.data = qs.stringify(params.data);
      }
    }
  
    return new Promise((resolve, reject) => {
      axios(params)
        .then((response) => {
          const { status, statusText, data } = response;
  
          if ((status !== 200 && statusText !== "OK") || typeof data.errcode === "number" || data.error) {
            reject(data);
            fail?.(data);
          } else {
            resolve(data);
            success && success(data, response);
          }
        })
  
        .catch((err) => {
          reject(err);
          fail?.(err);
        });
    });
  }
`