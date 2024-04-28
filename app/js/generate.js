function initPred() {
    Character = JSON.parse(localStorage.getItem('character'))
    // 设置名字
    setName();
    // 设置种族，兼容上级数据，链式操作
    setRegion();
    setBackground();
    setPanel();
}

function generate() {
    simpleGenerate();
    panelGenerate();
    tagGenerate();
}

function simpleGenerate() {
    //输出
    let DNA1html =
        `<p>一位有着<u>${Character.power.strength.name}</u>魔力，来自<u>${Character.region.faction.name}</u>，<u>${Character.region.country.name}</u>势力的<u>${Character.race.name}</u>${getCall()}。</p>
        <p>身高<u>${Character.body.height}</u>${Character.body.unit}，肤色<u>${Character.body.color}</u>，<u>${Character.body.cup}</u>，<u>${Character.body.type}</u>，有着一张<u>${Character.face.type}</u>。</p>
        <p>${getEyesStr()}<u>${Character.eyes.shape}</u>，<u>${Character.face.brow}</u>，目光<u>${Character.eyes.look}</u>。</p>
        <p><u>${Character.face.mouth}${Character.face.mouth_status}</u>，妆容<u>${Character.face.makeup}</u>。</p>
        <p>一头${getHairStr()}的<u>${Character.hair.length}${Character.hair.type}</u>梳成<u>${Character.hair.bangs}</u>的<u>${Character.hair.style}</u>。</p>
        <p>日常的打扮是${getOutwardStr()}</p>
        `
    let DNA2html = ` 
		<p>性格${getDispositionStr()}</p>
        <p>喜欢<u>${Character.disposition.hobby}</u>。</p>
		<p>天赋序列是<u>${Character.power.talent.name}，${Character.power.talent.desc}</u>。</p>
        <p>器魔是<u>${Character.weapon.demon.name}</u>，<u>${Character.weapon.demon.effects}</u>。</p>
        <p>更倾向于将<u>${Character.disposition.hunting}</u>视为自己的猎物。</p>    
`;
    if (Character.power.constitution.name) {
        DNA2html += `
        <p>拥有着名为<u>${Character.power.constitution.name}</u>的特殊体质。</p>
		<p>这种体质<u>${Character.power.constitution.pred}</u>。</p>
		<p>而一旦这种体质的拥有者成为了猎物，<u>${Character.power.constitution.prey}</u>。</p>`
    } else {
        DNA2html += "<p>无特殊体质，是一名普普通通的捕食者。</p>"
    }
    $("#screen-simple .desc1").html(DNA1html);
    $("#screen-simple .desc2").html(DNA2html);
}

function panelGenerate() {
    let connect = Character.disposition.but ? "但" : "又";
    let however = Character.disposition.however ? `，只不过${Character.disposition.however}` : "";
    let disposition = Character.disposition.name + connect + Character.disposition.desc + however;

    let eyes = "";
    if (Character.eyes.diff) {
        eyes = `${Character.eyes.color}、${Character.eyes.diff}异色`
    } else {
        eyes = Character.eyes.color
    }

    let hair = Character.hair.color;
    if (Character.hair.gradient) {// 渐变
        hair += " 渐变 " + Character.hair.gradient
    }
    if (Character.hair.highlight) {// 渐变
        hair += " 挑染 " + Character.hair.highlight
    }

    let wearing = [];
    for (let i in Character.outward[Character.outward.wearing_type]) {
        wearing.push(Character.outward[Character.outward.wearing_type][i])
    }
    let wearingStr = wearing.join('，')

    let accessories = Character.outward.accessories;
    let accessStr = [];
    if (accessories.length) {
        for (let i in accessories) {
            if (accessories[i].state.length)
                accessStr.push(accessories[i].state + accessories[i].name)
            else accessStr.push(accessories[i].name);
        }
        accessStr = accessStr.join("、")
    } else {
        accessStr = "无";
    }

    let DNA1html = `
        <div style="width: 26em;">
            <div style="display: inline-flex;width: 100%">
                <div>
                    <p>种族：${Character.race.name}</p>
                    <p>年龄：${Character.age}</p>
                    <p>身高：${Character.body.height}${Character.body.unit}</p>
                    <p>魔力量：${Character.power.strength.name}</p>
                </div>
                <div>
                    <p>地区：${Character.region.faction.name}</p>
                    <p>势力：${Character.region.country.name}</p>
                    <p>爱好：${Character.disposition.hobby}</p>
                    <p>狩猎对象：${Character.disposition.hunting}</p>
                </div>
            </div>
            <p>性格：${disposition}</p>
        </div>
        <br>
        <p>眼眉：${eyes}${Character.eyes.shape}，${Character.face.brow}，神色${Character.eyes.look}</p>
        <p>容貌：${Character.face.type}，${Character.face.mouth}，妆容${Character.face.makeup}</p>
        <p>发型：${hair}${Character.hair.length}${Character.hair.type} ${Character.hair.style}，${Character.hair.bangs}</p>
        <p>身材：肤色${Character.body.color}，${Character.body.type}</p>
        <p>日常穿搭：${wearingStr}</p>
        <p>喜欢的饰品：${accessStr}</p>
        <br>
        `
    if (Character.power.constitution.name) {
        DNA1html += `<p>特殊体质：${Character.power.constitution.name}</p>
        <p>作为捕食者：${Character.power.constitution.pred}</p>
        <p>作为猎物：${Character.power.constitution.prey}</p>`
    } else {
        DNA1html += `<p>特殊体质：无</p>`
    }
    DNA1html += `
        <p>天赋序列：${Character.power.talent.name}</p>
        <p>序列描述：${Character.power.talent.desc}</p>
        <p>器魔：${Character.weapon.demon.name}</p>
        <p>效果：${Character.weapon.demon.effects}</p>
        `
    $("#info-panel").html(DNA1html);
}

function tagGenerate() {
    let DNA1html = `
        <p>[身体:0],${getBodyTags()},</p>
        <p>[面部:0],${getFaceTags()},</p>
        <p>[眼睛:0],${getEyesTags()},</p>
        <p>[头发:0],${getHairTags()},</p>
        <p>[穿着:0],${getOutWardTags()},</p>
        <p>[饰品:0],${getAccessoriesTags()},</p>
        <p>[背景:0],${getBackgroundTags()},</p>
        <p>[姿势:0],${getPoseTags()},</p>
        <p>[角度:0],look at viewer,${getLensesTags()}</p>
        `
    $("#info-tag").html(DNA1html.replace(/,+/g, ","));
}

function getBodyTags() {
    let tags = [
        "1girl",
        "solo",
        "full body",
        getTrans(db.race[Character.region.faction.race_type], Character.race.name)// 种族形象
    ];
    let tagKeys = ["type", "color", "cup"];
    let bodyTags = makeTags('body', tagKeys)
    return tags.concat(bodyTags).join(",")
}

function getFaceTags() {
    let tags = makeTags('face', Object.keys(Character.face))
    return tags.join(",")
}

function getEyesTags() {
    let tags = [];
    let tagKeys = ["shape", "look"]
    tags = tags.concat(makeTags('eyes', tagKeys));
    if (Character.eyes.diff)
        tags.push("heterochromia");
    tags = tags.concat(makeTags('eyes', ["color"]));
    if (Character.eyes.diff) {
        tags.push(getTrans(db.eyes.color, Character.eyes.diff))
    }
    return tags.join(",")
}

function getHairTags() {
    let tags = [];
    let tagKeys = ["type", "length", "bangs", "style", "color"]
    tags = tags.concat(makeTags('hair', tagKeys));
    if (Character.hair.gradient) {// 渐变
        tags.push("gradient");
        tags.push(getTrans(db.hair.color, Character.hair.gradient))
    }
    if (Character.hair.gradient) {// 挑染
        tags.push("gradient");
        tags.push(getTrans(db.hair.color, Character.hair.gradient))
    }
    return tags.join(",")
}

function getOutWardTags() {
    let tags = [];
    if (Character.outward.wearing_type === 'crossDressing') {
        let dressing = Character.outward.crossDressing;
        for (const position in dressing) {
            tags.push(getTrans(db.outward.crossDressing, dressing[position]))
        }
    } else {
        let tagKeys = Object.keys(Character.outward[Character.outward.wearing_type])
        let data = [];
        for (let i in tagKeys) {
            let tag = getTrans(db.outward[tagKeys[i]], Character.outward[Character.outward.wearing_type][tagKeys[i]]);
            data.push(tag)
        }
        tags = tags.concat(data);
    }
    // 衣服的特殊状态
    let state_flag = randomIntRound(1, 10)
    if (state_flag >= 5) {
        tags.push(getDataRound(db.outward.state, 'trans'));
    }
    return tags.join(",")
}

function getAccessoriesTags() {
    let tags = [];
    let accessories = Character.outward.accessories;
    if (accessories.length) {
        for (let i in accessories) {
            let accTrans = getTrans(db.outward.accessories, accessories[i].name);
            if (accessories[i].state) {
                accTrans += " " + getTrans(db.outward.accessoriesState, accessories[i].state);
            }
            tags.push(accTrans);
        }
    }
    return tags.join(",")
}

function getBackgroundTags() {
    let tags = [];
    let tagKeys = ["environment", "scenes"]
    for (let i in tagKeys) {
        tags.push(getTrans(db.background[tagKeys[i]]))
    }
    return tags.join(",")
}

function getPoseTags() {
    let tags = [];
    let tagKeys = ["pose"]
    for (let i in tagKeys) {
        tags.push(getTrans(db.background[tagKeys[i]]))
    }
    return tags.join(",")
}

function getLensesTags() {
    let tags = [];
    let tagKeys = ["lenses",]
    for (let i in tagKeys) {
        tags.push(getTrans(db.background[tagKeys[i]]))
    }
    return tags.join(",")
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

function getDispositionStr() {
    let connect = Character.disposition.but ? " 但 " : " 又 "
    let however = Character.disposition.however ? `，只不过<u>${Character.disposition.however}</u>` : "";
    return `<u>${Character.disposition.name}</u>${connect}<u>${Character.disposition.desc}</u>${however}。`
}

// 渐变，应随Age增高而减少
function gradient() {
    let age = Character.age;
    if (age > 100) age = age / 10;
    if (randomInt(1000) <= RandomIF(H_B_CG[0], Character.age) || randomInt(1000) <= RandomPF(H_B_CG[1], Character.power.strength.index))
        return getDataRound(getDataExcept(db.hair.color, 'name', Character.hair.color), true);
    else
        return "";
}

// 挑染，应随Age增高而减少
function highlight() {
    let age = Character.age;
    if (age > 100) age = age / 10;
    if (randomInt(1000) <= RandomIF(H_B_CG[0], age) || randomInt(1000) <= RandomPF(H_B_CG[1], Character.power.strength.index))
        return getDataRound(getDataExcept(getDataExcept(db.hair.color, 'name', Character.hair.color), 'name', Character.hair.gradient), true);
    else
        return "";
}

function getOutwardStr() {
    let wearing = [];
    for (let i in Character.outward[Character.outward.wearing_type]) {
        wearing.push(`<u>${Character.outward[Character.outward.wearing_type][i]}</u>`)
    }
    wearing = wearing.join("、")

    let accessories = Character.outward.accessories;
    let accessStr = [];
    if (accessories.length) {
        wearing += "，喜欢";
        for (let i in accessories) {
            if (accessories[i].state.length)
                accessStr.push("<u>" + accessories[i].state + accessories[i].name + "</u>")
            else accessStr.push("<u>" + accessories[i].name + "</u>");
        }
        wearing += accessStr.join("、")
        wearing += "之类的饰品"
    }
    return wearing;
}

function getTallTag() {
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

/** 调试模式，自动生成 */
if (dev) $(document).ready(() => {
    $("#generate").click();
})
