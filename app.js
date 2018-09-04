const Koa = require('koa')  // 是个类 所以首字母大写
const router = require('koa-router')() // 是函数
const bodyParser = require('koa-bodyparser')()
const controller = require('./controller');
const app = new Koa()
app.use(bodyParser)
// app.use(router.routes())
// 使用middleware:
app.use(controller());
app.listen(3000)
console.log('app start at port 3000... ')