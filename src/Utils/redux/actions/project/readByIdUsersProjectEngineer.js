import { get } from '../../../axios'

export const readByIdUsersProjectEngineer = (idUsers, jwt) => {
  return {
    type: 'READ_BY_ID_USERS_ENGINEER',
    payload: get(`/project/engineer/users/${idUsers}`, jwt)
  }
}
