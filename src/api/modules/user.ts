import {post} from "@/api/http.conf";
import {User} from "@/typings/user";

export function login(data: User) {
    return post('/user/login', data)
}
