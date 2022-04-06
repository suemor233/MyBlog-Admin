import $RouterView from '../router-view'
import { NLayoutContent } from 'naive-ui'
import { defineComponent, watchEffect } from 'vue'


import Sidebar from "@/components/sidebar";
export const SidebarLayout = defineComponent({
  name: 'SidebarLayout',

  setup(props) {

    return () => (
      <div >
        <Sidebar
        />
        <NLayoutContent
          embedded
          nativeScrollbar={false}
          style={{
            left: '100px',
          }}
        >
          <$RouterView />
        </NLayoutContent>
      </div>
    )
  },
})
