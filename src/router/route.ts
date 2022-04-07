import {RouteRecordRaw} from "vue-router";
import {RouteName} from "@/router/name";
import {SidebarLayout} from "@/layouts/sidebarLayout";
import Dashboard from "@/views/Dashboard";
import $RouterView from "@/layouts/router-view";


export const routeForMenu: Array<RouteRecordRaw> = [
    {
        path: '/dashboard',
        component: Dashboard,
        name: RouteName.Dashboard,
        meta: {
            title: '仪表盘',
        },
    },
    {
        path: '/posts',
        name: RouteName.Post,
        meta: {
            title: '博文',
        },
        redirect: '/posts/view',
        component: $RouterView,
        children: [
            {
                path: 'view',
                name: RouteName.View,
                meta: {
                    title: '管理'
                },
                component: () =>
                    import('../views/manage-posts/list')
            },
            {
                path: 'edit',
                name: RouteName.Edit,
                meta: {
                    title: '撰写',
                },
                props: true,
                component: () => import('../views/manage-posts/write'),
            },

            {
                path: 'category',
                name: RouteName.Category,
                meta: {
                    title: '分类 / 标签',
                },
                component: () =>
                    import('../views/manage-posts/category')
            },
        ],
    },


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
        path: "/Login",
        name: RouteName.Login,
        meta: {isPublic: true, title: '登陆'},
        component: () => import("@/views/Login"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "404",
        meta: {isPublic: true},
        redirect: '/',
    },
];
