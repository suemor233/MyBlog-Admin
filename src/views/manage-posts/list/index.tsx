import {defineComponent, h, reactive, ref} from 'vue'
import {useRoute} from "vue-router";
import classes from "./index.module.scss";
import {DataTableColumns, NButton, NDataTable, NPopconfirm, useMessage} from "naive-ui";
import {article, DeleteArticleById} from "@/api/modules/article";
import {IArticle, IAxios} from "@/typings/axiosCode";
import {parseDate, relativeTimeFromNow} from "@/utils/time";

export default defineComponent({
    name: 'list',
    setup(props, ctx) {
        const route = useRoute()
        const message = useMessage()


        const checkedRowKeysRef = ref([])
        const createColumns = ({play}: {
            play: (row: Article) => void
        }): DataTableColumns<Article> => {
            return [
                {
                    type: 'selection'
                },
                {
                    title: '标题',
                    key: 'title'
                },
                {
                    title: '分类',
                    key: 'category'
                },
                {
                    title: '标签',
                    key: 'tags'
                },
                {
                    title: '创建时间',
                    key: 'createAtNow'
                },
                {
                    title: '修改时间',
                    key: 'updateAtNow'
                },
                {
                    title: '操作',
                    key: 'actions',
                    render(row) {
                        return h(
                            <NPopconfirm  positiveText={'删除'} negativeText={'取消'}  onPositiveClick={async () => {
                                const res = await DeleteArticleById(row.id) as IArticle
                                if (res.success){
                                    message.success('删除成功 ')
                                    getArticle()
                                }else {
                                    message.error(res.data.error || '删除失败')
                                }
                            }} onNegativeClick={() => console.log(2)}>
                                {{
                                    trigger: () => (<NButton
                                                        strong={true}
                                                        size={'tiny'}
                                                        type={'error'}
                                                        quaternary={true}>丢进垃圾桶</NButton>),

                                     default: () => `主人是否要删掉 ${row.title}  ?`
                                }}
                            </NPopconfirm>
                        )
                    }
                }
            ]
        }


        const data = reactive<Article[]>([])

        const columns = createColumns({
            play(row: Article) {
                message.info(`Play ${row.title}`)
            }
        })

        // @ts-ignore
        const handleCheck = (rowKeys) => {
            checkedRowKeysRef.value = rowKeys
        }

        const pagination = {
            pageSize: 15
        }

        const getArticle = async () => {
            const res = await article() as IAxios
            data.length = 0
            if (res.success) {
                const articleData = res.data.article
                for (const _articleData of articleData) {
                    _articleData.createAtNow = relativeTimeFromNow(_articleData.createAt)
                    _articleData.updateAtNow = relativeTimeFromNow(_articleData.updateAt)
                    _articleData.createAt = parseDate(_articleData.createAt, 'yyyy年M月d日 HH:mm:ss')
                    _articleData.updateAt = parseDate(_articleData.updateAt, 'yyyy年M月d日 HH:mm:ss')
                    data.push(_articleData)
                }
            } else {
                message.error(res.data.error)
            }
        }

        getArticle()

        return () => (
            <>
                <p class={classes.title}>{'博文 · ' + route.meta.title}</p>
                <NDataTable ref={'table'} columns={columns} data={data} pagination={pagination} rowKey={row => row.id}
                            onUpdateCheckedRowKeys={handleCheck}/>
            </>
        );
    }
})


type Article = {
    title: string
    category: string
    tags: string
    createAt: string
    updateAt: string
    createAtNow: string
    updateAtNow: string
    content: string
    cover: string
    id: string
}

