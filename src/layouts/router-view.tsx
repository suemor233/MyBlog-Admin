import { defineComponent } from 'vue'

import { Suspense, VNode } from 'vue'
import { RouteLocation, RouterView } from 'vue-router'
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
