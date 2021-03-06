#! /usr/bin/env node
const program = require('commander');
const api = require('./index.js');
const pkg = require('./package')

program
  // option('-x,--xxx','what the x')
  .version(pkg.version)
program.
  command('add')
  .description('add a task')
  .action((...args)=>{
     const words = args[1].join(' ')
     api.add(words).then(() => {console.log('添加成功')}, () => {console.log('添加失败')})
})
program.
command('clear')
  .description('clear all tasks')
  .action(()=>{
    api.clear().then(() => {console.log('清除完毕')}, () => {console.log('清除失败')})
})

// process.argv, 用来判断传入的参数有哪些
if(process.argv.length === 2){
  void api.showAll() // async 默认返回promise, 可以用void强制去除下划线
}

program.parse(process.argv);
