import {Component, defineComponent, h, PropType, ref} from 'vue'
import {MenuOption, NAvatar, NIcon, NLayoutSider, NMenu, useMessage} from "naive-ui";
import {RouterLink, useRouter} from "vue-router";
import {
    BookOutline as BookIcon,
    PersonOutline as PersonIcon,
    WineOutline as WineIcon,
    HomeOutline as HomeIcon
} from '@vicons/ionicons5'

import classes from "./index.module.scss";
import {useStore} from "vuex";


export default defineComponent({
    name: 'SideBar',
    setup(props, ctx) {
        const message = useMessage()
        const router = useRouter()
        const collapsed = ref(false)
        const store = useStore()
        const handleUpdateValue = (key: string, item: MenuOption) => {
            message.info('[onUpdate:value]: ' + JSON.stringify(key))
            message.info('[onUpdate:value]: ' + JSON.stringify(item))
        }



        function renderIcon(icon: Component) {
            return () => h(NIcon, null, {default: () => h(icon)})
        }

        const menuOptions: MenuOption[] = [
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                name: 'home',
                                params: {
                                    lang: 'zh-CN'
                                }
                            }
                        },
                        {default: () => '回家'}
                    ),
                key: 'go-back-home',
                icon: renderIcon(HomeIcon)
            },
            {
                key: 'divider-1',
                type: 'divider',
                props: {
                    style: {
                        marginLeft: '32px'
                    }
                }
            },
            {
                label: () =>
                    h(
                        'a',
                        {
                            href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
                            target: '_blank',
                            rel: 'noopenner noreferrer'
                        },
                        '且听风吟'
                    ),
                key: 'hear-the-wind-sing',
                icon: renderIcon(BookIcon)
            },
            {
                label: '1973年的弹珠玩具',
                key: 'pinball-1973',
                icon: renderIcon(BookIcon),
                disabled: true,
                children: [
                    {
                        label: '鼠',
                        key: 'rat'
                    }
                ]
            },
            {
                label: '寻羊冒险记',
                key: 'a-wild-sheep-chase',
                icon: renderIcon(BookIcon),
                disabled: true
            },
            {
                label: '舞，舞，舞',
                key: 'dance-dance-dance',
                icon: renderIcon(BookIcon),
                children: [
                    {
                        type: 'group',
                        label: '人物',
                        key: 'people',
                        children: [
                            {
                                label: '叙事者',
                                key: 'narrator',
                                icon: renderIcon(PersonIcon)
                            },
                            {
                                label: '羊男',
                                key: 'sheep-man',
                                icon: renderIcon(PersonIcon)
                            }
                        ]
                    },
                    {
                        label: '饮品',
                        key: 'beverage',
                        icon: renderIcon(WineIcon),
                        children: [
                            {
                                label: '威士忌',
                                key: 'whisky'
                            }
                        ]
                    },
                    {
                        label: '食物',
                        key: 'food',
                        children: [
                            {
                                label: '三明治',
                                key: 'sandwich'
                            }
                        ]
                    },
                    {
                        label: '过去增多，未来减少',
                        key: 'the-past-increases-the-future-recedes'
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
                            !collapsed.value ? (<p onClick={()=>router.push('/dashboard')}>suemor</p>) : null
                        }

                    </div>
                    <NMenu options={menuOptions}
                           collapsed={collapsed.value}
                           collapsedWidth={64}
                           collapsedIconSize={22}
                           onUpdateValue={handleUpdateValue}
                    />
                </NLayoutSider>

            </>
        );
    }
})


