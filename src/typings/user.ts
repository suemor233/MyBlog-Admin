import {Commit} from "vuex";
export interface User {
    username: string;
    password: string;
}

export interface IUser {
    user:{
        "username": string
        "token": string
        "introduce": string
        "githubUrl": string
        "emailUrl": string
        "twitterUrl": string
        "avatar": string
        "about": string
    }
}


export interface ICtx {
    commit: Commit
    state: IUser
}
