import {computed, ComputedRef, defineComponent, ref, watch} from 'vue'
import { NLayoutSider, NMenu} from "naive-ui";
import {RouterLink, useRoute, useRouter} from "vue-router";
import classes from "./index.module.scss";
import {useStore} from "vuex";
import useSideBar from "@/hooks/SiderBar";
import {useMediaQuery} from "@vueuse/core";

export default defineComponent({
    name: 'SideBar',
    setup(props, ctx) {
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        const {menuOptions,handleUpdateValue} = useSideBar()
        const isLargeScreen = useMediaQuery('(min-width: 770px)')
        const collapsed = ref(!isLargeScreen.value)

        watch(isLargeScreen,()=>{
            collapsed.value = !isLargeScreen.value
        })

        const fullPathValue:any = computed(()=>{
            if (route.fullPath.indexOf('?') !== -1){
                  return route.fullPath.substring(0,route.fullPath.indexOf('?'))
            }else {
                  return  route.fullPath
            }
        })
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
                            !collapsed.value ? (<p onClick={()=>router.push('/dashboard')}>{store.state.user.userName}</p>) : undefined
                        }

                    </div>
                    <NMenu options={menuOptions}
                           collapsed={collapsed.value}
                           collapsedWidth={64}
                           collapsedIconSize={22}
                           onUpdateValue={handleUpdateValue}
                           value={fullPathValue}
                    />
                </NLayoutSider>

            </>
        );
    }
})


