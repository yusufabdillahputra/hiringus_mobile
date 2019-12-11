const initialState = {
  stateArray: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
}

const readByIdProjectEngineer = (state = initialState, action) => {
  switch (action.type) {
    case 'READ_BY_ID_PROJECT_ENGINEER_PENDING':
      return {
        ...state,
        isPending: true
      }
    case 'READ_BY_ID_PROJECT_ENGINEER_REJECTED':
      return {
        ...state,
        isRejected: true
      }
    case 'READ_BY_ID_PROJECT_ENGINEER_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        stateArray: action.payload.data.payload
      }
    default:
      return state
  }
}

export default readByIdProjectEngineer