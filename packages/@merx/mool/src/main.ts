import axios from "axios";
import ElementPlus from "element-plus";
import { createApp } from "vue";
import App from "./App.vue";
import { bootstrap } from "./mool";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const app = createApp(App);
// app.use(i18n);
// app.use(ElementPlus, {
//   locale: zhCn,
// });
// app.provide("$axios", axios);
// app.use(router);
// app.mount("#app");

// 启动
bootstrap(app)
	.then(() => {
		app.mount("#app");
	})
	.catch((err) => {
		console.error("COOL-ADMIN 启动失败", err);
	});

