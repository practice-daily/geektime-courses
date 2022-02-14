import axios from 'axios'
import { useMsgbox, Message } from 'element3'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  (error) => {
    console.error('interceptors.request error:', error)
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 20000) {
      console.log('接口信息报错', res.message)
      return Promise.reject(new Error(res.message) || 'Error')
    }
    return res
  },
  (error) => {
    console.error('接口信息报错', error)
    return Promise.reject(error)
  },
)

export default service
