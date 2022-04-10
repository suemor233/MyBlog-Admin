interface Article {
    title: string
    category: string
    tags: string
    createAt: string
    updateAt: string
    createAtNow: string
    updateAtNow: string
    content: string
    cover: string
    id: string
    state:boolean
}


interface ITime{
    time:String
    timeNow:String
}


interface IArticleForm {
    title?: string
    category?: string
    tags?: string[] | string
    content?:string
    state?:boolean
}


