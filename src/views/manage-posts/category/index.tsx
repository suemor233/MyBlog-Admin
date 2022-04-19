import { defineComponent, h, onMounted, PropType, Ref, ref } from 'vue'

import { ContentLayout } from '@/layouts/content'
import {
  DataTableColumns,
  NButton,
  NDataTable,
  NIcon,
  NPopconfirm,
  NSpace,
  useMessage,
} from 'naive-ui'
import appStore from '@/store'
import { storeToRefs } from 'pinia'
import { Add12Regular, Delete24Regular } from '@vicons/fluent'
import MyCategoryDialog from '@/components/MyCategoryDialog'
import MyPopconfirm from '@/components/MyPopconfirm'
import { ICategory, ICategoryRequest } from '@/store/category/categoryType'
import { IArticle } from '@/store/article/articleType'

export default defineComponent({
  name: 'category',
  setup(props, ctx) {
    const { categories } = storeToRefs(appStore.useCategory)
    const message = useMessage()
    const modalOpen = ref(false)
    const checkedRowKeysRef = ref<string[]>([])
    const createColumns = (): DataTableColumns<ICategory> => {
      return [
        {
          title: '分类',
          key: 'name',
        },
        {
          title: '文章数量',
          key: 'count',
        },
        {
          title: '操作',
          key: 'actions',
          render(row) {
            return (
              <MyAction
                row={row}
                modalOpen={modalOpen}
              />
            )
          },
        },
      ]
    }
    const columns = createColumns()
    const handleCheck = (rowKeys: any) => {
      checkedRowKeysRef.value = rowKeys
    }

    const slots = {
      header: () => (
        <NSpace>
          <NButton
            secondary
            round
            type={'primary'}
            onClick={() => {
              ;(modalOpen.value = true)
            }}
          >
            {{
              icon: () => (
                <NIcon>
                  <Add12Regular />
                </NIcon>
              ),
              default: () => `添加分类`,
            }}
          </NButton>
        </NSpace>
      ),
    }

    onMounted(() => {
      appStore.useCategory.categoryInfo()
    })
    return () => (
      <>
        <ContentLayout v-slots={slots}>
          <NDataTable
            ref={'table'}
            columns={columns}
            data={categories.value}
            pagination={{ pageSize: 15 }}
            rowKey={(row) => row.id}
            onUpdateCheckedRowKeys={handleCheck}
          />
        </ContentLayout>
        <MyCategoryDialog
          modalOpen={modalOpen}
        />
      </>
    )
  },
})

const MyAction = defineComponent({
  name: 'MyAction',
  props: {
    row: Object as PropType<ICategory>,
    modalOpen: {
      type: Object as PropType<Ref<boolean>>,
      required: true,
    }
  },
  setup(props, ctx) {
    const message = useMessage()
    const { row, modalOpen } = props
    if (!row) return <h1>表格异常</h1>

    return () => (
      <>
        <NSpace size={12}>
          //TODO 编辑
          <NButton
            size="tiny"
            text
            type="primary"
            onClick={() => {
              (modalOpen.value = true)
            }}
          >
            编辑
          </NButton>
          <NPopconfirm
            positiveText={'删除'}
            negativeText={'取消'}
            onPositiveClick={async () => {
              //TODO 后端逻辑修改
              if (row.name === '默认分类') {
                message.error('默认分类不可删除')
                return
              } else if (row?.count > 0) {
                message.error('请先删除对于文章')
                return
              }
              const res = (await appStore.useCategory.DeleteCategory(
                row.id,
              )) as ICategoryRequest
              if (res.success) {
                message.success('删除成功 ')
              } else {
                message.error('删除失败')
              }
            }}
          >
            {{
              trigger: () => (
                <NButton
                  strong={true}
                  size={'tiny'}
                  type={'error'}
                  quaternary={true}
                >
                  删除
                </NButton>
              ),
              default: () => `主人是否要删掉 ${row?.name}  ?`,
            }}
          </NPopconfirm>
        </NSpace>
      </>
    )
  },
})
