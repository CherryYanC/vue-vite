import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
const baseURL: any = import.meta.env.VITE_BASE_URL

function encodeURIParams(config:AxiosRequestConfig) {
  let url = config.url
  url += '?'
  const keys = Object.keys(config.params)
  for (const key of keys) {
    url += `${key}=${encodeURIComponent(config.params[key])}&`
  }
  url = url!.substring(0, url!.length - 1)
  config.params = {}
  return url
}

const service: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  withCredentials: true
})

// 请求前的统一处理
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = config.headers || {}
    const token = ''
    if (token) {//设置cookie
      config.headers['x-access-token'] = token
    }
    if (config.method === 'get' && config.params) {
      config.url = encodeURIParams(config)
    }else if (config.method === 'post') {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }
    return config
  },
  (error: AxiosError) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    if (response.status === 200) {
        if (res.ret == '1006'){
            // token过期
            const logoutUrl = ''
            if (logoutUrl){
                throw new Error('身份过期')
            }else {
              // 路径跳转
            }
        }
      return res
    }  else  {
      showError(res)
      return Promise.reject(res)
    }
  },
  (error: AxiosError)=> {
    console.log(error) // for debug
    const badMessage: any = error.message || error
    const code = parseInt(badMessage.toString().replace('Request failed with status code ', ''))
    showError({ code, message: badMessage })
    return Promise.reject(error)
  }
)

// 错误处理
function showError(error: any) {
  // token过期，清除本地数据，并跳转至登录页面
  console.log(error)
  if (error.code === 403 || error.message.indexOf(403)>=0 || error.message.indexOf('Network Error')>=0) {
    // to re-login
    const userId = ''
    if(userId){
      // 退出登录
    }
  } else {
    ElMessage({
      message: error.msg || error.message || '服务异常',
      type: 'error',
      duration: 3 * 1000
    })
  }
  
}

export default service