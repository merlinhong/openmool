import Mock from 'mockjs';
const Random = Mock.Random;

let listData = {
  custom: Mock.mock({
    'infolist|10-20': [
      {
        title: Random.csentence(5, 10), // 随机生成一段中文文本。
        data: Random.csentence(5, 10),
        // eslint-disable-next-line camelcase
        attention_degree: Random.integer(100, 9999), // 返回一个随机的整数。
        photo: Random.image('114x83', '#00405d', '#FFF', 'Mock.js'),
      },
    ],
  }),
  status: {
    code: 1,
  },
};

let typeData = {
  custom: {
    type: '2',
  },
  status: {
    code: 1,
  },
};

export { listData, typeData };
