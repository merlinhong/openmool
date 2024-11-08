const isObject = function (obj) {
  return typeof obj === 'object';
};
const isPlainObject = function (obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
};
exports.isPlainObject = isPlainObject;
