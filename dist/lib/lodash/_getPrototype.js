define('node_modules/lodash/_getPrototype', function(require, exports, module) {

  var overArg = require('node_modules/lodash/_overArg');
  
  /** Built-in value references. */
  var getPrototype = overArg(Object.getPrototypeOf, Object);
  
  module.exports = getPrototype;
  

});
