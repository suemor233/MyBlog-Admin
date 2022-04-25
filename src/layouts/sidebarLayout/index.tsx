import $RouterView from '../router-view'
import {NLayout,NSpace} from 'naive-ui'
import {defineComponent} from 'vue'
import Sidebar from "@/components/sidebar";
import classes from "./index.module.scss";

export const SidebarLayout = defineComponent({
  name: 'SidebarLayout',
     setup(props) {
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
