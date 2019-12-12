export const authentication = (token) => {
  return {
    type: 'AUTH',
    payload: token
  }
}
