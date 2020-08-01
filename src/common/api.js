import axios from 'axios'

const baseUrl = 'http://www.yoohan.top'

// 用户列表
export function userList (data) {
  const url = baseUrl + '/main/user/list'
  return axios.post(url, data)
}

// 文章管理
export function reportList (data) {
  const url = baseUrl + '/main/report/list'
  return axios.post(url, data)
}