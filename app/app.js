//-----------------------------------------------------------------------------
//  使用时请保留该信息，非常感谢
//-----------------------------------------------------------------------------
//  角色设定生成器
//  Character Generator
//
//  作者：熊豆(kumame)
//  站点：https://github.com/kumame/Tools
//-----------------------------------------------------------------------------


$("document").ready(function () {
    //判断DB数据是否存在或者需要更新
    if (dev || localStorage.DBversion < DBversion || !localStorage.DBversion) {
        let dbList = [
            'race', 'power', 'region', 'camp',
            'eyes', 'face', 'hair', 'body',
            'disposition',
            'outward',
            'background',
            'weapon'
        ];
        // 创建一个空的数组用于存储每个JSON数据加载的Promise对象
        var promises = [];
        $.each(dbList, (key, name) => {
            $.get('./db/' + name + '.json').then(function (data) {
                setStorage(name, data)
                dbList.shift()
                if (dbList.length === 0) loadAPP()
            }, function () {
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

//载入程序
function loadAPP() {
    $.getScript('app/js/tool.js')
    $.getScript('app/js/character.js')
    $.getScript('app/js/generate.js')
    $.getScript('app/js/operation.js')
}
