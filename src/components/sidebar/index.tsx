import {Component, defineComponent, h, PropType, ref} from 'vue'
import {MenuOption, NAvatar, NIcon, NLayoutSider, NMenu, useMessage} from "naive-ui";
import {RouterLink, useRoute, useRouter} from "vue-router";
import {
    BookOutline as BookIcon,
    PersonOutline as PersonIcon,
    Pencil
} from '@vicons/ionicons5'

import classes from "./index.module.scss";
import {useStore} from "vuex";
import {DashboardOutlined} from "@vicons/antd";
import {ManageSearchRound,CategoryOutlined} from "@vicons/material";
import {Icon} from "@vicons/utils";
import {RouteName} from "@/router/name";




export default defineComponent({
    name: 'SideBar',
    setup(props, ctx) {
        const message = useMessage()
        const router = useRouter()
        const route = useRoute()
        const collapsed = ref(false)
        const store = useStore()
        const handleUpdateValue = (key: string, item: MenuOption) => {

            router.push(key)
        }

        function renderIcon(icon: Component) {
            return () => h(NIcon, null, {default: () => h(<Icon color="green" size="20"><icon/></Icon>)})
        }

        const menuOptions: MenuOption[] = [
            {
                label: '仪表盘',
                key: RouteName.Dashboard,
                icon: renderIcon(DashboardOutlined)
            },
            {
                label: '博文',
                key: RouteName.Post,
                icon: renderIcon(BookIcon),
                children: [
                    {
                        label: '管理',
                        key: RouteName.View,
                        icon: renderIcon(ManageSearchRound)
                    },
                    {
                        label: '撰写',
                        key: RouteName.Edit,
                        icon: renderIcon(Pencil)
                    },
                    {
                        label: '分类 / 标签',
                        key: RouteName.Category,
                        icon: renderIcon(CategoryOutlined)
                    }
                ]
            }
        ]

        return () => (
            <>

                <NLayoutSider
                    bordered
                    collapseMode={'width'}
                    collapsedWidth={64}
                    width={240}
                    collapsed={collapsed.value}
                    showTrigger
                    onCollapse={() => collapsed.value = true}
                    onExpand={() => collapsed.value = false}
                    style={{backgroundColor: '#E7F5EE', height: '100%'}}
                    class={classes.side}
                >

                    <div class={classes.avatar}>
                        <img onClick={()=>router.push('/dashboard')} src={store.state.user.avatar} class={classes.ImgAvatar}
                             style={{height: !collapsed.value ? '80px' : '40px'}}/>
                        {
                            !collapsed.value ? (<p onClick={()=>router.push('/dashboard')}>suemor</p>) : undefined
                        }

                    </div>
                    <NMenu options={menuOptions}
                           collapsed={collapsed.value}
                           collapsedWidth={64}
                           collapsedIconSize={22}
                           onUpdateValue={handleUpdateValue}
                           value={route.fullPath}
                    />
                </NLayoutSider>

            </>
        );
    }
})


