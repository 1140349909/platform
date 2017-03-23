define('node_modules/rc-util/lib/Dom/contains', function(require, exports, module) {

  "use strict";
  
  module.exports = function contains(root, n) {
    var node = n;
    while (node) {
      if (node === root) {
        return true;
      }
      node = node.parentNode;
    }
  
    return false;
  };

});
