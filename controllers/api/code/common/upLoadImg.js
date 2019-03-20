//云开发mongodb
const cloud = require('tcb-admin-node');
// mongodb链接
const MongoClient = require('mongodb').MongoClient
const MongoUrl = 'mongodb://184.170.222.138:27018/table1'
var fn_index = async (ctx, next) => {

    MongoClient.connect(MongoUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("table1");
        var jj = { name:'饿饿饿饿饿2', url: 'www.runoob' }
        dbo.collection("site").insertOne(jj, function(err, res) {
            if (err) throw err;
            console.log("文档插入成功");
            db.close();
        });
    })
    ctx.response.type = 'application/json'
    ctx.response.body = {
        product: { name: 'woshi' }
    }
};

var fn_signin = async (ctx, next) => {
    console.log('post')
    console.log(ctx.request.body)
    const db = cloud.database();
    const userCollection = db.collection('tudo');
    console.log('插入图片信息')
    userCollection.doc('000001').get().then(res => {
        // res.data 包含该记录的数据
        console.log('获取成功')
        console.log(res)
      }, err => {
          console.log(err)
      })
    ctx.response.type = 'application/json'
    ctx.response.body = {
        product: { name: 'woshi' }
    }
};

module.exports = {
    'GET /api/code/common/getBannerInfo': fn_index,
    'POST /api/code/common/upLoadBannerInfo': fn_signin
};