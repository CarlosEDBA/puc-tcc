import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

import reducer from '@/reducers'

import { PRODUCTION } from '@/globals'

function configureStore(preloadedState) {
	const middlewares = [thunk, promiseMiddleware]

	if (!PRODUCTION) {
		middlewares.push(createLogger())
	}

	const middleware = applyMiddleware(...middlewares)

	const composeEnhancers = (!PRODUCTION) ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose

	const store = createStore(reducer, preloadedState, composeEnhancers(middleware))

	if (!PRODUCTION && module.hot) {
		module.hot.accept('@/reducers', () => {
			store.replaceReducer(require('@/reducers'))
		})
	}

	return store
}

const store = configureStore()

export default store;

