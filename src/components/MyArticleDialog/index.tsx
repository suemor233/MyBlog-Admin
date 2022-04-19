import {defineComponent, onMounted, PropType, Ref, watch} from 'vue'
import {FormInst, FormRules, NButton, NCard, NDynamicTags, NForm, NFormItem, NInput, NModal, NSelect} from "naive-ui";
import classes from "@/views/manage-posts/write/index.module.scss";
import appStore from "@/store";
import {ICategory} from "@/store/category/categoryType";

export default defineComponent({
    name: 'MyArticleDialog',
    emits: ["handleValidateButtonClick"],
    props:{
        articleForm:{
            type: Object as PropType<IArticleForm>,
            required: true,
        },
        formRef:{
            type: Object as PropType<Ref<FormInst | null>>,
            required: true,
        },
        modalOpen:{
            type: Object as PropType<Ref<boolean>>,
            required: true,
        },
    },
    setup(props, {emit}) {
        const options = [] as any
        const {articleForm,formRef,modalOpen} = props
        const rules: FormRules = {
            title: [
                {
                    required: true,
                    message: '请输入标题'
                }
            ],
            category: [
                {
                    required: true,
                    message: '请输入类别'
                }
            ]
        }


        onMounted(async ()=>{
            await appStore.useCategory.categoryInfo()
            appStore.useCategory.categories.forEach((item:ICategory) =>{
                options.push({
                    label: item.name,
                    value: item.name
                })
            })
        })



        return () => (
            <>
                <NModal
                    show={modalOpen.value }
                    transformOrigin="center"
                >
                    <NCard
                        closable
                        onClose={() => {
                            modalOpen.value = false
                        }}
                        title="文章设定"
                        bordered={false}
                        class={classes.MyCard}
                    >

                        <NForm ref={formRef} labelPlacement="left" model={articleForm} rules={rules} labelAlign="right">
                            <NFormItem path={'title'} label={'标题'}>
                                <NInput v-model:value={articleForm.title} placeholder={'请输入文章的标题'}    />
                            </NFormItem>

                            <NFormItem path={'category'} label={'类名'}>
                                {/*<NInput  v-model:value={articleForm.category}  placeholder={'请输入文章的分类'}   />*/}
                                <NSelect v-model:value={articleForm.category} options={options}/>
                            </NFormItem>

                            <NFormItem path={'tags'} label="标签">
                                <NDynamicTags v-model:value={articleForm.tags}/>
                            </NFormItem>
                        </NForm>
                        {/* <NButton secondary onClick={(e)=>emit('handleValidateButtonClick',e)} block={true} round type="primary" size={'large'} style={{marginTop:'1rem',fontSize:'1.5rem'}}>确认</NButton> */}
                        <button class={'btn-green opacity-80'} onClick={(e)=>emit('handleValidateButtonClick',e)}>确认</button>
                    </NCard>
                </NModal>
            </>
        );
    }
})


interface IOptions {
    label: string,
    value: string
}
