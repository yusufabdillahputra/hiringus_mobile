import { get } from '../../../axios'

export const readAllProjectSkillEngineer = (fieldName = null, fieldValue = null) => {
  if (fieldName !== null && fieldValue !== null) {
    return {
      type: 'READ_MERGE_ALL_ENGINEER',
      payload: get(`/users/merge/engineer?fn=${fieldName}&fv=${fieldValue}`)
    }
  } else {
    return {
      type: 'READ_MERGE_ALL_ENGINEER',
      payload: get('/users/merge/engineer')
    }
  }
}
