//云开发mongodb
const cloud = require('tcb-admin-node');
// mongodb链接
const MongoClient = require('mongodb').MongoClient

const httpFunc = async ( ctx, next, excuteBack )  => {
        console.log('22323')
        const db = cloud.database();
        console.log(ctx.query)
        let deQuery = ctx.query
        let deBody = ctx.request.body
        console.log(excuteBack.rest)
        try {
            let res = await excuteBack( { deQuery, deBody }, db )
            console.log('resssssss')
            console.log(res)
            ctx.response.type = 'application/json'
            ctx.response.body = {
                code: 200,
                data: res.data
            }
            console.log(ctx.response)
        } catch(err) {
            ctx.response.type = 'application/json'
            ctx.response.body = {
                code: 500,
                data:'获取数据失败'
            }
        }
    }
// }
module.exports = httpFunc;