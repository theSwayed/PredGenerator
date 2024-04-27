function getDataWithScope(data, key, value) {
    return data.filter(item => item[key + "Max"] >= value && item[key + "Min"] <= value || item.required === 1)
}

function getDataUnderScope(data, key, value) {
    return data.filter(item => item[key] <= value || item.required === 1);
}


function getDataUpperScope(data, key, value) {
    return data.filter(item => item[key] >= value || item.required === 1)
}


function getDataExcept(data, key, value) {
    return data.filter(item => item[key] !== value)
}

function getTrans(data, name) {
    data = getDataFind(data, 'name', name);
    // console.log(data,name)
    if (typeof data[0].trans === 'string') return data[0].trans;
    else return name;
}

function makeTags(type, tags) {
    let data = [];
    for (let i in tags) {
        let tag = getTrans(db[type][tags[i]], Character[type][tags[i]]);
        data.push(tag)
    }
    return data;
}

function getDataRound(data, value = false) {
    let res = data[[randomInt(data.length)]];
    if (value) return res.name;
    return res;
}

function getDataFind(data, key, value) {
    return data.filter(item => item[key] === value);
}

function getDataInArray(data, key, value) {
    return data.filter(item => item[key].indexOf(value) !== -1 || item.required === 1)
}

function randomFromStrengthLevel(strength) {
    // 确保param在1到6之间
    param = Math.max(1, Math.min(6, (7 - strength)));

    // 根据参数调整最小值和最大值
    let minValue = 1;
    let maxValue = 100 - (param - 1) * 15; // 参数越小，最大值越接近1

    // 确保最大值不会小于最小值
    if (maxValue < minValue) {
        maxValue = minValue;
    }

    // 生成随机值
    const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    return randomValue;
}


//类型1：基本随机筛选
function BOXfilter1(DBbox) {
    var B_F1 = JSON.parse(DBbox);
    return B_F1[randomInt(B_F1.length)].name;
}

//类型2：LoLa坐标阈值范围，小于RF坐标
function BOXfilter2(DBbox) {
    if (Character.camp.index > 100) Character.camp.index = parseInt(Character.camp.index / 10)
    var B_F2 = (JSON.parse(DBbox).filter(
            item => item.required == 1 || item.power >= Character.power.strength.index - ZBYZ && item.power <= Character.power.strength.index + ZBYZ && item.region >= Character.region.index - ZBYZ && item.region <= Character.region.index + ZBYZ)
    ).filter(
        item2 => item2.required == 1 || item2.camp <= Character.camp.index
    );
    return B_F2[randomInt(B_F2.length)].name;
}


//类型4：全系参照，LoLa坐标阈值范围，大于Age坐标，小于RF坐标
function BOXfilter4(DBbox) {
    if (Character.camp.index > 100) Character.camp.index = parseInt(Character.camp.index / 10)
    var B_F4 = ((JSON.parse(DBbox)).filter(item3 => item3.required == 1 || item3.power == null && item3.region == null || item3.power >= Character.power.strength.index - ZBYZ && item3.power <= Character.power.strength.index + ZBYZ && item3.region >= Character.region.index - ZBYZ && item3.region <= Character.region.index + ZBYZ)).filter(item2 => item2.required == 1 || item2.Age >= Character.age || item2.camp <= Character.camp.index);
    return B_F4[randomInt(B_F4.length)].name;
}

//类型4：全系参照，LoLa坐标阈值范围，大于Age坐标，小于RF坐标
function getDataFromFilter4(DBbox) {
    if (Character.camp.index > 100) Character.camp.index = parseInt(Character.camp.index / 10)
    var B_F4 = ((JSON.parse(DBbox)).filter(item3 => item3.required == 1 || item3.power == null && item3.region == null || item3.power >= Character.power.strength.index - ZBYZ && item3.power <= Character.power.strength.index + ZBYZ && item3.region >= Character.region.index - ZBYZ && item3.region <= Character.region.index + ZBYZ)).filter(item2 => item2.required == 1 || item2.Age >= Character.age || item2.camp <= Character.camp.index);
    return B_F4[randomInt(B_F4.length)];
}


//类型5：根据年龄随机
function filterFromAge(DBbox) {
    var data = (JSON.parse(DBbox).filter(
            item => item.required == 1 || item.Age >= Character.age)// 获取小于这个年龄的内容
    );
    return data[randomInt(data.length)];
}

//类型6：根据阵营随机
function filterFromCamp(DBbox) {
    // 阵容决定？性格，态度，攻击目标
    var data = (JSON.parse(DBbox).filter(
            item => item.required == 1 || item.camp <= Character.camp.index)// 获取小于这个年龄的内容
    );
    return data[randomInt(data.length)].name;
}

//类型7：根据key value 随机
function filterFroCondition(DBbox, key, value) {
    var data = (JSON.parse(DBbox).filter(
            item => item.required === 1 || item[key] == value)// 获取小于这个年龄的内容
    );
    return data[randomInt(data.length)].name;
}


//随机计算，指定位数
function randomInt(num) {
    return parseInt(Math.random() * num);
}

//随机计算，指定位数
function randomIntRound(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//随机系数，值越大结果越大
function RandomPF(F, V) {
    return parseInt(Math.round((F * (V * 0.1)) * 100));
}

//随机系数，值越大结果越小
function RandomIF(F, V) {
    return parseInt(Math.round((F / (V * 0.1)) * 100));
}

// hsl转rgb
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// 专用，切割字符串用于拼接
function splitString(input) {
    // 匹配中文字符的正则表达式
    const chineseRegex = /[\u4E00-\u9FA5]/;

    let result = [];
    let chart = "";
    // 如果输入是中文，则拆分成1,2的形式
    if (chineseRegex.test(input)) {
        result.push(input.charAt(0));
        for (let i = 1; i < input.length; i++) chart += input.charAt(i);
        result.push(chart);
    } else {
        // 如果输入是英文，则拆分第一个单词
        let words = input.split(" ");
        result.push(words[0])
        for (let i = 1; i < words.length; i++) chart += words[i] + " ";
        result.push(chart);
    }
    return result;
}

/** 生成面板数值 */
function generatePanelNumber(type, param) {
    // 生成1到100的随机整数
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber === 0) randomNumber = 1;

    // 将1到100的范围按照参数值进行映射，使参数值越小，生成的随机数范围越小
    var scaledNumber = Math.floor(randomNumber * (param / 100));

    if (scaledNumber > 50) scaledNumber /= 2;
    scaledNumber = Math.ceil(scaledNumber / 10);
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

function hexToRgb(hex) {
    // 将十六进制颜色转换为RGB颜色值
    var r = parseInt(hex.substring(1, 3), 16);
    var g = parseInt(hex.substring(3, 5), 16);
    var b = parseInt(hex.substring(5, 7), 16);
    return {r: r, g: g, b: b};
}

function rgbToHex(r, g, b) {
    // 将RGB颜色值转换为十六进制颜色
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getComplementaryColor(hex) {
    var rgb = hexToRgb(hex);
    var complementaryRgb = {
        r: 255 - rgb.r,
        g: 255 - rgb.g,
        b: 255 - rgb.b
    };
    return rgbToHex(complementaryRgb.r, complementaryRgb.g, complementaryRgb.b);
}

function generateRandomHeight(age) {
    // 计算均值和标准差
    let mean = 160; // 平均身高
    let stdDev = 40; // 标准差

    // 根据年龄调整身高的均值和标准差
    let adjustedMean = mean + (30 - age) * 0.5; // 年龄越小，均值越低
    let adjustedStdDev = stdDev + (30 - age) * 0.1; // 年龄越小，标准差越低

    // 生成随机身高
    let height = Math.ceil(adjustedMean + (Math.random() * 2 - 1) * adjustedStdDev);
    return Math.max(heightMIN, Math.min(height, heightMAX));
}
