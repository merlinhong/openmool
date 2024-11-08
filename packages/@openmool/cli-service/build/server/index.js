module.exports = {
  openPage: process.env.devName,
  // 是否强制打开浏览器
  open: true,
  // 设置服务器的主机号，默认是 localhost
  host: '0.0.0.0',
  // 端口号，被占用的话会自动选择别的端口
  port: '8080',
  // 是否实时刷新
  inline: true,
  // 是否启用webpack的热模块替换功能
  hot: true,
  // 是否启用 gzip 压缩
  compress: true,
  // 去除dev下进度输出信息
  progress: false,
  overlay: true,
  // 是否现实捆绑包中的错误
  stats: 'errors-only',
  // 代理，支持 http-proxy-middleware 所有配置
  // 此配置会与Config.devServerProxy进行合并
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
    },
  },
  // 是否开启https服务，浏览器中不在localhost下测试百度地图组件时需要开启
  https: false,
};
