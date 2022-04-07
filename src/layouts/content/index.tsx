
import {NLayoutContent, NLayoutFooter, NLayoutHeader} from 'naive-ui'
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
          <div>
          <NLayoutHeader style={{background:'#FAFAFC'}}>

          </NLayoutHeader>
          <NLayoutContent style={{background:'#FAFAFC'}}>
              {slots.default?.()}
          </NLayoutContent>
          </div>


      </>
    )
  },
})
