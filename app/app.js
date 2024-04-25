//-----------------------------------------------------------------------------
//  使用时请保留该信息，非常感谢
//-----------------------------------------------------------------------------
//  角色设定生成器
//  Character Generator
//
//  作者：熊豆(kumame)
//  站点：https://github.com/kumame/Tools
//-----------------------------------------------------------------------------
//  Character.age = 年龄坐标
//  Camp  = 心理坐标
//  Power  = 力量坐标
//  Region  = 区域坐标
//-----------------------------------------------------------------------------
var Race = "";
let pngName = "";

let Character = {
    name: '',
    age: 0,// 年龄
    camp: {// 阵营坐标
        index: 0,
        show: '',
        left: 0,
        right: 0,
    },
    power: {// 力量坐标
        index: 0,
        show: '',
        level: 'E',
    },
    region: {// 区域坐标
        index: 0,
        show: '',
    },
    race: {
        main: '',// 种族
        main_id: 0,
    },
    race_mix: {
        main: '',// 混血
        main_id: 0,
        mix_gant: 0,// 混血种族为巨人
        mix_point: 0// 混血率
    },
    face: {
        type: '',// 脸型
        brow: '',// 眉毛
        makeup: '',// 妆容
        mouth: '',// 嘴
        mouth_status: '',// 嘴状态
    },
    eyes: {
        shape: '',// 眼型
        look: '',// 眼神
        color: '',// 眼瞳
        diff: '',// 异瞳

    },
    hair: {
        type: '',// 发形
        length: '',// 发长
        bangs: '',// 刘海
        style: '',// 发刑
        color: '',// 发色
        gradient: '',// 渐变
        highlight: '',// 挑染
    },
    body: {
        height: 0,
        unit: '',
        color: '',
        type: '',
    },
    soul: {
        personal: '',
        connect: '',
        traits: '',
        but: '',
        skill: {
            name: '',
            desc: ''
        },
        hobby: '',
        hunting: {
            target: '',
        }
    },
    dress: {
        clothing: '',
        weapon: {
            name: "",
            desc: "",
        }
    },
    panel: {
        eat_speed: 0,// 吞噬速度
        capacity: 0,// 胃容量
        hidden_rate: 0,// 压缩率
        toughness: 0,// 韧性
        digest_speed: 0,// 消化速度
        absorb_rate: 0,// 吸收率
    },
    panel_settings: {
        color: '#F9713C',
    }
};
//随机生成
$("#Rseed").click(function () {
    setAge();// 设置年龄
    const randomData = [];
    for (let i = 0; i < 3; i++) {
        randomData[i] = RandomIntRound(1, 100);
    }
    Character.camp.index = randomData[0];
    Character.power.index = randomData[1];
    Character.region.index = randomData[2];
    setRace();// 设置种族
    setCamp();// 设置阵营
    setPower();// 设置力量
    setRegion();// 设置区域


    // 设置身体
    setBody();
    // 设置脸部
    setFace();
    // 设置灵魂
    setSoul();
    // 设置
    setDress();

    let X = Character.age;
    if (Character.age > 100) {
        X = parseInt(Character.age / 10)
    }

    Character.panel_settings.color = hslToRgb(((X + Character.camp.index) * 1.8 +30) / 360, ((Character.camp.index - 50) * 0.1 + 30 +30) / 100, ((X - 50) * 0.1 + 50 +30) / 100);

    setPanel();

    DNAmix();
    BoxBG(X, Character.camp.index);

    $("#content").show()
    $("#download").show()
});

$("#downloadBtn").click(function () {
    pngName = Character.name + "，" + Character.age + "岁的" + Character.race.main + getCall();
    html2canvas($("#content"), {
        onrendered: function (canvas) {
            var imgData = canvas.toDataURL('image/png');
            var link = document.createElement('a');
            link.download = pngName + '.png';
            link.href = imgData;
            link.click();
        }
    });
});

var DBPower = JSON.parse(localStorage.power);
var DBRegion = JSON.parse(localStorage.region);
var DBRace = JSON.parse(localStorage.race);

//因子混合
function DNAmix() {
    //web自定义设置，不用删除 -->
    RACE = 1; // 启用种族
    hybrid = 100;// 混血概率
    EYCL123 = 0.4; // 异瞳概率，%
    Character.name = $('#CharacterName').val() ? $('#CharacterName').val() : "神秘人";
    $('.Cname').html(Character.name);
    //web自定义设置 * 结束 <--

    //输出
    let DNA1html =
        `<p>一位有着<u>${Character.power.show}</u>魔力，来自<u>${Character.region.show}</u>的<u>${Character.age}</u>岁<u>${Character.race.main}</u>${getCall()}。</p>
        <p>身高<u>${Character.body.height}</u>${Character.body.unit}，肤色<u>${Character.body.color}</u>，<u>${Character.body.type}</u>，有着一张<u>${Character.face.type}</u>。</p>
        <p>${getEyesStr()}<u>${Character.eyes.shape}</u>，<u>${Character.face.brow}</u>，目光<u>${Character.eyes.look}</u>。</p>
        <p><u>${Character.face.mouth}${Character.face.mouth_status}</u>，妆容<u>${Character.face.makeup}</u>。</p>
        <p>一头${getHairStr()}的<u>${Character.hair.length}${Character.hair.type}</u>梳成<u>${Character.hair.bangs}</u>的<u>${Character.hair.style}</u>。</p>
        <p>身着<u>${Character.dress.clothing}</u>。</p>
        <p>常用的武器是<u>${Character.dress.weapon.name}</u>。</p>
        <p><u>${Character.dress.weapon.desc}</u>。</p>
        `
    let DNA2html = ` 
        <p>行为倾向于<u>${Character.camp.show}</u>，性格<u>${Character.soul.personal}</u>${Character.soul.connect}<u>${Character.soul.traits}</u>。</p>
        <p>天赋序列：<u>${Character.soul.skill.name}</u></p>
        <p>序列描述：<u>${Character.soul.skill.desc}</u>。</p>
        <p>爱好：<u>${Character.soul.hobby}</u></p>
        <p>更倾向于将<u>${Character.soul.hunting.target}</u>视为自己的猎物。</p>`;
    $("#DNAout .BGtype2").html(DNA1html);
    $("#DNAout .BGtype1").html(DNA2html);

}

function getCall() {
    let age = Character.age;
    if (age <= 14) return "女孩";
    if (age <= 18) return "少女";
    if (age > 18) return "小姐";
}

function getHairStr() {
    let str = `<u>${Character.hair.color}</u>`;
    if (Character.hair.gradient) {// 渐变
        str += "渐变" + `<u>${Character.hair.gradient}</u>`
    }
    if (Character.hair.highlight) {// 渐变
        str += "挑染" + `<u>${Character.hair.highlight}</u>`
    }
    return str;
}

function getEyesStr() {
    if (Character.eyes.diff) {
        return `<u>${Character.eyes.color}</u>、<u>${Character.eyes.diff}</u>双瞳`
    } else {
        return `<u>${Character.eyes.color}</u>`
    }
}


// 随机获取年龄
function setAge() {
    let rand = RandomInt(10);
    let round = [];
    if (rand >= 1 && rand <= 7) {
        round[0] = 12;
        round[1] = 29;
    } else if (rand >= 8 && rand <= 9) {
        round[0] = 30;
        round[1] = 490;
    } else {
        round[0] = 500;
        round[1] = 1490;
    }
    round[0] = 14;
    round[1] = 29;
    Character.age = RandomIntRound(round[0], round[1]);
}

// 阵营
function setCamp() {
    Character.camp.index = RandomIntRound(1, 100);

    let DBCampLeft = JSON.parse(localStorage.campLeft);
    let DBCampRight = JSON.parse(localStorage.campRight);
    let left = '';
    let right = '';
    let campLeftData = DBCampLeft.find(camp => camp.LL <= Character.camp.index);
    let campRightData = DBCampRight.find(camp => camp.LL <= RandomIntRound(1, 100));
    left = campLeftData.obj;
    right = campRightData.obj;

    if (left === '中立' && right === '中立')
        Character.camp.show = "绝对中立";
    else if (left === '均衡' || right === '均衡')
        Character.camp.show = "均衡";
    else Character.camp.show = left + right;

    Character.camp.left = campLeftData.LL;
    Character.camp.right = campRightData.LL;
}

//力量
function setPower() {
    Character.power.index = RandomIntRound(1, 100);
    for (let i = 0; i < DBPower.length; i++)
        if (i === 0 ? Character.power.index <= DBPower[i].LL : Character.power.index > DBPower[i - 1].LL && Character.power.index <= DBPower[i].LL) {
            Character.power.show = DBPower[i].obj;
            Character.power.level = DBPower[i].level;
        }
}

//地区
function setRegion() {
    Character.region.index = RandomIntRound(1, 100);
    for (let i = 0; i < DBRegion.length; i++)
        if (i === 0 ? Character.region.index <= DBRegion[i].LL : Character.region.index > DBRegion[i - 1].LL && Character.region.index <= DBRegion[i].LL)
            Character.region.show = DBRegion[i].obj;
}

// 获取种族
function setRace() {
    let RaceData = filterFromAge(localStorage.race);
    Character.race.main = RaceData.obj;
    Character.race.id = RaceData.id;
    if (hybrid >= RandomInt(100) && Character.power.index >= hybridRF && Race === DBRace[(Embryo - 1)].obj) {// 只允许人族与其他种族混血，不允许其他种族与其他种族混血
        let RaceData = DBRace[RandomInt(DBRace.length)];
        Character.race_mix.main = RaceData.obj;
        Character.race_mix.id = RaceData.id;
        if (Character.race_mix.main === '巨人') {
            Character.race_mix.mix_gant = 1;
        }
        Character.race_mix.point = RandomIntRound(10, 50)
    }
}

// 身高
function setBody() {
    Character.body.height = RandomIntRound(heightMIN, heightMAX);
    if (Character.race.main !== '巨人')
        if (Character.race.mix_gant) {
            Character.body.height /= 50;
            Character.body.unit = "M";
        } else {
            Character.body.unit = "Cm";
        }
    else {
        Character.body.height /= 10;
        Character.body.unit = "M";
    }
    Character.body.color = BOXfilter2(localStorage.bodyColor);// 肤色
    Character.body.type = BOXfilter1(localStorage.bodyType);// 体型
}

// 面部
function setFace() {
    Character.face.type = BOXfilter1(localStorage.faceType);// 脸型
    Character.face.brow = BOXfilter1(localStorage.faceBrow);// 眉
    Character.face.makeup = BOXfilter1(localStorage.faceMakeup); // 妆容
    Character.face.mouth = BOXfilter1(localStorage.faceMouth);// 嘴
    Character.face.mouth_status = BOXfilter1(localStorage.faceMouthStatus);// 嘴状态

    // 眼睛
    Character.eyes.shape = BOXfilter1(localStorage.eyeShape);// 眼型
    Character.eyes.look = BOXfilter1(localStorage.eyeLook);// 眼神，目光
    Character.eyes.color = BOXfilter2(localStorage.eyeColor);// 瞳色
    if (Math.round((EYCL123 * (Character.power.index * 0.1)) * 100) >= RandomInt(1000))
        Character.eyes.diff = BOXfilter2(localStorage.eyeColor);// 异瞳

    // 头发
    Character.hair.type = BOXfilter1(localStorage.hairType);// 发形
    Character.hair.bangs = BOXfilter1(localStorage.hairBangs);// 刘海
    Character.hair.style = BOXfilter1(localStorage.hairStyle);// 发型
    Character.hair.length = BOXfilter1(localStorage.hairLength);// 发长
    Character.hair.color = BOXfilter4(localStorage.hairColor);// 发色
    Character.hair.gradient = gradient();// 渐变
    Character.hair.highlight = highlight();// 挑染
}

// 性格特质
function setSoul() {
    var mold_r = RandomInt(2);
    var traits_r = RandomInt(2);
    Character.soul.personal = mold_r === 0 ? BOXfilter1(localStorage.moldP) : BOXfilter1(localStorage.moldN);// 性格
    Character.soul.connect = mold_r === traits_r ? ' 又 ' : ' 但 ';// 又但
    Character.soul.traits = traits_r === 0 ? BOXfilter1(localStorage.traitsP) : BOXfilter1(localStorage.traitsN);// 解释
    if (traits_r === 0 && RandomInt(100) <= 7) Character.soul.but = BOXfilter1(localStorage.traitsE);// 只不过
    let data = getDataFromFilter4(localStorage.skill);
    Character.soul.skill.name = data.obj;
    Character.soul.skill.desc = data.desc;
    Character.soul.hobby = BOXfilter4(localStorage.hobby);
    Character.soul.hunting.target = BOXfilter4(localStorage.huntingTargets);
}

// 外貌
function setDress() {
    // 服装
    Character.dress.clothing = BOXfilter4(localStorage.clothing);
    // 武器
    let weapon = getDataFromFilter4(localStorage.weapon);
    let weapon_effects = getDataFromFilter4(localStorage.weapon_effects);
    Character.dress.weapon.name = weapon.obj;
    Character.dress.weapon.desc = weapon_effects.obj;
}


function setPanel() {
    Character.panel.digest_speed = 0;
    Character.panel.eat_speed = 0;
    Character.panel.toughness = 0;
    Character.panel.capacity = 0;
    Character.panel.absorb_rate = 0;
    Character.panel.hidden_rate = 0;
    switch (Character.soul.skill.name) {
        case "生物压缩":
            Character.panel.capacity = 5;
            Character.panel.hidden_rate = 5;
            break;
        case "巨大化":
            Character.panel.capacity = 5;
            Character.panel.hidden_rate = 5;
            break;
        case "饕餮":
            Character.panel.capacity = 6;
            Character.panel.hidden_rate = 6;
            break;
        case "心如止水":
            Character.panel.toughness = 5;
            break;
        case "负重者":
            Character.panel.toughness = 5;

            break;
        case "捕食者":
            Character.panel.digest_speed = 5;
            break;
        case "超负荷":
            Character.panel.digest_speed = 5;
            Character.panel.toughness = 5;
            Character.panel.capacity = 5;
            Character.panel.hidden_rate = 5;
            break;
        case "钢铁武装":
            Character.panel.toughness = 5;
            break;

    }

    function generateNumbers(type, param) {
        // 生成1到100的随机整数
        var randomNumber = Math.floor(Math.random() * 100) + 1;
        if (randomNumber == 0) randomNumber = 1;

        // 将1到100的范围按照参数值进行映射，使参数值越小，生成的随机数范围越小
        var scaledNumber = Math.floor(randomNumber * (param / 100));

        if (scaledNumber > 50) scaledNumber /= 2;
        scaledNumber = Math.ceil(scaledNumber / 10);
        console.log(Character.power.index, scaledNumber)
        // 返回生成的随机数
        let not_zero = false;
        switch (type) {
            case 'eat_speed':
            case 'capacity':
                not_zero = true;
                break
        }
        if (not_zero && scaledNumber === 0) scaledNumber = 1;
        return scaledNumber;
    }


    let data = [];
    let indicator = [];
    for (let i in Character.panel) {
        if (!Character.panel[i]) {
            console.log(i)
            Character.panel[i] = generateNumbers(i, Character.power.index);
        }
        data.push(Character.panel[i])
        // data.push(6)
        let name = "";
        switch (Character.panel[i]) {
            case 0:
                name = "菜";
                break;
            case 1:
                name = "E";
                break;
            case 2:
                name = "D";
                break;
            case 3:
                name = "C";
                break;
            case 4:
                name = "B";
                break;
            case 5:
                name = "A";
                break;
            case 6:
                name = "S";
                break;
        }
        indicator.push({name: name, max: 6});
    }
    myChart.setOption(setOptions(data, indicator));
}

// 渐变，应随Age增高而减少
function gradient() {
    let age = Character.age;
    if (age > 100) age = age / 10;
    if (RandomInt(1000) <= RandomIF(H_B_CG[0], Character.age) || RandomInt(1000) <= RandomPF(H_B_CG[1], Character.power.index))
        return BOXfilter4(localStorage.hairColor);
    else
        return "";
}

// 挑染，应随Age增高而减少
function highlight() {
    let age = Character.age;
    if (age > 100) age = age / 10;
    if (RandomInt(1000) <= RandomIF(H_B_CG[0], age) || RandomInt(1000) <= RandomPF(H_B_CG[1], Character.power.index))
        return BOXfilter4(localStorage.hairColor);
    else
        return "";
}

//修改生成颜色，不使用删除即可
function BoxBG(X, Y) {
    $('#box1, .bg_card').css("background-color", "hsl(" + (X + Y) * 1.8 + " " + ((Y - 50) * 0.1 + 30) + "% " + ((X - 50) * 0.1 + 50) + "%)");
    $('.card').css("color", "hsl(" + (X + Y) * 1.8 + " 66% 93%)");
    $("#DNAout u").css("border-color", "hsl(" + (X + Y) * 1.8 + " 44% 70%)");
    $("#DNAout em").css("background-color", "hsl(" + (X + Y) * 1.8 + " 30% 45%)");
    $("#DNAout i").css("background-color", "hsl(" + (X + Y) * 1.8 + " 33% 54%)");
}


// 面板
var chartDom = document.getElementById('panel');
var myChart = echarts.init(chartDom);

function setOptions(data, indicator) {
    return {
        // backgroundColor: '#161627',
        title: {
            // text: 'AQI - Radar',
            left: 'center',
            textStyle: {
                color: '#eee'
            }
        },
        radar: {
            indicator: indicator,
            shape: 'circle',
            radius: 60,
            splitNumber: 6,
            scale: false,// 是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。在双数值轴的散点图中比较有用。
            silent: true,
            axisName: {
                color: 'rgb(0,0,0)',
                fontSize: 12,
                fontWeight: 700,
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: [
                        'rgba(238, 197, 102, 0.0)',
                        'rgba(238, 197, 102, 0.0)',
                        'rgba(238, 197, 102, 0.0)',
                        'rgba(238, 197, 102, 0.0)',
                        'rgba(238, 197, 102, 0.0)',
                        'rgb(0,0,0)'
                    ].reverse()
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgb(0,0,0)'
                },
                symbol: 'none',
            }
        },
        series: [
            {
                type: 'radar',
                lineStyle: {
                    width: 1,
                    opacity: 0.6
                },
                data: [data],
                symbol: 'none',
                itemStyle: {
                    color: Character.panel_settings.color
                },
                areaStyle: {
                    opacity: 0.8
                }
            },
        ]
    };
}


