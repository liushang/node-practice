
//云开发mongodb
const cloud = require('tcb-admin-node');
// mongodb链接
const MongoClient = require('mongodb').MongoClient
const MongoUrl = 'mongodb://184.170.222.138:27018/table1'

var https = require("https");
var iconv = require("iconv-lite");
const crypto = require('crypto');
const db = cloud.database();
const basicPartSet = db.collection('basicPartSet');
const basicPartDetail = db.collection('basicPartDetail');
const userOpenIdSessionKey = db.collection('user-openid-session_key')
var loginIn = async (ctx, next) => {
    const { code } = ctx.request.body
    console.log(code)
    let userInfo = await getUserInfo(code)
    try {
        ctx.response.type = 'application/json'
        ctx.response.status = 200
        ctx.response.body = {
            code: 200,
            data: userInfo
        }
        console.log(ctx.response.body)
    } catch(err) {
        ctx.response.type = 'application/json'
        ctx.response.body = {
            code: 500,
            data:'插入数据失败'
        }
    }
};

function getUserInfo (code) {
    return new Promise(resolve => {
        let appid = 'wx692550b433510dc0'
        let secret = 'ac7a29f879e042753ff566088b9b0aa5'
        var url="https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+code+"&grant_type=authorization_code";
        https.get(url, function (res) {
            console.log('状态码:', res.statusCode);
            console.log('请求头:', res.headers);
            var datas = [];
            var size = 0;
            res.on('data', function (data) {
                datas.push(data);
                size += data.length;
            //process.stdout.write(data);
            });
            res.on("end", async () => {
                var buff = Buffer.concat(datas, size);
                var result = JSON.parse(iconv.decode(buff, "utf8"));//转码//var result = buff.toString();//不需要转编码,直接tostring
                console.log(result)
                const { session_key: sessionKey, openid } = result
                const secret = 'jihuihunmengyujuntong';
                const token = crypto.createHmac('sha256', secret).update(openid).digest('hex');
                console.log(token)
                const { data: userObj } = await userOpenIdSessionKey.where({
                    openid
                }).get()
                console.log(userObj)
                if (userObj && userObj.length === 1) {
                    await userOpenIdSessionKey.where({
                        openid
                    }).update({
                        sessionKey,
                        token,
                    })
                } else {
                    await userOpenIdSessionKey.add({
                        token,
                        sessionKey,
                        openid,
                    })
                }
                resolve({ token })
            });
    
        }).on("error", function (err) {
            // Logger.error(err.stack)
            console.log('错误待定的点点滴滴点点滴滴')
            callback.apply(null);
        })
    })
}


module.exports = {
    'POST /api/code/login': loginIn
};