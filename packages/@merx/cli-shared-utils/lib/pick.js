const type = require('./type');
exports.pick = function (obj, pickArr) {
  if (type(obj) != 'object' || !Array.isArray(pickArr)) {
    return obj;
  }
  let result = {};
  for (const i of pickArr) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      result[i] = obj[i];
    }
  }
  return result;
};
