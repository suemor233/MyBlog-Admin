import {RouteRecordRaw} from "vue-router";
import {RouteName} from "@/router/name";
import Login from "@/views/Login";


export const routeForMenu: Array<RouteRecordRaw> = [
    {
        path: '/dashboard',
        component: import("@/views/Dashboard"),
        name: RouteName.Dashboard,
        meta: {
            title: '仪表盘',
        },

    }

]

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: RouteName.Home,
        component: import("@/views/Dashboard"),
        redirect: '/dashboard',
        children: [...routeForMenu],
    },

    {
        path: "/Login",
        name: RouteName.Login,
        meta: { isPublic: true, title: '登陆' },
        component: () => Login,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "404",
        meta: { isPublic: true },
        redirect: '/',
    },
];
