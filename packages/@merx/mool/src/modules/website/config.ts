export default {
  pages: [
    {
      path: "/lowcode",
      component: () => import("./lowcode/LowCodePlatformHomePage.vue"),
    },
    {
      path: "/photo",
      component: () => import("./photo/photographyStudioHomePage.vue"),
    },
    {
      path: "/code1",
      component: () => import("./demo/code1.vue"),
    },
    {
      path: "/index1",
      component: () => import("./admin/index1.vue"),
    }
  ],
};