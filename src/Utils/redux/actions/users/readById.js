import { get } from '../../../axios'
import JWT from 'jsonwebtoken'
const { AsyncStorage } = require('react-native')

export const readById = () => {
  const jwt = AsyncStorage.getItem('jwt')
  if (jwt !== null) {
    const decode = JWT.decode(jwt, { complete: true })
    const idUsers =  decode.payload.id_users
    return {
      type: 'READ_BY_ID_USERS',
      payload: get(`/users/id/${idUsers}`)
    }
  } else {
    return {
      type: 'READ_BY_ID_USERS_REJECTED'
    }
  }
}
