import _ from 'lodash';
export function isPromise(value) {
    if (value !== null && typeof value === 'object') {
        return value.promise && typeof value.promise.then === 'function';
    }
}

export function addEvent(obj, type, fn) {
    if (obj.attachEvent) {
        obj['e' + type + fn] = fn;
        obj[type + fn] = function () {
            obj['e' + type + fn](window.event);
        };
        obj.attachEvent('on' + type, obj[type + fn]);
    } else
        obj.addEventListener(type, fn, false);
}

export function removeEvent(obj, type, fn) {
    if (obj.detachEvent) {
        obj.detachEvent('on' + type, obj[type + fn]);
        obj[type + fn] = null;
    } else
        obj.removeEventListener(type, fn, false);
}

export function isScroll(el) {
    // test targets
    var elems = el ? [el] : [document.documentElement, document.body];
    var scrollX = false, scrollY = false;
    for (var i = 0; i < elems.length; i++) {
        var o = elems[i];
        // test horizontal
        var sl = o.scrollLeft;
        o.scrollLeft += (sl > 0) ? -1 : 1;
        o.scrollLeft !== sl && (scrollX = scrollX || true);
        o.scrollLeft = sl;
        // test vertical
        var st = o.scrollTop;
        o.scrollTop += (st > 0) ? -1 : 1;
        o.scrollTop !== st && (scrollY = scrollY || true);
        o.scrollTop = st;
    }
    // ret
    return {
        scrollX: scrollX,
        scrollY: scrollY
    };
}

export function reachBottom(inHeight) {
    if (window.scrollY > 0 && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - (inHeight || 0)) {
        return true;
    }
    return false;
}

/**
 * @description 占位符格式化
 * @param {String} str 需要替换的模板
 * @param {Object} params 参数
 * @param {Boolean} isEncode 是否编码
 * @eg demo('http://www.baidu.com?name={name}&age={age}&chanelid={chanelid}',{name:'demo',age:23,chanelid:100},false)
 * @return {String} str 返回结果 http://www.baidu.com?name=demo&age=23&chanelid=100
 */
export function strFormat(str, params, isEncode = false) {
    if (typeof params == 'object') {
        for (var key in params) {
            if (params[key] == undefined || params[key] == null || params[key] == 'undefined' || params[key] == 'null') {
                params[key] = '';
            }
            str = str.replace(new RegExp('\\{' + key + '\\}', 'ig'), isEncode ? encodeURIComponent(params[key]) : params[key]);
        }
    }
    return str.replace(/\{\w*\}/ig, '');
}

export function dateFormat(date, format, defaultText) {
    format = format || 'yyyy-MM-dd hh:mm';
    if (!date) {
        return defaultText;
    }

    if (!isNaN(date)) {
        date = new Date(date - 0);
    }

    if (date == 'Invalid Date') {
        return defaultText;
    }

    var o = {
        'M+': date.getMonth() + 1, //month
        'd+': date.getDate(), //day
        'h+': date.getHours(), //hour
        'm+': date.getMinutes(), //minute
        's+': date.getSeconds(), //second
        'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
        'S': date.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
}

/*
 format:￥
 digit: 位数 -1为自动位数,默认为-1
 */
export function moneyFormat(money, format, digit = 0) {

    money = numberFormat(new Number(money / 100).toFixed(3), digit);

    if (format) {
        return format + money;
    } else {
        return money;
    }
}

/*
 * numberFormat(s,type)
 * 功能：金额按千位逗号分割
 * 参数：s，需要格式化的金额数值.
 * 参数：type,判断格式化后的金额是否需要小数位.
 * 返回：返回格式化后的数值字符串.
 */
export function numberFormat(s, type) {
    if (/[^0-9\.]/.test(s))
        return '0';
    if (s == null || s == '')
        return '0';
    s = s.toString().replace(/^(\d*)$/, '$1.');
    s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1');
    s = s.replace('.', ',');
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
        s = s.replace(re, '$1,$2');
    s = s.replace(/,(\d\d)$/, '.$1');
    if (type == 0) {// 不带小数位(默认是有小数位)
        var a = s.split('.');
        if (a[1] == '00') {
            s = a[0];
        }
    }
    return s;
}

/**
 * @description 判断变量是否存在,或者是否以某种类型存在
 * @param {object} o  判断变量是否存在
 * @param {object} type 数据类型  Number,Boolean等
 * @return {Boolean} nResult 返回结果 true或者false
 */
export function exists(o, type) {
    return o != undefined && o !== null && (type ? o.constructor == type : true);
}

/**
 * @description 把任意类型转成Boolean
 * @param {object} o  任意对象
 * @return {Boolean} nResult 返回结果 true或者false
 */
export function parseBoolean(o) {
    var flag = !!o;
    return (flag && typeof(o) == 'string' && (o
        .toLowerCase() == 'false' || o.toLowerCase() == 'null' || o.toLowerCase() == 'undefined' || o == '0')) ? false : flag;
}

// 把boolean类型转换为字符串
export function booleanToString(value, caseType) {
    return parseBoolean(value).toString()[caseType == 'upper' ? 'toUpperCase' : 'toLowerCase']();
}

/**
 * @description 把字符串自动转换成它原来的类型
 * @param val o  任意对象
 * @return val any
 */
export function parseAny(val) {
    if (typeof val == 'string') {
        if (val != '' && !isNaN(val) && val < 2147483647) {
            val = val - 0;
        } else if (val.toLowerCase() == 'true') {
            val = true;
        } else if (val.toLowerCase() == 'false') {
            val = false;
        }
    }
    return val;
}

/**
 * @description 将?key1=value1&key2=value2&...转换成一个对象{key1:value1,key2:value2....}
 * @param {String} string  String字符串
 * @return {Object} obj 返回结果 {key1:value1,key2:value2....}
 */
export function parseParam(str) {
    var obj = {};
    if (str == undefined || str == null) {
        return obj;
    }

    if (typeof str == 'object') {
        return str;
    }

    if (typeof str == 'string') {
        str = decodeURIComponent(str);
    }

    //踢出前缀#或者？
    str = str.replace(/^[\?\#]/, '');
    //分割参数
    var params = str.split('&');

    for (var i = 0; i < params.length; i++) {
        var item = params[i].split('=');
        var key = item[0];
        var val = item[1];

        if (!key) {
            continue;
        }

        //类型转换
        if (val == undefined) {
            val = true;
        } else {
            val = parseAny(val);
        }
        obj[key] = val;
    }
    return obj;
}

// 获取安全的值,如果val不存在,则返回默认值
export function getSafeValue(val, defaultVal) {
    defaultVal = exists(defaultVal) ? defaultVal : '-';
    return exists(val) ? val : defaultVal;
}

// 获取排序值
export function getOrderValue(val) {
    if (!val) {
        return '';
    }
    if (val == 'ascend') {
        return 'asc';
    }
    if (val == 'descend') {
        return 'desc';
    }
    return val;
}

// 返回图片真实大小
export function imgReady(src, ready) {
    var image = new Image();
    image.src = src + '?_=' + new Date().getTime();

    image.onload = function () {
        ready(image.width, image.height);
    };
}

// 计算宽高比例
export function gcd(w, h) {
    var n = _gcd(w, h);
    return {
        w: w / n,
        h: h / n,
    };
    function _gcd(w, h) {
        if (w % h) {
            return _gcd(h, w % h);
        } else {
            return h;
        }
    }
}

export function transformArray(items) {
    let tempArray = [];
    for (let key in items) {
        tempArray[tempArray.length] = key;
    }
    tempArray.sort().reverse();
    let response = [];
    for (let key in tempArray) {
        let obj = {
            time: tempArray[key],
            response: items[tempArray[key]]
        };
        response.push(obj);
    }
    return response;
}


// 全局锁
let isLock = false;
export function lock(callback, autoUnLock) {
    if (!isLock) {
        if (typeof callback == 'function') {
            isLock = true;
            callback();
            if (autoUnLock) {
                setTimeout(function () {
                    isLock = false;
                }, 400);
            }
        }
    }
}

// 全局解锁
export function unLock() {
    isLock = false;
}
//计算图片的占位位置
export function autoSizePic(imgD, W, H, M) {
    // if (typeof (imgD) != 'object" && typeof (imgD) == "string") {
    //     imgD = document.getElementById(imgD);
    // }
    var tImg = new Image();
    tImg.src = imgD.src;
    var w = tImg.width;
    var h = tImg.height;
    var wn = 0, hn = 0;
    if (w > 0 && h > 0 && W > 0 && H > 0) {
        if (w / h >= W / H) {
            if (w > W) {
                wn = W;
                hn = (h * W) / w;
            }
            else {
                wn = w;
                hn = h;
            }
        }
        else {
            if (h > H) {
                wn = (w * H) / h;
                hn = H;
            }
            else {
                wn = w;
                hn = h;
            }
        }
        if (typeof M == 'undefined') {
            imgD.style.marginTop = (H - hn) / 2 + 'px';
        } else if (M > -1) {
            imgD.style.marginTop = M + (H - hn) / 2 + 'px';
            imgD.style.marginLeft = M + (W - wn) / 2 + 'px';
        }
        imgD.style.width = wn + 'px';
        imgD.style.height = hn + 'px';
    }
    return imgD;
}


/**
 * 创建一个命名空间，创建的命名空间将会在 顶级 根命名空间下。
 * String comboObject
 * comboObject(target, name, val);
 * 组合对象:
 * comboObject(obj, 'wx.name', '标题');
 */
export function comboObject(target, key, val) {
    let spKeys = key.split('.');
    let origin = target;
    for (let i = 0, pl = spKeys.length; i < pl; ++i) {
        if (i == pl - 1 && 'undefined' != typeof val) {
            target = target[spKeys[i]] = val;
        } else {
            target = target[spKeys[i]] = target[spKeys[i]] || {};
        }
    }
    return origin;
}

/**
 * 获取x.x.x对象
 * String getObject
 * comboObject(target, key);
 * 组合对象:
 * getObject({a: {b: 'hello'}}, 'a.b'); // hello
 */
export function getObject(target, key) {
    let spKeys = key.split('.');
    for (let i = 0, pl = spKeys.length; i < pl; ++i) {
        if (typeof target[spKeys[i]] !== 'undefined') {
            target = target[spKeys[i]];
        } else {
            target = null;
        }
    }
    return target;
}


// 把对象树扁平化转成map
export function tree2map(tree, convert) {
    var map = {};

    var dig = function (path, node) {
        var k, v, cPath, cKey;
        for (k in node) {
            v = node[k];
            cPath = path.concat([k]);
            if (_.isPlainObject(v) && !_.isEmpty(v)) {
                // 对象
                dig(cPath, v);
            } else {
                cKey = cPath.join('.');
                map[cKey] = _.isFunction(convert) ? convert(cKey, v) : v;
            }
        }
    };
    dig([], tree);
    return map;
}

// tree2map({},'', data);
// export function tree2map(result, path, node) {
//     if (_.isPlainObject(node) && !_.isEmpty(node)) {
//         for (var key in node) {
//             tree2map(result, path + (path == '' ? '' : '.') + key, node[key]);
//         }
//     } else {
//         result[path] = node;
//     }
//     return result;
// }


/**
 * 将url链接进行序列化
 */

export function urlSerialization(data) {
    let arr = [];
    let str = '';
    for (var i in data) {
        if (!data[i] === '' || data[i]) {
            arr.push(i + '=' + data[i]);
        }
    }
    str = arr.join('&');
    return str;
}

export function getAPIStatus(DEFAULT) {
    let SUCCESS = DEFAULT + '_SUCCESS';
    let FAILURE = DEFAULT + '_FAILURE';
    let PENDING = DEFAULT + '_PENDING';
    return {
        DEFAULT,
        SUCCESS,
        FAILURE,
        PENDING
    };
}

// 去前后空格
export function trim(string) {
    return string.replace(/(^\s*)|(\s*$)/g, '');
}

// 轮询
export function Polling(handelCallback, doneCallback) {
    let count = 0;
    let handelCall = handelCallback;
    let doneCall = doneCallback;

    return function (params, t) {
        if (t) {
            count = t;
        }
        setTimeout(() => {
            if (params) {
                handelCall(params);
            } else {
                handelCall();
            }
            count++;
        }, 3000);

        if (count >= 30) {
            doneCall();
        }
    };
}

function appendParam(url, key, val) {
    var paths = url.split('#');
    var query = paths[0] || '';
    var hash = paths[1] || '';
    var split;
    if (paths.length > 1) {
        split = hash.indexOf('?') > -1 ? '&' : '?';
    } else {
        split = query.indexOf('?') > -1 ? '&' : '?';
    }

    return url + split + key + '=' + encodeURIComponent(val);
}

export function redirect(url, target, onClose) {
    if (target == '_blank') {
        var hasLoop = _.isFunction(onClose);
        var win = window.open(appendParam(url, 'loop', 'true'));
        if (win) {
            if (hasLoop) {
                var loop = setInterval(function () {
                    try {
                        if (win.closed) {
                            clearInterval(loop);
                            onClose();
                        }
                    } catch (ex) {
                        clearInterval(loop);
                    }
                }, 1000);
            }
        } else {
            top.location.href = url;
        }
    } else if (target == '_parent') {
        parent.location.href = url;
    } else if (target == '_top') {
        top.location.href = url;
    } else {
        location.href = url;
    }
}

// 动态加载JS文件
export function loadJS(params, success) {
    let domScript = document.createElement('script');
    if (_.isObject(params)) {
        domScript.id = params.id;
        domScript.src = params.url;
    } else {
        domScript.src = params
    }

    domScript.onload = domScript.onreadystatechange = function () {
        if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
            if (_.isFunction(success)) {
                success();
            }
            this.onload = this.onreadystatechange = null;
            // this.parentNode.removeChild(this);
        }
    }
    document.getElementsByTagName('body')[0].appendChild(domScript);
}

// 动态加载CSS文件
export function loadCSS(url, success){
    var domCss = document.createElement('link');
    domCss.href = url;
    domCss.rel = 'stylesheet';

    domCss.onload = domCss.onreadystatechange = function () {
        if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
            if (_.isFunction(success)) {
                success();
            }
            this.onload = this.onreadystatechange = null;
            // this.parentNode.removeChild(this);
        }
    }

    document.getElementsByTagName('head')[0].appendChild(domCss);
}

