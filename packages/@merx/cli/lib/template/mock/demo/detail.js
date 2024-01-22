import Mock from 'mockjs';
const Random = Mock.Random;

let detailData = {
  custom: Mock.mock({
    info: {
      title: Random.csentence(5, 10), // 随机生成一段中文文本。
      data: Random.csentence(25, 30),
    },
  }),
  status: {
    code: 1,
  },
};

export { detailData };
