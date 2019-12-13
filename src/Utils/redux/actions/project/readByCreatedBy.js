import { get } from '../../../axios'
import jwtDecode from 'jwt-decode'

export const readByCreatedBy = (jwt, fieldName = null, fieldValue = null) => {
  if (jwt !== null) {
    if (fieldName !== null && fieldValue !== null) {
      const decode = jwtDecode(jwt)
      const idUsers =  decode.id_users
      return {
        type: 'READ_BY_CREATED_BY_PROJECT',
        payload: get(`/project/created/${idUsers}?fn=${fieldName}&fv=${fieldValue}`, jwt)
      }
    } else {
      const decode = jwtDecode(jwt)
      const idUsers =  decode.id_users
      return {
        type: 'READ_BY_CREATED_BY_PROJECT',
        payload: get(`/project/created/${idUsers}`, jwt)
      }
    }
  } else {
    return {
      type: 'READ_BY_CREATED_BY_PROJECT_REJECTED'
    }
  }
}
