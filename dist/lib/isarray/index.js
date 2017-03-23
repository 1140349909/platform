define('node_modules/isarray/index', function(require, exports, module) {

  var toString = {}.toString;
  
  module.exports = Array.isArray || function (arr) {
    return toString.call(arr) == '[object Array]';
  };
  

});
