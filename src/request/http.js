import axios from 'axios';
import {useStore} from "vuex";


export const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_PATH,
    timeout: 30000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;',
    }
});

//请求拦截器
http.interceptors.request.use((config) => {
    return config;
}, (error) => Promise.reject(error));

//响应拦截器
http.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    if (error.response && error.response.status) {
        const status = error.response.status
        let message = ''
        switch (status) {
            case 400:
                message = '请求错误';
                break;
            case 401:
                message = '请求错误';
                break;
            case 404:
                message = '请求地址出错';
                break;
            case 408:
                message = '请求超时';
                break;
            case 500:
                message = '服务器内部错误!';
                break;
            case 501:
                message = '服务未实现!';
                break;
            case 502:
                message = '网关错误!';
                break;
            case 503:
                message = '服务不可用!';
                break;
            case 504:
                message = '网关超时!';
                break;
            case 505:
                message = 'HTTP版本不受支持';
                break;
            default:
                message = '请求失败'
        }
        return Promise.reject(error);
    }
    return Promise.reject(error);
});
