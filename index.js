const homedir = require('os').homedir();  // /Users/ories
const home = process.env.HOME || homedir;  // /Users/ories,process.env.HOME 用户配置过的环境
const p = require('path')
const fs = require('fs')
const dbPath = p.join(home, '.todo')

module.exports.add = (title)=>{
  // 读取之前的任务
  fs.readFile(dbPath, {flag: 'a+'}, (error,data)=>{
    if (error) {console.log(error)} else {
      let list
      try{
        list = JSON.parse(data.toString())
      }catch(error2) {
        list = []
      }
      console.log(list)
      const task = {
        title:title,
        done: false
      }
      list.push(task)
      const string = JSON.stringify(list)
      fs.writeFile(dbPath, string+'\n',(error3)=>{
        if(error3){
          console.log(error3)
        }
      })
    }


  })


  // 往里面添加一个 title 任务

  // 储存任务到文件
}
