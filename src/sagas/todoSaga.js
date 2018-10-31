import {
  put,
  call,
  // take,
  // fork,
  // cancel,
  // cancelled,
  // takeEvery,
  takeLatest
} from 'redux-saga/effects'
import request from '../lib/request'

import * as types from '../mutation'
import {
  addDone,
  finishDone,
  restoreDone,
} from '../actions'
/**
 * 增加工作项
 */
function* addTodo({ payload: { param, done, fail }}) {
  try {
    const data = yield call(request, param)
    if (done) yield call(done, data)
    if (done) yield put(addDone({data}))
  } catch (e) {
    if (fail) yield call(fail)
  }
}

/*
 * 完成某一项任务
 */
function* finishItem({ payload: { param, done, fail }}) {
  try {
    const data = yield call(request, param)
    if (done) yield call(done, data)
    yield put(finishDone({data}))
  } catch (e) {
    if (fail) yield call(fail)
  }
}

/*
 * 恢复工作项
 */
function* restoreItem({ payload: { param, done, fail } }) {
  try {
    const data = yield call(request, param)
    if (done) yield call(done, data)
    yield put(restoreDone({data}))
  } catch (e) {
    if (fail) yield call(fail)
  }
}

const todoSaga = [
  takeLatest(types.ADD_TODO, addTodo),
  takeLatest(types.FINISH_ITEM, finishItem),
  takeLatest(types.RESTORE_ITEM, restoreItem),
]

export default todoSaga
