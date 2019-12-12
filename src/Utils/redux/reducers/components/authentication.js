const initialState = {
  token: {},
  isPending: false,
  isRejected: false,
  isFulfilled: false
}

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_CATEGORY_PENDING':
      return {
        ...state,
        isPending: true
      }
    case 'POST_CATEGORY_REJECTED':
      return {
        ...state,
        isRejected: true
      }
    case 'AUTH':
      return {
        ...state,
        isFulfilled: true,
        token: action.payload
      }
    default:
      return state
  }
}

export default authentication
