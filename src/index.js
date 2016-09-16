import cookie from 'react-cookie'
import Immutable from 'immutable'


const persistState = (paths) => (next) => (reducer, initialState, enhancer) => {
  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
    enhancer = initialState
    initialState = undefined
  }

  let finalInitialState

  try {
    let persistedState = Immutable.Map({})
  
    for (const cookieKey in paths) {
      const storePath   = paths[cookieKey].split('.')
      const value       = cookie.load(cookieKey)
  
      if (typeof value != 'undefined') {
        persistedState = persistedState.setIn(storePath, value)
      }
    }
  
    finalInitialState = initialState.mergeDeep(initialState, persistedState)
  } 
  catch (e) {
    console.warn('Failed to retrieve initialize state from Cookie Storage:', e)
  }

  return next(reducer, finalInitialState, enhancer)
}

const reduxCookieMiddleware = (params) => (store) => (next) => (action) => {
  const result = next(action)

  if (action.type in params) {
    const keys    = params[action.type]
    const value   = store.getState().getIn(keys.reducerKey.split('.'))
    const year    = 365 * 24 * 60 * 60

    cookie.save(keys.cookieKey, value, {
      hostOnly: true,
      maxAge: year
    })
  }

  return result
}


export default {
  persistState,
  reduxCookieMiddleware
}
