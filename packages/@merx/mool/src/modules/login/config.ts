export default {
    pages: [
        {
            path: "/login",
            name: "login",
            component: () => import("$/login/views/index.vue"),
        },
    ]
}