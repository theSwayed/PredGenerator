/** 设置名字 */
function setName() {
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
}


/** 设置地区，势力，根据地区确定种族，根据种族的天赋上限设置力量等级 */
function setRegion() {
    Character.region.index = randomIntRound(1, 100);
    let faction = getStorage("region.faction");
    faction = getDataRound(faction);

    Character.region.faction.id = faction.id;
    Character.region.faction.name = faction.name;

    let country = getStorage("region.country");
    country = getDataFind(country, "faction", faction.name);
    country = getDataRound(country);
    Character.region.country.id = country.id;
    Character.region.country.name = country.name;
    // 设置种族，兼容上级数据，链式操作
    setRace(getDataRound(faction.raceType));
}


/** 根据地区设置种族 **/
function setRace(race_tag) {
    let race = getStorage('race.' + race_tag);
    race = getDataRound(race);
    Character.race.id = race.id;
    Character.race.name = race.name;
    Character.race.longevity = race.longevity;
    Character.race.size = race.size;
    Character.race.level = race.level;
    setStrength();
    setAge();
    setFace();
    setEyes();
    setHair();
    setBody();

}

/** 能量等级 */
function setStrength() {
    let strength = getStorage('power.strength');
    strength = getDataUnderScope(strength, 'level', Character.race.level);
    strength = getDataRound(strength);
    Character.power.strength.index = randomIntRound(strength.energyMin, strength.energyMax);
    Character.power.strength.name = strength.name;
    Character.power.strength.level = strength.level;
}

/** 随机年龄 */
function setAge() {
    let longevity = Character.race.longevity;
    let max = ageMax;
    if (longevity) max = longevityAgeMax;
    Character.age = randomIntRound(ageMin, max);
}


/** 面部 */
function setFace() {
    Character.face.type = getDataRound(getStorage('face.type'), true);// 脸型
    Character.face.brow = getDataRound(getStorage('face.brow'), true);// 眉
    Character.face.makeup = getDataRound(getStorage('face.makeup'), true); // 妆容
    Character.face.mouth = getDataRound(getStorage('face.mouth'), true);// 嘴
    Character.face.mouth_status = getDataRound(getStorage('face.mouthStatus'), true);// 嘴状态
}

/** 眼睛 */
function setEyes() {
    Character.eyes.shape = getDataRound(getStorage('eyes.shape'), true);// 眼型
    Character.eyes.look = getDataRound(getStorage('eyes.look'), true);// 眼神，目光
    Character.eyes.color = getDataRound(getStorage('eyes.color'), true);// 瞳色
    if (Math.round((EYCL123 * (Character.power.strength.index * 0.1)) * 100) >= RandomInt(1000))
        Character.eyes.diff = getDataRound(getDataExcept(getStorage('eyes.color'), 'name', Character.eyes.color), true);// 异瞳
}

/** 头发 */
function setHair() {
    let length = getDataRound(getStorage('hair.length'))
    let type = getDataUpperScope(getStorage('hair.type'), 'level', length.level);
    Character.hair.length = length.name;// 发长
    Character.hair.type = getDataRound(type, true);// 发形
    Character.hair.bangs = getDataRound(getStorage('hair.bangs'), true);// 刘海
    Character.hair.style = getDataRound(getStorage('hair.style'), true);// 发型
    Character.hair.color = getDataRound(getStorage('hair.color'), true);// 发色
    Character.hair.gradient = gradient();// 渐变
    Character.hair.highlight = highlight();// 挑染
}

/** 设置身高和单位，以及身体特征 */
function setBody() {
    Character.body.height = generateRandomHeight(Character.age);
    Character.body.unit = "Cm";
    if (Character.race.size === 'huge') {
        Character.body.unit = "M";
        Character.body.height /= 10;
    } else if (Character.race.size === 'mini') Character.body.height /= 10;
    Character.body.color = getDataRound(getStorage('body.color'));// 肤色
    Character.body.type = getDataRound(getStorage('body.type'));// 体型
}

function setOutward() {
    // 根据种族筛选出异装
    // 非异装种族随机出散装还是一体
    let crossRace = getStorage('outward.crossRace');
    if (crossRace.indexOf(Character.race.name) !== -1) {
        // 特殊种族，特殊服装
    } else {
        let tag = randomIntRound(1, 10);
        if (tag >= 7) {
            // 一体
            let jumpsuit = getStorage('outward.jumpsuit');
        } else {
            // 散装
            let top = getStorage('outward.top')
            let coat = getStorage('outward.coat')
            let bottom = getStorage('outward.bottom')
        }
    }


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
    Character.soul.skill.name = data.name;
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
    Character.dress.weapon.name = weapon.name;
    Character.dress.weapon.desc = weapon_effects.name;
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
            Character.panel.capacity = randomIntRound(4, 5);
            Character.panel.hidden_rate = randomIntRound(3, 5);
            break;
        case "龙族":
            Character.panel.capacity = randomIntRound(3, 5);
            Character.panel.hidden_rate = randomIntRound(2, 5);
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
            Character.panel[i] = generatePanelNumber(i, Character.power.strength.index);
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


/** 设置阵营 */
function setCamp() {
    Character.camp.index = randomIntRound(1, 100);

    let DBCampLeft = JSON.parse(localStorage.campLeft);
    let DBCampRight = JSON.parse(localStorage.campRight);
    let left = '';
    let right = '';
    let campLeftData = DBCampLeft.find(camp => camp.LL <= Character.camp.index);
    let campRightData = DBCampRight.find(camp => camp.LL <= randomIntRound(1, 100));
    left = campLeftData.name;
    right = campRightData.name;

    if (left === '中立' && right === '中立')
        Character.camp.show = "绝对中立";
    else if (left === '均衡' || right === '均衡')
        Character.camp.show = "均衡";
    else Character.camp.show = left + right;

    Character.camp.left = campLeftData.LL;
    Character.camp.right = campRightData.LL;
}
