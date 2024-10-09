import { ElMessage } from "element-plus";
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteMeta,
  RouteRecordRaw,
} from "vue-router";
import { Router, storage, module } from "@/mool";
import { isArray } from "lodash-es";
import { useStore } from "@/mool/store";
import { Loading } from "../utils";
import { config } from "@/config";

// 基本路径
const baseUrl = import.meta.env.BASE_URL;

// 扫描文件
const files = import.meta.glob([
  "/src/modules/*/{views,pages}/**/*",
  "!**/components",
]);

// 默认路由
const routes: RouteRecordRaw[] = [
  {
    path: "/page",
    name: "page",
    component: () => import("$/designer/views/page.vue"),
    children: [],
    meta: {
      title: "MlDesigner",
      keywords: "低码组件，设计器，低代码开发，可视化",
      description:
        "MlDesigner低代码设计器,拖拽式可视化开发,可生成源码进行二开,快速构建vue3页面",
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("$/designer/views/error/404.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("$/login/views/index.vue"),
    children: [],
    meta: {
      title: "MlDesigner",
      keywords: "低码组件，设计器，低代码开发，可视化",
      description:
        "MlDesigner低代码设计器,拖拽式可视化开发,可生成源码进行二开,快速构建vue3页面",
    },
  },
];

// 创建路由器
const router = createRouter({
  history: createWebHashHistory(baseUrl),
  routes,
}) as Router;

// 组件加载后
router.beforeResolve(() => {
  Loading.close();
});

let lock = false;

// 错误监听
router.onError((err: Error) => {
  if (!lock) {
    lock = true;

    ElMessage.error(`页面存在错误：${err.message}`);
    console.error("err", err);

    // 动态加载组件错误，刷新页面
    if (err.message?.includes("Failed to fetch dynamically imported module")) {
      // window.location.reload();
    }

    setTimeout(() => {
      lock = false;
    }, 0);
  }
});

// 添加试图，页面路由
router.append = function (data) {
  const list = isArray(data) ? data : [data];

  list.forEach((d) => {
    if (!d.meta) {
      d.meta = {};
    }

    // 组件路径
    if (!d.component) {
      const url = d.viewPath;

      if (url) {
        if (url.indexOf("http") == 0) {
          if (d.meta) {
            d.meta.iframeUrl = url;
          }

          // d.component = () => import("/$/base/views/frame.vue");
        } else {
          // d.component = files["/src/" + url.replace("cool/", "")];
        }
      } else {
        d.redirect = "/404";
      }
    }

    // 是否动态添加
    d.meta.dynamic = true;

    if (d.isPage) {
      router.addRoute(d as any);
    } else {
      router.addRoute("index", d as any);
    }
  });
};

// 清空路由
router.clear = function () {
  const rs = router.getRoutes();

  rs.forEach((e) => {
    if (e.name && e.meta?.dynamic) {
      router.removeRoute(e.name);
    }
  });
};

// 找路由
router.find = function (path: string) {
  return router.getRoutes().find((e) => {
    if (path == "/") {
      return e.path == path && e.name != "index";
    } else {
      return e.path == path;
    }
  });
};

// 注册
router.register = async function (path: string) {
  console.log(router.find(path));
  
  // 当前路由是否注册
  const isReg = Boolean(router.find(path));

  if (!isReg) {
    // const { menu } = useBase();

    // 等待应用配置加载完
    await Loading.wait();

    // 待注册列表
    const list: any[] = [];

    // // 动态菜单数据
    // menu.routes.find((e) => {
    // 	list.push({
    // 		...e,
    // 		isPage: e.viewPath?.includes("/pages")
    // 	});
    // });

    // 本地模块数据
    module.list.forEach((e) => {
      
      if (e.views) {
        list.push(...e.views);
      }

      if (e.pages) {
        list.push(
          ...e.pages.map((d) => {
            return {
              ...d,
              isPage: true,
            };
          })
        );
      }
    });

    // 需要注册的路由
    const r = list.find((e) => e.path == path);
    
    if (r) {
      router.append(r);
    }
  }

  return { route: router.find(path), isReg };
};

// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 数据缓存
  const { user } = useStore();
  console.log(module.list);
  
  // 预先注册路由
  const { isReg, route } = await router.register(to.path);

  // 组件不存在、路由不存在
  if (!route?.components) {
    next(user.token ? "/404" : "/login");
  } else {
    if (!isReg) {
      next(to.fullPath);
    } else {
      // 登录成功
      // if (user.token) {
      //   // 在登录页
      //   if (to.path.includes("/login")) {
      //     // Token 未过期
      //     if (!storage.isExpired("token")) {
      //       // 回到首页
      //       return next("/");
      //     }
      //   } else {
      //     // 添加路由进程
      //     // process.add(to);
      //   }
      // } else {
      //   // 忽略部分 Token 验证
      //   if (!config.ignore.token.find((e) => to.path == e)) {
      //     return next("/login");
      //   }
      // }

      next();
    }
  }
  // next();
  return;
});
// 针对SEO的关键词优化
router.afterEach((to) => {
  const { title, keywords, description } = to.meta as RouteMeta & {
    title?: string;
    keywords?: string;
    description?: string;
  };
  if (title) {
    document.title = title;
  }
  if (keywords) {
    const metaKeywords = document.querySelector(
      'meta[name="keywords"]'
    ) as HTMLMetaElement;
    if (metaKeywords) {
      metaKeywords.content = keywords;
    }
  }
  if (description) {
    const metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;
    if (metaDescription) {
      metaDescription.content = description;
    }
  }
});

export { router };
