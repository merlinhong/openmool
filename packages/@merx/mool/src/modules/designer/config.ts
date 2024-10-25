export default {
  pages: [
    {
      path: "/demo",
      name: "page",
      component: () => import("$/designer/demo/base.vue"),
    },
    {
      path: "/designer",
      name: "Designer ",
      component: () => import("$/designer/views/designer.vue"),
      children: [],
      meta: {
        title: "MoolEngine",
        keywords: "低代码，定制开发，低代码平台，低码设计器，低代码开发，可视化低代码平台，拖拽式开发，画布，低代码引擎，基于vue3的开源低代码平台",
        description:
          "MoolEngine,拖拽式可视化开发,可生成源码进行二开,快速构建vue3页面，同时集成AI对页面组件进行事件流编排，支持快速生成可定制的响应式官网页面和后台管理系统，一键导出源码。",
      },
    },
  ]
};
