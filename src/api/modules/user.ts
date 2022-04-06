import {get, post} from "@/api/http.conf";
import {User} from "@/typings/user";

export function login(data: User) {
    return post('/user/login', data)
}

export function checkLogined() {
    return get('/user/checklogined')
}

export function userInfo() {
    return get('/user/info')
}


