import React, { Component } from 'react';
import './App.css';
import store from './store'
import { connect } from 'react-redux'
import {
  add,
  finishStart,
  restoreStart,
 } from './actions'
import DateUtil from './lib/DateFormat'
import IMAGES from './lib/images'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: '',
      isLoading: false,
      isShowFinished: false
    }
  }

  /*
   * 回车添加 代办项
   */
  addTodo = (e) => {
    let val = e.target.value
    if (val === '') return
    if (e.keyCode === 13) {
      this.setState({
        todo: val,
        isLoading: true
      }, () => {
        // 调用添加的actions事件
        this.props.dispatch(add({
          param: {
            content: this.state.todo,
            is_done: false,
            date: new Date().getTime()
          },
          done: () => {
            // actions成功回调
            this.setState({
              todo: '',
              isLoading: false
            })
          },
          fail: () => {
            console.log('failure');
          }
        }))
      })
    }
  }

  /*
   * 选中标签 完成当前任务
   */
 finishItem = (item) => {
   this.setState({
     isLoading: true
   })
   item.is_done = true
   this.props.dispatch(finishStart({
     param: item,
     done: () => {
       this.setState({
         isLoading: false
       })
     },
     fail: () => {
       console.log('finish失败')
     }
   }))
 }
 /*
  * 恢复某条 任务
  */
restoreItem = item => {
  this.setState({
    isLoading: true
  })
  item.is_done = false
  this.props.dispatch(restoreStart({
    param: item,
    done: () => {
      this.setState({
        isLoading: false
      })
    },
    fail: () => {
      console.log('恢复失败')
    }
  }))
}

/*
 * 切换显示 已完成
 */
toggleShowFinished = () => {
  this.setState(pre => ({
    isShowFinished: !pre.isShowFinished
  }))
}

  render() {
    const { addDoneRes, removeDoneRes } = store.getState().todoReducer
    return (
      <div className="App">
        <p className="write-todo">
          <input
            type="text"
            className="input"
            placeholder="write something..."
            onKeyDown={(e) => this.addTodo(e)}
           />
        </p>
        {/* 新todo */}
        <ul className="todo-box">
          {
            addDoneRes.map((item, ind) => {
              return (
                <li className="single-todo" key={ind}>
                  <p className="radio-box">
                    <input
                      type="radio"
                      key={ind}
                      onClick={() => this.finishItem(item)}
                   />
                  </p>
                  <div className="text-box">
                    <p className="title-box">
                      <span className="text" title={item.content}>{item.content}</span>
                    </p>
                    <span>{DateUtil.onDate(item.date)}</span>
                  </div>
                </li>
              )
            })
          }
        </ul>
        {
          this.state.isLoading
          ? <div className="loading">
              <img alt="loading" src={IMAGES.loading} />
              <p className="loading-text"><span>Waiting for 1.5s</span></p>
          </div>
          : null
        }
        {
          removeDoneRes.length > 0 && (
            <div className="tips-box">
              <p>
                {
                  this.state.isShowFinished
                  ? <span className="tip-text" onClick={() => this.toggleShowFinished()}>隐藏已完成事项</span>
                  : <span className="tip-text" onClick={() => this.toggleShowFinished()}>显示已完成事项</span>
                }
              </p>
            </div>
          )
        }
        {/* 已完成todo */}
        {
          this.state.isShowFinished && (
            <ul className="done-box">
              {
                removeDoneRes.map((item, ind) => {
                  return (
                    <li className="single-done" key={ind}>
                      <p className="radio-box">
                        <input
                          type="radio"
                          onClick={() => this.restoreItem(item)}
                        />
                      </p>
                      <p className="text-box">
                        <span className="text-done" title={item.content}>{item.content}</span>
                      </p>
                    </li>
                  )
                })
              }
            </ul>
          )
        }
      </div>
    );
  }
}

const todoReducerData = state => ({
  todoData: state.todoReducer
})


export default connect(todoReducerData)(App);
