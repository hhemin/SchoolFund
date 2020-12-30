import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(Antd)

// axios.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
// axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
// 添加一个请求拦截器

// const instance = axios.create({
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   }
// })

// instance.interceptors.request.use(config => {
//   // 在这里去添加就可以了（每个请求添加content-type'）
//   console.log(config)
//   config.headers = { 'content-type': 'application/json; charset=UTF-8' }
//   if (config.method === 'get') {
//     config.data = {
//       unused: 0
//     }
//   }
//   return config
// }, (error) => {
//   return Promise.reject(error)
// })

// import axios from 'axios'
// const API_SERVER = 'https://www.'
// let requestCeptors = config => {
//   config.headers = {
//     ...config.headers,
//     ...{
//       "Content-Type": "application/json",
//       "User-Token": "rej7iumxv74cklbmzclhd586ibd7h07n"
//     }
//   }
//   return config
// }
// let responseCeptors = response => {
//   return response
// }
// const API = axios.create({
//   baseURL: API_SERVER,
//   timeout: 10000
// })
// function apiIntercept (apiInstance) {
//   apiInstance.interceptors.request.use(requestCeptors)
//   apiInstance.interceptors.response.use(responseCeptors)
// }
// const apis = [API]
// apis.forEach(v => apiIntercept(v))
// export { API }

Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
