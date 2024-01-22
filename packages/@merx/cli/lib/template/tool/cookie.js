/* eslint-disable no-eq-null */
/*
 * 作者: 吴松泽
 * 创建时间: 2021-07-28 10:33:25
 * 修改时间: 2021-08-24 14:09:15
 * 版本: [1.0]
 * 版权: 国泰新点软件股份有限公司
 * 描述: cookie相关工具
 */

'use strict';

/* eslint-disable no-var */
function assign(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
}
/* eslint-enable no-var */

/* eslint-disable no-var */
var defaultConverter = {
  read: function (value) {
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function (value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent,
    );
  },
};
/* eslint-enable no-var */

/* eslint-disable no-var */

function init(converter, defaultAttributes) {
  function set(key, value, attributes) {
    if (typeof document === 'undefined') {
      return;
    }

    attributes = assign({}, defaultAttributes, attributes);

    if (typeof attributes.expires === 'number') {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }

    key = encodeURIComponent(key)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);

    value = converter.write(value, key);

    var stringifiedAttributes = '';

    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }

      stringifiedAttributes += '; ' + attributeName;

      if (attributes[attributeName] === true) {
        continue;
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    }

    return (document.cookie = key + '=' + value + stringifiedAttributes);
  }

  function get(key) {
    if (typeof document === 'undefined' || (arguments.length && !key)) {
      return;
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var jar = {};

    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split('=');
      var value = parts.slice(1).join('=');

      if (value[0] === '"') {
        value = value.slice(1, -1);
      }

      try {
        var foundKey = defaultConverter.read(parts[0]);

        jar[foundKey] = converter.read(value, foundKey);

        if (key === foundKey) {
          break;
        }
      } catch (e) {
        break;
      }
    }

    return key ? jar[key] : jar;
  }

  return Object.create(
    {
      set: set,
      get: get,
      remove: function (key, attributes) {
        set(
          key,
          '',
          assign({}, attributes, {
            expires: -1,
          }),
        );
      },
      withAttributes: function (attributes) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function (conver) {
        return init(assign({}, this.converter, conver), this.attributes);
      },
    },
    {
      attributes: {
        value: Object.freeze(defaultAttributes),
      },
      converter: {
        value: Object.freeze(converter),
      },
    },
  );
}

var api = init(defaultConverter, {
  path: '/',
});

window.api = api;
export default api;
