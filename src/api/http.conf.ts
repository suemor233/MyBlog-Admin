import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios"
import {TIP} from "@/common/tip";
import QProgress from 'qier-progress'
import {getToken} from "@/utils/auth";
const qprogress = new QProgress()
/* http请求响应状态 */
type ResponseType = Promise<AxiosResponse>

const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    timeout: 5000,
    withCredentials: true
})

/* 请求拦截 */
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const headers = config.headers;
    qprogress.start()
    if (getToken() && headers){
        headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
}, (reason) => {

    Promise.reject(new Error(reason))
})

/* 响应拦截 */
instance.interceptors.response.use((AxiosResponse: AxiosResponse) => {
    const { url } = AxiosResponse.config
    const { data, headers } = AxiosResponse;
    qprogress.finish()
    return data
}, (reason) => {
    qprogress.finish()
    Promise.reject(new Error(reason))
})

/**
 * 封装post方法
 * @param url 请求接口路径
 * @param data post参数
 * @returns 返回promise
 */
export function post(url: string, data: object = {}): ResponseType {
    return new Promise((resolve, reject) => {
        instance.post(url, data).then(
            response => {
                resolve(response)
            },
            reason => {
                reject(reason.message ? reason.message : TIP.NETWORK_ERROR)
            })
            .catch(reason => {
                reject(reason.message ? reason.message : TIP.NETWORK_ERROR)
            })
    })
}

/**
 * 封装get方法
 * @param url 请求接口路径
 * @param params get参数
 * @returns 返回promise
 */
export function get(url: string, params: object = {}): ResponseType {
    return new Promise((resolve, reject) => {
        instance.get(url, params).then(
            response => {
                resolve(response)
            },
            reason => {
                reject(reason.message ? reason.message : TIP.NETWORK_ERROR)
            })
            .catch(reason => {
                reject(reason.message ? reason.message : TIP.NETWORK_ERROR)
            })
    })
}
