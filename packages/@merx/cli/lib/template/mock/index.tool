/*
 * 作者: 吴松泽
 * 创建时间: 2020-07-21 15:53:59
 * 修改时间: 2022-03-24 15:46:39
 * 版本: [1.0]
 * 版权: 国泰新点软件股份有限公司
 * 描述: 模拟使用mock接口
 */
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const Console = console;
const MyDate = require('@tool/date').default;
const proConfig = require('../src/shared/config');
let mockData = [];

// 下面的注释方便loader解析，请不要删除
// mockData hook
// 上面的注释方便loader解析，请不要删除
var mock = new MockAdapter(axios, {
    // mock模拟请求延迟500毫秒响应
    delayResponse: 500
});

if (process.env.NODE_ENV === 'development' || (process.env.NODE_ENV === 'production' && !proConfig.isProductionExternalMock)) {
    Console.log('%c[M8移动前端框架] MOCK数据启动', 'color:rgb(255, 69, 0);font-weight: bold');
}
// 手动定义mock方式
// const moduleDate = require('@/pages/module/mock/index.js');
// mockData = mockData.concat(moduleDate);

// mock指定接口数据
if (mockData instanceof Array && mockData.length) {
    for (let index = 0; index < mockData.length; index++) {
        const element = mockData[index];


        mock.onPost(new RegExp(element.methodUrl)).reply((opt) => {
            const nowDate = new MyDate().parseDate().format('HH:mm:ss');
            const groupString = `[MOCK] ${nowDate} POST ${element.methodUrl}`;
            const mockRes = {
                'custom': element.output,
                'status': {
                    'text': '',
                    'code': 1
                }
            };

            opt.body = mockRes;
            Console.group(groupString);
            Console.log(opt);
            Console.groupEnd();

            return [200, mockRes];
        });
    }
}

// 未匹配到交给axios去请求
mock.onAny().passThrough();
