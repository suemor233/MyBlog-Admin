import {
  defineComponent,
  h,
  onMounted,
  ref,
} from 'vue'
import { useRouter } from 'vue-router'
import {
  DataTableColumns,
  NButton,
  NDataTable,
  NDropdown,
  NIcon,
  NSpace,
  useDialog,
  useMessage,
} from 'naive-ui'

import { ContentLayout } from '@/layouts/content'
import appStore from '@/store'
import { storeToRefs } from 'pinia'
import MyArticleTime from '@/components/MyArticleTime'
import MyPopconfirm from '@/components/MyPopconfirm'
import { RouteName } from '@/router/name'
import { useMediaQuery } from '@vueuse/core'
import { Add12Regular, Delete24Regular } from '@vicons/fluent'

export default defineComponent({
  name: 'list',
  setup(props, ctx) {
    const { articles } = storeToRefs(appStore.useArticle)
    const checkedRowKeysRef = ref<string[]>([])
    const isLargeScreen = useMediaQuery('(min-width: 550px)')
    const message = useMessage()
    const router = useRouter()
    onMounted(async () => {
      await appStore.useArticle.articleInfo()
    })
    const createColumns = (): DataTableColumns<Article> => {
      //我是fw
      if (window.outerWidth > 600) {
        return [
          {
            type: 'selection',
          },
          {
            title: '标题',
            key: 'title',
            sorter: 'default',
            render(row) {
              return h(
                <span
                  style={{ color: '#18a058', cursor: 'pointer' }}
                  onClick={() => {
                    router.push({ path: '/posts/edit', query: { id: row.id } })
                  }}
                >
                  {row.title}
                </span>,
              )
            },
          },
          {
            title: '分类',
            key: 'category',
          },
          {
            title: '标签',
            key: 'tags',
          },
          {
            title: '创建时间',
            key: 'createAtNow',
            sorter: (row1, row2) => row2.createAt.localeCompare(row1.createAt),
            render(row) {
              return h(
                <MyArticleTime
                  time={{ time: row.createAt, timeNow: row.createAtNow }}
                />,
              )
            },
          },
          {
            title: '修改时间',
            key: 'updateAtNow',
            sorter: 'default',
            render(row) {
              return h(
                <MyArticleTime
                  time={{ time: row.updateAt, timeNow: row.updateAtNow }}
                />,
              )
            },
          },
          {
            title: '状态',
            key: 'state',
            sorter: (row1, row2) => Number(row1.state) - Number(row2.state),
            render(row) {
              const dialog = useDialog()
              const options = [
                {
                  label: !row.state ? '发布此文章' : '下架文章',
                  key: row.id,
                },
              ]

              const handleSelect = async (key: string | number) => {
                dialog.warning({
                  title: '警告',
                  content: `你确定${!row.state ? '发布' : '下架'}『 ${
                    row.title
                  }  』吗`,
                  positiveText: '确定',
                  negativeText: '取消',
                  onPositiveClick: async () => {
                    row.state = !row.state
                    const res = await appStore.useArticle.changeArticleState(
                      row,
                    )
                    res
                      ? message.success(`${row.state ? '发布' : '下架'}成功`)
                      : message.error(`${row.state ? '发布' : '下架'}失败`)
                  },
                })
              }
              return (
                <NDropdown
                  trigger={'click'}
                  options={options}
                  onSelect={handleSelect}
                >
                  <span
                    style={
                      row.state ? { color: '#18a058' } : { color: '#0984e3' }
                    }
                  >
                    {row.state ? '已发布' : '草稿'} ▾
                  </span>
                </NDropdown>
              )
            },
          },
          {
            title: '操作',
            key: 'actions',
            render(row) {
              return h(<MyPopconfirm row={row} />)
            },
          },
        ]
      } else {
        return [
          {
            type: 'selection',
          },
          {
            title: '标题',
            key: 'title',
            sorter: 'default',
            render(row) {
              return h(
                <span
                  style={{ color: '#18a058', cursor: 'pointer' }}
                  onClick={() => {
                    router.push(RouteName.Edit + '?id=' + row.id)
                  }}
                >
                  {row.title}
                </span>,
              )
            },
          },
          {
            title: '操作',
            key: 'actions',
            render(row) {
              return h(<MyPopconfirm row={row} />)
            },
          },
        ]
      }
    }
    const columns = createColumns()

    const slots = {
      header: () => (
        <NSpace>
          {isLargeScreen.value ? (
            <NButton
              disabled={checkedRowKeysRef.value.length === 0}
              secondary
              round
              type={'error'}
              onClick={handleDelete}
            >
              {{
                icon: () => (
                  <NIcon>
                    <Delete24Regular />
                  </NIcon>
                ),
                default: () => `删除选中`,
              }}
            </NButton>
          ) : null}

          <NButton secondary round type={'primary'} onClick={()=>router.push('/posts/edit')}>
            {{
              icon: () => (
                <NIcon>
                  <Add12Regular />
                </NIcon>
              ),
              default: () => `添加文章`,
            }}
          </NButton>
        </NSpace>
      ),
    }

    const handleDelete = async () => {
      if (checkedRowKeysRef.value.length === 0) {
        message.error('这不可能！！！')
        return
      }
      const state = appStore.useArticle.deleteManyArticle(
        Array.from(checkedRowKeysRef.value),
      )
      checkedRowKeysRef.value.length = 0
      state ? message.success('删除成功') : message.error('删除失败')
    }

    const handleCheck = (rowKeys: any) => {
      checkedRowKeysRef.value = rowKeys
    }

    return () => (
      <>
        <ContentLayout v-slots={slots}>
          <NDataTable
            ref={'table'}
            columns={columns}
            data={articles.value}
            pagination={{ pageSize: 15 }}
            rowKey={(row) => row.id}
            onUpdateCheckedRowKeys={handleCheck}
          />
        </ContentLayout>
      </>
    )
  },
})
