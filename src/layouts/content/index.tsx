
import { NLayoutContent } from 'naive-ui'
import {
  computed,
  defineComponent,
  inject,
  onUnmounted,
  PropType,
  provide,
  ref,
  VNode,
} from 'vue'



export const ContentLayout = defineComponent({
  props: {
    actionsElement: {
      type: Object as PropType<JSX.Element | null>,
      required: false,
    }
  },
  setup(props, ctx) {
    const { slots } = ctx

    return () => (
      <>
        <NLayoutContent>
          <header >
              <h1>header</h1>
          </header>
        </NLayoutContent>
        <main>{slots.default?.()}</main>
        <p>footer</p>
      </>
    )
  },
})
