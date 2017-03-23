define('admin/store/reducer', function(require, exports, module) {

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
  
  var _productReducer = require('admin/store/product/reducer');
  
  var _productReducer2 = _interopRequireDefault(_productReducer);
  
  var _channelProductReducer = require('admin/store/channelProduct/reducer');
  
  var _channelProductReducer2 = _interopRequireDefault(_channelProductReducer);
  
  var _tradeReducer = require('admin/store/trade/reducer');
  
  var _tradeReducer2 = _interopRequireDefault(_tradeReducer);
  
  var _integralReducer = require('admin/store/integral/reducer');
  
  var _integralReducer2 = _interopRequireDefault(_integralReducer);
  
  var _memberReducer = require('admin/store/member/reducer');
  
  var _memberReducer2 = _interopRequireDefault(_memberReducer);
  
  var _customerReducer = require('admin/store/customer/reducer');
  
  var _customerReducer2 = _interopRequireDefault(_customerReducer);
  
  var _statReducer = require('admin/store/stat/reducer');
  
  var _statReducer2 = _interopRequireDefault(_statReducer);
  
  var _mallReducer = require('admin/store/mall/reducer');
  
  var _mallReducer2 = _interopRequireDefault(_mallReducer);
  
  var _bannerReducer = require('admin/store/banner/reducer');
  
  var _bannerReducer2 = _interopRequireDefault(_bannerReducer);
  
  var _couponReducer = require('admin/store/coupon/reducer');
  
  var _couponReducer2 = _interopRequireDefault(_couponReducer);
  
  var _tkerReducer = require('admin/store/tker/reducer');
  
  var _tkerReducer2 = _interopRequireDefault(_tkerReducer);
  
  var _withdrawReducer = require('admin/store/withdraw/reducer');
  
  var _withdrawReducer2 = _interopRequireDefault(_withdrawReducer);
  
  var _ilokaReducer = require('admin/store/iloka/reducer');
  
  var _ilokaReducer2 = _interopRequireDefault(_ilokaReducer);
  
  // 聚合各 reducer
  var rootReducer = (0, _redux.combineReducers)({
      // 将路由加入reducer
      routing: _reactRouterRedux.routerReducer,
      // 全局操作快照
      operation: _commonStoreOperationReducer2['default'],
      auth: _commonStoreAuthReducer2['default'],
      product: _productReducer2['default'],
      channelProduct: _channelProductReducer2['default'],
      trade: _tradeReducer2['default'],
      integral: _integralReducer2['default'],
      member: _memberReducer2['default'],
      customer: _customerReducer2['default'],
      stat: _statReducer2['default'],
      mall: _mallReducer2['default'],
      banner: _bannerReducer2['default'],
      coupon: _couponReducer2['default'],
      tker: _tkerReducer2['default'],
      withdraw: _withdrawReducer2['default'],
      iloka: _ilokaReducer2['default']
  });
  
  exports['default'] = rootReducer;
  module.exports = exports['default'];

});
