const initialState = {
  stateArray: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
}

const readAllProjectSkillEngineer = (state = initialState, action) => {
  switch (action.type) {
    case 'READ_MERGE_ALL_ENGINEER_PENDING':
      return {
        ...state,
        isPending: true
      }
    case 'READ_MERGE_ALL_ENGINEER_REJECTED':
      return {
        ...state,
        isRejected: true
      }
    case 'READ_MERGE_ALL_ENGINEER_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        stateArray: action.payload.data.payload
      }
    default:
      return state
  }
}

export default readAllProjectSkillEngineer
