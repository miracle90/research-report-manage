import axios from 'axios'

const baseUrl = 'http://120.79.179.182:8083'

// 登录接口
export function loginApi (data) {
  const url = baseUrl + '/user/login2manager'
  return axios.post(url, data)
}