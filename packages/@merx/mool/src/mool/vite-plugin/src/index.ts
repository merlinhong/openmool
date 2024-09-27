import { virtual } from "./virtual";
// import type { Config } from "../types";
import { merge } from "lodash";

export function mool() {
	// // 应用类型，admin | app
	// config.type = options.type;

	// // 请求地址
	// config.reqUrl = options.proxy["/dev/"].target;

	// // Eps
	// if (options.eps) {
	// 	const { dist, mapping, api, enable = true } = options.eps;

	// 	// 是否开启
	// 	config.eps.enable = enable;

	// 	// 类型
	// 	if (api) {
	// 		config.eps.api = api;
	// 	}

	// 	// 输出目录
	// 	if (dist) {
	// 		config.eps.dist = dist;
	// 	}

	// 	// 匹配规则
	// 	if (mapping) {
	// 		merge(config.eps.mapping, mapping);
	// 	}
	// }

	return [virtual()];
}
