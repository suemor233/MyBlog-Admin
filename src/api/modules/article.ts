import {get, post} from "@/api/http.conf";

export function article() {
    return get('/article')
}

export const DeleteArticleById = (id:string) => {
    return get(`/article/delete/${id}`)
}

export const DeleteArticles = (ids:string[]) => {
    return post(`/article/delete`,ids)
}


export const AddArticle = (article:IArticleForm) => {
    return post(`/article`,article)
}

export const GetArticleById = (id:string) => {
    return get(`/article/${id}`)
}

export const ArticleUpdate = (article:IArticleForm) => {
    return post(`/article/update`,article)
}



