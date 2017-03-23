define('common/middleware/logMiddleware', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports["default"] = logMiddleware;
  
  function logMiddleware(_ref) {
      var dispatch = _ref.dispatch;
      var getState = _ref.getState;
  
      return function (next) {
          return function (action) {
              //console.log('logMiddleware action received:', action)
              return next(action);
          };
      };
  }
  
  module.exports = exports["default"];

});
