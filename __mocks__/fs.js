const fs = jest.genMockFromModule('fs'); // 第二步在这里写上genMockFromModule,这是个约定
fs.x = ()=>{
  console.log('hi')
  return 'xxx'
}

module.exports = fs
