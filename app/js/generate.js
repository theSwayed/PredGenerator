function initPred() {
    // 设置名字
    setName();
    // 设置种族，兼容上级数据，链式操作
    setRegion();

    // setAge();// 设置年龄
    //
    // setCamp();// 设置阵营
    // setRegion();// 设置区域
    //
    // // 设置身体
    // setBody();
    // // 设置脸部
    // setFace();
    // // 设置灵魂
    // setSoul();
    // // 设置
    // setDress();
    //
    // let X = Character.age;
    // if (Character.age > 100) X = parseInt(Character.age / 10)
    //
    // setBackground(X, Character.camp.index);
    //
    // setPanel();

}

function generate() {
    // simpleGenerate();
    // panelGenerate();
    // tagGenerate();
}

function simpleGenerate() {
    //输出
    let DNA1html =
        `<p>一位有着<u>${Character.power.name}</u>魔力，来自<u>${Character.region.show}</u>的<u>${Character.race.name}</u>${getCall()}。</p>
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
        <p>天赋序列是<u>${Character.soul.skill.name}，${Character.soul.skill.desc}</u>。</p>
        <p>器魔是<u>${Character.dress.weapon.name}</u>，<u>${Character.dress.weapon.desc}</u>。</p>
`;
    $("#screen-simple .desc1").html(DNA1html);
    $("#screen-simple .desc2").html(DNA2html);
}

function panelGenerate() {
    let DNA1html = `
        <div style="width: 26em;">
            <div style="display: inline-flex;">
                <div>
                    <p>种族：${Character.race.name}</p>
                    <p>年龄：${Character.age}</p>
                    <p>身高：${Character.body.height}${Character.body.unit}</p>
                    <p>魔力量：${Character.power.name}</p>
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
        <p>[主体:0],1girl,solo,full body,${Character.race.name},${tagBody()},</p>
        <p>[面部:0],${Character.face.type},${Character.face.brow},${Character.face.mouth},妆容${Character.face.makeup},</p>
        <p>[眼睛:0],${getEyesStr()}眼睛,${Character.eyes.shape},${Character.face.brow},${Character.eyes.look},</p>
        <p>[身材:0],皮肤${Character.body.color},体型${Character.body.type},中等胸部,</p>
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

// 渐变，应随Age增高而减少
function gradient() {
    let age = Character.age;
    if (age > 100) age = age / 10;
    if (RandomInt(1000) <= RandomIF(H_B_CG[0], Character.age) || RandomInt(1000) <= RandomPF(H_B_CG[1], Character.power.strength.index))
        return getDataRound(getDataExcept(getStorage('hair.color'), 'name', Character.hair.color), true);
    else
        return "";
}

// 挑染，应随Age增高而减少
function highlight() {
    let age = Character.age;
    if (age > 100) age = age / 10;
    if (RandomInt(1000) <= RandomIF(H_B_CG[0], age) || RandomInt(1000) <= RandomPF(H_B_CG[1], Character.power.strength.index))
        return getDataRound(getDataExcept(getDataExcept(getStorage('hair.color'), 'name', Character.hair.color), 'name', Character.hair.gradient), true);
    else
        return "";
}


/** 调试模式，自动生成 */
if (dev) $("#generate").click();
