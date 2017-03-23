;
(function (global, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);
    } else {
        global['Namespace'] = factory(global);
    }

}(this, function (global) {
    /**
     * 创建一个命名空间，创建的命名空间将会在 顶级 根命名空间下。
     * $.namespace('Ttpod.core'); // returns Ttpod.core
     * String namespace
     * Any val,给最后一级设置val
     */
    function namespace() {
        var args = arguments,
            l = args.length,
            o = window,
            v = (l > 1) ? args[l - 1] : undefined,
            i,
            j,
            p;
        if (l > 0) {
            p = (args[0]).split('.');
            for (j = 0, pl = p.length; j < pl; ++j) {
                if (j == pl - 1 && "undefined" != typeof v) {
                    o = o[p[j]] = v;
                } else {
                    o = o[p[j]] = o[p[j]] || {};
                }
            }
        }
        return o;
    }
    return namespace;
}));

;
(function (global, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global, global["Namespace"]);
    } else {
        global['Module'] = factory(global, global["Namespace"]);
    }

}(this, function (global, Namespace) {
    /**
     * 对象模块化
     * @param {String} name 要创建的包的名字空间
     * @param {Function|Object} context 要创建的包的包体
     *
     * $.module(String);       1    返回命名空间对象
     * $.module(Function);     1   立刻执行函数
     * $.module(String, Function); return FunReturn;
     * $.module(String, Object); 1 return Object
     * $.module(String, Any);    1 return Object
     * return Any ||    {__name__:moduleName}
     *
     * @eg1 return Ttpod.user
     * $.module('Ttpod.user');
     *
     * @eg2 return Ttpod.user
     * $.module('Ttpod.user',{
    * 	name:1,
    * 	method:function(){}
    * });
     *
     * @eg3 Ttpod.user;
     * $.module('Ttpod.user',function(){
    * 	return {
    * 		pty : {},
    * 		method : function(){}
    * 	};
    * });
     *
     * @eg4 Ttpod.user;
     * $.module('Ttpod.user',function(exports){
	*	this.say = function(){
	*
	*	}
    * });
     *
     * @eg:return {a:1,b:2,c:3,d:4}
     * $.module("Ttpod.demo",function(exports){
    *    Ttpod.demo.a = 1;
    *    this.b = 2;
    *    exports.c=3;
    *
    *    return {
    *         d:4
    *    };
    * });
     *
     * 1、一个模块只能模块化一次,重复模块化会覆盖之前的属性
     * 2、父级模块要在子级模块前定义
     * $.module(string);
     * $.module(string, function);
     * $.module(string, object);
     * $.module(function);
     * $.module("Ttpod.name",function(exports){
    *   //this、exports 是同一个对象，exports,用来向外提供模块接口。
    *   this.a = 1;
    *   exports.a = 2;
    *
    *    // 错误用法！！!，exports 仅仅是当前上下文一个引用。因此给 exports 赋值是无效的，不能用来更改模块接口
    *   exports = {
    *      foo: 'bar',
    *      doSomething: function() {};
    *   };
    *
    *   //除了给 exports 对象增加成员，还可以使用return直接向外提供接口，将重写exports。
    *   return {
    *       a:3
    *   };
    *
    * });
     *
     */
    function Module() {
        var len = arguments.length,
            exports,
            name = arguments[0],
            hasName = "string" == typeof name,
            context = arguments[len - 1];

        if (len == 0 || (!hasName && !$.isFunction(name))) {
            return;
        }

        if (len == 1 && hasName) {
            return Namespace(name);
        }

        if (hasName) {
            exports = {
                __name__: name
            };
            if ($.isFunction(context)) {
                Namespace(name, exports);
            }
        }

        if ($.isFunction(context)) {
            context = context.call(exports, exports);
        }

        if (hasName) {

            if ("undefined" == typeof context) {
                return exports;
            }

            if ($.isPlainObject(Object) && !("__name__" in context)) {
                context.__name__ = name;
            }

            return Namespace(name, context);
        }

        return context;
    }

    return Module;
}));

/**
 * jQuery工具扩展
 * asoiso
 */
(function ($) {
    //公用方法
    $.extend($, {

        /**
         * @description 判断变量是否存在,或者是否以某种类型存在
         * @param {object} o  判断变量是否存在
         * @param {object} type 数据类型  Number,Boolean等
         * @return {Boolean} nResult 返回结果 true或者false
         */
        isExists: function (o, type) {
            return o != undefined && o !== null && (type ? o.constructor == type : true);
        },
        /**
         * @description 把任意类型转成Boolean
         * @param {object} o  任意对象
         * @return {Boolean} nResult 返回结果 true或者false
         */
        parseBoolean: function (o) {
            var flag = !!o;
            return (flag && typeof(o) == "string" && (o
                .toLowerCase() == "false" || o.toLowerCase() == "null" || o.toLowerCase() == "undefined" || o == "0")) ? false : flag;
        },
        /**
         * @description 把字符串自动转换成它原来的类型
         * @param val o  任意对象
         * @return val any
         */
        parseAny: function (val) {
            if (typeof val == 'string') {
                if (val != "" && !isNaN(val)) {
                    val = val - 0;
                } else if (val.toLowerCase() == "true") {
                    val = true;
                } else if (val.toLowerCase() == "false") {
                    val = false;
                }
            }
            return val;
        },
        /**
         * @description 将?key1=value1&key2=value2&...转换成一个对象{key1:value1,key2:value2....}
         * @param {String} string  String字符串
         * @return {Object} obj 返回结果 {key1:value1,key2:value2....}
         */
        parseParam: function (str) {
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
            str = str.replace(/^[\?\#]/, "");
            //分割参数
            var params = str.split("&");

            for (var i = 0; i < params.length; i++) {
                var item = params[i].split("=");
                var key = item[0];
                var val = item[1];

                if (!key) {
                    continue;
                }

                //类型转换
                if (val == undefined) {
                    val = true;
                } else {
                    val = this.parseAny(val);
                }
                obj[key] = val;
            }
            return obj;
        },
        /**
         * @description 占位符格式化
         * @param {String} str 需要替换的模板
         * @param {Object} params 参数
         * @param {Boolean} isEncode 是否编码
         * @eg demo("http://www.baidu.com?name={name}&age={age}&chanelid={chanelid}",{name:"demo",age:23,chanelid:100},false)
         * @return {String} str 返回结果 http://www.baidu.com?name=demo&age=23&chanelid=100
         */
        format: function (str, params, isEncode) {
            if (typeof params == "object") {
                for (var key in params) {
                    if (!$.isExists(params[key]) || params[key] == "undefined" || params[key] == "null") {
                        params[key] = "";
                    }
                    str = str.replace(new RegExp("\\{" + key + "\\}", "ig"), isEncode ? encodeURIComponent(params[key]) : params[key]);
                }
            }
            return str;
        },
        /**
         * 去掉字符串起始的制定字符
         * @method trimStart
         * @param <String> text 指定字符串
         * @param <String> trimStr 替换字符串
         */
        trimStart: function (text, trimStr) {
            return (text || "").replace(new RegExp("^" + trimStr + "*", "g"), "");
        },

        /**
         * 去掉字符串结尾的制定字符
         * @method trimEnd
         * @param <String> text 指定字符串
         * @param <String> trimStr 替换字符串
         */
        trimEnd: function (text, trimStr) {
            return (text || "").replace(new RegExp(trimStr + "*$", "g"), "");
        },
        startWith: function (s, d) {
            return new RegExp("^" + d).test(s);
        },
        /**
         * 获取标准表单数据，转换为JSON数据格式
         * @method getForm
         * @example $.getForm("#form");
         * isParse是否转化类型
         * @return <Object> data
         */
        getForm: function ($form, isParse) {
            var data = {};
            $form = $($form);
            if ($form.length == 0) {
                return data;
            }

            $("input", $form).each(function () {
                var item = $(this);
                var name = item.attr("name");
                if (!name || $.isExists(data[name])) {
                    return;
                }
                switch (item.attr("type")) {
                    case "radio":
                        // DOTO: 当 input[type="radio"][disabled="disabled"] 为禁用
                        if (!this.disabled && this.checked) {
                            data[name] = item.val();
                        }
                        break;
                    case "checkbox":
                        // DOTO: 当 input[type="checkbox"][disabled="disabled"] 为禁用
                        if (this.disabled) {
                            break;
                        }

                        data[name] = "";
                        $("input[type='checkbox'][name='" + name + "']:checked", $form).each(function () {
                            data[name] += this.value + ",";
                        })
                        data[name] = $.trimEnd(data[name], ',');
                        break;
                    case "button":
                    case "reset":
                    case "submit":
                        break;
                    default:
                        // DOTO: 当 input[type="text"][disabled="disabled"] 为禁用
                        if (!this.disabled) {
                            data[name] = $.trim(item.val());
                        }
                        break;
                }
                data[name] = isParse ? $.parseAny(data[name]) : data[name];
            });
            $("textarea", $form).each(function () {
                if (!this.name) {
                    return;
                }
                data[this.name] = $.parseAny(this.value);
            });
            $("select", $form).each(function () {
                if (!this.name) {
                    return;
                }
                data[this.name] = isParse ? $.parseAny(this.value) : this.value;
            });
            return data;
        },
        setForm: function ($form, data) {
            $form = $($form);
            if ($form.length == 0 || !$.isPlainObject(data)) {
                return;
            }
            var nodes = $form.get(0).elements;
            var i = 0,
                iLen = nodes.length;
            var j, jLen, item, name, type, select, value, existsVal;

            for (; i < iLen; i++) {
                item = nodes[i];
                name = item.name;
                type = item.type;
                value = data[name];

                if (!name || item.disabled || !$.isExists(value) || "file" == type) {
                    continue;
                }

                if ("radio" == type) {
                    item.checked = item.value == (value + "");
                } else if ("checkbox" == type || "select-multiple" == type) {
                    if ($.isArray(value)) {
                        //把值转化成字符串
                        for (var n = 0; n < value.length; n++) {
                            value[n] += "";
                        }
                    } else {
                        value = (value + "").split(',');
                    }

                    if ("checkbox" == type) {
                        item.checked = $.inArray(item.value, value) != -1;
                    } else {
                        select = item.options;
                        for (j = 0, jLen = select.length; j < jLen; j++) {
                            item = select[j];
                            item.selected = $.inArray(item.value, value) != -1;
                        }
                    }
                } else {
                    if (undefined != value) {
                        item.value = value;
                    }
                }
            }
        },
        /**
         * 重置表单
         * @method resetForm
         * @example $.resetForm("#myFormId");
         * @param formId #+表单Id
         */
        resetForm: function ($form) {
            $($form).get(0).reset();
        },
        
        // 获取地址栏参数
        getQueryParam: function (key) {
            return decodeURIComponent((location.search.match(new RegExp("(?:\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', ''])[1]);
        },

        // 获取缓存的参数
        getStore: function (key) {
            var data = localStorage.getItem(key);
            if (this.isExists(data)) {
                data = JSON.parse(data);
            } else {
                return null;
            }
            return this.parseAny(data);
        },
        // 设置缓存
        setStore: function (key, val) {
            if ($.isExists(val)) {
                localStorage.setItem(key, JSON.stringify(val));
            } else {
                this.removeStore(key);
            }
        },
        // 删除缓存
        removeStore: function (key) {
            localStorage.removeItem(key);
        },

        /**
         * 秒数倒计时器
         * @ele      {element}  定义显示秒数的DOM节点
         * @s        {Number}   定义倒数秒数开始时间
         * @callback {function} 倒数计时结束时的回调
         */
        countdown: function (ele, callback, s) {
            var s = 60 || s,
                i = 0,
                t;

            function stop() {
                clearInterval(t);
                if (callback) {
                    callback();
                }
            }

            return function _interval() {
                t = setInterval(function () {
                    i ++
                    if (s > 0) {
                        s --
                        ele.html(s + '秒')
                    } else {
                        stop();
                        ele.html('重新获取')
                    }
                    i ++
                }, 1000)
            }()
        },

        /**
         * 获取图片验证码
         * @ele      {element}  验证码显示Img的DOM
         * @width    {Number}   宽度
         * @height   {function} 高度
         * @fontsize {function} 字体大小
         */
        getCaptcha: function(ele, width, height, fontsize) {
            var ele,
                width = width || 73,
                height = height || 38,
                fontsize = fontsize || 24,
                timestamp = new Date().getTime();
            ele.attr({
                src: LK.config.APIS['MEDIA_CAPTCHA'] + '/' + width + '/' + height + '/' + fontsize + '?timestamp=' + timestamp
            });
        },
    });
}($));

