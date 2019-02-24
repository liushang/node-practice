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
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};

module.exports = {
    'GET /api/': fn_index,
    'POST /api/signin': fn_signin
};