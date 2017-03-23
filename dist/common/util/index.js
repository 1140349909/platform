define('common/util/index', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports.isPromise = isPromise;
  exports.strFormat = strFormat;
  exports.dateFormat = dateFormat;
  exports.moneyFormat = moneyFormat;
  exports.exists = exists;
  exports.parseBoolean = parseBoolean;
  exports.booleanToString = booleanToString;
  exports.parseAny = parseAny;
  exports.parseParam = parseParam;
  exports.getSafeValue = getSafeValue;
  exports.getOrderValue = getOrderValue;
  
  function isPromise(value) {
      if (value !== null && typeof value === 'object') {
          return value.promise && typeof value.promise.then === 'function';
      }
  }
  
  /**
   * @description 占位符格式化
   * @param {String} str 需要替换的模板
   * @param {Object} params 参数
   * @param {Boolean} isEncode 是否编码
   * @eg demo("http://www.baidu.com?name={name}&age={age}&chanelid={chanelid}",{name:"demo",age:23,chanelid:100},false)
   * @return {String} str 返回结果 http://www.baidu.com?name=demo&age=23&chanelid=100
   */
  
  function strFormat(str, params) {
      var isEncode = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  
      if (typeof params == "object") {
          for (var key in params) {
              if (params[key] == undefined || params[key] == null || params[key] == "undefined" || params[key] == "null") {
                  params[key] = "";
              }
              str = str.replace(new RegExp("\\{" + key + "\\}", "ig"), isEncode ? encodeURIComponent(params[key]) : params[key]);
          }
      }
      return str.replace(/\{\w*\}/ig, "");
  }
  
  function dateFormat(date, format) {
      format = format || 'yyyy-MM-dd hh:ss';
      if (!isNaN(date)) {
          date = new Date(date);
      }
      var o = {
          "M+": date.getMonth() + 1, //month
          "d+": date.getDate(), //day
          "h+": date.getHours(), //hour
          "m+": date.getMinutes(), //minute
          "s+": date.getSeconds(), //second
          "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
          "S": date.getMilliseconds() //millisecond
      };
      if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
          }
      }
      return format;
  }
  
  /*
   format:￥
   digit: 位数 -1为自动位数,默认为-1
   */
  
  function moneyFormat(money, format, digit) {
      if (isNaN(money)) {
          money = 0;
      }
  
      if (isNaN(digit)) {
          digit = -1;
      }
  
      money = new Number(money / 100).toFixed(3);
  
      var moneyText = undefined;
  
      if (digit > 0) {
          moneyText = money.substring(0, money.lastIndexOf('.') + (digit + 1));
      } else if (digit == 0) {
          moneyText = money.substring(0, money.lastIndexOf('.'));
      } else {
          moneyText = money - 0;
      }
  
      if (format == '￥') {
          return "￥" + moneyText;
      } else {
          return moneyText;
      }
  }
  
  /**
   * @description 判断变量是否存在,或者是否以某种类型存在
   * @param {object} o  判断变量是否存在
   * @param {object} type 数据类型  Number,Boolean等
   * @return {Boolean} nResult 返回结果 true或者false
   */
  
  function exists(o, type) {
      return o != undefined && o !== null && (type ? o.constructor == type : true);
  }
  
  /**
   * @description 把任意类型转成Boolean
   * @param {object} o  任意对象
   * @return {Boolean} nResult 返回结果 true或者false
   */
  
  function parseBoolean(o) {
      var flag = !!o;
      return flag && typeof o == "string" && (o.toLowerCase() == "false" || o.toLowerCase() == "null" || o.toLowerCase() == "undefined" || o == "0") ? false : flag;
  }
  
  // 把boolean类型转换为字符串
  
  function booleanToString(value, caseType) {
      return parseBoolean(value).toString()[caseType == 'upper' ? 'toUpperCase' : 'toLowerCase']();
  }
  
  /**
   * @description 把字符串自动转换成它原来的类型
   * @param val o  任意对象
   * @return val any
   */
  
  function parseAny(val) {
      if (typeof val == 'string') {
          if (val != "" && !isNaN(val) && val < 2147483647) {
              val = val - 0;
          } else if (val.toLowerCase() == "true") {
              val = true;
          } else if (val.toLowerCase() == "false") {
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
  
  function parseParam(str) {
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
              val = parseAny(val);
          }
          obj[key] = val;
      }
      return obj;
  }
  
  // 获取安全的值,如果val不存在,则返回默认值
  
  function getSafeValue(val, defaultVal) {
      defaultVal = exists(defaultVal) ? defaultVal : '-';
      return exists(val) ? val : defaultVal;
  }
  
  // 获取排序值
  
  function getOrderValue(val) {
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

});
