import { get } from '../../../axios'

export const readByIdProjectEngineer = (idProject) => {
  return {
    type: 'READ_BY_ID_PROJECT_ENGINEER',
    payload: get(`/project/engineer/project/id/${idProject}`)
  }
}
