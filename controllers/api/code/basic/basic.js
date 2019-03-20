//云开发mongodb
const cloud = require('tcb-admin-node');
// mongodb链接
const MongoClient = require('mongodb').MongoClient
const MongoUrl = 'mongodb://184.170.222.138:27018/table1'
let getDisciplines = async (ctx, next) => {
    const db = cloud.database();
    const disciplineSet = db.collection('disciplineSet');
    try {
        let res = await disciplineSet.get()
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

let getProfessionsByDiscipline = async (ctx, next) => {
    const { discipline } = ctx.query
    console.log(ctx.query)
    const db = cloud.database();
    const professionSet = db.collection('professionSet');
    try {
        let res = await professionSet.where({
            discipline,
        }).get()
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

let getSkillsByProfession = async (ctx, next) => {
    const { profession } = ctx.query
    const db = cloud.database();
    const skillSet = db.collection('skillSet');
    try {
        let res = await skillSet.where({
            profession,
        }).get()
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

let getPartsBySkill = async (ctx, next) => {
    const { skill } = ctx.query
    const db = cloud.database();
    const basicPartSet = db.collection('basicPartSet');
    try {
        let res = await basicPartSet.where({
            skill,
        }).get()
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
    'GET /api/code/basic/getDisciplines': getDisciplines,
    'GET /api/code/basic/getProfessionsByDiscipline': getProfessionsByDiscipline,
    'GET /api/code/basic/getSkillsByProfession': getSkillsByProfession,
    'GET /api/code/basic/getPartsBySkill': getPartsBySkill,
};