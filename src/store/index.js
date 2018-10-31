import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'

import rootReducer from '../reducers'
import rootSaga from '../sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/**
 * 配置store
 * 先应用中间件，在run saga
 * @return {store}
 */
const configStore = () => {
  const sagaMidddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(sagaMidddleware)
    )
  )
  sagaMidddleware.run(rootSaga)
  store.close = () => store.dispatch(END)
  return store
}

const store = configStore()
export default store
