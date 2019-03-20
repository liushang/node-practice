const Koa = require('koa')  // 是个类 所以首字母大写
const router = require('koa-router')() // 是函数
const bodyParser = require('koa-bodyparser')()
const controller = require('./controller');
const MongoClient = require('mongodb').MongoClient
const MongoUrl = 'mongodb://184.170.222.138:27018/table1'
// 初始化示例
const cloud = require('tcb-admin-node');

// 初始化资源
// 云函数下不需要 secretId和secretKey，但如果在自己的服务器里使用则需要
// env如果不指定将使用默认环境
cloud.init({
  env: 'programmer-note-4417dc',
  secretId: 'AKIDTQQAgnqOTBf6Tc9O2VWlsjLsCH69Ft3r',
  secretKey: '940juQ8dGzDyVmybiallV1kxujzJODm7',
});
setTimeout(() => {
    const db = cloud.database();
    const userCollection = db.collection('tudo');
    console.log('啊啊啊eeeeee啊')
    userCollection.doc('000001').get().then(res => {
        // res.data 包含该记录的数据
        console.log('获取成功')
        console.log(res)
      }, err => {
          console.log(err)
      })
}, 5000)


const app = new Koa()
app.use(bodyParser)
// app.use(router.routes())
// 使用middleware:
app.use(controller());
app.listen(30018)
console.log('app start at port 30018... ')
