import { defineComponent, h, onMounted, ref } from 'vue'

import { ContentLayout } from '@/layouts/content'
import {DataTableColumns, NButton, NDataTable, NIcon, NSpace, useMessage} from 'naive-ui'
import appStore from '@/store'
import { storeToRefs } from 'pinia'
import {Add12Regular, Delete24Regular} from "@vicons/fluent";
import MyCategoryDialog from "@/components/MyCategoryDialog";

export default defineComponent({
  name: 'category',
  setup(props, ctx) {
    const { categories } = storeToRefs(appStore.useCategory)
    const message = useMessage()
    const modalOpen = ref(false)
    const checkedRowKeysRef = ref<string[]>([])
    const createColumns = (): DataTableColumns<Article> => {
      return [
        {
          title: '分类',
          key: 'name',
        },
        {
          title: '文章数量',
          key: 'count',
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
                    onClick={()=>modalOpen.value = true}
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
        <MyCategoryDialog modalOpen={modalOpen}/>
      </>
    )
  },
})
