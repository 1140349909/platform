define('admin/store/mall/action', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports.getMallBasic = getMallBasic;
  exports.updateMallBasic = updateMallBasic;
  exports.updateMallAuth = updateMallAuth;
  exports.updateMallCustomer = updateMallCustomer;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  /*商城管理后台服务：mall*/
  
  // 获取商城信息
  var GET_MALL_BASIC = 'GET_MALL_BASIC';
  exports.GET_MALL_BASIC = GET_MALL_BASIC;
  var GET_MALL_BASIC_PENDING = 'GET_MALL_BASIC_PENDING';
  exports.GET_MALL_BASIC_PENDING = GET_MALL_BASIC_PENDING;
  var GET_MALL_BASIC_SUCCESS = 'GET_MALL_BASIC_SUCCESS';
  exports.GET_MALL_BASIC_SUCCESS = GET_MALL_BASIC_SUCCESS;
  var GET_MALL_BASIC_FAILURE = 'GET_MALL_BASIC_FAILURE';
  exports.GET_MALL_BASIC_FAILURE = GET_MALL_BASIC_FAILURE;
  // 修改商城基本信息
  var UPDATE_MALL_BASIC = 'UPDATE_MALL_BASIC';
  exports.UPDATE_MALL_BASIC = UPDATE_MALL_BASIC;
  var UPDATE_MALL_BASIC_PENDING = 'UPDATE_MALL_BASIC_PENDING';
  exports.UPDATE_MALL_BASIC_PENDING = UPDATE_MALL_BASIC_PENDING;
  var UPDATE_MALL_BASIC_SUCCESS = 'UPDATE_MALL_BASIC_SUCCESS';
  exports.UPDATE_MALL_BASIC_SUCCESS = UPDATE_MALL_BASIC_SUCCESS;
  var UPDATE_MALL_BASIC_FAILURE = 'UPDATE_MALL_BASIC_FAILURE';
  exports.UPDATE_MALL_BASIC_FAILURE = UPDATE_MALL_BASIC_FAILURE;
  // 修改商城权限配置
  var UPDATE_MALL_AUTH = 'UPDATE_MALL_AUTH';
  exports.UPDATE_MALL_AUTH = UPDATE_MALL_AUTH;
  var UPDATE_MALL_AUTH_PENDING = 'UPDATE_MALL_AUTH_PENDING';
  exports.UPDATE_MALL_AUTH_PENDING = UPDATE_MALL_AUTH_PENDING;
  var UPDATE_MALL_AUTH_SUCCESS = 'UPDATE_MALL_AUTH_SUCCESS';
  exports.UPDATE_MALL_AUTH_SUCCESS = UPDATE_MALL_AUTH_SUCCESS;
  var UPDATE_MALL_AUTH_FAILURE = 'UPDATE_MALL_AUTH_FAILURE';
  exports.UPDATE_MALL_AUTH_FAILURE = UPDATE_MALL_AUTH_FAILURE;
  // 修改商城客服人员
  var UPDATE_MALL_CUSTOMER = 'UPDATE_MALL_CUSTOMER';
  exports.UPDATE_MALL_CUSTOMER = UPDATE_MALL_CUSTOMER;
  var UPDATE_MALL_CUSTOMER_PENDING = 'UPDATE_MALL_CUSTOMER_PENDING';
  exports.UPDATE_MALL_CUSTOMER_PENDING = UPDATE_MALL_CUSTOMER_PENDING;
  var UPDATE_MALL_CUSTOMER_SUCCESS = 'UPDATE_MALL_CUSTOMER_SUCCESS';
  exports.UPDATE_MALL_CUSTOMER_SUCCESS = UPDATE_MALL_CUSTOMER_SUCCESS;
  var UPDATE_MALL_CUSTOMER_FAILURE = 'UPDATE_MALL_CUSTOMER_FAILURE';
  
  exports.UPDATE_MALL_CUSTOMER_FAILURE = UPDATE_MALL_CUSTOMER_FAILURE;
  /*商城管理后台服务：完*/
  
  // 获取商城信息
  
  function getMallBasic() {
      return {
          type: GET_MALL_BASIC,
          payload: {
              promise: _commonHttp2['default'].get('manager/mall')
          }
      };
  }
  
  // 修改商城基本信息
  
  function updateMallBasic(data) {
      return {
          type: UPDATE_MALL_BASIC,
          payload: {
              promise: _commonHttp2['default'].post('manager/mall/basic', data)
          }
      };
  }
  
  // 修改商城权限配置
  
  function updateMallAuth(data) {
      return {
          type: UPDATE_MALL_AUTH,
          payload: {
              promise: _commonHttp2['default'].post('manager/mall/config/auth', data)
          }
      };
  }
  
  // 修改商城客服人员
  
  function updateMallCustomer(data) {
      return {
          type: UPDATE_MALL_CUSTOMER,
          payload: {
              promise: _commonHttp2['default'].post('manager/mall/cus', data)
          }
      };
  }

});
