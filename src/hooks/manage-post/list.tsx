import {DataTableColumns, NButton, NIcon, NSpace, useMessage} from "naive-ui";
import {h, reactive, Ref, UnwrapRef, watch} from "vue";
import MyPopconfirm from "@/components/MyPopconfirm";
import {article, DeleteArticleById, DeleteArticles} from "@/api/modules/article";
import {IArticle, IAxios} from "@/typings/axiosCode";
import {parseDate, relativeTimeFromNow} from "@/utils/time";
import MyArticleTime from "@/components/MyArticleTime";
import {Add12Regular, Delete24Regular} from "@vicons/fluent";
import {useRouter} from "vue-router";
import {RouteName} from "@/router/name";
import {useMediaQuery} from "@vueuse/core";


function useArticleList(data: Article[], checkedRowKeysRef: Ref<UnwrapRef<string[]>>) {
    const message = useMessage()
    const router = useRouter()
    const isLargeScreen = useMediaQuery('(min-width: 550px)')



    const createColumns = (): DataTableColumns<Article> => {
        //我是fw
        if (window.outerWidth > 600){
            return [
                {
                    type: 'selection'
                },
                {
                    title: '标题',
                    key: 'title',
                    sorter:'default',
                    render(row) {
                        return h(
                            <span style={{color:'#18a058',cursor:'pointer'}} onClick={()=>{router.push({path:'/posts/edit',query:{id:row.id}})}}>{row.title}</span>
                        )
                    }
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
                    sorter:(row1, row2) => row2.createAt.localeCompare(row1.createAt),
                    render(row) {
                        return h(
                            <MyArticleTime time={{time:row.createAt,timeNow:row.createAtNow}} />
                        )
                    }
                },
                {
                    title: '修改时间',
                    key: 'updateAtNow',
                    sorter:'default',
                    render(row) {
                        return h(
                            <MyArticleTime time={{time:row.updateAt,timeNow:row.updateAtNow}} />
                        )
                    }
                },
                {
                    title: '状态',
                    key: 'state',
                    render(row) {
                        return h(
                            <span style={row.state ? {color:'#18a058'} : {color:'#0984e3'}}>{row.state ? '已发布' : '草稿'}</span>
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
        }else {
            return [
                {
                    type: 'selection'
                },
                {
                    title: '标题',
                    key: 'title',
                    sorter:'default',
                    render(row) {
                        return h(
                            <span style={{color:'#18a058',cursor:'pointer'}} onClick={()=>{router.push(RouteName.Edit + '?id='+ row.id)}}>{row.title}</span>
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

    const slots = {
        header: () => (
            <NSpace>
                {
                    isLargeScreen.value ?<NButton disabled={checkedRowKeysRef.value.length === 0} secondary round type={'error'} onClick={handleDelete}>
                        {{
                            icon: () => (
                                <NIcon>
                                    <Delete24Regular/>
                                </NIcon>
                            ),
                            default: () => `删除选中`
                        }}
                    </NButton> : null
                }

                <NButton secondary round type={'primary'}>
                    {{
                        icon: () => (
                            <NIcon>
                                <Add12Regular/>
                            </NIcon>
                        ),
                        default: () => `添加文章`
                    }}
                </NButton>
            </NSpace>
        )
    };


    const handleDelete = async ()=>{
        if (checkedRowKeysRef.value.length === 0){
            message.error('这不可能！！！')
            return
        }
        const res  = await DeleteArticles(checkedRowKeysRef.value) as IArticle
        if (res.success){
            message.success('删除成功')
            checkedRowKeysRef.value.length = 0
            //我是傻逼，后端有bug,实在不会搞了。。
            setTimeout(()=>{
                 getArticle()
            },50)
        }else {
            message.success(res.data.error || '删除失败')
        }
    }

    return {
        createColumns,
        getArticle,
        handleDelete,
        slots,
        data
    }
}

export default useArticleList
