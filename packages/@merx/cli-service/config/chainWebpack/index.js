const pages = require('./base.conf');
const path = require('path');
const utils = require('./utils');
const chalk = require('chalk');
const proConfig = require('../src/shared/config');
const resolve = utils.resolve;

const chainWebpack = (config) => {
  config.resolve.alias
    .set('@', resolve('src'))
    .set('@tool', resolve('src/tool'))
    .set('@components', resolve('src/components'))
    .set('@assets', resolve('src/assets'))
    .set('@router', resolve('src/router'))
    .set('@store', resolve('src/store'))
    .set('@public', resolve('public'))
    .set('@mock', resolve('mock'))
    .set('vue', path.resolve(process.cwd(), 'node_modules', 'vue'))
    .set('vant', path.resolve(process.cwd(), 'node_modules', 'vant'))
    .set('axios', path.resolve(process.cwd(), 'node_modules', 'axios'));
  Object.keys(pages).forEach((entryName) => {
    config.plugins.delete(`prefetch-${entryName}`);
  });
  config.performance.set('hints', false);
  // soc自定义块解析loader
  config.module
    .rule('soc')
    .resourceQuery(/blockType=soc/)
    .use('babel')
    .loader('babel-loader')
    .end()
    .use(require.resolve('./otherloader'))
    .loader(require.resolve('./otherloader'))
    .tap((options) => {
      return {
        ...options,
        ejsVer: proConfig.ejsVer,
        env: proConfig.env,
      };
    })
    .end();
  // 解析加载router和store
  config.module
    .rule('tool')
    .test(/\.tool$/)
    .use('babel')
    .loader('babel-loader')
    .end()
    .use(require.resolve('./toolloader'))
    .loader(require.resolve('./toolloader'))
    .tap((options) => {
      return {
        ...options,
        processArgv: process.argv,
      };
    })
    .end();
  // 关闭mock功能或开启生产环境排除mockjs时，排除Mockjs资源
  if (
    !proConfig.isMock ||
    (proConfig.isProductionExternalMock &&
      process.env.NODE_ENV === 'production')
  ) {
    config.externals('mockjs');
  }
  // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [{analyzerPort: 'auto'}]);
  config
    .plugin('progress-bar-webpack-plugin')
    .use('progress-bar-webpack-plugin')
    .tap((options) => {
      options[0] = {
        format:
          ' build [:bar]' +
          chalk.green.bold(':percent') +
          ' (:elapsed seconds)',
        clear: false,
      };

      return options;
    });
  const oneOfsMap = config.module.rule('scss').oneOfs.store;

  oneOfsMap.forEach((item) => {
    item
      .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options({
        // Provide path to the file with resources
        resources: path.resolve(__dirname, '../src/assets/css/resources.scss'),
      })
      .end();
  });

  // 内联图片资源限制设置为 8KiB
  config.module
    .rule('images')
    .use('url-loader')
    .loader('url-loader')
    .tap((options) => {
      if (process.argv[6] && process.argv[6] === 'SelectPerson') {
        options.limit = 1024 * 1024;
      } else {
        options.limit = 8 * 1024;
      }
      options.esModule = false;

      return options;
    });

  // 支持css中引入字体文件
  config.module
    .rule('fonts')
    .use('url-loader')
    .loader('url-loader')
    .tap((options) => {
      options.fallback.options.esModule = false;

      return options;
    });
};

module.exports = chainWebpack;
