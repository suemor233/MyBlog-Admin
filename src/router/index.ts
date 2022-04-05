import {
    createRouter,
    createWebHashHistory,
    NavigationGuardNext,
    RouteLocationNormalized,
    RouteRecordRaw
} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/Login",
    },

    {
        path: "/Login",
        name: "login",
        meta: {
            type: "login",
        },
        component: () => import("@/views/Login"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: () => import("@/views/404"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(
    (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ) => {

        // const user = localStorage.getItem("user");
        //
        // if (to.meta.type === "Login" && user) {
        //     next({ name: "home" });
        //     return;
        // }
        //
        // if (to.meta.type === "home" && !user) {
        //     next({ name: "Login" });
        //     return;
        // }

        next();
    });


export default router;
