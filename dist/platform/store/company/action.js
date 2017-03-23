define('platform/store/company/action', function(require, exports, module) {

  /**
   * Created by Asoiso on 16/8/20.
   */
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports.getPlatformCustomers = getPlatformCustomers;
  exports.getPlatformCustomer = getPlatformCustomer;
  exports.getPlatformCustomerMallAuth = getPlatformCustomerMallAuth;
  exports.updatePlatformCustomerMallAuth = updatePlatformCustomerMallAuth;
  exports.updatePlatformCustomerStatus = updatePlatformCustomerStatus;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  var _commonConfig = require("common/config/index");
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  // 企业管理
  var GET_PLATFORM_CUSTOMER = 'GET_PLATFORM_CUSTOMER';
  exports.GET_PLATFORM_CUSTOMER = GET_PLATFORM_CUSTOMER;
  var GET_PLATFORM_CUSTOMER_PENDING = 'GET_PLATFORM_CUSTOMER_PENDING';
  exports.GET_PLATFORM_CUSTOMER_PENDING = GET_PLATFORM_CUSTOMER_PENDING;
  var GET_PLATFORM_CUSTOMER_SUCCESS = 'GET_PLATFORM_CUSTOMER_SUCCESS';
  exports.GET_PLATFORM_CUSTOMER_SUCCESS = GET_PLATFORM_CUSTOMER_SUCCESS;
  var GET_PLATFORM_CUSTOMER_FAILURE = 'GET_PLATFORM_CUSTOMER_FAILURE';
  
  exports.GET_PLATFORM_CUSTOMER_FAILURE = GET_PLATFORM_CUSTOMER_FAILURE;
  var GET_PLATFORM_CUSTOMERS = 'GET_PLATFORM_CUSTOMERS';
  exports.GET_PLATFORM_CUSTOMERS = GET_PLATFORM_CUSTOMERS;
  var GET_PLATFORM_CUSTOMERS_PENDING = 'GET_PLATFORM_CUSTOMERS_PENDING';
  exports.GET_PLATFORM_CUSTOMERS_PENDING = GET_PLATFORM_CUSTOMERS_PENDING;
  var GET_PLATFORM_CUSTOMERS_SUCCESS = 'GET_PLATFORM_CUSTOMERS_SUCCESS';
  exports.GET_PLATFORM_CUSTOMERS_SUCCESS = GET_PLATFORM_CUSTOMERS_SUCCESS;
  var GET_PLATFORM_CUSTOMERS_FAILURE = 'GET_PLATFORM_CUSTOMERS_FAILURE';
  
  exports.GET_PLATFORM_CUSTOMERS_FAILURE = GET_PLATFORM_CUSTOMERS_FAILURE;
  var GET_PLATFORM_CUSTOMER_MALL_AUTH = 'GET_PLATFORM_CUSTOMER_MALL_AUTH';
  exports.GET_PLATFORM_CUSTOMER_MALL_AUTH = GET_PLATFORM_CUSTOMER_MALL_AUTH;
  var GET_PLATFORM_CUSTOMER_MALL_AUTH_PENDING = 'GET_PLATFORM_CUSTOMER_MALL_AUTH_PENDING';
  exports.GET_PLATFORM_CUSTOMER_MALL_AUTH_PENDING = GET_PLATFORM_CUSTOMER_MALL_AUTH_PENDING;
  var GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS = 'GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS';
  exports.GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS = GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS;
  var GET_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE = 'GET_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE';
  
  exports.GET_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE = GET_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE;
  var UPDATE_PLATFORM_CUSTOMER_STATUS = 'UPDATE_PLATFORM_CUSTOMER_STATUS';
  exports.UPDATE_PLATFORM_CUSTOMER_STATUS = UPDATE_PLATFORM_CUSTOMER_STATUS;
  var UPDATE_PLATFORM_CUSTOMER_STATUS_PENDING = 'UPDATE_PLATFORM_CUSTOMER_STATUS_PENDING';
  exports.UPDATE_PLATFORM_CUSTOMER_STATUS_PENDING = UPDATE_PLATFORM_CUSTOMER_STATUS_PENDING;
  var UPDATE_PLATFORM_CUSTOMER_STATUS_SUCCESS = 'UPDATE_PLATFORM_CUSTOMER_STATUS_SUCCESS';
  exports.UPDATE_PLATFORM_CUSTOMER_STATUS_SUCCESS = UPDATE_PLATFORM_CUSTOMER_STATUS_SUCCESS;
  var UPDATE_PLATFORM_CUSTOMER_STATUS_FAILURE = 'UPDATE_PLATFORM_CUSTOMER_STATUS_FAILURE';
  
  exports.UPDATE_PLATFORM_CUSTOMER_STATUS_FAILURE = UPDATE_PLATFORM_CUSTOMER_STATUS_FAILURE;
  var UPDATE_PLATFORM_CUSTOMER_MALL_AUTH = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH';
  exports.UPDATE_PLATFORM_CUSTOMER_MALL_AUTH = UPDATE_PLATFORM_CUSTOMER_MALL_AUTH;
  var UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_PENDING = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_PENDING';
  exports.UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_PENDING = UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_PENDING;
  var UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS';
  exports.UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS = UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS;
  var UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE';
  
  exports.UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE = UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE;
  //获取客户列表
  
  function getPlatformCustomers(_ref) {
      var name = _ref.name;
      var type = _ref.type;
      var _ref$page = _ref.page;
      var page = _ref$page === undefined ? 0 : _ref$page;
      var _ref$size = _ref.size;
      var size = _ref$size === undefined ? 10 : _ref$size;
      var _ref$order = _ref.order;
      var order = _ref$order === undefined ? _commonConfig2["default"].ORDER : _ref$order;
  
      return {
          type: GET_PLATFORM_CUSTOMERS,
          payload: {
              promise: _commonHttp2["default"].get('platadmin/customer/list', {
                  name: name,
                  type: type,
                  page: page,
                  size: size,
                  order: order
              })
          }
      };
  }
  
  //获取客户信息
  
  function getPlatformCustomer(id) {
      return {
          type: GET_PLATFORM_CUSTOMER,
          payload: {
              promise: _commonHttp2["default"].get('platadmin/customer/{id}', {
                  id: id
              })
          }
      };
  }
  
  //获取客户商城权限配置
  
  function getPlatformCustomerMallAuth(id) {
      return {
          type: GET_PLATFORM_CUSTOMER_MALL_AUTH,
          payload: {
              promise: _commonHttp2["default"].get('platadmin/customer/mall/auth/{id}', {
                  id: id
              })
          }
      };
  }
  
  //更新客户商城权限配置
  
  function updatePlatformCustomerMallAuth(id, data) {
      return {
          type: UPDATE_PLATFORM_CUSTOMER_MALL_AUTH,
          payload: {
              promise: _commonHttp2["default"].post('platadmin/customer/mall/auth/{id}', data, {
                  params: {
                      id: id
                  }
              })
          }
      };
  }
  
  //更新客户状态
  
  function updatePlatformCustomerStatus(id, data) {
      return {
          type: UPDATE_PLATFORM_CUSTOMER_STATUS,
          payload: {
              promise: _commonHttp2["default"].post('platadmin/customer/approve/{id}', data, {
                  params: {
                      id: id
                  }
              })
          }
      };
  }
  
  // platform / admin
  // platadmin / mall
  // admin / mall
  
  /*
  
   export function delCustomer(id) {
   return {
   type: DEL_CUSTOMER,
   payload: {
   promise: http.delete('admin/customer/{id}', {
   id
   })
   }
   }
   }
  
  
   });*/

});
