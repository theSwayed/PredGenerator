

//筛选器
//类型1：基本随机筛选
function BOXfilter1(DBbox) {
    var B_F1 = JSON.parse(DBbox);
    return B_F1[RandomInt(B_F1.length)].obj;
}

//类型2：LoLa坐标阈值范围，小于RF坐标
function BOXfilter2(DBbox) {
    if (Character.camp.index > 100) Character.camp.index = parseInt(Character.camp.index / 10)
    var B_F2 = (JSON.parse(DBbox).filter(
            item => item.Require == 1 || item.Power >= Character.power.index - ZBYZ && item.Power <= Character.power.index + ZBYZ && item.Region >= Character.region.index - ZBYZ && item.Region <= Character.region.index + ZBYZ)
    ).filter(
        item2 => item2.Require == 1 || item2.Camp <= Character.camp.index
    );
    return B_F2[RandomInt(B_F2.length)].obj;
}


//类型4：全系参照，LoLa坐标阈值范围，大于Age坐标，小于RF坐标
function BOXfilter4(DBbox) {
    if (Character.camp.index > 100) Character.camp.index = parseInt(Character.camp.index / 10)
    var B_F4 = ((JSON.parse(DBbox)).filter(item3 => item3.Require == 1 || item3.Power == null && item3.Region == null || item3.Power >= Character.power.index - ZBYZ && item3.Power <= Character.power.index + ZBYZ && item3.Region >= Character.region.index - ZBYZ && item3.Region <= Character.region.index + ZBYZ)).filter(item2 => item2.Require == 1 || item2.Age >= Character.age || item2.Camp <= Character.camp.index);
    return B_F4[RandomInt(B_F4.length)].obj;
}

//类型4：全系参照，LoLa坐标阈值范围，大于Age坐标，小于RF坐标
function getDataFromFilter4(DBbox) {
    if (Character.camp.index > 100) Character.camp.index = parseInt(Character.camp.index / 10)
    var B_F4 = ((JSON.parse(DBbox)).filter(item3 => item3.Require == 1 || item3.Power == null && item3.Region == null || item3.Power >= Character.power.index - ZBYZ && item3.Power <= Character.power.index + ZBYZ && item3.Region >= Character.region.index - ZBYZ && item3.Region <= Character.region.index + ZBYZ)).filter(item2 => item2.Require == 1 || item2.Age >= Character.age || item2.Camp <= Character.camp.index);
    return B_F4[RandomInt(B_F4.length)];
}


//类型5：根据年龄随机
function filterFromAge(DBbox) {
    var data = (JSON.parse(DBbox).filter(
            item => item.Require == 1 || item.Age >= Character.age)// 获取小于这个年龄的内容
    );
    return data[RandomInt(data.length)];
}

//类型6：根据阵营随机
function filterFromCamp(DBbox) {
    // 阵容决定？性格，态度，攻击目标
    var data = (JSON.parse(DBbox).filter(
            item => item.Require == 1 || item.Camp <= Character.camp.index)// 获取小于这个年龄的内容
    );
    return data[RandomInt(data.length)].obj;
}


//随机计算，指定位数
function RandomInt(num) {
    return parseInt(Math.random() * num);
}

//随机计算，指定位数
function RandomIntRound(min, max) {
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