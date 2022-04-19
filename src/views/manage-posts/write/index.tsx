import {defineComponent, onMounted, reactive, ref, watch} from 'vue'
import classes from "./index.module.scss";

import {ContentLayout} from "@/layouts/content";
import {useRoute, useRouter} from "vue-router";
import {
    FormInst, NButton, NIcon,
    NInput, NSpace,
    useMessage
} from "naive-ui";
import MyEditor from "@/components/MyEditor";

import MyArticleDialog from "@/components/MyArticleDialog";
import {AddArticle, ArticleUpdate, GetArticleById} from "@/api/modules/article";
import {Add12Regular, Save16Regular} from "@vicons/fluent";
import appStore from "@/store";



export default defineComponent({
    name: 'write',
    components:{
        MyEditor
    },
    setup(props, ctx) {
        const router = useRouter()
        const route = useRoute()
        const toast = useMessage()
        const formRef = ref<FormInst | null>(null)
        const handleSave = (state:boolean)=>{
            if (!articleForm.content){
                toast.error('文章不能为空哦～')
                return
            }
            articleForm.state = state
            modalOpen.value = true

        }
        const modalOpen = ref(false)
        const isPublic = ref(false)
        const articleForm = reactive<IArticleForm>({
            title: '',
            category: '默认分类',
            tags:[],
            content:'',
            state:false
        })


        const handleValidateButtonClick = (e:MouseEvent)=>{
            e.preventDefault()

            formRef.value?.validate(async (errors) => {
                if (errors) {
                    return
                }
                const _articleForm = JSON.parse(JSON.stringify(articleForm))
                _articleForm.tags =  _articleForm.tags.toString()
                let res
                if (route.query.id){
                    res = await ArticleUpdate(_articleForm) as UmiType
                }else {
                    res = await AddArticle(_articleForm) as UmiType
                }

                if (!res.success){
                    toast.error(res.data.error || '服务器异常')
                    return
                }
                modalOpen.value = false
                console.log(res)
                isPublic.value = res.data.state

                if (isPublic.value){
                    toast.success('发布成功')
                    router.push('/posts/view')
                }else {
                    toast.success('保存成功')
                    router.push({path:'/posts/edit',query:{id:res.data.id}})
                }

            })
        }



        const slots = {
            header: () => (
                <NSpace>
                    {
                        !isPublic.value
                          ? <NButton secondary round type={'info'} onClick={()=>handleSave(false)}>
                                {{
                                    icon: () => (
                                        <NIcon>
                                            <Save16Regular/>
                                        </NIcon>
                                    ),
                                    default: () => `保存`
                                }}
                            </NButton>
                            : null
                    }

                    <NButton secondary round type={'primary'} onClick={()=>handleSave(true)}>
                        {{
                            icon: () => (
                                <NIcon>
                                    <Add12Regular/>
                                </NIcon>
                            ),
                            default: () =>  !isPublic.value ? `发布文章` : '修改并发布'
                        }}
                    </NButton>
                </NSpace>
            )
        };

       watch(route,()=>{
           if (route.fullPath == '/posts/edit'){
               location.reload()
           }
       })

        onMounted(async ()=>{
            if (route.query.id){
                const res =  await appStore.useArticle.getArticleById(route.query.id as string)

                if (!res.success || !res.data){
                    toast.error('文章不存在')
                    router.push('/posts/edit')
                    return
                }
                res.data.tags = res.data.tags.split(',')
                res.data.category = res.data.category.name
                Object.assign(articleForm,res.data)
                isPublic.value = res.data.state
            }

        })


        return () => (
            <>
                <ContentLayout title={`博文 · ${router.currentRoute.value.query.id ? '修改' : '撰写'}`} v-slots={slots}>
                    <div class={classes.myMarkdown}>
                        <NInput class={classes.mInput}  v-model:value={articleForm.title} type={'text'} placeholder={'在这里输入主人的文章标题'}/>
                        <MyEditor {...{onHandleSave:handleSave,onHandleText:(msg)=>{articleForm.content = msg}}} />
                    </div>
                    <MyArticleDialog modalOpen={modalOpen} formRef={formRef} articleForm={articleForm} {...{onHandleValidateButtonClick:handleValidateButtonClick}}/>
                </ContentLayout >
            </>
        );
    }
})
