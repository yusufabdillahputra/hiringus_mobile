import { get } from '../../../axios'
const { AsyncStorage } = require('react-native')
import JWT from 'jsonwebtoken'

export const readByCreatedBy = () => {
  const jwt = AsyncStorage.getItem('jwt')
  if (jwt !== null) {
    const decode = JWT.decode(jwt, { complete: true })
    const idUsers =  decode.payload.id_users
    return {
      type: 'READ_BY_CREATED_BY_PROJECT',
      payload: get(`/project/created/${idUsers}`)
    }
  } else {
    return {
      type: 'READ_BY_CREATED_BY_PROJECT_REJECTED'
    }
  }
}
