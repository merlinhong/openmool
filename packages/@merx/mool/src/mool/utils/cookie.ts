const setCookie = (name: string, value: any, option?: { expire?: number; toBase64?: boolean }) => {
  if (!option) return;
  const { expire, toBase64 } = option;
  if (expire && expire !== 0) {
    // 当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    var expires = expire * 24 * 60 * 60 * 1000;
    var date = new Date(+new Date() + expires);
    document.cookie = `${name}=${toBase64 ? btoa(value) : value};expires=${date.toUTCString()}`;
  } else {
    document.cookie = `${name}=${toBase64 ? btoa(value) : value}`;
  }
};

const getCookie = (name: string) => {
  // 获取cookies
  let strCookie = document.cookie;
  let arrCookie = strCookie.split("; ");
  for (var i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split("=");
    if (name == arr[0]) {
      return arr[1];
    }
  }
  return "";
};

export const cookie = Object.create({
  set: setCookie,
  get: getCookie,
});
