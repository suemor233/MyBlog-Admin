import {get, post} from "@/api/http.conf";

export function article() {
    return get('/article')
}

export const DeleteArticleById = (id:string) => {
    return get(`/article/delete/${id}`)
}
