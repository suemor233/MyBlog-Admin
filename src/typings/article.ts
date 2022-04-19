


interface ITime{
    time:String
    timeNow:String
}


interface IArticleForm {
    id?:string
    title?: string
    category?: string
    tags?: string[] | string
    content?:string
    state?:boolean
}


