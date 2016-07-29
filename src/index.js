import cookie from 'react-cookie'


const persistState = (params) => (store) => (next) => (action) => {
  const result = next(action)

  if (action.type in params) {
    const key     = params[action.type].split('.')
    const value   = store.getState().getIn(key)
    const year    = 365 * 24 * 60 * 60

    cookie.save(key, value, {
      hostOnly: true,
      maxAge: year
    })
  }

  return result
}

export default persistState
