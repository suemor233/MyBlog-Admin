import client from "@/api/umi-request";
import {User} from "@/typings/user";

export function login(data: User) {
    return client.post('/user/Login', {data})
}

export function checkLogined() {
    return client.get('/user/check_logged')
}

export function userInfo() {
    return client.get('/user')
}


