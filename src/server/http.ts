import axios, { Method, AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosInterceptorManager, AxiosResponse } from 'axios';
import qs from 'qs';
import { apiKeyType, apiKeyDataType } from './api';

type ResultDataType = apiKeyDataType[apiKeyType];
interface NewAxiosInstance extends AxiosInstance {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<ResultDataType>>;
  }
}

//基本的初始化设置
const http: NewAxiosInstance = axios.create({
  baseURL: 'https://lyrbbding.site/lyr',
  timeout: 3 * 1000// 超时时间
});

// 请求拦截器
const QS_METHOD: Method[] = ['POST', 'post', 'PUT', 'put'];
const GET_METHOD: Method[] = ['GET', 'get', 'DELETE', 'delete'];
http.interceptors.request.use(response => {
  if (response.method && QS_METHOD.includes(<Method>response.method)) {
    response.data = qs.stringify(response.data);
  } else if (response.method && GET_METHOD.includes(<Method>response.method)) {
    response.params = qs.parse(response.data);
    response.data = undefined;
  }
  return response;
}, error => {
  return error;
});

//响应拦截器
http.interceptors.response.use(response => {
  return Promise.resolve(response);
}, error => {
  return error;
});

export default http;
