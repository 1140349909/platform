define('platform/store/configureStore', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports['default'] = configureStore;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _redux = require('node_modules/redux/lib/index');
  
  var _reduxThunk = require('node_modules/redux-thunk/lib/index');
  
  var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
  
  var _commonMiddlewarePromiseMiddleware = require('common/middleware/promiseMiddleware');
  
  var _commonMiddlewarePromiseMiddleware2 = _interopRequireDefault(_commonMiddlewarePromiseMiddleware);
  
  var _commonMiddlewareLogMiddleware = require('common/middleware/logMiddleware');
  
  var _commonMiddlewareLogMiddleware2 = _interopRequireDefault(_commonMiddlewareLogMiddleware);
  
  var _commonMiddlewareDiscardMiddleware = require('common/middleware/discardMiddleware');
  
  var _commonMiddlewareDiscardMiddleware2 = _interopRequireDefault(_commonMiddlewareDiscardMiddleware);
  
  var _reducer = require('platform/store/reducer');
  
  var _reducer2 = _interopRequireDefault(_reducer);
  
  var _reactRouterRedux = require('node_modules/react-router-redux/lib/index');
  
  function configureStore(initialState, history) {
      var middleware = [_reduxThunk2['default'],
      // 异步操作中间件
      (0, _commonMiddlewarePromiseMiddleware2['default'])(), _commonMiddlewareLogMiddleware2['default'], _commonMiddlewareDiscardMiddleware2['default'],
      // 路由中间件
      (0, _reactRouterRedux.routerMiddleware)(history)];
      var createStoreWithMiddleware = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware));
  
      return createStoreWithMiddleware(_redux.createStore)(_reducer2['default'], initialState);
  }
  
  module.exports = exports['default'];

});
