import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { article } from '@/api/modules/article'

import { parseDate, relativeTimeFromNow } from '@/utils/time'
import { IArticle, IArticleRequest } from '@/store/article/articleType'
import { useMessage } from 'naive-ui'

export const useArticle = defineStore('useArticle', () => {
  const articles = reactive<IArticle[]>([])

  const articleInfo = async () => {
    const res = await article() as IArticleRequest
    const message = useMessage()
    articles.length = 0
    if (res.success) {
      const articleData = res.data
      for (const _articleData of articleData) {
        _articleData.createAtNow = relativeTimeFromNow(_articleData.createAt)
        _articleData.updateAtNow = relativeTimeFromNow(_articleData.updateAt)
        _articleData.createAt = parseDate(_articleData.createAt, 'yyyy年M月d日 HH:mm:ss',)
        _articleData.updateAt = parseDate(_articleData.updateAt, 'yyyy年M月d日 HH:mm:ss',)
        articles.push(_articleData)
      }
    } else {
      message.error(res.data.error)
    }
  }

  articleInfo()



  return {
    articles,
    articleInfo
  }
})
