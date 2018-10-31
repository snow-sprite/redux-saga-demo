import { all } from 'redux-saga/effects'

import todoSaga from './todoSaga'

export default function* rootSaga() {
  const allWathes = [
    ...todoSaga
  ]
  yield all(allWathes)
}
