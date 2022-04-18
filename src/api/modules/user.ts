import client from "@/api/umi-request";


export function login(data: {username:string,password:string}) {
    return client.post('/user/Login', {data})
}

export function checkLogined() {
    return client.get('/user/check_logged')
}

export function userInfo() {
    return client.get('/user')
}


