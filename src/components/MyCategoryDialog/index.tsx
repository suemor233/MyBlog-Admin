import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  Ref,
  watch,
} from 'vue'
import {
  FormInst,
  FormRules,
  NButton,
  NCard,
  NDynamicTags,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NSelect,
  NSpace,
  useMessage,
} from 'naive-ui'
import classes from '@/views/manage-posts/write/index.module.scss'
import appStore from '@/store'
import { ICategory, ICategoryRequest } from '@/store/category/categoryType'
import { storeToRefs } from 'pinia'
import { AddArticle, ArticleUpdate } from '@/api/modules/article'

export default defineComponent({
  name: 'MyCategoryialog',
  emits: ['handleValidateButtonClick'],
  props: {
    modalOpen: {
      type: Object as PropType<Ref<boolean>>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { modalOpen } = props
    const formRef = ref<FormInst | null>(null)
    const toast = useMessage()
    const { rowCategory } = storeToRefs(appStore.useCategory)
    const addUpdateFlag = ref(false)
    watch(modalOpen, () => {
       addUpdateFlag.value = rowCategory.value.name
      !modalOpen.value ? (rowCategory.value.name = '') : null
    })

    const rules: FormRules = {
      name: [
        {
          required: true,
          message: '请输入分类名称',
        },
      ],
    }

    const handleValidateButtonClick = (e: MouseEvent) => {
      e.preventDefault()
      formRef.value?.validate(async (errors) => {
        if (errors) {
          return
        }
        if (addUpdateFlag.value) {
          const res =
            (await appStore.useCategory.UpdateCategory()) as ICategoryRequest
          if (res.success) {
            toast.success('修改成功')
          } else {
            toast.error(res.data.error)
          }
        } else {
          const res =
            (await appStore.useCategory.AddCategory()) as ICategoryRequest
          if (res.success) {
            toast.success('添加成功')
          } else {
            toast.error(res.data.error)
          }
        }

        modalOpen.value = false
      })
    }

    return () => (
      <>
        <NModal show={modalOpen.value} transformOrigin="center">
          <NCard
            closable
            onClose={() => {
              modalOpen.value = false
            }}
            title="分类"
            bordered={false}
            class={classes.MyCard}
          >
            <NForm
              ref={formRef}
              labelPlacement="left"
              model={rowCategory.value}
              rules={rules}
              labelAlign="right"
            >
              <NFormItem path={'name'} label={'分类名称'}>
                <NInput
                  v-model:value={rowCategory.value.name}
                  placeholder={'请输入文章的标题'}
                />
              </NFormItem>
            </NForm>
            <NSpace justify={'end'}>
              <NButton
                type={'warning'}
                onClick={() => (modalOpen.value = false)}
              >
                取消
              </NButton>
              <NButton
                type={'primary'}
                onClick={(e) => handleValidateButtonClick(e)}
              >
                确认
              </NButton>
            </NSpace>
          </NCard>
        </NModal>
      </>
    )
  },
})

interface IOptions {
  label: string
  value: string
}
