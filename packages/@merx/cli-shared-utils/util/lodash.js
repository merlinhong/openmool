export default {
  pick(obj, pickArr) {
    if (this.type(obj) != 'object') {
      return obj;
    }
    let result = {};
    for (const i of pickArr) {
      if (Object.prototype.hasOwnProperty.call(obj, i)) {
        result[i] = obj[i];
      }
    }
    return result;
  },
  omit(obj, pickArr) {
    if (this.type(obj) != 'object') {
      return obj;
    }
    let result = {};
    for (const i of Object.keys(obj)) {
      if (!pickArr.includes(i)) {
        result[i] = obj[i];
      }
    }
    return result;
  },
  type(x) {
    if (typeof x != 'object') {
      return typeof x;
    }
    if (typeof x === 'null') {
      return 'null';
    }
    function _type(o) {
      return o && o instanceof Object
        ? o._proto_ === Object.prototype ||
          Object.getPrototypeOf(o) === Object.prototype
          ? 'object'
          : Array.isArray(o)
            ? 'Array'
            : typeof o
        : typeof o;
    }
    if (_type(x) === 'object') {
      return 'object';
    }
  },
};
