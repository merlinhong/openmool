// 处理devServer.proxy，自动修改请求头中的Origin与referer，防止F9安全拦截
const assignProxyReq = (element) => {
  let proxy = {};

  if (Object.prototype.toString.call(element) === '[object Object]') {
    proxy = Object.assign({}, element, {
      changeOrigin: true,
      onProxyReq(proxyReq) {
        proxyReq.setHeader('Origin', element.target);
        proxyReq.setHeader('referer', element.target);
      },
    });
  }

  return proxy;
};

// 对devServer进行配置，对proxy处理
exports.devServerConfig = function (devServerProxy, proxy) {
  let devServer = {};

  // 对Config.devServerProxy进行处理
  if (Object.prototype.toString.call(devServerProxy) === '[object Object]') {
    for (const key in devServerProxy) {
      if (Object.hasOwnProperty.call(devServerProxy, key)) {
        const element = devServerProxy[key];

        devServer[key] = assignProxyReq(element);
      }
    }
  }
  // devServer.proxy进行处理
  if (Object.prototype.toString.call(proxy) === '[object Object]') {
    for (const key in proxy) {
      if (Object.hasOwnProperty.call(proxy, key)) {
        const element = proxy[key];
        const proxyObj = assignProxyReq(element);

        Object.assign(devServer[key], proxyObj);
      }
    }
  }

  return devServer;
};
