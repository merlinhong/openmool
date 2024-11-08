'use strict';
require('./command/index');
const fs = require('fs');
const path = require('path');
const cssOptions = require('./cssOption/css.conf.js');
const pages = require('./pages/index');
const devServer = require('./server');
const webpack = require('webpack');
const chainWebpack = require('./chainWebpack');
// 引入tool文件
const { buildPlugin, moduleType } = require('./plugin/build');

const dllPlugin = require('./dll');

// 判断plugin文件是否存在
let pluginPath = path.join(__dirname, '../plugin.json');
let plugin = fs.existsSync(pluginPath) ? require(pluginPath) : '';

const AutoDllPlugin = require('autodll-webpack-plugin');

// const obfuscator = require('./obfuscator');
// const ImageSizeError = require('./otherloader/imageSizeError');
const transpileDependencies = [
  /miniprogram-sm-crypto/,
  /axios-mock-adapter/,
  /is-blob/,
];
const { devServerConfig } = require('@vuecli-build/cli-shared-utils');
const proConfig = require('../src/shared/config');
// devServer.proxy = devServerConfig(proConfig.devServerProxy, devServer.proxy);
module.exports = {
  // 生产环境
  build: {
    pages: pages,
    // 部署应用包时的基本 URL
    publicPath: './',
    // 生产环境构建文件的目录
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',
    // 生成文件名后面是否带 hash 值
    filenameHashing: true,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    runtimeCompiler: false,
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    transpileDependencies,
    // 是否生成 SourceMap
    productionSourceMap: false,
    // 是否设置 link script 标签中的 crossorigin 属性
    crossorigin: undefined,
    // 是否设置 link script 标签上启用 SRI
    integrity: false,
    // 参数会通过 webpack-merge 合并到最终配置里
    configureWebpack: {
      plugins: [
        // obfuscator(),
        // 图片超出1M后提示
        // new ImageSizeError(),
        // 构建后操作dist目录
        // new AutoDllPlugin(dllPlugin(moduleType)),

        new buildPlugin(plugin),
        new webpack.DefinePlugin({
          // 被浏览器环境所识别
          'process.argv': JSON.stringify(process.argv),
        }),
      ],
    },
    css: cssOptions.build,
    chainWebpack: chainWebpack,
  },

  // 开发环境
  dev: {
    pages: pages,
    // 部署应用包时的基本 URL
    publicPath: '/',
    // 生产环境构建文件的目录
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',
    // 生成文件名后面是否带 hash 值
    filenameHashing: true,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    runtimeCompiler: false,
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    transpileDependencies,
    // 是否生成 SourceMap
    productionSourceMap: false,
    // 是否设置 link 标签中的 crossorigin 属性
    crossorigin: undefined,
    // 是否设置 link script 标签上启用 SRI，如果构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性
    integrity: false,
    // 参数会通过 webpack-merge 合并到最终配置里
    configureWebpack: {
      plugins: [
        // new AutoDllPlugin(dllPlugin(moduleType)),
        new webpack.DefinePlugin({
          // 被浏览器环境所识别
          'process.argv': JSON.stringify(process.argv),
        }),
      ],
    },
    // http-proxy-middleware
    devServer,
    css: cssOptions.dev,
    chainWebpack: chainWebpack,
  },
};
