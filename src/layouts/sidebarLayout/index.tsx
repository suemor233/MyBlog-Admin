import $RouterView from '../router-view'
import {NLayout, NLayoutContent, NLayoutSider, NSpace} from 'naive-ui'
import {defineComponent, onMounted, ref, watchEffect} from 'vue'


import Sidebar from "@/components/sidebar";
import {userInfo} from "@/api/modules/user";
import {useUser} from "@/hooks";
import {IAxios} from "@/typings/axiosCode";
export const SidebarLayout = defineComponent({
  name: 'SidebarLayout',

     setup(props) {
      const {setUser} = useUser()
      onMounted(async()=>{
          const res = await userInfo() as IAxios
          if (res.success){
              setUser(res.data)
          }

      })

      return () => (
        <NSpace vertical size="large" >
            <NLayout has-sider style={{position:'fixed',top:'0',left:'0',bottom:'0',right:'0'}}>
                    <Sidebar/>
                <NLayout style={{paddingLeft:'24px'}}>
                    <$RouterView />
                </NLayout>
            </NLayout>
        </NSpace>
    )
  },
})
