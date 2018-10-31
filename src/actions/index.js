import * as types from '../mutation'
/*
 * actions 管理
 * Author zhou
 */

// todo
export const add = (param) => ({type: types.ADD_TODO, payload: param})
export const addDone = param => ({type: types.ADD_TODO_DONE, payload: param})

// finish
export const finishStart = param => ({type: types.FINISH_ITEM, payload: param})
export const finishDone = param => ({type: types.FINISH_ITEM_DONE, payload: param})

// restore
export const restoreStart = param => ({type: types.RESTORE_ITEM, payload: param})
export const restoreDone = param => ({type: types.RESTORE_ITEM_DONE, payload: param})
