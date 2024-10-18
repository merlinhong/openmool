export default {
	pages: [
		{
		  path: "/demo",
          name: "page",
		  component: () => import("$/designer/demo/base.vue"),
		},
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
	  ]
};
