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
    const { discipline } = ctx.request.body
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
    const { profession } = ctx.request.body
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
}

let getPartDetailByTitle = async (ctx, next) => {
    const { skill, title } = ctx.request.body
    console.log(ctx.request.body)
    console.log(title)
    const db = cloud.database();
    const basicPartDetail = db.collection('basicPartDetail');
    try {
        let res = await basicPartDetail.where({
            skill,
            title
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
let savePartDetailByTitle = async (ctx, next) => {
    const { skill, title, content } = ctx.request.body
    console.log(ctx.request.body)
    console.log(title)
    const db = cloud.database();
    const basicPartDetail = db.collection('basicPartDetail');
    try {
        let res = await basicPartDetail.where({
            skill,
            title
        }).update({
            content
        })
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
var createTitle = async (ctx, next) => {
    const { title, discipline, skill, profession, type } = ctx.request.body
    const db = cloud.database();
    const basicPartSet = db.collection('basicPartSet');
    const basicPartDetail = db.collection('basicPartDetail');
    try {
        await basicPartSet.add({
            title,
            discipline,
            skill,
            profession,
            creator: 'admin',
            createTime: new Date().getTime(),
            type,
        })
        await basicPartDetail.add({
            title,
            discipline,
            skill,
            profession,
            content: '',
            creator: 'admin',
            createTime: new Date().getTime()
        })
        let res = await basicPartSet.limit(10).where({
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
            data:'插入数据失败'
        }
    }
};
var deletePart = async (ctx, next) => {
    const { title, skill } = ctx.request.body
    const db = cloud.database();
    const basicPartSet = db.collection('basicPartSet');
    const basicPartDetail = db.collection('basicPartDetail');
    try {
        await basicPartSet.where({
            title,
            skill,
        }).remove()
        await basicPartDetail.where({
            title,
            skill,
        }).remove()
        let res = await basicPartSet.limit(10).where({
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
            data:'插入数据失败'
        }
    }
};
var modPartInfo = async (ctx, next) => {
    const { title, skill, originTitle } = ctx.request.body
    console.log(originTitle)
    const db = cloud.database();
    const basicPartSet = db.collection('basicPartSet');
    const basicPartDetail = db.collection('basicPartDetail');
    try {
        if (originTitle) {
            console.log(originTitle)
            await basicPartSet.where({
                title: originTitle,
                skill,
            }).update({
                title
            })
            await basicPartDetail.where({
                title: originTitle,
                skill,
            }).update({
                title
            })
        }
        let res = await basicPartSet.limit(10).where({
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
            data:'插入数据失败'
        }
    }
};
module.exports = {
    'POST /api/code/basic/part/createTitle': createTitle,
    'POST /api/code/basic/part/deletePart': deletePart,
    'POST /api/code/basic/part/getPartDetailByTitle': getPartDetailByTitle,
    'POST /api/code/basic/part/savePartDetailByTitle': savePartDetailByTitle,
    'POST /api/code/basic/part/modPartInfo': modPartInfo,
};