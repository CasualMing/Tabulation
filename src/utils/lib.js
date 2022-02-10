/*
 * @Author: CasualMing
 * @Date: 2020-12-09 18:38:14
 * @LastEditTime: 2022-02-10 08:34:06
 * @Description: 提供项目中经常用到的公共函数
 */

// 获取url中的参数 
export function getUrlParams(url, key) {
    url = url || window.location.href;
    let regexP = /[^#&\?]+=[^#&\?]*/ig,
        res = {};
    let ms = url.match(regexP);
    if (ms) {
        for (let i = 0; i < ms.length; i++) {
            let arr = ms[i].split('=');
            res[arr[0]] = decodeURI(arr[1]);
        }
    }
    if (key) {
        return res[key];
    }
    return res;
}

// 格式化一个JSON对象
export function formatJsonObj(target) {
    const result = {};

    for (const attr in target) {
        if (!/^_\w+_$/.test(attr)) {
            let value = target[attr];

            switch (Object.prototype.toString.call(value)) {
                case "[object Function]":
                    continue;
                case "[object Object]":
                    value = formatJsonObj(value);
                    break;
                case "[object Array]":
                    value = value.map(e => {
                        if (Object.prototype.toString.call(e) == '[object Object]') {
                            return formatJsonObj(e);
                        } else {
                            return e;
                        }
                    });
                    break;
            }

            if (attr[0] == '_') {
                result[attr.substring(1)] = value;
            } else {
                result[attr] = value;
            }
        }
    }

    return result;
}

function formater(fmt, time) {
    let date = time || this;
    var showDayArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "E+": showDayArr[date.getDay()], //  周
        "D+": date.getDate(), // 日
        "H+": date.getHours(), //  小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), //  秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //  季度
        "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/i.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}


// 时间格式化
(Date).prototype.format = formater
    /**
     * 按照指定格式格式化时间
     * @param {String} formater 要格式的格式 默认 yyyy-mm-dd
     * @param {Date} t 要格式的时间，如果不传默认格式化当前时间
     * @param {Boolean} isDecimal  是否是十位
     *  dateFormater('YYYYMMDD') ==> 20200306
     *  dateFormater('YYMMDD') ==> "200306"
     */
export function dateFormat(t, format = 'YYYY-MM-DD', isDecimal = false) {
    // 是否是IE浏览器
    const isIE = "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style;
    const isNumber = getClass(t) === 'Number';
    const isString = getClass(t) === 'String';
    // const isDate = getClass(t) === 'Date';
    // 兼容IE 在进行字符串时间格式化的时候，避免出现NaN操作
    const num = isDecimal ?
        isNumber ?
        t * 1000 :
        t :
        t
    const tDate = isIE ?
        isString ?
        new Date(num.replaceAll('-', '/')) :
        new Date(num) :
        new Date(num);
    return formater(format, tDate)
}

// 获取当前函数的节流函数
export function throttle(fn, delay = 300) {
    let open = true;
    return function() {
        const args = arguments;
        if (open) {
            open = false;
            setTimeout(() => {
                fn.apply(this, args);
                open = true;
            }, delay);
        }
    }
}

// 获取当前函数的防抖函数
export function debounce(fn, delay = 400) {
    let timer = null;
    return function() {
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}

// 获取类型名称
export function getClass(target) {
    return Object.prototype.toString.call(target).match(/^\[object\s(.*)\]$/)[1];
}

// 数组去重
export function removedDuplicate(arr, key) {
    const newArr = [],
        tempArr = [];
    if (arr.length == 0) {
        return arr;
    } else {
        if (key) {
            for (let i = 0; i < arr.length; i++) {
                if (!tempArr[arr[i][key]]) {
                    newArr.push(arr[i]);
                    tempArr[arr[i][key]] = true;
                }
            }
            return newArr;
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (!tempArr[arr[i]]) {
                    newArr.push(arr[i]);
                    tempArr[arr[i]] = true;
                }
            }
            return newArr;
        }
    }
}

// 判断数组或者对象是否是空白
export function isEmpty(param) {
    const type = getClass(param);
    if (type === 'Array') {
        return param.filter((el) => {
            const type = getClass(el);
            const typeMap = new Map([
                ['String', el],
                ['Object', Object.keys(el).length],
                ['Array', isEmpty(el)],
            ]);
            return typeMap.get(type);
        }).length
    }
    if (type === 'Object') {
        return Object.keys(param).length
    }
    return false
}

/**
 * 深度克隆
 * @date 2021-03-31
 * @param {any} obj 需要克隆的值
 * @param {WeakMap} cache 防止循环引用
 * @returns {any}
 */
export function deepCopy(obj, cache = new WeakMap()) {
    if (!(obj instanceof Object)) return obj;
    // 防止循环引用
    if (cache.get(obj)) return cache.get(obj)
        // 支持函数
    if (obj instanceof Function) {
        return function() {
            return obj.apply(this, arguments)
        }
    }
    // 支持日期
    if (obj instanceof Date) return new Date(obj)
        // 支持正则对象
    if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)
        // 还可以增加其他对象，比如：Map, Set等，根据情况判断增加即可

    // 数组是 key 为数字素银的特殊对象
    const res = Array.isArray(obj) ? [] : {}
        // 缓存 copy 的对象，用于处理循环引用的情况
    cache.set(obj, res)

    Object.keys(obj).forEach((key) => {
        if (obj[key] instanceof Object) {
            res[key] = deepCopy(obj[key], cache)
        } else {
            res[key] = obj[key]
        }
    });
    return res
}

/**
 * @description 对应的元素滚动到顶部，带动画
 * @param {any} distance 每次滚动多少
 */
export function backTop(dom, distance = 50, top = 0) {
    let timer = null;
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn() {
        let oTop = dom.scrollTop;
        if (oTop > top) {
            dom.scrollTop = oTop - distance >= 0 ? oTop - distance : top;
            timer = requestAnimationFrame(fn);
        } else {
            cancelAnimationFrame(timer);
        }
    });
}