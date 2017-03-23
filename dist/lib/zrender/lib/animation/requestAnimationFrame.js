define('node_modules/zrender/lib/animation/requestAnimationFrame', function(require, exports, module) {

  
  
      module.exports = (typeof window !== 'undefined' &&
                                      (window.requestAnimationFrame
                                      || window.msRequestAnimationFrame
                                      || window.mozRequestAnimationFrame
                                      || window.webkitRequestAnimationFrame))
                                  || function (func) {
                                      setTimeout(func, 16);
                                  };
  
  

});
