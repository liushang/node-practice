const Koa = require('koa')  // 是个类 所以首字母大写
const router = require('koa-router')()
const app = new Koa()
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`)
    await next()
    // ctx.response.type = 'text/html'
    // ctx.response.body = '<h1>Hello,koa2!'
})

router.get('/hello/:name', async (ctx, next) => {
    let { name } = ctx.params
    ctx.response.body = `<h1>hello, ${name}</h1>`
    await next()
})
router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>'
})
app.use(router.routes())
app.use(async (ctx, next) => {
    console.log(`2222Process ${ctx.request.method} ${ctx.request.url}`)
    ctx.response.body = '<h1>Index</h1>'
})
app.listen(3000)
console.log('app start at port 3000... ')