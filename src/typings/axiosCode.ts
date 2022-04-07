import {AxiosResponse} from "axios";

export interface IAxios extends AxiosResponse{
    data: any;
    message: string;
    statusCode: number;
    success: boolean
}


export interface IArticle extends IAxios{
    data:{
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
        error?:string
    }
}
