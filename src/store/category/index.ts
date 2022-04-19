import { defineStore } from "pinia";
import {reactive} from "vue";
import {ICategory, ICategoryRequest} from '@/store/category/categoryType';
import {GetCategoryInfo, PostAddCategory} from "@/api/modules/category";

export const useCategory = defineStore('useCategory', () => {
  const categories = reactive<ICategory[]>([])

  const categoryInfo = async () => {
    const res = await GetCategoryInfo() as ICategoryRequest
    categories.length = 0
    if (res.success) {
      categories.push.apply(categories,res.data)
    }
  }

  const AddCategory= async (name:string) => {
     const res = await PostAddCategory({name}) as ICategoryRequest
    categoryInfo()
   return res
  }

  return {
    categoryInfo,
    categories,
    AddCategory
  }
})
