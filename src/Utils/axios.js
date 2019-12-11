const axios = require('axios')
const { AsyncStorage } = require('react-native')
const BASE_URL_HAPI = 'http://54.144.101.230:3000'

module.exports = {

  baseUriApi : BASE_URL_HAPI,

  get: (url, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['jwt'] = AsyncStorage.getItem('jwt')
      axios({
        method: 'get',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          common: {
            'jwt': AsyncStorage.getItem('jwt'),
            'Content-Type': contentType
          }
        },
        responseType: 'json'
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  post: (url, body, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['jwt'] = AsyncStorage.getItem('jwt')
      axios({
        method: 'post',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          common: {
            'jwt': AsyncStorage.getItem('jwt'),
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

  put: (url, body, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['jwt'] = AsyncStorage.getItem('jwt')
      axios({
        method: 'put',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          common: {
            'jwt': AsyncStorage.getItem('jwt'),
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
      axios.defaults.headers.common['jwt'] = AsyncStorage.getItem('jwt')
      axios({
        method: 'delete',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          common: {
            'jwt': AsyncStorage.getItem('jwt'),
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
