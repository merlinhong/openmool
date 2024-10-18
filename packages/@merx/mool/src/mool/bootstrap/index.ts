import { createPinia } from "pinia";
import { App } from "vue";
import { createModule } from "./module";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import ElementPlus from "element-plus";
import { router } from "../router";
import { Loading } from "../utils";
import "../../assets/less/global.less";
// import { createEps } from "./eps";
import "virtual:svg-register";
export async function bootstrap(app: App) {
  // pinia
  app.use(createPinia());

  app.use(ElementPlus, {
    locale: zhCn,
  });
  // 路由
  app.use(router);

  // 模块
  const { eventLoop, list } = await createModule(app);

  // eps
//   createEps(list);

  // 加载
  Loading.set([eventLoop()]);
}
