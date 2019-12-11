const initialState = {
  stateArray: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
}

const readByCreatedBy = (state = initialState, action) => {
  switch (action.type) {
    case 'READ_BY_CREATED_BY_PROJECT_PENDING':
      return {
        ...state,
        isPending: true
      }
    case 'READ_BY_CREATED_BY_PROJECT_REJECTED':
      return {
        ...state,
        isRejected: true
      }
    case 'READ_BY_CREATED_BY_PROJECT_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        stateArray: action.payload.data.payload
      }
    default:
      return state
  }
}

export default readByCreatedBy