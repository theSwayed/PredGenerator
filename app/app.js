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
        //json文件加载列表
        var DBload = [
            $.get('./db/body.json'),
            $.get('./db/base.json'),
            $.get('./db/soul.json'),
            $.get('./db/inside.json'),
            $.get('./db/dress.json'),
            $.get('./db/pose.json'),
        ];
        $.when(...DBload).then(function () {
            // 使用 arguments 对象遍历传递给回调函数的参数
            for (var i = 0; i < arguments.length; i++) {
                makeLS(arguments[i]);
            }
            return loadAPP();
        }, function () {
            $("#warning").css("display", "block").text("数据库加载失败，请检查浏览器或网络环境")
        });
        //更新版本号
        localStorage.DBversion = DBversion;
    } else {
        loadAPP();
    }
});

function makeLS(DB) {
    let title;
    for (let i = 0; i < Object.keys(DB[0]).length; i++) {
        title = Object.keys(DB[0])[i];
        localStorage.setItem(title, JSON.stringify(DB[0][title]));
    }
}

//载入程序
function loadAPP() {
    $.getScript('app/js/operation.js')
    $.getScript('app/js/tool.js')
    $.getScript('app/js/generate.js')
}
