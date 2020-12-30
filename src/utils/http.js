/* eslint-disable */
import axios from 'axios';
// import qs from 'qs';// 引入qs模块，用来序列化post类型的数据
// import { baseUrl } from './env'; // 导入环境
// import storageUtil from '../assets/js/storage'; // 缓存
// import { Message,Loading } from 'element-ui';
// import router from '../router/index'

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 * @param {String} other 请求失败的标语
*/
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 未登录状态，跳转登录页
    case 202:
      Loading.service().close();
      // router.replace({
      //   path: '/Login',        
      // });
      break;
    // 404请求不存在
    case 404:
      // tip('请求的资源不存在');
      break;
    default:
      throw new Error(other);
    console.log(other);
  }
};

// 创建axios实例
// var instance = axios.create({ timeout: 1000 * 12 });
// // 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 创建axios实例
const service = axios.create({
  baseURL: 'http://192.168.43.253:8080/', // api的base_url
  // timeout: 15000, // 请求超时时间2s
  // headers: {
  //   'Accept': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-Type': 'application/x-www-form-urlencoded',
  // },
});

/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */ 
service.interceptors.request.use(
  config => 
  {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const token = storageUtil.get("token");
    // token && (config.headers.token = token);
    // config.data = qs.stringify(config.data);
    // const token = storageUtil.get("token");
    // token && (config.headers.token = token);
    // config.data = qs.stringify(config.data);
    console.log(config)
    return config;
    // if (true) { // 需自定义
    //     // 让每个请求携带token
    //     config.headers['token'] = storageUtil.get("token");
    // }
    // console.log(config)
    // return config;
  },
  error => {
    console.log(err);
    Promise.error(error)
  }
);

// 响应拦截器
service.interceptors.response.use(
  // 请求成功
  // res => (res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)),
  res => {
    console.log(res);
    if(res.status === 200) {
      // 数据请求成功
      if(res.data.code === 200) {
        return Promise.resolve(res.data)
      }
      else{
        // errorHandle(res.data.code);
        // Loading.service().close();
        Message.error(res.data);
      }
    }else {
      errorHandle(res.code)
      return Promise.reject(res)
    }
  },
  // 请求失败
  (error) => {
    const { response } = error;
    console.log('请求失败');
    console.log(error);
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      // Loading.service().close();
      return Promise.reject(response);
    }
    // else {
    //   // 处理断网的情况
    //   // eg:请求超时或断网时，更新state的network状态
    //   // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    //   // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    //   if (!window.navigator.onLine) {
    //     console.log('网络超时')
    //     //  store.commit('changeNetwork', false);
    //   } else {
    //     return Promise.reject(error);
    //   }
    // }
    return Promise.reject(error);
  }
);


export default service;