/*
 * 作者: 吴松泽
 * 创建时间: 2020-07-21 15:53:59
 * 修改时间: 2020-11-16 19:06:58
 * 版本: [1.0]
 * 版权: 国泰新点软件股份有限公司
 * 描述: 模拟使用mock接口
 */
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const { listData, typeData } = require('./m8demo/list');
const { detailData } = require('./m8demo/detail');
var mock = new MockAdapter(axios, {
  // mock模拟请求延迟500毫秒响应
  delayResponse: 500,
});

// mock指定接口数据
mock.onPost(/rest\/mock\/list/).reply(200, listData);
mock.onPost(/rest\/mock\/type/).reply(200, typeData);
mock.onPost(/rest\/mock\/detail/).reply(200, detailData);

// 未匹配到交给axios去请求
mock.onAny().passThrough();
