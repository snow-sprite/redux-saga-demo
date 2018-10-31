import * as types from '../mutation'
/*
 * 初始化 todolist 列表
 */
const initTodo = {
  // 未完成任务列表包括 默认的一条
  addDoneRes: [
    {
      content: 'default',
      is_done: false,
      date: new Date().getTime()
    }
  ],
  // 已完成任务列表
  removeDoneRes: []
}

const todoReducer = (state=initTodo, action) => {
  // 新加任务后的未完成列表
  let newAddDoneRes
  // 删除后的未完成任务列表
  let filterAddDoneRes
  // 删除后的已完成任务列表
  let newRemoveDoneRes
  // 恢复后已完成任务列表
  let filterRemoveDoneRes
  switch(action.type) {
    case types.ADD_TODO:
      return state
    case types.ADD_TODO_DONE:
      newAddDoneRes = state.addDoneRes.reverse().concat(action.payload.data).reverse()
      return { ...state, addDoneRes: newAddDoneRes }
    case types.FINISH_ITEM:
      return state
    case types.FINISH_ITEM_DONE:
      newRemoveDoneRes = state.removeDoneRes.reverse().concat(action.payload.data).reverse()
      // 完成某一项任务 将该任务从todolist删除
      filterAddDoneRes = state.addDoneRes.filter(item => item.is_done === false)
      return { ...state, removeDoneRes: newRemoveDoneRes, addDoneRes: filterAddDoneRes }
    case types.RESTORE_ITEM_DONE:
      newAddDoneRes = state.addDoneRes.reverse().concat(action.payload.data).reverse()
      filterRemoveDoneRes = state.removeDoneRes.filter(item => item.is_done === true)
      return {...state, addDoneRes: newAddDoneRes, removeDoneRes: filterRemoveDoneRes}
    default:
    return state
  }
}

export default todoReducer
