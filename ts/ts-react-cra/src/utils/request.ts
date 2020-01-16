import axios from 'axios'
import { message } from 'antd'

const axiosInstance = axios.create({
  timeout: 20000
})

axiosInstance.interceptors.response.use(
  function(response) {
    if (response.data && response.data.flag === 1) {
      let errorMsg = response.data.msg
      message.error(errorMsg)
      return Promise.reject(errorMsg)
    }
    return response.data
  },
  function(error) {
    return Promise.reject(error)
  }
)

export function get(url: string, data: any) {
  return axiosInstance.get(url, {
    params: data
  })
}

export function post(url: string, data: any) {
  return axiosInstance({
    method: 'POST',
    url,
    data
  })
}
