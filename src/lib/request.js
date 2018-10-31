// 模拟1.5s后 返回结果
const post = (param) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(param)
    }, 1500)
  })
}

export default post
