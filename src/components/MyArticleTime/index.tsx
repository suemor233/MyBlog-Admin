import {defineComponent,PropType} from 'vue'
import { NPopover} from "naive-ui";


export default defineComponent({
    name: 'MyArticleTime',
    props:{
        time: {
            type:Object as PropType<ITime>,
            require:true
        }
    },
    setup(props, ctx) {

        const {time} = props
        if (!time) return <h1>表格异常</h1>
        return () => (
            <>
                <NPopover trigger={'hover'}>
                    {{
                        trigger: () => (time.timeNow),
                        default: () => time.time
                    }}

                </NPopover>
            </>
        );
    }
})



