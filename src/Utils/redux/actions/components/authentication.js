export const authentication = (token = null) => {
  if (token !== null) {
    return {
      type: 'AUTH',
      payload: token
    }
  } else {
    return {
      type: 'AUTH',
      payload: 'null'
    }
  }
}
