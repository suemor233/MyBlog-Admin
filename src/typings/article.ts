interface Article {
    title: string
    category?: string
    tags?: string[] | string
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
    id?:string
    title?: string
    category?: string
    tags?: string[] | string
    content?:string
    state?:boolean
}


