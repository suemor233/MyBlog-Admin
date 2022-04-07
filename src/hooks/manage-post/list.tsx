import {DataTableColumns, useMessage} from "naive-ui";
import {h, reactive} from "vue";
import MyPopconfirm from "@/components/MyPopconfirm";
import {article} from "@/api/modules/article";
import {IAxios} from "@/typings/axiosCode";
import {parseDate, relativeTimeFromNow} from "@/utils/time";
import MyArticleTime from "@/components/MyArticleTime";


function useArticleList(data: Article[]) {
    const message = useMessage()

    const createColumns = (): DataTableColumns<Article> => {
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
                key: 'createAtNow',
                render(row) {
                    return h(
                        <MyArticleTime time={{time:row.createAt,timeNow:row.createAtNow}} />
                    )
                }
            },
            {
                title: '修改时间',
                key: 'updateAtNow',
                render(row) {
                    return h(
                        <MyArticleTime time={{time:row.updateAt,timeNow:row.updateAtNow}} />
                    )
                }
            },
            {
                title: '操作',
                key: 'actions',
                render(row) {
                    return h(
                        <MyPopconfirm row={row} getArticle={getArticle}/>
                    )
                }
            }
        ]
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

    return {
        createColumns,
        getArticle,
        data
    }
}

export default useArticleList
