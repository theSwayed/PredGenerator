function initPred() {
    // 设置名字
    setName();
    // 设置种族，兼容上级数据，链式操作
    setRegion();

     setBackground();
    //
    setPanel();

}

function generate() {
    simpleGenerate();
    panelGenerate();
    // tagGenerate();
}

function simpleGenerate() {
    //输出
    let DNA1html =
        `<p>一位有着<u>${Character.power.strength.name}</u>魔力，来自<u>${Character.region.faction.name}</u>的<u>${Character.race.name}</u>${getCall()}。</p>
		<p>国籍是<u>${Character.region.country.name}</u>。</p>
        <p>身高<u>${Character.body.height}</u>${Character.body.unit}，肤色<u>${Character.body.color}</u>，<u>${Character.body.type}</u>，有着一张<u>${Character.face.type}</u>。</p>
        <p>${getEyesStr()}<u>${Character.eyes.shape}</u>，<u>${Character.face.brow}</u>，目光<u>${Character.eyes.look}</u>。</p>
        <p><u>${Character.face.mouth}${Character.face.mouth_status}</u>，妆容<u>${Character.face.makeup}</u>。</p>
        <p>一头${getHairStr()}的<u>${Character.hair.length}${Character.hair.type}</u>梳成<u>${Character.hair.bangs}</u>的<u>${Character.hair.style}</u>。</p>
        <p>喜欢的穿搭是</p>
        `
    let DNA2html = ` 
		<p>性格${getDispositionStr()}</p>
        <p>喜欢<u>${Character.disposition.hobby}</u>。</p>
		<p>天赋序列是<u>${Character.power.talent.name}，${Character.power.talent.desc}</u>。</p>
        <p>器魔是<u>${Character.weapon.demon.name}</u>，<u>${Character.weapon.demon.effects}</u>。</p>
        <p>更倾向于将<u>${Character.disposition.hunting}</u>视为自己的猎物。</p>
        <p>作为一名捕食者，拥有着名为<u>${Character.power.constitution.name}</u>的特殊体质。</p>
		<p>这种体质<u>${Character.power.constitution.pred}</u>。</p>
		<p>而一旦这种体质的拥有者成为了猎物，<u>${Character.power.constitution.prey}</u>。</p>
`;
    $("#screen-simple .desc1").html(DNA1html);
    $("#screen-simple .desc2").html(DNA2html);
}

function panelGenerate() {
	let connect = Character.disposition.but ? "但" : "又";
	let however = Character.disposition.however ? `，只不过${Character.disposition.however}`:"";
	let disposition = Character.disposition.name+connect+Character.disposition.desc+however;
	
	let eyes = "";
	if (Character.eyes.diff) {
	    eyes= `${Character.eyes.color}、${Character.eyes.diff}异色`
	} else {
	    eyes=  Character.eyes.color
	}
	
	let hair = Character.hair.color;
	if (Character.hair.gradient) {// 渐变
	    hair += " 渐变 " + Character.hair.gradient
	}
	if (Character.hair.highlight) {// 渐变
	    hair += " 挑染 " + Character.hair.highlight
	}
	
	let wearing = [];
	for(let i in Character.outward[Character.outward.wearing_type]){
		wearing.push(Character.outward[Character.outward.wearing_type][i].name)
	}
	wearingStr = wearing.join('，')
    let DNA1html = `
        <div style="width: 26em;">
            <div style="display: inline-flex;">
                <div>
                    <p>种族：${Character.race.name}</p>
                    <p>年龄：${Character.age}</p>
                    <p>身高：${Character.body.height}${Character.body.unit}</p>
                    <p>魔力量：${Character.power.strength.name}</p>
                </div>
                <div>
                    <p>地区：${Character.region.faction.name}</p>
                    <p>国籍：${Character.region.country.name}</p>
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
        <br>
        <p>体质：${Character.power.constitution.name}</p>
        <p>作为捕食者：${Character.power.constitution.pred}</p>
        <p>作为猎物：${Character.power.constitution.prey}</p>
        <p>天赋序列：${Character.power.talent.name}</p>
        <p>序列描述：${Character.power.talent.desc}</p>
        <p>器魔：${Character.weapon.demon.name}</p>
        <p>效果：${Character.weapon.demon.effects}</p>
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

function getDispositionStr(){
	let connect = Character.disposition.but ? " 但 " : " 又 "
	let however = Character.disposition.however ? `，只不过<u>${Character.disposition.however}</u>`:"";
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


/** 调试模式，自动生成 */
if (dev) $(document).ready(() => {
    $("#generate").click();
})
