
chartDom = document.getElementById('panel');
myChart = echarts.init(chartDom);
/** tab切换逻辑 */
$('.switch_tab div').click(function () {
    var target = $(this).data('target');
    $(this).parent().find('div').removeClass('on');
    $(this).addClass('on');
    $(".screen").removeClass('active');
    $('.screen-' + target).addClass('active');
    if (target === 'tag') {
        $("#downloadBtn").css('display', 'none')
        $("#copyContent").css('display', 'block')
    } else {
        $("#downloadBtn").css('display', 'block')
        $("#copyContent").css('display', 'none')
    }
});

/** 将结果下载成图片 */
$("#downloadBtn").click(function () {
    let pngName = Character.name + "，" + Character.age + "岁的" + Character.race.name + getCall();
    html2canvas(document.getElementById("download_content"), {
        allowTaint: true,
    }).then(canvas => {
        var imgData = canvas.toDataURL('image/png');
        var link = document.createElement('a');
        link.download = pngName + '.png';
        link.href = imgData;
        link.click();
    });
});

/** 复制文本 */
$("#copyContent").click(function () {
    var content = $("#info-tag").text();
    content = content.replace(/\n{2,}/g, '\n').replace(/ {2,}/g, ' ').replace(/^\n+|\n+$/g, '').replace(/^\n+|\n+$/g, ''); // 将多个换行符替换成一个换行符
    navigator.clipboard.writeText(content).then();
});

/** 生成角色 */
$("#generate").click(function () {
    initPred();
    generate();
    $("#content").show()
    $("#download").show()
});
