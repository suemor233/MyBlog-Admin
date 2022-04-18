import {defineComponent, PropType} from 'vue'
import {NButton, NPopconfirm, useMessage} from "naive-ui";
import appStore from "@/store";

export default defineComponent({
    name: 'MyPopconfirm',
    props: {
        row: Object as PropType<Article>

    },
    setup(props, ctx) {
        const message = useMessage()
        const {row} = props
        if (!row) return <h1>表格异常</h1>

        return () => (
            <>
                <NPopconfirm positiveText={'删除'} negativeText={'取消'}
                 onPositiveClick={async () => {
                     const state =  await appStore.useArticle.deleteOneArticle(row.id)
                    if (state) {
                        message.success('删除成功 ')
                    } else {
                        message.error( '删除失败')
                    }
                }}
                >
                    {{
                        trigger: () => (<NButton
                            strong={true}
                            size={'tiny'}
                            type={'error'}
                            quaternary={true}>丢进垃圾桶</NButton>),
                        default: () => `主人是否要删掉 ${row?.title}  ?`
                    }}

                </NPopconfirm>
            </>
        );
    }
})
