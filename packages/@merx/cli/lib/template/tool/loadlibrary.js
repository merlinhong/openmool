/*
 * 作者: 吴松泽
 * 创建时间: 2020-12-07 20:20:26
 * 修改时间: 2020-12-07 20:21:41
 * 最后修改: 吴松泽
 * 版本: [1.0]
 * 版权: 国泰新点软件股份有限公司
 * 描述: 插入 Library 库
 */
/**
 * 插入 Library 库
 * @param {Array} gather 集合
 * inject 插入位置
 * src 路径
 * type 类型
 * @return {Promise} Promise event
 */
const loaderLibrary = (...args) => {
  const promiseAssembly = [];

  args.forEach((e) => {
    const inject = e.inject;
    const src = e.src;
    const type = e.type;
    let el = null;
    let promise = new Promise((resolve) => {
      if (type === 'css') {
        el = document.createElement('link');
        el.link = src;
        el.ref = 'stylesheet';
      } else {
        el = document.createElement('script');
        el.src = src;
      }

      if (inject === 'head') {
        document.head.appendChild(el);
      } else {
        document.body.appendChild(el);
      }

      el.onload = function () {
        resolve();
      };
    });

    promiseAssembly.push(promise);
  });

  return Promise.all(promiseAssembly);
};

export default loaderLibrary;
