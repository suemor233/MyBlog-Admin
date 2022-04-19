import { defineComponent, h, onMounted, ref } from 'vue'

import { ContentLayout } from '@/layouts/content'
import { DataTableColumns, NDataTable } from 'naive-ui'
import appStore from '@/store'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'category',
  setup(props, ctx) {
    const { categories } = storeToRefs(appStore.useCategory)
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
    onMounted(() => {
      appStore.useCategory.categoryInfo()
    })
    return () => (
      <>
        <ContentLayout>
          <NDataTable
            ref={'table'}
            columns={columns}
            data={categories.value}
            pagination={{ pageSize: 15 }}
            rowKey={(row) => row.id}
            onUpdateCheckedRowKeys={handleCheck}
          />
        </ContentLayout>
      </>
    )
  },
})
