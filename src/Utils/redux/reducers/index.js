import { combineReducers } from 'redux'

/**
 * Reducers
 */
import Users_readAllProjectSkillEngineer from './users/readAllProjectSkillEngineer'
import Users_readById from './users/readById'
import Company_readAll from './company/readAll'
import Company_readById from './company/readById'
import Project_readByCreatedBy from './project/readByCreatedBy'
import Project_readById from './project/readById'
import Project_readByIdProjectEngineer from './project/readByIdProjectEngineer'
import Component_Authentication from './components/authentication'

export default combineReducers({
  Users_readAllProjectSkillEngineer,
  Users_readById,
  Company_readAll,
  Company_readById,
  Project_readByCreatedBy,
  Project_readById,
  Project_readByIdProjectEngineer,
  Component_Authentication
})
