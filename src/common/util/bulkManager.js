/**
 * Created by Asoiso on 2017/1/14.
 */
import {color2color} from './color2color';

function _checkClass(e) {
    for (var t, n = 0; n < e.classList.length; n++) {
        if ('white' == e.classList[n]) {
            t = 'checkOutWhite';
        } else {
            if ('active' == e.classList[n]) {
                t = 'checkOutActive';
            } else if ('static' == e.classList[n]) {
                t = 'checkOutStatic';
            }
        }
    }
    return t;
}

function _checkColor(color) {
    var t = color.split(',')[0].substr(4);
    var n = color.split(',')[1];
    var i = color.split(',')[2].split(')')[0];
    return parseInt(t) >= 100 || parseInt(n) >= 100 || parseInt(i) >= 100;
}


// 获取辅助色
function _getAssistColor(rgb) {

    const rgbToHsl = function (e, t, n) {
        e /= 255, t /= 255, n /= 255;
        var i, a, r = Math.max(e, t, n), o = Math.min(e, t, n), s = (r + o) / 2;
        if (r == o)i = a = 0; else {
            var l = r - o;
            switch (a = s > .5 ? l / (2 - r - o) : l / (r + o), r) {
                case e:
                    i = (t - n) / l + (t < n ? 6 : 0);
                    break;
                case t:
                    i = (n - e) / l + 2;
                    break;
                case n:
                    i = (e - t) / l + 4;
            }
            i /= 6;
        }
        return 1 != a && Math.sqrt(Math.pow(a, 2) + Math.pow(1 - s, 2)) <= .4 && 1 - .5 * a > s && (a += .1, s -= .2), [i, a, s];
    };

    const hslToRgb = function (e) {
        function t(e, t, n) {
            return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
        }

        var n, i, a;
        if (0 == e[1])return [0, 0, 0];
        var r = e[2] < .5 ? e[2] * (1 + e[1]) : e[2] + e[1] - e[2] * e[1], o = 2 * e[2] - r;
        return n = t(o, r, e[0] + 1 / 3), i = t(o, r, e[0]), a = t(o, r, e[0] - 1 / 3), [Math.round(255 * n), Math.round(255 * i), Math.round(255 * a)];
    };

    var [r, g, b]= hslToRgb(rgbToHsl(rgb.r, rgb.g, rgb.b));

    return `rgb(${r},${g},${b})`;
}

// 根据色板值获取themeColor,assistColor
// color=#abcdef或rgb(10,20,30)
// themeColor=rgb(10,20,30)
// assistColor=rgb(10,20,30)
function _getColor(color) {
    // hex
    // rgb
    // #fff
    // 把主色转换为rgb,value为rgb值,text为rgb颜色文本
    let {text, value} = color2color(color);

    return {
        themeColor: text,
        assistColor: _getAssistColor(value)
    };
}

/*

 class
 white
 active
 static

 value: inherit|transparent|initial|white|black|rgb(255, 255, 255)
 */
// 主色themeColor,辅色assistColor = rgb(136,136,136) | rgb(62,62,62)
export function replaceColor(target, color) {

    let {themeColor, assistColor} = _getColor(color);

    target.setAttribute('data-color', themeColor);

    var elements = target ? target.getElementsByTagName('*') : [];

    var props = ['backgroundColor', 'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'color'];
    var prop;
    for (var s = 0; s < elements.length; s++) {
        var element = elements[s];
        for (var l = 0; l < props.length; l++) {
            // 处理字体颜色
            if ('color' == props[l]) {
                prop = element.style[props[l]];
                if (prop &&
                    'inherit' != prop &&
                    'transparent' != prop &&
                    'initial' != prop &&
                    'white' != prop &&
                    'black' != prop &&
                    'rgb(255, 255, 255)' != prop) {

                    // 永远白色
                    if ('checkOutWhite' == _checkClass(element)) {

                        if (assistColor == themeColor) {
                            element.style[props[l]] = 'rgb(255,255,255)';
                        }
                    } else {
                        // 自动根据亮度变成辅助色
                        if ('checkOutActive' == _checkClass(element)) {
                            element.style[props[l]] = assistColor;
                        } else {
                            if (_checkColor(element.style[props[l]])) {
                                element.style[props[l]] = assistColor;
                            }
                        }
                    }
                } else {
                    //无color
                    //console.log(element,assistColor,themeColor)

                    // if (assistColor != themeColor && ("rgb(0,0,0)" == assistColor)) {
                    //     element.style[props[l]] = "rgb(255,255,255)";
                    // }
                    /*else {
                     element.style[props[l]] = assistColor;
                     }*/
                }
            }
            else if (element.style[props[l]]) {
                prop = element.style[props[l]];
                if (prop &&
                    'inherit' != prop &&
                    'transparent' != prop &&
                    'initial' != prop &&
                    'rgb(255, 255, 255)' != prop &&
                    'black' != prop &&
                    'white' != prop &&
                    prop.indexOf('rgba(0, 0, 0') == -1) {

                    if (element.style[props[l]].indexOf('rgba') > -1) {
                        element.style[props[l]] = 'rgba(' + assistColor.split(',')[0].split('(')[1] + ',' + assistColor.split(',')[1] + ',' + assistColor.split(',')[2].split(')')[0] + ',' + element.style[props[l]].split(',')[3].split(')')[0] + ')';
                    } else {
                        element.style[props[l]] = themeColor;
                    }
                }

            }
        }
    }
}

