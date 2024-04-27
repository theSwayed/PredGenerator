//-----------------------------------------------------------------------------
//  使用时请保留该信息，非常感谢
//-----------------------------------------------------------------------------
//  角色设定生成器
//  Character Generator
//
//  作者：熊豆(kumame)
//  站点：https://github.com/kumame/Tools
//-----------------------------------------------------------------------------

//数据版本，至少比当前版本+1，用于更新浏览器本地储存的数据。
const DBversion = 1;
const dev = 1;
//坐标阈值，影响选中点的范围容差，不建议过大也不建议小于5
var ZBYZ = 10;

//混血概率，0 为关闭
var hybrid = 70;
//允许混血的界限  根据力量来，只有强大力量才允许混血
var hybridRF = 80;
//允许混血的基底种族在数据库的位置
var Embryo = 1;

let ageMin = 13;
let ageMax = 29;
let longevityAgeMax = 2500;

//身高
var heightMIN = 133;
var heightMAX = 181;

//异色瞳概率，根据RF坐标增加，0为关闭
var EYCL123 = 0.1;

//发色渐变、挑染概率，（Character.age,power）根据Age减少或根据力量坐标增加，0为关闭
var H_B_CG = [3, 0.5];
/** 面板初始化 */
let chartDom;
let myChart;

/** 参数初始化 */
let Character = {
    name: '',
    age: 0,// 年龄
    camp: {// 阵营坐标
        index: 0,
        name: '',
        left: 0,
        right: 0,
    },
    power: {// 力量坐标
        strength: {
            index: 0,
            show: '',
            level: 'E',
        },
        constitution: {
            name: "",
            pred: "",
            prey: "",
        },
        talent: {
            name: "",
            desc: ""
        }
    },
    region: {// 区域坐标
        index: 0,
        faction: {
            id: 0,
            name: '',
            race_type: "",
        },
        country: {
            id: 0,
            name: '',
        }
    },
    race: {
        name: '',// 种族
        id: 0,
        size: 0,
        longevity: 0,
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
        cup: '',
    },
    outward: {
        wearing_type: 'jumpsuit',
        jumpsuit: {
            wearing: {
                name: "",
                trans: ""
            },
            socks: {
                name: "",
                trans: "",
            },
            shoes: {
                name: "",
                trans: "",
            }
        },
        diy: {
            top: {
                name: "",
                trans: "",
            },
            coat: {
                name: "",
                trans: "",
            },
            bottom: {
                name: "",
                trans: "",
            },
            socks: {
                name: "",
                trans: "",
            },
            shoes: {
                name: "",
                trans: "",
            }
        },
        uniform: {
            suit: {
                name: "",
                trans: "",
            }
        },
        cross: {
            body: {
                name: "",
                trans: "",
            }
        },
        accessories: []
    },
    disposition: {
        name: "",
        but: "",
        desc: "",
        however: "",
        hobby: "",
        hunting: "",
    },
    weapon: {
        demon: {
            name: "",
            effects: ""
        }
    },
    panel: {
        appetite: 0,// 食欲
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
