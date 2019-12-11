const initialState = {
  stateArray: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
}

const readAll = (state = initialState, action) => {
  switch (action.type) {
    case 'READ_ALL_COMPANY_PENDING':
      return {
        ...state,
        isPending: true
      }
    case 'READ_ALL_COMPANY_REJECTED':
      return {
        ...state,
        isRejected: true
      }
    case 'READ_ALL_COMPANY_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        stateArray: action.payload.data.payload
      }
    default:
      return state
  }
}

export default readAll
