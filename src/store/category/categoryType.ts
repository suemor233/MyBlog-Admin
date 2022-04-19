
export interface ICategoryRequest extends UmiType{
  data: ICategory[] & {error:string}
}

export interface ICategory {
  id:string
  name:string
  createAt:string
  count:number
}
