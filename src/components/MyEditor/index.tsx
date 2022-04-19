import { defineComponent, onMounted, ref } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ArticlePhotoUpload } from '@/api/modules/article'

export default defineComponent({
  name: 'MyEditor',
  emits: ['handleSave', 'handleText'],
  setup(props, ctx) {
    const text = ref()
    const { emit } = ctx
    onMounted(() => {
      emit('handleText', text)
    })

    const onUploadImg = async (
      files: FileList,
      callback: (urls: string[]) => void,
    ) => {
      const res = await Promise.all(
        Array.from(files).map((file) => {
          return new Promise((rev, rej) => {
            const form = new FormData()
            form.append('file', file)
            rev(ArticlePhotoUpload(form))
          })
        }),
      )
      callback(res.map((item: any) => item.data.url))
    }
    return () => (
      <>
        <MdEditor
          style={{ height: '80vh' }}
          modelValue={text.value}
          onSave={() => emit('handleSave')}
          onChange={(v: string) => (text.value = v)}
          onUploadImg={onUploadImg}
        />
      </>
    )
  },
})
