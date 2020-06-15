const db = require('../db.js')
const fs = require('fs') // 这个是真的fs
jest.mock('fs') // 这里变成了假的fs,第一步在测试的地方mock

describe('db',()=>{ // describe 描述一个东西
it('can read', async ()=>{ // it 它能做什么
    // expect(db.read instanceof Function).toBe(true) // expect 也要非常熟悉
  const data = [{title:'hi',done:true}]
  fs.setMock('/xxx',null,JSON.stringify(data))
  const list = await db.read('/xxx')
  expect(list).toStrictEqual(data) // 对比两个对象toStrictEqual
  })
})
