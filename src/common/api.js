import axios from 'axios'

const baseUrl = 'https://www.yoohan.top'

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

// 新增研报 & 加入精选
export function addReport (data) {
  const url = baseUrl + '/main/report/save'
  return axios.post(url, data)
}

// 上传研报
export function uploadReportFile (data) {
  const url = baseUrl + '/main/report/uploadReportFile'
  return axios.post(url, data)
}