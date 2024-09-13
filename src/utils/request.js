// axios的封装处理
import axios from 'axios';

// 创建axios实例
const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做拦截，可以插入自定义的配置
    return config;
  },
  (error) => {
    // 请求错误时做点什么
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data; // 返回数据部分
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default request;
