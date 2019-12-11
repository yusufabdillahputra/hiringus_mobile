import { get } from '../../../axios'

export const readAll = (fieldName = null, fieldValue = null) => {
  if (fieldName !== null && fieldValue !== null) {
    return {
      type: 'READ_ALL_COMPANY',
      payload: get(`/corp?fn=${fieldName}&fv=${fieldValue}`)
    }
  } else {
    return {
      type: 'READ_ALL_COMPANY',
      payload: get('/corp')
    }
  }
}
