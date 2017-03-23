define('common/middleware/discardMiddleware', function(require, exports, module) {

  // Same below for a middleware to discard all actions that goes through (not very useful as is
  // but with a bit of more logic it could selectively discard a few actions while passing others
  // to next middleware or Redux):
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports["default"] = discardMiddleware;
  
  function discardMiddleware(_ref) {
      var dispatch = _ref.dispatch;
      var getState = _ref.getState;
  
      return function (next) {
          return function (action) {
              //console.log('discardMiddleware action received:', action)
              next(action);
              return action;
          };
      };
  }
  
  module.exports = exports["default"];

});
