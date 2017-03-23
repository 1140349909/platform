define('node_modules/zrender/lib/core/guid', function(require, exports, module) {

  /**
   * zrender: 生成唯一id
   *
   * @author errorrik (errorrik@gmail.com)
   */
  
  
      var idStart = 0x0907;
  
      module.exports = function () {
          return idStart++;
      };
  
  

});
