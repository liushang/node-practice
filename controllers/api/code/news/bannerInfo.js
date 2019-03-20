//云开发mongodb
const cloud = require('tcb-admin-node');
// mongodb链接
const MongoClient = require('mongodb').MongoClient
const MongoUrl = 'mongodb://184.170.222.138:27018/table1'
var fn_index = async (ctx, next) => {
    const { fileID, bannerLink, keyWord } = ctx.request.body
    const db = cloud.database();
    const bannerInfo = db.collection('bannerInfo');
    try {
        let res = await bannerInfo.limit(6).orderBy('createTime', 'desc').get()
        ctx.response.type = 'application/json'
        ctx.response.body = {
            code: 200,
            data: res.data
        }
    } catch(err) {
        ctx.response.type = 'application/json'
        ctx.response.body = {
            code: 500,
            data:'获取数据失败'
        }
    }
};

var fn_signin = async (ctx, next) => {
    const { fileID, bannerLink, keyWord } = ctx.request.body
    const db = cloud.database();
    const bannerInfo = db.collection('bannerInfo');
    try {
        await bannerInfo.add({
            bannerLink,
            keyWord,
            fileID,
            createTime: new Date().getTime()
        })
        let res = await bannerInfo.limit(6).get()
        ctx.response.type = 'application/json'
        ctx.response.body = {
            code: 200,
            data: res.data
        }
    } catch(err) {
        ctx.response.type = 'application/json'
        ctx.response.body = {
            code: 500,
            data:'插入数据失败'
        }
    }
};

module.exports = {
    'GET /api/code/news/getBannerInfo': fn_index,
    'POST /api/code/news/addBannerInfo': fn_signin
};