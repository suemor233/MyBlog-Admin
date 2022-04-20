import client from "@/api/umi-request";
import {ICategory} from "@/store/category/categoryType";

export function GetCategoryInfo() {
    return client.get('/category')
}

export const PostAddCategory = (data:{name:string}) => {
    return client.post('/category',{data})
}

export const DeleteCategoryById = (id:string) => {
    return client.delete(`/category/${id}`)
}

export const PutCategoryById = (data:ICategory) => {
    return client.put(`/category/${data.id}`,{data})
}
