import { defineStore } from "pinia";
import {reactive} from "vue";
import {ICategory, ICategoryRequest} from '@/store/category/categoryType';
import {DeleteCategoryById, GetCategoryInfo, PostAddCategory, PutCategoryById} from "@/api/modules/category";

export const useCategory = defineStore('useCategory', () => {
  const categories = reactive<ICategory[]>([])
  const rowCategory = reactive<ICategory>({
    id:'',
    name:'',
    createAt:'',
    count:0
  })

  const categoryInfo = async () => {
    const res = await GetCategoryInfo() as ICategoryRequest
    categories.length = 0
    if (res.success) {
      categories.push.apply(categories,res.data)
    }
  }

  const AddCategory= async () => {
     const res = await PostAddCategory({'name':rowCategory.name}) as ICategoryRequest
     await categoryInfo()
     return res
  }

  const DeleteCategory= async (id:string) => {
    const res = await DeleteCategoryById(id) as ICategoryRequest
    await categoryInfo()
    return res
  }

  const UpdateCategory= async () => {
    const res = await PutCategoryById(rowCategory) as ICategoryRequest
    await categoryInfo()
    return res
  }



  return {
    categoryInfo,
    categories,
    rowCategory,
    AddCategory,
    DeleteCategory,
    UpdateCategory
  }
})
