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
