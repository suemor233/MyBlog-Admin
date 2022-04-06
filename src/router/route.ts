import {RouteRecordRaw} from "vue-router";
import {RouteName} from "@/router/name";
import {SidebarLayout} from "@/layouts/sidebarLayout";
import Dashboard from "@/views/Dashboard";


export const routeForMenu: Array<RouteRecordRaw> = [
    {
        path: '/dashboard',
        component: Dashboard,
        name: RouteName.Dashboard,
        meta: {
            title: '仪表盘',
        },
    }

]

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: SidebarLayout,
        name: RouteName.Home,
        redirect: '/dashboard',
        children: [...routeForMenu],
    },

    {
        path: "/login",
        name: RouteName.Login,
        meta: { isPublic: true, title: '登陆' },
        component: () => import("@/views/Login"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "404",
        meta: { isPublic: true },
        redirect: '/',
    },
];
