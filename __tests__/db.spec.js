const db = require('../db.js')
const fs = require('fs') // 这个是真的fs
jest.mock('fs') // 这里变成了假的fs,第一步在测试的地方mock

describe('db',()=>{ // describe 描述一个东西
it('can read', ()=>{ // it 它能做什么
    // expect(db.read instanceof Function).toBe(true) // expect 也要非常熟悉
    // fs.x()
    expect(fs.x()).toBe('xxx')
  })
  // it('can write', ()=>{
  //   expect(db.read instanceof Function).toBe(true)
  // })
})
