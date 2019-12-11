import { get } from '../../../axios'

export const readById = (id_company) => {
  return {
    type: 'READ_ID_COMPANY',
    payload: get(`/corp/${id_company}`)
  }
}
