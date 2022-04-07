import {defineComponent, PropType} from 'vue'
import {DeleteArticleById} from "@/api/modules/article";
import {IArticle} from "@/typings/axiosCode";
import {NButton, NPopconfirm, useMessage} from "naive-ui";
import {useArticleList} from "@/hooks";

export default defineComponent({
    name: 'MyPopconfirm',
    props: {
        row: Object as PropType<Article>,
        getArticle: Function as PropType<any>,
    },
    setup(props, ctx) {
        const message = useMessage()
        const {row, getArticle} = props
        if (!row) return <h1>表格异常</h1>

        return () => (
            <>
                <NPopconfirm positiveText={'删除'} negativeText={'取消'}
                 onPositiveClick={async () => {
                    const res = await DeleteArticleById(row.id) as IArticle
                    if (res.success) {
                        message.success('删除成功 ')
                        getArticle()
                    } else {
                        message.error(res.data.error || '删除失败')
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
