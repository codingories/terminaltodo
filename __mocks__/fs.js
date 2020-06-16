const fs = jest.genMockFromModule('fs'); // 第二步在这里写上genMockFromModule,这是个约定
const _fs = jest.requireActual('fs'); // 以前实际的模块

Object.assign(fs, _fs) // 把_fs key 值 复制 到左边

let readMocks = {}

fs.setReadFileMock = (path,error,data)=>{
  readMocks[path] = [error, data] // 返回
  // mocks['/xxx'] = null, [{title:'hi',done:true}]
}

fs.readFile = (path, options, callback)=>{ // 覆盖原来的
  // fs.readFile('xxx',fn)
  if(callback === undefined){callback = options}
  if(path in readMocks) {
    // callback(mocks[path][0],mocks[path][1]) // 如果发现是被mock过的就不走真正的readFile
    callback(...readMocks[path])
  }else {
    _fs.readFile(path, options, callback)
  }
}

let writeMocks = {}

fs.setWriteFileMock = (path, fn)=>{ // fn 表示该函数应该做什么
  writeMocks[path] = fn
}


fs.writeFile = (path, data, options, callback)=>{
  if(callback === undefined){callback = options}
  if(path in writeMocks){
    writeMocks[path](path, data, options, callback)
  } else {
    _fs.writeFile(path, data, options, callback) // 其实就是调用真正的readFile还是mock
  }
}

fs.clearMocks = ()=>{
  readMocks = {}
  writeMocks = {}
}

module.exports = fs
