import { combineReducers } from 'redux'
// 引入全部 reducers
import todoReducer from '../reducers/todoReducer'

const allReducer = {
  todoReducer,
}
// 合并所有reducer 集中管理
const rootReducer = combineReducers(allReducer)

export default rootReducer
