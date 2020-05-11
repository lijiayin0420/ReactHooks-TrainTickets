import { readFile } from 'fs-extra'

readFile(filename, (err, content) => {
  parseXML(content, (err, xml) => {})
})

readFile(filename)
  .then((content) => parseXML(content))
  .then(
    (xml) => {},
    (err) => {},
  )

  //推荐使用
readFile(filename)
  .then((content) => parseXML(content))
  .then((xml) => {}).catch(error=>{})

  open().then(handle).finally(close)

  //快捷方式
  Promise.resolve(1) //等价于
  new Promise(resolve=>resolve(1))

  Promise.reject(error) //等价于
  new Promise((resolve,reject)=>reject(error))

  // 传入一个由多个Promise对象组成的数组，返回一个新的Promise
  // 也可传入可迭代对象，例如‘abc’
  Promise.all() // 所有的Promise完成后完成，只要有一个拒绝，就会立即触发拒绝
  Promise.race() //只要有一个完成或拒绝，就会立即触发完成或拒绝


  // async await 可以避免callback的线性关系（同步 =》异步） 
  // 最好用babel转换
  async function readXML(filename){
      const content = await readFile(filename)
      const xml = await parseXML(content)
      return xml
  }
