import $RouterView from '../router-view'
import {NLayout,NSpace} from 'naive-ui'
import {defineComponent, onMounted} from 'vue'


import Sidebar from "@/components/sidebar";
import {userInfo} from "@/api/modules/user";
import {useUser} from "@/hooks";
import {IAxios} from "@/typings/axiosCode";
import classes from "./index.module.scss";

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
        <NSpace vertical size="large">
            <NLayout class={classes.nLayout} has-sider>
                    <Sidebar/>
                <NLayout class={classes.nRouter}>
                    <$RouterView/>
                </NLayout>
            </NLayout>
        </NSpace>
    )
  },
})
