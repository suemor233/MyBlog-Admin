import {defineComponent, onMounted, reactive, ref} from 'vue'
import classes from "./index.module.scss";

import {ContentLayout} from "@/layouts/content";
import {useRouter} from "vue-router";
import {
    FormInst, NButton, NIcon,
    NInput, NSpace,
    useMessage
} from "naive-ui";
import MyEditor from "@/components/MyEditor";

import MyArticleDialog from "@/components/MyArticleDialog";
import {AddArticle} from "@/api/modules/article";
import {IAxios} from "@/typings/axiosCode";
import {Add12Regular, Save16Regular} from "@vicons/fluent";



export default defineComponent({
    name: 'write',
    components:{
        MyEditor
    },
    setup(props, ctx) {
        const router = useRouter()
        const toast = useMessage()
        const formRef = ref<FormInst | null>(null)
        const handleSave = ()=>{
            if (!articleForm.content){
                toast.error('不能保存空文章哦～')
                return
            }
            articleForm.modalOpen = true
        }

        const articleForm = reactive<IArticleForm>({
            title: '',
            category: '',
            tags:[],
            modalOpen:false,
            content:''
        })


        const handleValidateButtonClick = (e:MouseEvent)=>{

            e.preventDefault()

            formRef.value?.validate(async (errors) => {
                if (errors) {
                    return
                }
                const _articleForm = JSON.parse(JSON.stringify(articleForm))
                _articleForm.tags =  _articleForm.tags.toString()
                const res = await AddArticle(_articleForm) as IAxios

                if (!res.success){
                    toast.error(res.data.error || '服务器异常')
                    return
                }
                articleForm.modalOpen = false
                toast.success('保存成功')
            })
        }


        const slots = {
            header: () => (
                <NSpace>
                    <NButton secondary round type={'info'} onClick={handleSave}>
                        {{
                            icon: () => (
                                <NIcon>
                                    <Save16Regular/>
                                </NIcon>
                            ),
                            default: () => `保存`
                        }}
                    </NButton>
                    <NButton secondary round type={'primary'} onClick={handleSave}>
                        {{
                            icon: () => (
                                <NIcon>
                                    <Add12Regular/>
                                </NIcon>
                            ),
                            default: () => `发布文章`
                        }}
                    </NButton>
                </NSpace>
            )
        };


        return () => (
            <>
                <ContentLayout title={`博文 · ${router.currentRoute.value.query.id ? '修改' : '撰写'}`} v-slots={slots}>
                    <div class={classes.myMarkdown}>
                        <NInput class={classes.mInput}  v-model:value={articleForm.title} type={'text'} placeholder={'在这里输入主人的文章标题'}/>
                        <MyEditor {...{onHandleSave:handleSave,onHandleText:(msg)=>{articleForm.content = msg}}} />
                    </div>
                    <MyArticleDialog formRef={formRef} articleForm={articleForm} {...{onHandleValidateButtonClick:handleValidateButtonClick}}/>
                </ContentLayout >
            </>
        );
    }
})
