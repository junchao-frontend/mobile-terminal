import axios from 'axios'
import store from '@/store/index.js'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
  // baseURL: 'http://127.0.0.1:7001/'
})

// 添加请求拦截器(回调函数)
const { user } = store.state
request.interceptors.request.use(
  // 添加请求头  所有的请求都带着token去请求
  config => {
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config // return是为了继续向下传递, promise链式传递
  },
  error => {
    // console.log('request error, 请求拦截器失败1')
    return Promise.reject(error)// return Promise 是为了把错误继续向下传递
  })

export default request
