import {defineComponent, onMounted, reactive, ref} from 'vue'
import classes from "./index.module.scss";

import {ContentLayout} from "@/layouts/content";
import useArticleWrite from "@/hooks/manage-post/write";
import {useRouter} from "vue-router";
import {
    FormInst,
    NInput,
    useMessage
} from "naive-ui";
import MyEditor from "@/components/MyEditor";

import MyArticleDialog from "@/components/MyArticleDialog";



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
            // if (!text.value){
            //     toast.error('不能保存空文章哦～')
            //     return
            // }
            articleForm.modalOpen = true
            // toast.success('保存成功')
        }
        const {slots} = useArticleWrite(handleSave)

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
                articleForm.modalOpen = false
                toast.success('保存成功')
            })
        }


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
