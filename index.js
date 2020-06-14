const db = require('./db.js')


module.exports.add = async (title)=>{
  // 读取之前的任务
  const list = await db.read() // await 表示异步拿到promise结果 前面必须加async
  // 往里面添加一个 title 任务
  list.push({title, done:false})
  // 储存任务到文件
  await db.write(list) // 面向接口编程,这里最好写一下await，因为我们要确保这里的异步等结束
}
module.exports.clear = async (title) => {
  await db.write([])
}
module.exports.showAll = async ()=> {
  // 读取之前的任务
  const list = await db.read()
  // 打印之前的任务
  list.forEach((task, index)=>{
    console.log(`${task.done ? '[x]':'[_]' } ${index + 1} - ${task.title}`)
  })
}
