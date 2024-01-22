/*
 * 作者: 吴松泽
 * 创建时间: 2020-09-07 14:30:37
 * 修改时间: 2020-11-17 13:53:31
 * 版本: [1.0]
 * 版权: 国泰新点软件股份有限公司
 * 描述: 用于保持页面滚动距离
 */
const doc = document;
var cache = {};

export default {
  // 保存滚动条位置
  save(path) {
    cache[path] = doc.documentElement.scrollTop || doc.body.scrollTop;
  },
  // 重置滚动条位置
  get() {
    const path = this.$route.path;

    this.$nextTick(function () {
      doc.documentElement.scrollTop = doc.body.scrollTop = cache[path] || 0;
    });
  },
  getTopValue(path) {
    return cache[path] || 0;
  },
  // 设置滚动条到顶部
  goTop() {
    this.$nextTick(function () {
      doc.documentElement.scrollTop = doc.body.scrollTop = 0;
    });
  },
};
