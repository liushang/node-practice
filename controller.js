const fs = require('fs');

function addMapping(router, mapping) {
    console.log(mapping)
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    var js_files = traverseDir(`${__dirname}/controllers`, router)
    console.log(js_files)
    // for (var f of js_files) {
    //     console.log(`process controller: ${f}...`);
    //     console.log(__dirname + '\\controllers\\' + f)
    //     let mapping = require(__dirname + '/controllers/' + f);
    //     addMapping(router, mapping);
    // }
}

function traverseDir (filesPath, router) {
    console.log('遍历开始')
    console.log(filesPath)
    var files = fs.readdirSync(filesPath);
    console.log(files)
    var jsFiles = files.forEach( f1 => {
        console.log(f1)
        let fileNextPath = `${filesPath}/${f1}`
        if (f1.endsWith('.js')) {
            let mapping = require(fileNextPath);
            addMapping(router, mapping);
        } else if (fs.statSync(fileNextPath).isDirectory()) {
            console.log('文件夹')
            traverseDir(fileNextPath, router)
        }
    } )
    console.log('便利结束')
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    console.log(router.routes())
    return router.routes();
};