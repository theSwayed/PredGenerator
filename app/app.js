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

function initPred() {
    let inputName = $('#CharacterName');
    let firstName = $('.Cname .first');
    let lastName = $('.Cname .last');
    Character.name = inputName.val() ? inputName.val() : "神秘人";
    let name = splitString(Character.name);
    firstName.html(name[0]);
    lastName.html("");
    for (let i = 1; i < name.length; i++) {
        if (name[i] === ',') lastName.append(" ");
        else lastName.append(name[i]);
    }

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
    if (Character.age > 100) X = parseInt(Character.age / 10)

    setBackground(X, Character.camp.index);

    setPanel();

}

function generate() {
    simpleGenerate();
    panelGenerate();
    tagGenerate();
}

var DBPower = JSON.parse(localStorage.power);
var DBRegion = JSON.parse(localStorage.region);
var DBRace = JSON.parse(localStorage.race);

function simpleGenerate() {
    //输出
    let DNA1html =
        `<p>一位有着<u>${Character.power.show}</u>魔力，来自<u>${Character.region.show}</u>的<u>${Character.race.main}</u>${getCall()}。</p>
        <p>身高<u>${Character.body.height}</u>${Character.body.unit}，肤色<u>${Character.body.color}</u>，<u>${Character.body.type}</u>，有着一张<u>${Character.face.type}</u>。</p>
        <p>${getEyesStr()}<u>${Character.eyes.shape}</u>，<u>${Character.face.brow}</u>，目光<u>${Character.eyes.look}</u>。</p>
        <p><u>${Character.face.mouth}${Character.face.mouth_status}</u>，妆容<u>${Character.face.makeup}</u>。</p>
        <p>一头${getHairStr()}的<u>${Character.hair.length}${Character.hair.type}</u>梳成<u>${Character.hair.bangs}</u>的<u>${Character.hair.style}</u>。</p>
        <p>身着<u>${Character.dress.clothing}</u>。</p>
        `
    let DNA2html = ` 
        <p>行为倾向于<u>${Character.camp.show}</u>，喜欢<u>${Character.soul.hobby}</u>。</p>
        <p>性格<u>${Character.soul.personal}</u>${Character.soul.connect}<u>${Character.soul.traits}</u>。</p>
        <p>更倾向于将<u>${Character.soul.hunting.target}</u>视为自己的猎物。</p>
        <p>天赋序列是<u>${Character.soul.skill.name} ${Character.soul.skill.desc}</u>。</p>
        <p>拥有器魔<u>${Character.dress.weapon.name}</u>，<u>${Character.dress.weapon.desc}</u>。</p>
`;
    $("#screen-simple .desc1").html(DNA1html);
    $("#screen-simple .desc2").html(DNA2html);
}

function panelGenerate() {
    let DNA1html = `
        <div style="width: 26em;">
            <div style="display: inline-flex;">
                <div>
                    <p>种族：${Character.race.main}</p>
                    <p>年龄：${Character.age}</p>
                    <p>身高：${Character.body.height}${Character.body.unit}</p>
                    <p>魔力量：${Character.power.show}</p>
                </div>
                <div>
                    <p>势力：${Character.region.show}</p>
                    <p>爱好：${Character.soul.hobby}</p>
                    <p>阵营：${Character.camp.show}</p>
                    <p>狩猎对象：${Character.soul.hunting.target}</p>
                </div>
            </div>
            <p>性格：${Character.soul.personal}${Character.soul.connect}${Character.soul.traits}</p>
        </div>
        <br>
        <p>眼眉：${getEyesStr()}${Character.eyes.shape}，${Character.face.brow}，神色${Character.eyes.look}</p>
        <p>容貌：${Character.face.type}，${Character.face.mouth}，妆容${Character.face.makeup}</p>
        <p>发型：${getHairStr()}${Character.hair.length}${Character.hair.type} ${Character.hair.style}，${Character.hair.bangs}</p>
        <p>身材：肤色${Character.body.color} ${Character.body.type}</p>
        <p>穿着：${Character.dress.clothing}</p>
        <br>
        <p>天赋序列：${Character.soul.skill.name}</p>
        <p>序列描述：${Character.soul.skill.desc}</p>
        <p>器魔：${Character.dress.weapon.name}</p>
        <p>效果：${Character.dress.weapon.desc}</p>
        `
    $("#info-panel").html(DNA1html);
}

function tagGenerate() {
    let DNA1html = `
        <p>[主体:0],1girl,${Character.race.main},${tagBody()},</p>
        <p>[面部:0],${Character.face.type},${Character.face.brow},${Character.face.mouth},妆容${Character.face.makeup},</p>
        <p>[眼睛:0],${getEyesStr()}眼睛,${Character.eyes.shape},${Character.face.brow},${Character.eyes.look},</p>
        <p>[身材:0],皮肤${Character.body.color},体型${Character.body.type},D cup,</p>
        <p>[穿着:0],${Character.dress.clothing},</p>
        <p>[背景:0],${tagBackground()},</p>
        <p>[动作:0],${tagPose()},</p>
        <p>[角度:0],look at viewer,</p>
        `
    $("#info-tag").html(DNA1html);
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

// 随机年龄
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
        if (i === 0 ? Character.region.index <= DBRegion[i].LL : Character.region.index > DBRegion[i - 1].LL && Character.region.index <= DBRegion[i].LL) {
            Character.region.show = DBRegion[i].obj;
            Character.region.id = DBRegion[i].id;
        }
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
        if (Character.race_mix.main === '巨灵族') {
            Character.race_mix.mix_gant = 1;
        }
        Character.race_mix.point = RandomIntRound(10, 50)
    }
}

// 身高
function setBody() {
    Character.body.height = generateRandomHeight(Character.age);
    if (Character.race.main !== '巨灵族')
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
    Character.panel.appetite = 0;
    Character.panel.toughness = 0;
    Character.panel.capacity = 0;
    Character.panel.absorb_rate = 0;
    Character.panel.hidden_rate = 0;
    switch (Character.soul.hunting.target) {
        case "巨灵族":
            Character.panel.capacity = RandomIntRound(4, 5);
            Character.panel.hidden_rate = RandomIntRound(3, 5);
            break;
        case "龙族":
            Character.panel.capacity = RandomIntRound(3, 5);
            Character.panel.hidden_rate = RandomIntRound(2, 5);
            break;
    }
    switch (Character.soul.skill.name) {
        case "生物压缩":
            Character.panel.capacity = Math.max(Character.panel.capacity, 5);
            Character.panel.hidden_rate = Math.max(Character.panel.hidden_rate, 5);
            break;
        case "巨大化":
            Character.panel.capacity = Math.max(Character.panel.hidden_rate, 5);
            Character.panel.hidden_rate = Math.max(Character.panel.hidden_rate, 5);
            break;
        case "饕餮":
            Character.panel.capacity = Math.max(Character.panel.hidden_rate, 6);
            Character.panel.hidden_rate = Math.max(Character.panel.hidden_rate, 6);
            break;
        case "心如止水":
            Character.panel.toughness = Math.max(Character.panel.hidden_rate, 5);
            break;
        case "负重者":
            Character.panel.toughness = Math.max(Character.panel.hidden_rate, 5);

            break;
        case "捕食者":
            Character.panel.digest_speed = Math.max(Character.panel.hidden_rate, 5);
            break;
        case "超负荷":
            Character.panel.digest_speed = Math.max(Character.panel.hidden_rate, 5);
            Character.panel.toughness = Math.max(Character.panel.hidden_rate, 5);
            Character.panel.capacity = Math.max(Character.panel.hidden_rate, 5);
            Character.panel.hidden_rate = Math.max(Character.panel.hidden_rate, 5);
            break;
        case "钢铁武装":
            Character.panel.toughness = 5;
            break;
    }

    let data = [];
    let indicator = [];
    for (let i in Character.panel) {
        if (!Character.panel[i]) {
            Character.panel[i] = generatePanelNumber(i, Character.power.index);
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

//修改生成颜色
function setBackground(X, Y) {
    let background_color = hslToRgb((X + Y) * 1.8 / 360, +((Y - 50) * 0.1 + 30) / 100, ((X - 50) * 0.1 + 50) / 100);
    Character.panel_settings.color = background_color;
    $('.bg_card').css("background-color", background_color);
    $('.card').css("color", "hsl(" + (X + Y) * 1.8 + " 66% 93%)");
    $("#screen u").css("border-color", "hsl(" + (X + Y) * 1.8 + " 44% 70%)");
    $("#screen em").css("background-color", "hsl(" + (X + Y) * 1.8 + " 30% 45%)");
    $("#screen i").css("background-color", "hsl(" + (X + Y) * 1.8 + " 33% 54%)");

    let complementaryColor = getComplementaryColor(background_color);
    $("#screen-panel").css('background', 'linear-gradient(to top right,' + background_color + ',' + complementaryColor + ')')
}

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
            radius: 71.5,
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
                show: false,
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

function tagBody() {
    let type = "";
    let height = Character.body.height;
    if (Character.body.unit === "M") height *= 100;
    if (height > 200) {
        type = "giantess";
    } else if (height > 175) {
        type = "tall";
    } else if (height > 160) {
        type = "normal height";
    } else if (height > 150) {
        type = "short height";
    } else {
        type = "loli, petite"
    }
    return type;
}


function tagPose() {
    return BOXfilter1(localStorage.pose);// 姿势
}


function tagBackground() {
    let baseBackground = BOXfilter1(localStorage.baseBackground);// 背景
    let regionBackground = filterFroCondition(localStorage.regionBackground, 'region', Character.region.id);// 背景
    return baseBackground + "," + regionBackground;
}

$(document).ready(function () {
    $("#generate").click();
})
