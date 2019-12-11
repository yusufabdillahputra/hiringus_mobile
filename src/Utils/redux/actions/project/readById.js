import { get } from '../../../axios'

export const readById = (idProject) => {
  return {
    type: 'READ_BY_ID_PROJECT',
    payload: get(`/project/id/${idProject}`)
  }
}
