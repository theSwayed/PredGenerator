//-----------------------------------------------------------------------------
//  使用时请保留该信息，非常感谢
//-----------------------------------------------------------------------------
//  角色设定生成器
//  Character Generator
//
//  作者：熊豆(kumame)
//  站点：https://github.com/kumame/Tools
//-----------------------------------------------------------------------------


let dbList = [
    'race', 'power', 'region', 'camp',
    'eyes', 'face', 'hair', 'body',
    'disposition',
    'outward',
    'background',
    'weapon',
];
let db = {};
$("document").ready(function () {
    //判断DB数据是否存在或者需要更新
    if (dev || localStorage.DBversion < DBversion || !localStorage.DBversion) {
        // 创建一个空的数组用于存储每个JSON数据加载的Promise对象
        $.each(dbList, (key, name) => {
            $.get('./db/' + name + '.json').then(function (data) {
                setStorage(name, data)
                db[name] = {};
                $.each(data, (dk) => {
                    db[name][dk] = [];
                })
                dbList.shift()
                if (dbList.length === 0) {
                    localStorage.setItem('dbIndex', JSON.stringify(db));
                    loadAPP()
                }
            }, function (data, err, err1) {
                console.log(data, err, err1)
                $("#warning").css("display", "block").text("数据库加载失败，请检查浏览器或网络环境");
            })
        });
        //更新版本号
        localStorage.DBversion = DBversion;
    } else {
        loadAPP();
    }
});

function setStorage(db, data) {
    for (const key in data) {
        localStorage.setItem(db + "." + key, JSON.stringify(data[key]));
    }
}

//筛选器
function getStorage(name) {
    return JSON.parse(localStorage.getItem(name))
}

//载入程序
function loadAPP() {
    db = getStorage('dbIndex');
    $.each(db, (name, child) => {
        $.each(child, (key) => {
            db[name][key] = getStorage(name + "." + key);
        });
    });
    $.getScript('app/js/tool.js')
    $.getScript('app/js/character.js')
    $.getScript('app/js/operation.js')
    $.getScript('app/js/generate.js')
}
