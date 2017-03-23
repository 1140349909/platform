define('platform/store/reducer', function(require, exports, module) {

  /**
   * Created by Asoiso on 16/8/21.
   */
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _redux = require('node_modules/redux/lib/index');
  
  var _reactRouterRedux = require('node_modules/react-router-redux/lib/index');
  
  // TODO:[待优化]
  
  var _commonStoreOperationReducer = require('common/store/operation/reducer');
  
  var _commonStoreOperationReducer2 = _interopRequireDefault(_commonStoreOperationReducer);
  
  var _commonStoreAuthReducer = require('common/store/auth/reducer');
  
  var _commonStoreAuthReducer2 = _interopRequireDefault(_commonStoreAuthReducer);
  
  var _storeUserReducer = require('platform/store/user/reducer');
  
  var _storeUserReducer2 = _interopRequireDefault(_storeUserReducer);
  
  var _storeMallReducer = require('platform/store/mall/reducer');
  
  var _storeMallReducer2 = _interopRequireDefault(_storeMallReducer);
  
  var _storeCompanyReducer = require('platform/store/company/reducer');
  
  var _storeCompanyReducer2 = _interopRequireDefault(_storeCompanyReducer);
  
  // 聚合各 reducer
  var rootReducer = (0, _redux.combineReducers)({
      // 将路由加入reducer
      routing: _reactRouterRedux.routerReducer,
      // 全局操作快照
      operation: _commonStoreOperationReducer2['default'],
      auth: _commonStoreAuthReducer2['default'],
      user: _storeUserReducer2['default'],
      mall: _storeMallReducer2['default'],
      company: _storeCompanyReducer2['default']
  });
  
  exports['default'] = rootReducer;
  module.exports = exports['default'];

});
