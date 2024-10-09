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
  ],
};