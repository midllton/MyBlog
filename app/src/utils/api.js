import axios from 'axios'

// const baseURL = 'http://localhost:3000/'
const baseURL = 'http://106.14.34.227:3000/'

// const request = async (url, method, data) => {
//   const headers = { fapp: 'book', 'Content-Type': 'application/json' }
//   if (sessionStorage.getItem('token')) {
//     headers.token = sessionStorage.getItem('token')
//   }
//   return await new Promise(resolve => {
//     axios({
//       headers,
//       method,
//       url: baseURL + url,
//       [method.toLowerCase() === 'get' ? 'params' : 'data']: data
//     }).then(res => {
//       resolve(res.data)
//     }).catch(e => {
//       console.log('axios错误：' + e)
//     })
//   })
// }

const request = async (url, method, submitData) => {
  const headers = { fapp: 'book', 'Content-Type': 'application/json' }
  if (sessionStorage.getItem('token')) {
    headers.token = sessionStorage.getItem('token')
  }
  const { data: { data } } = await axios({
    headers,
    method,
    url: baseURL + url,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
  return data
}

export default request
