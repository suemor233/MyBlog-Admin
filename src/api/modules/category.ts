import client from "@/api/umi-request";

export function GetCategoryInfo() {
    return client.get('/category')
}

export const PostAddCategory = (data:{name:string}) => {
    return client.post('/category',{data})
}

export const DeleteCategoryById = (id:string) => {
    return client.delete(`/category/${id}`)
}
