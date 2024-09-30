import { isArray, isNumber, isString, orderBy } from "lodash-es";
import { hyphenate } from '@vue/shared';
import { resolveComponent } from "vue";
import storage from "./storage";

// 首字母大写
export function firstUpperCase(value: string): string {
	return value.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
		return $1.toUpperCase() + $2;
	});
}

// 获取方法名
export function getNames(value: any) {
	return Object.getOwnPropertyNames(value.constructor.prototype);
}

// 获取地址栏参数
export function getUrlParam(name: string): string | null {
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	const r = window.location.search.substring(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
}

// 文件名
export function filename(path: string): string {
	return basename(path.substring(0, path.lastIndexOf(".")));
}

// 路径名称
export function basename(path: string): string {
	let index = path.lastIndexOf("/");
	index = index > -1 ? index : path.lastIndexOf("\\");
	if (index < 0) {
		return path;
	}
	return path.substring(index + 1);
}

// 文件扩展名
export function extname(path: string): string {
	return path.substring(path.lastIndexOf(".") + 1).split(/(\?|&)/)[0];
}

// 横杠转驼峰
export function toCamel(str: string): string {
	return str.replace(/([^-])(?:-+([^-]))/g, function ($0, $1, $2) {
		return $1 + $2.toUpperCase();
	});
}

// 通用uuid
export function _uuid(separator = "-"): string {
	const s: any[] = [];
	const hexDigits = "0123456789abcdef";
	for (let i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
	s[8] = s[13] = s[18] = s[23] = separator;

	return s.join("");
}

// 组件id
export function uuid(e: number = 8) {
    e = e || 8;
  
    const t = "abcdefhijkmnprstwxyz2345678";
  
    const a = t.length;
  
    let n = "";
  
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  
    return n;
  }
// 浏览器信息
export function getBrowser() {
	const { clientHeight, clientWidth } = document.documentElement;

	// 浏览器信息
	const ua = navigator.userAgent.toLowerCase();

	// 浏览器类型
	let type = (ua.match(/firefox|chrome|safari|opera/g) || "other")[0];

	if ((ua.match(/msie|trident/g) || [])[0]) {
		type = "msie";
	}

	// 平台标签
	let tag = "";

	const isTocuh =
		"ontouchstart" in window || ua.indexOf("touch") !== -1 || ua.indexOf("mobile") !== -1;
	if (isTocuh) {
		if (ua.indexOf("ipad") !== -1) {
			tag = "pad";
		} else if (ua.indexOf("mobile") !== -1) {
			tag = "mobile";
		} else if (ua.indexOf("android") !== -1) {
			tag = "androidPad";
		} else {
			tag = "pc";
		}
	} else {
		tag = "pc";
	}

	// 浏览器内核
	let prefix = "";

	switch (type) {
		case "chrome":
		case "safari":
		case "mobile":
			prefix = "webkit";
			break;
		case "msie":
			prefix = "ms";
			break;
		case "firefox":
			prefix = "Moz";
			break;
		case "opera":
			prefix = "O";
			break;
		default:
			prefix = "webkit";
			break;
	}

	// 操作平台
	const plat = ua.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();

	// 屏幕信息
	let screen = "full";

	if (clientWidth < 768) {
		screen = "xs";
	} else if (clientWidth < 992) {
		screen = "sm";
	} else if (clientWidth < 1200) {
		screen = "md";
	} else if (clientWidth < 1920) {
		screen = "xl";
	} else {
		screen = "full";
	}

	// 是否 ios
	const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

	// 是否 PC 端
	const isPC = tag === "pc";

	// 是否移动端
	const isMobile = isPC ? false : true;

	// 是否移动端 + 屏幕宽过小
	const isMini = screen === "xs" || isMobile;

	return {
		height: clientHeight,
		width: clientWidth,
		type,
		plat,
		tag,
		prefix,
		isMobile,
		isIOS,
		isPC,
		isMini,
		screen
	};
}

// 路径转数组
export function deepPaths(paths: string[], splitor?: string) {
	const list: any[] = [];

	paths.forEach((e) => {
		const arr: string[] = e.split(splitor || "/").filter(Boolean);

		let c = list;

		arr.forEach((a, i) => {
			let d = c.find((e) => e.label == a);

			if (!d) {
				d = {
					label: a,
					value: a,
					children: arr[i + 1] ? [] : null
				};

				c.push(d);
			}

			if (d.children) {
				c = d.children;
			}
		});
	});

	return list;
}

// 列表转树形
export function deepTree(list: any[], sort?: "desc" | "asc"): any[] {
	const newList: any[] = [];
	const map: any = {};

	orderBy(list, "orderNum", sort)
		.map((e) => {
			map[e.id] = e;
			return e;
		})
		.forEach((e) => {
			const parent = map[e.parentId];

			if (parent) {
				(parent.children || (parent.children = [])).push(e);
			} else {
				newList.push(e);
			}
		});

	return newList;
}

// 树形转列表
export function revDeepTree(list: any[]) {
	const arr: any[] = [];
	let id = 0;

	function deep(list: any[], parentId: number) {
		list.forEach((e) => {
			if (!e.id) {
				e.id = ++id;
			}

			if (!e.parentId) {
				e.parentId = parentId;
			}

			arr.push(e);

			if (e.children && isArray(e.children) && e.id) {
				deep(e.children, e.id);
			}
		});
	}

	deep(list || [], 0);

	return arr;
}

// 路径转对象
export function path2Obj(list: any[]) {
	const data: any = {};

	list.forEach(({ path, value }) => {
		if (path) {
			const arr: string[] = path.split("/");
			const parents = arr.slice(0, arr.length - 1);
			const name = basename(path).replace(".ts", "");

			let curr = data;

			parents.forEach((k) => {
				if (!curr[k]) {
					curr[k] = {};
				}

				curr = curr[k];
			});

			curr[name] = value;
		}
	});

	return data;
}

// 是否是组件
export function isComponent(name: string) {
	return !isString(resolveComponent(name));
}

// 是否Promise
export function isPromise(val: any) {
	return val && Object.prototype.toString.call(val) === "[object Promise]";
}

// 单位转换
export function parsePx(val: string | number) {
	return isNumber(val) ? `${val}px` : val;
}

// 延迟
export function sleep(duration: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, duration);
	});
}

const IV = new Uint8Array([2, 2, 4, 8, 5, 7, 7, 8, 0, 9, 1, 4, 3, 8, 5, 6]); //初始向量

export async function encrypt(data: string, base64Key: string) {
  // 将 Base64 编码的密钥解码为 Uint8Array
  const key = await window.crypto.subtle.importKey(
    "raw",
    Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0)),
    "AES-GCM",
    true,
    ["encrypt"],
  );

  // 生成随机 IV
  // const iv = window.crypto.getRandomValues(new Uint8Array(12));
  // 将数据编码为 Uint8Array
  const encodedData = new TextEncoder().encode(data);

  // 使用 AES-GCM 加密数据
  const encryptedBytes = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: IV,
      tagLength: 128,
    },
    key,
    encodedData,
  );

  // 将 IV 和加密数据一起编码为 Base64 字符串
  const encryptedDataWithIv = new Uint8Array(12 + encryptedBytes.byteLength);
  encryptedDataWithIv.set(IV);
  encryptedDataWithIv.set(new Uint8Array(encryptedBytes), 12);

  return btoa(String.fromCharCode(...encryptedDataWithIv));
}
export const omit = (obj: Record<string, unknown>, arr: string[]) => {
  let newobj: Record<string, unknown> = {};
  for (const key in obj) {
    if (!arr.includes(key)) {
      const element = obj[key];
      newobj[key] = element;
    }
  }

  return newobj;
};

export const deepClone = (obj: any) => {
  if (typeof obj != "object") return obj;
  // 写一个循环递归深拷贝
  let newobj: any = {};
  for (const key in obj) {
    const element = obj[key];
    if (typeof element === "object") {
      newobj[key] = deepClone(element);
    } else {
      newobj[key] = element;
    }
  }
  console.log(newobj);
  return newobj;
};
export { storage };
export {hyphenate};
export * from "./loading";
export * from "./request";
export * from "./storage";
export * from "./type";
export * from './upload';
export * from "./cookie";
export * from "./schema";
export * from "./editor";
export * from "./drag";
