import {extend, RequestOptionsInit} from 'umi-request'
import {getToken} from "@/utils/auth";
import QProgress from "qier-progress";

const qprogress = new QProgress()


const errorHandler = function(error:any) {
    const {data = {} } = error;
    return data
};

/**
 * 配置request请求时的默认参数
 */
const client = extend({
    prefix: import.meta.env.VITE_API_BASE_URL as string,
    timeout: 1000,
    errorHandler
})

// request拦截器, 改变url 或 options
client.interceptors.request.use((url:string, options:any) => {
    qprogress.start()
    const headers = getToken()
        ? {
            Authorization: `Bearer ${getToken()}`
        }
        : {}

    return {
        url,
        options: { ...options, headers }
    }
}, { global: false })


client.interceptors.response.use(async (response:any) => {

    const res = await response.clone().json()
    qprogress.finish()
    if (!res.success){
        console.log(res)
        // @ts-ignore
        // window.$message.error(Array.isArray(res.data.error) ? res.data.error[0] : res.data.error || '数据异常' )
    }

    return response
})





export default client
