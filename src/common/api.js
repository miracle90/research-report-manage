import axios from 'axios'

// const baseUrl = 'http://120.79.179.182:8083'
// const baseUrl = 'http://tigjw5.natappfree.cc'
const baseUrl = 'http://4zty7s.natappfree.cc'

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