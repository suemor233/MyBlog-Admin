import client from "@/api/umi-request";

export function article() {
    return client.get('/article')
}

export const DeleteArticleById = (id:string) => {
    return client.delete(`/article/${id}`)
}

export const DeleteArticles = (data:string[]) => {
    return client.post('/article/delete',{data})
}


export const AddArticle = (data:IArticleForm) => {
    return client.post(`/article`,{data})
}

export const GetArticleById = (id:string) => {
    return client.get(`/article/${id}`)
}

export const ArticleUpdate = (data:IArticleForm) => {
    return client.put(`/article/${data.id}`,{data})
}



