export interface IArticleRequest extends UmiType{
    data: IArticle[] & {error:string}
}


export interface IArticle{
    id:string,
    title:string,
    content:string,
    cover:string,
    tags:string[],
    state:boolean,
    createAt:string,
    updateAt:string,
    createAtNow:string,
    updateAtNow:string,
    category:{
        id:string,
        name:string
    }
}
