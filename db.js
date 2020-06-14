const homedir = require('os').homedir();  // /Users/ories
const home = process.env.HOME || homedir;  // /Users/ories,process.env.HOME 用户配置过的环境
const p = require('path')
const fs = require('fs')
const dbPath = p.join(home, '.todo')

const db = {
  read(path = dbPath){
    return new Promise((resolve, reject)=>{ // promise经典用法，异步不能return,所以成功的时候resolve,错误reject
      fs.readFile(path, {flag: 'a+'}, (error,data)=>{ // a+ 读文件不存在则创建
        if (error) return reject(error)
        let list
        try{
          list = JSON.parse(data.toString())
        }catch(error2) {
          list = []
        }
        resolve(list)
      })
    })

  },
  write(list,path = dbPath){
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list)
      fs.writeFile(dbPath, string +'\n', (error)=>{
        if(error) return reject( error )
        resolve()
      })
    })
  }
}
module.exports = db // 这是nodejs的导出

// 不能用export default db ，这是浏览器可以用的
