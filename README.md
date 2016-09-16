# redux-cookie-persist
Redux cookie persister and middleware

[![Npm Version](https://badge.fury.io/js/redux-cookie-persist.svg)](https://www.npmjs.com/package/redux-cookie-persist)
[![Month Downloads](https://img.shields.io/npm/dm/redux-cookie-persist.svg)](http://npm-stat.com/charts.html?package=redux-cookie-persist)
[![Npm Licence](https://img.shields.io/npm/l/redux-cookie-persist.svg)](https://www.npmjs.com/package/redux-cookie-persist)

[![NPM](https://nodei.co/npm/redux-cookie-persist.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/redux-cookie-persist/)


## Install

```bash
npm install --save redux-cookie-persist
```


## Usage

```javascript
middleware: [
  reduxCookieMiddleware({
    'ACTION_TYPE': {
      reducerKey: 'STATE_SUBSET_PATH',
      cookieKey: 'COOKIE_KEY'
    },
  })
],

enhancers: [
  persistState({
    [COOKIE_KEY]: 'STATE_SUBSET_PATH',
  })
],
```


## Example

```javascript
import { persistState, reduxCookieMiddleware } from 'redux-cookie-persist'

reduxCookieMiddleware({
  'session.setToken': {
    reducerKey: 'session.token',
    cookieKey: 'token'
  },
})

persistState({
  token: 'session.token',
})
```
