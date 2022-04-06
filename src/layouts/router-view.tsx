import { defineComponent } from 'vue'

import { Suspense, VNode } from 'vue'
import { RouteLocation, RouterView } from 'vue-router'
import {NSpin} from "naive-ui";
const $RouterView = defineComponent({
  setup() {
    return () => (
      <RouterView>
        {{
          default({ Component }: { Component: VNode; route: RouteLocation }) {
            return (
              <Suspense>
                {{
                  default: () => Component,
                  fallback() {
                    return (
                        <div style={{position:'fixed',top:'0',left:'0',bottom:'0',right:'0',display:'flex',justifyContent:'center',alignItems:'center'}}>
                          <NSpin strokeWidth={14} show rotate />
                        </div>
                    )
                  },
                }}
              </Suspense>
            )
          },
        }}
      </RouterView>
    )
  },
})
export default $RouterView
