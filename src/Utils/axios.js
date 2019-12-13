const axios = require('axios')
const BASE_URL_HAPI = 'http://192.168.42.234:3000'

module.exports = {

  baseUriApi : BASE_URL_HAPI,

  get: (url, jwt = null, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers['jwt'] = jwt
      axios({
        method: 'get',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          common: {
            'Content-Type': contentType
          }
        }
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  post: (url, body, jwt = null, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['jwt'] = jwt
      axios({
        method: 'post',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          common: {
            'jwt': jwt,
            'Content-Type': contentType
          }
        },
        data: body
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  put: (url, body, jwt = null, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['jwt'] = jwt
      axios({
        method: 'put',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          common: {
            'jwt': jwt,
            'Content-Type': contentType
          }
        },
        data: body
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  delete: (url, body, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['jwt'] = jwt
      axios({
        method: 'delete',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          common: {
            'jwt': jwt,
            'Content-Type': contentType
          }
        },
        data: body
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

}
