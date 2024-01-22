import buildUrl from 'axios/lib/helpers/buildURL';
import utils from 'axios/lib/utils';
import settle from 'axios/lib/core/settle';
import createError from 'axios/lib/core/createError';

function mpAdapter(config) {
  return new Promise(function dispatchMpRequest(resolve, reject) {
    try {
      let requestTask = null;
      const requestConfig = {
        url: buildUrl(config.url, config.params, config.paramsSerializer),
        method: (config.method && config.method.toUpperCase()) || 'GET',
        success(response) {
          const settleResponse = {
            data: response.data,
            status: response.statusCode,
            statusText: '',
            headers: response.header,
            config,
            request: requestConfig,
          };

          settle(resolve, reject, settleResponse);
        },
        fail(response) {
          reject(
            createError(
              'Network Error',
              config,
              response.statusCode,
              requestTask,
              {
                data: response.data,
              },
            ),
          );
        },
        complete() {
          requestTask = undefined;
        },
      };

      // Transform request method
      if (typeof config.method === 'string') {
        requestConfig.method = config.method.toUpperCase();
      }

      // Validate data
      if (typeof config.data === 'object' || typeof config.data === 'string') {
        requestConfig.body = config.data;
      } else if (typeof config.data !== 'undefined') {
        throw new Error(`unknown data type: ${typeof config.data}`);
      }

      // Validate responseType
      if (config.responseType === 'json') {
        requestConfig.type = 'json';
      } else if (config.responseType) {
        throw new Error(`unknown responseType: ${config.responseType}`);
      }
      // Add request headers
      let requestHeaders = config.headers;

      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        const _header = key.toLowerCase();

        if (
          (typeof requestData === 'undefined' && _header === 'content-type') ||
          _header === 'referer'
        ) {
          // Remove Content-Type if data is undefined
          // And the miniprogram document said that '设置请求的 header，header 中不能设置 Referer'
          delete requestHeaders[key];
        }
      });
      requestConfig.headers = requestHeaders;

      // Proxy requestTask abort
      if (config.cancelToken) {
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!requestTask) {
            return;
          }
          requestTask.abort();
          reject(cancel);
          requestTask = undefined;
        });
      }
      requestTask = ejs.stream.fetch(requestConfig);
    } catch (error) {
      throw new Error(error);
    }
  });
}

export default mpAdapter;
