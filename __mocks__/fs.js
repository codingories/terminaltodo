const fs = jest.genMockFromModule('fs'); // 第二步在这里写上genMockFromModule,这是个约定
const _fs = jest.requireActual('fs'); // 以前实际的模块

Object.assign(fs, _fs) // 把_fs key 值 复制 到左边

const mocks = {}

fs.setMock = (path,error,data)=>{
  mocks[path] = [error, data] // 返回
}

fs.readFile= (path, options, callback)=>{ // 覆盖原来的

  // fs.readFile('xxx',fn)
  if(callback === undefined){callback = options}

  if(path in mocks) {
    // callback(mocks[path][0],mocks[path][1]) // 如果发现是被mock过的就不走真正的readfile
    callback(...mocks[path])
  }else {
    _fs.readFile(path, options, callback)
  }

}


module.exports = fs
