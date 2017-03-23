export default function (args) {
    return new Dom(args);
}

class Dom {
    constructor(args) {
        // 将  elements数组在这里声明，当 new Base();就会有一份新的 数组
        // elements 用来存放 节点数组
        // 注意： elements 不能放在 prototype 原型里面，不然参数会共享

        this.elements = [];

        if (typeof args == 'string') {
            // css 模拟  如  $('.cp span').css('color','red');
            // 传进来的 字符串 有包含空格
            if (args.indexOf(' ') != -1) {
                var ele = args.split(' ');
                var childElements = [];
                var node = [];
                var temps;
                for (var i = 0; i < ele.length; i++) {
                    if (node.length == 0)
                        node.push(document);
                    switch (ele[i].charAt(0)) {
                        case '#':
                            childElements = [];
                            childElements.push(this.getId(ele[i].substring(1)));
                            node = childElements;
                            break;
                        case '.':
                            childElements = [];
                            for (var j = 0; j < node.length; j++) {
                                temps = this.getClassName(ele[i].substring(1), node[j]);
                                for (var k = 0; k < temps.length; k++) {
                                    childElements.push(temps[k]);
                                }
                            }
                            node = childElements;
                            break;
                        default :
                            childElements = [];
                            for (var l = 0; l < node.length; l++) {
                                // 这里的 node 是上一次的子节点，在这一次变成了父节点来为这次的子节点做遍历！！！
                                temps = this.getTagName(ele[i], node[l]);
                                for (var m = 0; m < temps.length; m++) {
                                    childElements.push(temps[m]);
                                }
                            }
                            // 遍历的子节点变成父节点，供给下一次子节点的子节点用。
                            node = childElements;
                    }
                }
                this.elements = childElements;
            } else {
                // find 模拟  如  $('.cp')find('span').css('color','red');

                switch (args.charAt(0)) {
                    case '#':

                        this.elements.push(this.getId(args.substring(1)));

                        break;
                    case '.':
                        this.elements = this.getClassName(args.substring(1));

                        break;
                    default :
                        this.elements = this.getTagName(args);
                    //  this.getTagName(args);

                }
            }

        } else if (typeof args == 'object') {
            // args 是一个对象，对象不存在就是 undefined ，而不是 ‘undefined’，带引号的是对象的类型，
            if (args != undefined) {
                this.elements[0] = args;
            }
        }
        else {
            return this;
        }
    }

    find(str) {
        var childElements = [];
        var temp;
        for (var t = 0; t < this.elements.length; t++) {
            switch (str.charAt(0)) {
                case '#':
                    // 虽然这么写，但没什么意义，因为 id是唯一的，想得到id不用利用他的父元素再来找id
                    childElements.push(this.getId(str.substring(1)));
                    break;
                case '.':
                    temp = this.getClassName(str.substring(1), this.elements[t]);
                    for (var j = 0; j < temp.length; j++) {
                        childElements.push(temp[j]);
                    }

                    break;
                default :
                    temp = this.getTagName(str, this.elements[t]);
                    for (var k = 0; k < temp.length; k++) {
                        childElements.push(temp[k]);
                    }
            }
        }
        this.elements = childElements;
        return this;
    }


    getId(id) {
        // 创建一个数组 ，用来保存节点，或节点数组
        return document.getElementById(id);
        //this.elements.push(document.getElementById(id));

    }


    getName(name) {

        var tags = document.getElementsByName(name);
        for (var t = 0; t < tags.length; t++) {
            //[object HTMLParagraphElement]
            this.elements.push(tags[t]);
        }
    }


    getTagName(tagName, parentNode) {

        var node = null;
        var temps = [];
        if (parentNode != undefined) {
            node = parentNode;
            //  node 是 [object HTMLDivElement]  及 id 包含下的 html 片段
        } else {
            node = document;
            //  document   是   [object HTMLDocument]  及所有html 片段  ,typeof document 是 object
        }

        var tags = node.getElementsByTagName(tagName);
        for (var t = 0; t < tags.length; t++) {
            //[object HTMLParagraphElement]
            temps.push(tags[t]);

        }
        return temps;

    }

    getClassName(className, parentNode) {
        var node = null;
        var temps = [];
        if (parentNode != undefined) {
            node = parentNode;
            //  node 是 [object HTMLDivElement]  及 id 包含下的 html 片段
        } else {
            node = document;
            //  document   是   [object HTMLDocument]  及所有html 片段  ,typeof document 是 object
        }

        var tags = node.getElementsByClassName(className);
        for (var t = 0; t < tags.length; t++) {
            //[object HTMLParagraphElement]
            if ((new RegExp('(\\s|^)' + className + '(\\s|$)')).test(tags[t].className)) {
                temps.push(tags[t]);
            }
        }
        return temps;

    }


    /**
     * 给节点 添加 class name
     * @param className
     * @returns {Base}
     */
    addClass(className) {
        for (var i = 0; i < this.elements.length; i++) {
            // 利用正则表达式 判断 添加的 classname 是否已经存在；
            // (\\s|^) 表示 空格或重第一个开始判断， (\\s|$) 表示 空格或 结束
            if (!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
                this.elements[i].className += ' ' + className;
            }
        }
        return this;
    }

    removeClass(className) {
        for (var i = 0; i < this.elements.length; i++) {
            // 先做个正则表达式 判断 是否存在 要替换的 class name ，
            if (this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
                // 如果存在，将 要替换的 name  = 空；再付给 elements[i]
                this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), '');
            }
        }
        return this;
    }

    replaceClass(oldClassName, newClassName) {
        for (var i = 0; i < this.elements.length; i++) {
            // 先做个正则表达式 判断 是否存在 要替换的 class name ，
            if (this.elements[i].className.match(new RegExp('(\\s|^)' + oldClassName + '(\\s|$)'))) {
                // 如果存在，将 要替换的 name  = 空；再付给 elements[i]
                this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + oldClassName + '(\\s|$)'), newClassName);
            }
        }
        return this;
    }

    /**
     * 获取 / 设置 某一个节点的 属性 ，包括自定义属性
     * @param attr
     * @returns {string}
     */
    attr(attr, value) {
        for (var i = 0; i < this.elements.length; i++) {
            if (arguments.length == 1) {
                return this.elements[i].getAttribute(attr);
            } else if (arguments.length == 2) {
                return this.elements[i].setAttribute(attr, value);
            }
        }
        return this;
    }

    /**
     * 操作 css
     * @param css_type
     * @param value
     * @returns {Base}
     */

    css(css_type, value) {

        //  js 调用属性有 两种方法 ，xx.xx 或 xx[xx] ，这里传进的是一个字符串，所以用  xx[xx]
        var tags = this.elements.length;
        for (var t = 0; t < tags; t++) {
            /*// 当只传进一个参数时，css_type，说明目的是为获取css样式，而不是设置，所以返回css 样式
             // 但这种方法有局限性，只能获取 行内 的 css 样式    <div id="div_id" style="color:red">  div_id  </div>
             if(arguments.length == 1){
             return this.elements[t].style[css_type];
             }*/

            if (typeof css_type == 'object') {

                for (var c in css_type) {
                    this.elements[t].style[c] = css_type[c];
                }
            } else {
                //  接下来用第二中方法
                if (arguments.length == 1) {

                    return this.getStyle(this.elements[t], css_type);
                }
                this.elements[t].style[css_type] = value;
            }

        }

        return this;
    }

    getStyle(element, attr) {
        if (typeof window.getComputedStyle != 'undefined') {  // W3C
            return window.getComputedStyle(element, null)[attr];
        }
        else if (typeof element.currentStyle != 'undefined') {  // IE
            return element.currentStyle[attr];
        }
    }

    /**
     *  将元素  显示 display = "block"
     * @returns {Base}
     */
    show() {
        for (var t = 0; t < this.elements.length; t++) {
            this.elements[t].style.display = 'block';
        }
        return this;
    }

    /**
     * 将元素 隐藏  display = "none"
     * @returns {Base}
     */
    hide() {
        for (var t = 0; t < this.elements.length; t++) {
            this.elements[t].style.display = 'none';
        }
        return this;
    }
}
