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
    let faction = db.region.faction;
    faction = getDataRound(faction);

    Character.region.faction.id = faction.id;
    Character.region.faction.name = faction.name;

    let country = db.region.country;
    country = getDataFind(country, "faction", faction.name);
    country = getDataRound(country);
    Character.region.country.id = country.id;
    Character.region.country.name = country.name;
    // 设置种族，兼容上级数据，链式操作
    setRace(getDataRound(faction.raceType));
}


/** 根据地区设置种族 **/
function setRace(race_tag) {
    let race = db.race[race_tag];
    race = getDataRound(race);
	initPanel(race);
    Character.race.id = race.id;
    Character.race.name = race.name;
    Character.race.longevity = race.longevity;
    Character.race.size = race.size;
    Character.race.level = race.level;
    setStrength();// 力量体系
    setAge();// 根据种族设置年龄
    setFace();// 设置面孔
    setEyes();// 设置眼睛
    setHair();// 设置头发
    setBody();// 设置身体与身高
    setOutward();// 设置穿着
    setDisposition()// 设置性格
    setPower()// 设置体质序列
    setWeapon()// 设置器魔

}

/** 能量等级 */
function setStrength() {
    let strength = db.power.strength;
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
    Character.face.type = getDataRound(db.face.type, true);// 脸型
    Character.face.brow = getDataRound(db.face.brow, true);// 眉
    Character.face.makeup = getDataRound(db.face.makeup, true); // 妆容
    Character.face.mouth = getDataRound(db.face.mouth, true);// 嘴
    Character.face.mouth_status = getDataRound(db.face.mouthStatus, true);// 嘴状态
}

/** 眼睛 */
function setEyes() {
    Character.eyes.shape = getDataRound(db.eyes.shape, true);// 眼型
    Character.eyes.look = getDataRound(db.eyes.look, true);// 眼神，目光
    Character.eyes.color = getDataRound(db.eyes.color, true);// 瞳色
    if (Math.round((EYCL123 * (Character.power.strength.index * 0.1)) * 100) >= randomInt(1000))
        Character.eyes.diff = getDataRound(getDataExcept(db.eyes.color, 'name', Character.eyes.color), true);// 异瞳
}

/** 头发 */
function setHair() {
    let length = getDataRound(db.hair.length)
    let type = getDataUpperScope(db.hair.type, 'level', length.level);
    Character.hair.length = length.name;// 发长
    Character.hair.type = getDataRound(type, true);// 发形
    Character.hair.bangs = getDataRound(db.hair.bangs, true);// 刘海
    Character.hair.style = getDataRound(db.hair.style, true);// 发型
    Character.hair.color = getDataRound(db.hair.color, true);// 发色
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
    Character.body.color = getDataRound(db.body.color,true);// 肤色
    Character.body.type = getDataRound(db.body.type,true);// 体型
}

/** 设置服装 */
function setOutward() {
    let outward = db.outward;
    // 根据种族筛选出异装
    // 非异装种族随机出散装还是一体
    if (outward.crossRace.indexOf(Character.race.name) !== -1) {
        Character.outward.wearing_type = 'cross';
        // 特殊种族，特殊服装
        // 身体，手臂，腰带
        let cross = outward.crossDressing;

        let cross_body = getDataRound(getDataInArray(getDataFind(cross, 'position', "body"), 'race', Character.race.name));

        Character.outward.cross.body.name = cross_body.name;
        Character.outward.cross.body.trans = cross_body.trans;
    } else {
        let length = outward.jumpsuit.length + outward.top.length + outward.uniform.length;
        let tag = randomIntRound(1, length);
        if (tag > outward.jumpsuit.length + outward.top.length) {
            // 制服
            Character.outward.wearing_type = 'uniform';

            let key = tag - outward.jumpsuit.length - outward.top.length;
            let uniform = outward.uniform[key - 1];

            Character.outward.uniform.name = uniform.name;
            Character.outward.uniform.trans = uniform.trans;
        } else if (tag > outward.jumpsuit.length) {
            // diy
            let key = tag - outward.jumpsuit.length;
            let top = outward.top[key - 1];
            Character.outward.wearing_type = 'diy';
            let coat = getDataRound(outward.coat);
            let bottom = getDataRound(outward.bottom);
            let socks = getDataRound(getDataUnderScope(outward.socks, 'level', bottom.socks));
            let shoes = getDataRound(getDataUnderScope(outward.shoes, 'level', socks.level))

            Character.outward.diy.top.name = top.name;
            Character.outward.diy.top.trans = top.trans;

            Character.outward.diy.coat.name = coat.name;
            Character.outward.diy.coat.trans = coat.trans;

            Character.outward.diy.bottom.name = bottom.name;
            Character.outward.diy.bottom.trans = bottom.trans;

            Character.outward.diy.socks.name = socks.name;
            Character.outward.diy.socks.trans = socks.trans;

            Character.outward.diy.shoes.name = shoes.name;
            Character.outward.diy.shoes.trans = shoes.trans;
        } else {
            // 一体
            let jumpsuit = outward.jumpsuit[tag - 1];
            let socks = getDataRound(outward.socks);
            let shoes = getDataRound(getDataUnderScope(outward.shoes, 'level', jumpsuit.level))
            Character.outward.wearing_type = 'jumpsuit';

            Character.outward.jumpsuit.wearing.name = jumpsuit.name;
            Character.outward.jumpsuit.wearing.trans = jumpsuit.trans;

            Character.outward.jumpsuit.socks.name = socks.name;
            Character.outward.jumpsuit.socks.trans = socks.trans;

            Character.outward.jumpsuit.shoes.name = shoes.name;
            Character.outward.jumpsuit.shoes.trans = shoes.trans;
        }
    }

    // 饰品
    let tag = randomIntRound(0, 3)
    let accessories = [];
    let type = outward.accessoriesType.sort(() => Math.random() - 0.5);
    for (let i = 0; i < tag; i++) {
        let accessory = getDataRound(getDataFind(outward.accessories, 'type', type[i].type));
        let state = {};
        let state_tag = !randomIntRound(0, 1);
        if (state_tag) {
            let stateData = getDataRound(getDataFind(outward.accessoriesState, "type", type[i].type))
            if (typeof stateData !== 'undefined') state = {name: stateData.name, trans: stateData.trans}
        }
        accessories.push({name: accessory.name, trans: accessory.trans, state: state})
    }
    Character.outward.accessories = accessories;
}

/** 性格，爱好，取向 */
function setDisposition() {
    var dis_flag = randomInt(2);
    var desc_flag = randomInt(2);
    let disposition = db.disposition;
    Character.disposition.name = dis_flag === 0 ? getDataRound(disposition.good, true) : getDataRound(disposition.bad, true);// 性格
    Character.disposition.but = dis_flag !== desc_flag;// 又但
    Character.disposition.desc = desc_flag === 0 ? getDataRound(disposition.goodDesc, true) : getDataRound(disposition.badDesc, true);// 解释
    if (randomInt(100) <= 7) 
		Character.disposition.however = desc_flag === 0 ? getDataRound(disposition.goodHowever, true) : getDataRound(disposition.badHowever, true);// 只不过
	
	// 爱好目标
	Character.disposition.hobby = getDataRound(disposition.hobby, true);
	Character.disposition.hunting = getDataRound(disposition.huntingTargets, true);
}

function setPower() {
    let constitution = db.power.constitution;
    let talent = db.power.talent;
    let strength = Character.power.strength.level;

    // 设置体质
    constitution = getDataRound(constitution)
	initPanel(constitution)

    Character.power.constitution.name = constitution.name;
    Character.power.constitution.pred = constitution.pred;
    Character.power.constitution.prey = constitution.prey;

    // 天赋序列
    let flag = randomInt(1);
    if (!flag) talent = getDataUnderScope(talent, 'level', strength);
    else talent = getDataUpperScope(talent, 'level', strength)
    talent = getDataRound(talent);
	initPanel(talent)
    Character.power.talent.name = talent.name;
    Character.power.talent.desc = talent.desc;
}

/** 器魔 **/
function setWeapon(){
    let demon = db.weapon.demon;
    let effects = db.weapon.effects;
    let strength = Character.power.strength.level;
    demon = getDataRound(getDataUnderScope(demon, 'level', strength));
    effects = getDataRound(getDataUnderScope(effects, 'level', strength));
	Character.weapon.demon.name = demon.name;
	Character.weapon.demon.effects = effects.name;
}

/** 根据数据库初始化面板 */
function initPanel(data){
	let list = [ "appetite",
	    "capacity",
	    "hidden_rate",
	    "toughness",
	    "digest_speed",
	    "absorb_rate"]
	for(let key in data){
		if(list.indexOf(key) !== -1){
			// 这个数据里面有影响面板的因素，取最大值
			let value = 0;
			if(typeof data[key] == 'object'){
				value = randomIntRound(data[key][0],data[key][1]);
			}else{
				value = data[key];
			}
			Character.panel[key] = Math.max(value,Character.panel[key]);
		}
	}
}

function setPanel() {
    let data = [];
    let indicator = [];
    for (let i in Character.panel) {
        if (!Character.panel[i]) {
            Character.panel[i] = generatePanelNumber(i, Character.power.strength.index);
        }
        data.push(Character.panel[i])
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
function setBackground() {
	let X = Character.age;
	if (Character.age > 100) X = parseInt(Character.age / 10)
	else if (Character.age > 1000) X = parseInt(Character.age / 100)
	let Y = Character.region.index;
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
        title: {
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

/** 设置阵营 */
function setCamp() {
    Character.camp.index = randomIntRound(1, 100);

    let DBCampLeft = JSON.parse(localStorage.campLeft);
    let DBCampRight = JSON.parse(localStorage.campRight);
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
