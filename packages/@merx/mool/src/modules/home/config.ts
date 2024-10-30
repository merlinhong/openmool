export const theme = {
  primary: '#333333',
  secondary: '#f5f5f5',
  accent: '#4a4a4a',
  text: '#333333',
  lightText: '#666666',
  border: '#e0e0e0',
  buttonBg: '#f0f0f0',
  buttonHover: '#e0e0e0',
};

export default {

  pages: [
    {
      path: "/",
      redirect: "/home",
      name: "/",
      meta: {
        title: "MoolEngine",
        keywords: "低码组件，设计器，低代码开发，可视化",
        description:
          "MlDesigner低代码设计器,拖拽式可视化开发,可生成源码进行二开,快速构建vue3页面",
      },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import("./views/index.vue"),
      children: [
        {
          path: '',
          name: '',
          component: () => import('./pages/home.vue'),
        },
      ],
      meta: {
        title: "MoolEngine",
        keywords: "低码组件，设计器，低代码开发，可视化",
        description:
          "MlDesigner低代码设计器,拖拽式可视化开发,可生成源码进行二开,快速构建vue3页面",
      },
    },
    {
      path: '/apply',
      name: 'apply',
      component: () => import("./views/index.vue"),
      children: [
        {
          path: '',
          name: '',
          component: () => import('./pages/apply.vue'),
        },
      ]
    },
    {
      path: '/my-designer',
      name: 'UserProfile',
      component: () => import("./views/index.vue"),
      children: [
        {
          path: '',
          name: '',
          component: () => import('./pages/mydesigner.vue'),
        },
      ]
    },
  ]
};
