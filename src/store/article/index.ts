import { defineStore } from 'pinia'
import { reactive } from 'vue'
import {article, ArticleUpdate, DeleteArticleById, DeleteArticles, GetArticleById} from '@/api/modules/article'

import { parseDate, relativeTimeFromNow } from '@/utils/time'
import { IArticle, IArticleRequest } from '@/store/article/articleType'
import appStore from "@/store";

export const useArticle = defineStore('useArticle', () => {
  const articles = reactive<IArticle[]>([])



  const articleInfo = async () => {
    const res = await article() as IArticleRequest
    articles.length = 0
    if (res.success) {
      const articleData = res.data
      for (const _articleData of articleData) {
        _articleData.createAtNow = relativeTimeFromNow(_articleData.createAt)
        _articleData.updateAtNow = relativeTimeFromNow(_articleData.updateAt)
        _articleData.createAt = parseDate(_articleData.createAt, 'yyyy年M月d日 HH:mm:ss',)
        _articleData.updateAt = parseDate(_articleData.updateAt, 'yyyy年M月d日 HH:mm:ss',)
        // @ts-ignore
        _articleData.category = _articleData.category.name
        articles.push(_articleData)
      }
    }

  }

  const deleteOneArticle = async (id:string)=>{
    const res = await DeleteArticleById(id) as IArticleRequest
    if (res.success) {
      await appStore.useArticle.articleInfo()
      await articleInfo()
      return true
    }
      return false
  }


  const deleteManyArticle = async (ids:string[])=>{
    const res = await DeleteArticles(ids) as IArticleRequest
    if (res.success) {
      //我是傻逼，后端有bug,实在不会搞了。。
      setTimeout(async () => {
        await appStore.useArticle.articleInfo()
      }, 50)

      return true
    }
    return false
  }

  const changeArticleState = async (article:IArticle)=>{
    const res = await ArticleUpdate(article) as IArticleRequest
    if (!res.success) {
      return false
    }
    await articleInfo()
    return true
  }

  const getArticleById = async (id:string)=>{
    const res = await GetArticleById(id) as IArticleRequest
    return res
  }


  const updateArticle = async (article:IArticle)=>{
    const res = await ArticleUpdate(article) as IArticleRequest
    await articleInfo()
    return res
  }

  const createArticle = async (article:IArticle)=>{
    const res = await ArticleUpdate(article) as IArticleRequest
    await articleInfo()
    return res
  }

  return {
    articles,
    articleInfo,
    deleteOneArticle,
    deleteManyArticle,
    changeArticleState,
    getArticleById,
    updateArticle,
    createArticle
  }
})
