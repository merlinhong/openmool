const proConfig = require('../src/shared/config');

('use strict');
const postcss = {
  plugins: [
    require('postcss-import')({}),
    require('postcss-url')({}),
    require('postcss-aspect-ratio-mini')({}),
    require('postcss-cssnext')({}),
    require('postcss-write-svg')({
      utf8: false,
    }),
    require('cssnano')({
      autoprefixer: false,
      'postcss-zindex': false,
    }),
  ],
};

if (proConfig.rem || (proConfig.Config && proConfig.Config.rem)) {
  postcss.plugins.push(
    require('postcss-pxtorem')({
      rootValue: 16, // (Number | Function) 代表根元素字体大小或根据input参数返回根元素字体大小
      unitPrecision: 5, // （数字）允许 REM 单位增长到的十进制数字。
      propList: ['font-size'], // （数组）可以从 px 更改为 rem 的属性。
      selectorBlackList: [], //（数组）要忽略并保留为 px 的选择器
      replace: true, // （布尔值）替换包含 rems 的规则而不是添加回退。
      mediaQuery: false, // （布尔值）允许在媒体查询中转换 px。
      minPixelValue: 0, // （数字）设置要替换的最小像素值。
      // exclude: //（字符串，正则表达式，函数）要忽略并保留为 px 的文件路径。
    }),
  );
}

postcss.plugins.push(
  require('postcss-px-to-viewport')({
    viewportWidth: 375, // (Number) 设备宽度
    viewportHeight: 667, // (Number) 设备高度
    unitPrecision: 3, // (Number)  指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
    viewportUnit: 'vw', // (String) 指定需要转换成的视窗单位，建议使用vw
    selectorBlackList: ['ignore', '.hairlines', 'van-nav-bar'], // (Array)  指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
    minPixelValue: 1, // (Number) 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    mediaQuery: false, // (Boolean) 不允许在媒体查询中转换`px`
  }),
);

module.exports = {
  build: {
    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 true 后就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    modules: false,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    extract: {
      ignoreOrder: true,
    },
    // extract: false,
    // 是否开启 css sourceMap 设置为 true 之后可能会影响构建的性能。
    sourceMap: false,
    // 向 CSS 相关的 loader 传递选项。
    // 支持：css-loader、postcss-loader、sass-loader、less-loader、stylus-loader
    loaderOptions: {
      postcss,
    },
  },

  dev: {
    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 true 后就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    modules: false,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    extract: false,
    // 是否开启 css sourceMap 设置为 true 之后可能会影响构建的性能。
    sourceMap: true,
    // 向 CSS 相关的 loader 传递选项。
    // 支持：css-loader、postcss-loader、sass-loader、less-loader、stylus-loader
    loaderOptions: {
      postcss,
    },
  },
};
