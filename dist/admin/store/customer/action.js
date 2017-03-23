define('admin/store/customer/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports.deletePlatAdminCustomer = deletePlatAdminCustomer;
  exports.getAdminCustomer = getAdminCustomer;
  exports.updateAdminCustomer = updateAdminCustomer;
  exports.updateAdminCustomerPartner = updateAdminCustomerPartner;
  exports.addAdminCustomerPartner = addAdminCustomerPartner;
  exports.getPlatformCustomerMallAuth = getPlatformCustomerMallAuth;
  exports.updatePlatformCustomerMallAuth = updatePlatformCustomerMallAuth;
  exports.updateCustomerWechat = updateCustomerWechat;
  exports.updateCustomerAlipay = updateCustomerAlipay;
  exports.updateCustomerUnionpay = updateCustomerUnionpay;
  exports.getAdminCustomerList = getAdminCustomerList;
  exports.getIntegralExchange = getIntegralExchange;
  exports.updateIntegralExchange = updateIntegralExchange;
  exports.getCardStyle = getCardStyle;
  exports.updateCardStyle = updateCardStyle;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  var _commonConfig = require("common/config/index");
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  /*客户信息服务：customer*/
  
  // 新增客户合作伙伴
  var ADD_ADMIN_CUSTOMER_PARTNER = 'ADD_ADMIN_CUSTOMER_PARTNER';
  exports.ADD_ADMIN_CUSTOMER_PARTNER = ADD_ADMIN_CUSTOMER_PARTNER;
  var ADD_ADMIN_CUSTOMER_PARTNER_PENDING = 'ADD_ADMIN_CUSTOMER_PARTNER_PENDING';
  exports.ADD_ADMIN_CUSTOMER_PARTNER_PENDING = ADD_ADMIN_CUSTOMER_PARTNER_PENDING;
  var ADD_ADMIN_CUSTOMER_PARTNER_SUCCESS = 'ADD_ADMIN_CUSTOMER_PARTNER_SUCCESS';
  exports.ADD_ADMIN_CUSTOMER_PARTNER_SUCCESS = ADD_ADMIN_CUSTOMER_PARTNER_SUCCESS;
  var ADD_ADMIN_CUSTOMER_PARTNER_FAILURE = 'ADD_ADMIN_CUSTOMER_PARTNER_FAILURE';
  
  exports.ADD_ADMIN_CUSTOMER_PARTNER_FAILURE = ADD_ADMIN_CUSTOMER_PARTNER_FAILURE;
  // 修改客户合作伙伴
  var UPDATE_ADMIN_CUSTOMER_PARTNER = 'UPDATE_ADMIN_CUSTOMER_PARTNER';
  exports.UPDATE_ADMIN_CUSTOMER_PARTNER = UPDATE_ADMIN_CUSTOMER_PARTNER;
  var UPDATE_ADMIN_CUSTOMER_PARTNER_PENDING = 'UPDATE_ADMIN_CUSTOMER_PARTNER_PENDING';
  exports.UPDATE_ADMIN_CUSTOMER_PARTNER_PENDING = UPDATE_ADMIN_CUSTOMER_PARTNER_PENDING;
  var UPDATE_ADMIN_CUSTOMER_PARTNER_SUCCESS = 'UPDATE_ADMIN_CUSTOMER_PARTNER_SUCCESS';
  exports.UPDATE_ADMIN_CUSTOMER_PARTNER_SUCCESS = UPDATE_ADMIN_CUSTOMER_PARTNER_SUCCESS;
  var UPDATE_ADMIN_CUSTOMER_PARTNER_FAILURE = 'UPDATE_ADMIN_CUSTOMER_PARTNER_FAILURE';
  
  exports.UPDATE_ADMIN_CUSTOMER_PARTNER_FAILURE = UPDATE_ADMIN_CUSTOMER_PARTNER_FAILURE;
  // 获取客户自有客户列表
  var GET_ADMIN_CUSTOMER_LIST = 'GET_ADMIN_CUSTOMER_LIST';
  exports.GET_ADMIN_CUSTOMER_LIST = GET_ADMIN_CUSTOMER_LIST;
  var GET_ADMIN_CUSTOMER_LIST_PENDING = 'GET_ADMIN_CUSTOMER_LIST_PENDING';
  exports.GET_ADMIN_CUSTOMER_LIST_PENDING = GET_ADMIN_CUSTOMER_LIST_PENDING;
  var GET_ADMIN_CUSTOMER_LIST_SUCCESS = 'GET_ADMIN_CUSTOMER_LIST_SUCCESS';
  exports.GET_ADMIN_CUSTOMER_LIST_SUCCESS = GET_ADMIN_CUSTOMER_LIST_SUCCESS;
  var GET_ADMIN_CUSTOMER_LIST_FAILURE = 'GET_ADMIN_CUSTOMER_LIST_FAILURE';
  
  exports.GET_ADMIN_CUSTOMER_LIST_FAILURE = GET_ADMIN_CUSTOMER_LIST_FAILURE;
  // 删除客户信息
  var DELETE_PLAT_ADMIN_CUSTOMER = 'DELETE_PLAT_ADMIN_CUSTOMER';
  exports.DELETE_PLAT_ADMIN_CUSTOMER = DELETE_PLAT_ADMIN_CUSTOMER;
  var DELETE_PLAT_ADMIN_CUSTOMER_PENDING = 'DELETE_PLAT_ADMIN_CUSTOMER_PENDING';
  exports.DELETE_PLAT_ADMIN_CUSTOMER_PENDING = DELETE_PLAT_ADMIN_CUSTOMER_PENDING;
  var DELETE_PLAT_ADMIN_CUSTOMER_SUCCESS = 'DELETE_PLAT_ADMIN_CUSTOMER_SUCCESS';
  exports.DELETE_PLAT_ADMIN_CUSTOMER_SUCCESS = DELETE_PLAT_ADMIN_CUSTOMER_SUCCESS;
  var DELETE_PLAT_ADMIN_CUSTOMER_FAILURE = 'DELETE_PLAT_ADMIN_CUSTOMER_FAILURE';
  
  exports.DELETE_PLAT_ADMIN_CUSTOMER_FAILURE = DELETE_PLAT_ADMIN_CUSTOMER_FAILURE;
  // 获取客户信息
  var GET_ADMIN_CUSTOMER = 'GET_ADMIN_CUSTOMER';
  exports.GET_ADMIN_CUSTOMER = GET_ADMIN_CUSTOMER;
  var GET_ADMIN_CUSTOMER_PENDING = 'GET_ADMIN_CUSTOMER_PENDING';
  exports.GET_ADMIN_CUSTOMER_PENDING = GET_ADMIN_CUSTOMER_PENDING;
  var GET_ADMIN_CUSTOMER_SUCCESS = 'GET_ADMIN_CUSTOMER_SUCCESS';
  exports.GET_ADMIN_CUSTOMER_SUCCESS = GET_ADMIN_CUSTOMER_SUCCESS;
  var GET_ADMIN_CUSTOMER_FAILURE = 'GET_ADMIN_CUSTOMER_FAILURE';
  
  exports.GET_ADMIN_CUSTOMER_FAILURE = GET_ADMIN_CUSTOMER_FAILURE;
  // 修改客户
  var UPDATE_ADMIN_CUSTOMER = 'UPDATE_ADMIN_CUSTOMER';
  exports.UPDATE_ADMIN_CUSTOMER = UPDATE_ADMIN_CUSTOMER;
  var UPDATE_ADMIN_CUSTOMER_PENDING = 'UPDATE_ADMIN_CUSTOMER_PENDING';
  exports.UPDATE_ADMIN_CUSTOMER_PENDING = UPDATE_ADMIN_CUSTOMER_PENDING;
  var UPDATE_ADMIN_CUSTOMER_SUCCESS = 'UPDATE_ADMIN_CUSTOMER_SUCCESS';
  exports.UPDATE_ADMIN_CUSTOMER_SUCCESS = UPDATE_ADMIN_CUSTOMER_SUCCESS;
  var UPDATE_ADMIN_CUSTOMER_FAILURE = 'UPDATE_ADMIN_CUSTOMER_FAILURE';
  
  exports.UPDATE_ADMIN_CUSTOMER_FAILURE = UPDATE_ADMIN_CUSTOMER_FAILURE;
  // 获取客户商城权限配置
  var GET_PLATFORM_CUSTOMER_MALL_AUTH = 'GET_PLATFORM_CUSTOMER_MALL_AUTH';
  exports.GET_PLATFORM_CUSTOMER_MALL_AUTH = GET_PLATFORM_CUSTOMER_MALL_AUTH;
  var GET_PLATFORM_CUSTOMER_MALL_AUTH_PENDING = 'GET_PLATFORM_CUSTOMER_MALL_AUTH_PENDING';
  exports.GET_PLATFORM_CUSTOMER_MALL_AUTH_PENDING = GET_PLATFORM_CUSTOMER_MALL_AUTH_PENDING;
  var GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS = 'GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS';
  exports.GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS = GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS;
  var GET_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE = 'GET_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE';
  
  exports.GET_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE = GET_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE;
  // 修改客户商城权限配置
  var UPDATE_PLATFORM_CUSTOMER_MALL_AUTH = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH';
  exports.UPDATE_PLATFORM_CUSTOMER_MALL_AUTH = UPDATE_PLATFORM_CUSTOMER_MALL_AUTH;
  var UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_PENDING = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_PENDING';
  exports.UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_PENDING = UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_PENDING;
  var UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS';
  exports.UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS = UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS;
  var UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE';
  
  exports.UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE = UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE;
  // 修改客户微信设置
  var UPDATE_CUSTOMER_WECHAT = 'UPDATE_CUSTOMER_WECHAT';
  exports.UPDATE_CUSTOMER_WECHAT = UPDATE_CUSTOMER_WECHAT;
  var UPDATE_CUSTOMER_WECHAT_PENDING = 'UPDATE_CUSTOMER_WECHAT_PENDING';
  exports.UPDATE_CUSTOMER_WECHAT_PENDING = UPDATE_CUSTOMER_WECHAT_PENDING;
  var UPDATE_CUSTOMER_WECHAT_SUCCESS = 'UPDATE_CUSTOMER_WECHAT_SUCCESS';
  exports.UPDATE_CUSTOMER_WECHAT_SUCCESS = UPDATE_CUSTOMER_WECHAT_SUCCESS;
  var UPDATE_CUSTOMER_WECHAT_FAILURE = 'UPDATE_CUSTOMER_WECHAT_FAILURE';
  
  exports.UPDATE_CUSTOMER_WECHAT_FAILURE = UPDATE_CUSTOMER_WECHAT_FAILURE;
  // 修改客户支付宝设置
  var UPDATE_CUSTOMER_ALIPAY = 'UPDATE_CUSTOMER_ALIPAY';
  exports.UPDATE_CUSTOMER_ALIPAY = UPDATE_CUSTOMER_ALIPAY;
  var UPDATE_CUSTOMER_ALIPAY_PENDING = 'UPDATE_CUSTOMER_ALIPAY_PENDING';
  exports.UPDATE_CUSTOMER_ALIPAY_PENDING = UPDATE_CUSTOMER_ALIPAY_PENDING;
  var UPDATE_CUSTOMER_ALIPAY_SUCCESS = 'UPDATE_CUSTOMER_ALIPAY_SUCCESS';
  exports.UPDATE_CUSTOMER_ALIPAY_SUCCESS = UPDATE_CUSTOMER_ALIPAY_SUCCESS;
  var UPDATE_CUSTOMER_ALIPAY_FAILURE = 'UPDATE_CUSTOMER_ALIPAY_FAILURE';
  
  exports.UPDATE_CUSTOMER_ALIPAY_FAILURE = UPDATE_CUSTOMER_ALIPAY_FAILURE;
  // 修改客户银联设置
  var UPDATE_CUSTOMER_UNIONPAY = 'UPDATE_CUSTOMER_UNIONPAY';
  exports.UPDATE_CUSTOMER_UNIONPAY = UPDATE_CUSTOMER_UNIONPAY;
  var UPDATE_CUSTOMER_UNIONPAY_PENDING = 'UPDATE_CUSTOMER_UNIONPAY_PENDING';
  exports.UPDATE_CUSTOMER_UNIONPAY_PENDING = UPDATE_CUSTOMER_UNIONPAY_PENDING;
  var UPDATE_CUSTOMER_UNIONPAY_SUCCESS = 'UPDATE_CUSTOMER_UNIONPAY_SUCCESS';
  exports.UPDATE_CUSTOMER_UNIONPAY_SUCCESS = UPDATE_CUSTOMER_UNIONPAY_SUCCESS;
  var UPDATE_CUSTOMER_UNIONPAY_FAILURE = 'UPDATE_CUSTOMER_UNIONPAY_FAILURE';
  
  exports.UPDATE_CUSTOMER_UNIONPAY_FAILURE = UPDATE_CUSTOMER_UNIONPAY_FAILURE;
  // 获取会员卡风格设置
  var GET_CARD_STYLE = 'GET_CARD_STYLE';
  exports.GET_CARD_STYLE = GET_CARD_STYLE;
  var GET_CARD_STYLE_PENDING = 'GET_CARD_STYLE_PENDING';
  exports.GET_CARD_STYLE_PENDING = GET_CARD_STYLE_PENDING;
  var GET_CARD_STYLE_SUCCESS = 'GET_CARD_STYLE_SUCCESS';
  exports.GET_CARD_STYLE_SUCCESS = GET_CARD_STYLE_SUCCESS;
  var GET_CARD_STYLE_FAILURE = 'GET_CARD_STYLE_FAILURE';
  
  exports.GET_CARD_STYLE_FAILURE = GET_CARD_STYLE_FAILURE;
  // 修改会员卡风格设置
  var UPDATE_CARD_STYLE = 'UPDATE_CARD_STYLE';
  exports.UPDATE_CARD_STYLE = UPDATE_CARD_STYLE;
  var UPDATE_CARD_STYLE_PENDING = 'UPDATE_CARD_STYLE_PENDING';
  exports.UPDATE_CARD_STYLE_PENDING = UPDATE_CARD_STYLE_PENDING;
  var UPDATE_CARD_STYLE_SUCCESS = 'UPDATE_CARD_STYLE_SUCCESS';
  exports.UPDATE_CARD_STYLE_SUCCESS = UPDATE_CARD_STYLE_SUCCESS;
  var UPDATE_CARD_STYLE_FAILURE = 'UPDATE_CARD_STYLE_FAILURE';
  
  exports.UPDATE_CARD_STYLE_FAILURE = UPDATE_CARD_STYLE_FAILURE;
  // 获取客户积分兑换设置
  var GET_INTEGRAL_EXCHANGE = 'GET_INTEGRAL_EXCHANGE';
  exports.GET_INTEGRAL_EXCHANGE = GET_INTEGRAL_EXCHANGE;
  var GET_INTEGRAL_EXCHANGE_PENDING = 'GET_INTEGRAL_EXCHANGE_PENDING';
  exports.GET_INTEGRAL_EXCHANGE_PENDING = GET_INTEGRAL_EXCHANGE_PENDING;
  var GET_INTEGRAL_EXCHANGE_SUCCESS = 'GET_INTEGRAL_EXCHANGE_SUCCESS';
  exports.GET_INTEGRAL_EXCHANGE_SUCCESS = GET_INTEGRAL_EXCHANGE_SUCCESS;
  var GET_INTEGRAL_EXCHANGE_FAILURE = 'GET_INTEGRAL_EXCHANGE_FAILURE';
  
  exports.GET_INTEGRAL_EXCHANGE_FAILURE = GET_INTEGRAL_EXCHANGE_FAILURE;
  // 修改客户积分兑换设置
  var UPDATE_INTEGRAL_EXCHANGE = 'UPDATE_INTEGRAL_EXCHANGE';
  exports.UPDATE_INTEGRAL_EXCHANGE = UPDATE_INTEGRAL_EXCHANGE;
  var UPDATE_INTEGRAL_EXCHANGE_PENDING = 'UPDATE_INTEGRAL_EXCHANGE_PENDING';
  exports.UPDATE_INTEGRAL_EXCHANGE_PENDING = UPDATE_INTEGRAL_EXCHANGE_PENDING;
  var UPDATE_INTEGRAL_EXCHANGE_SUCCESS = 'UPDATE_INTEGRAL_EXCHANGE_SUCCESS';
  exports.UPDATE_INTEGRAL_EXCHANGE_SUCCESS = UPDATE_INTEGRAL_EXCHANGE_SUCCESS;
  var UPDATE_INTEGRAL_EXCHANGE_FAILURE = 'UPDATE_INTEGRAL_EXCHANGE_FAILURE';
  
  exports.UPDATE_INTEGRAL_EXCHANGE_FAILURE = UPDATE_INTEGRAL_EXCHANGE_FAILURE;
  // 客户员工列表
  var GET_ADMIN_EMPLOYEE_LIST = 'GET_ADMIN_EMPLOYEE_LIST';
  exports.GET_ADMIN_EMPLOYEE_LIST = GET_ADMIN_EMPLOYEE_LIST;
  var GET_ADMIN_EMPLOYEE_LIST_PENDING = 'GET_ADMIN_EMPLOYEE_LIST_PENDING';
  exports.GET_ADMIN_EMPLOYEE_LIST_PENDING = GET_ADMIN_EMPLOYEE_LIST_PENDING;
  var GET_ADMIN_EMPLOYEE_LIST_SUCCESS = 'GET_ADMIN_EMPLOYEE_LIST_SUCCESS';
  exports.GET_ADMIN_EMPLOYEE_LIST_SUCCESS = GET_ADMIN_EMPLOYEE_LIST_SUCCESS;
  var GET_ADMIN_EMPLOYEE_LIST_FAILURE = 'GET_ADMIN_EMPLOYEE_LIST_FAILURE';
  
  exports.GET_ADMIN_EMPLOYEE_LIST_FAILURE = GET_ADMIN_EMPLOYEE_LIST_FAILURE;
  // 新增客户员工
  var ADD_ADMIN_EMPLOYEE = 'ADD_ADMIN_EMPLOYEE';
  exports.ADD_ADMIN_EMPLOYEE = ADD_ADMIN_EMPLOYEE;
  var ADD_ADMIN_EMPLOYEE_PENDING = 'ADD_ADMIN_EMPLOYEE_PENDING';
  exports.ADD_ADMIN_EMPLOYEE_PENDING = ADD_ADMIN_EMPLOYEE_PENDING;
  var ADD_ADMIN_EMPLOYEE_SUCCESS = 'ADD_ADMIN_EMPLOYEE_SUCCESS';
  exports.ADD_ADMIN_EMPLOYEE_SUCCESS = ADD_ADMIN_EMPLOYEE_SUCCESS;
  var ADD_ADMIN_EMPLOYEE_FAILURE = 'ADD_ADMIN_EMPLOYEE_FAILURE';
  
  exports.ADD_ADMIN_EMPLOYEE_FAILURE = ADD_ADMIN_EMPLOYEE_FAILURE;
  // 修改客户员工
  var UPDATE_ADMIN_EMPLOYEE = 'UPDATE_ADMIN_EMPLOYEE';
  exports.UPDATE_ADMIN_EMPLOYEE = UPDATE_ADMIN_EMPLOYEE;
  var UPDATE_ADMIN_EMPLOYEE_PENDING = 'UPDATE_ADMIN_EMPLOYEE_PENDING';
  exports.UPDATE_ADMIN_EMPLOYEE_PENDING = UPDATE_ADMIN_EMPLOYEE_PENDING;
  var UPDATE_ADMIN_EMPLOYEE_SUCCESS = 'UPDATE_ADMIN_EMPLOYEE_SUCCESS';
  exports.UPDATE_ADMIN_EMPLOYEE_SUCCESS = UPDATE_ADMIN_EMPLOYEE_SUCCESS;
  var UPDATE_ADMIN_EMPLOYEE_FAILURE = 'UPDATE_ADMIN_EMPLOYEE_FAILURE';
  
  exports.UPDATE_ADMIN_EMPLOYEE_FAILURE = UPDATE_ADMIN_EMPLOYEE_FAILURE;
  // 修改客户员工状态
  var UPDATE_ADMIN_EMPLOYEE_STATUS = 'UPDATE_ADMIN_EMPLOYEE_STATUS';
  exports.UPDATE_ADMIN_EMPLOYEE_STATUS = UPDATE_ADMIN_EMPLOYEE_STATUS;
  var UPDATE_ADMIN_EMPLOYEE_STATUS_PENDING = 'UPDATE_ADMIN_EMPLOYEE_STATUS_PENDING';
  exports.UPDATE_ADMIN_EMPLOYEE_STATUS_PENDING = UPDATE_ADMIN_EMPLOYEE_STATUS_PENDING;
  var UPDATE_ADMIN_EMPLOYEE_STATUS_SUCCESS = 'UPDATE_ADMIN_EMPLOYEE_STATUS_SUCCESS';
  exports.UPDATE_ADMIN_EMPLOYEE_STATUS_SUCCESS = UPDATE_ADMIN_EMPLOYEE_STATUS_SUCCESS;
  var UPDATE_ADMIN_EMPLOYEE_STATUS_FAILURE = 'UPDATE_ADMIN_EMPLOYEE_STATUS_FAILURE';
  
  exports.UPDATE_ADMIN_EMPLOYEE_STATUS_FAILURE = UPDATE_ADMIN_EMPLOYEE_STATUS_FAILURE;
  // 设置客户员工激励
  var UPDATE_ADMIN_EMPLOYEE_EXCITATION = 'UPDATE_ADMIN_EMPLOYEE_EXCITATION';
  exports.UPDATE_ADMIN_EMPLOYEE_EXCITATION = UPDATE_ADMIN_EMPLOYEE_EXCITATION;
  var UPDATE_ADMIN_EMPLOYEE_EXCITATION_PENDING = 'UPDATE_ADMIN_EMPLOYEE_EXCITATION_PENDING';
  exports.UPDATE_ADMIN_EMPLOYEE_EXCITATION_PENDING = UPDATE_ADMIN_EMPLOYEE_EXCITATION_PENDING;
  var UPDATE_ADMIN_EMPLOYEE_EXCITATION_SUCCESS = 'UPDATE_ADMIN_EMPLOYEE_EXCITATION_SUCCESS';
  exports.UPDATE_ADMIN_EMPLOYEE_EXCITATION_SUCCESS = UPDATE_ADMIN_EMPLOYEE_EXCITATION_SUCCESS;
  var UPDATE_ADMIN_EMPLOYEE_EXCITATION_FAILURE = 'UPDATE_ADMIN_EMPLOYEE_EXCITATION_FAILURE';
  exports.UPDATE_ADMIN_EMPLOYEE_EXCITATION_FAILURE = UPDATE_ADMIN_EMPLOYEE_EXCITATION_FAILURE;
  // 获取客户员工激励
  var GET_ADMIN_EMPLOYEE_EXCITATION = 'GET_ADMIN_EMPLOYEE_EXCITATION';
  exports.GET_ADMIN_EMPLOYEE_EXCITATION = GET_ADMIN_EMPLOYEE_EXCITATION;
  var GET_ADMIN_EMPLOYEE_EXCITATION_PENDING = 'GET_ADMIN_EMPLOYEE_EXCITATION_PENDING';
  exports.GET_ADMIN_EMPLOYEE_EXCITATION_PENDING = GET_ADMIN_EMPLOYEE_EXCITATION_PENDING;
  var GET_ADMIN_EMPLOYEE_EXCITATION_SUCCESS = 'GET_ADMIN_EMPLOYEE_EXCITATION_SUCCESS';
  exports.GET_ADMIN_EMPLOYEE_EXCITATION_SUCCESS = GET_ADMIN_EMPLOYEE_EXCITATION_SUCCESS;
  var GET_ADMIN_EMPLOYEE_EXCITATION_FAILURE = 'GET_ADMIN_EMPLOYEE_EXCITATION_FAILURE';
  
  exports.GET_ADMIN_EMPLOYEE_EXCITATION_FAILURE = GET_ADMIN_EMPLOYEE_EXCITATION_FAILURE;
  // 删除客户信息
  
  function deletePlatAdminCustomer(id) {
      return {
          type: DELETE_PLAT_ADMIN_CUSTOMER,
          payload: {
              promise: _commonHttp2["default"]["delete"]('platadmin/customer/{id}', {
                  id: id
              })
          }
      };
  }
  
  // 获取客户信息
  
  function getAdminCustomer() {
      return {
          type: GET_ADMIN_CUSTOMER,
          payload: {
              promise: _commonHttp2["default"].get('admin/customer/uin')
          }
      };
  }
  
  // 修改客户信息
  
  function updateAdminCustomer(para) {
      return {
          type: UPDATE_ADMIN_CUSTOMER,
          payload: {
              promise: _commonHttp2["default"].post('admin/customer/{id}', para, {
                  params: {
                      id: para.id
                  }
              })
          }
      };
  }
  
  // 修改客户合作伙伴
  
  function updateAdminCustomerPartner(_ref) {
      var id = _ref.id;
      var name = _ref.name;
      var contact = _ref.contact;
      var logo = _ref.logo;
  
      return {
          type: UPDATE_ADMIN_CUSTOMER_PARTNER,
          payload: {
              promise: _commonHttp2["default"].post('admin/customer/partner/info/{id}', {
                  name: name,
                  logo: logo,
                  contact: {
                      name: contact.name,
                      mobile: contact.mobile,
                      email: contact.email
                  }
              }, {
                  params: {
                      id: id
                  }
              })
          }
      };
  }
  
  // 新增客户合作伙伴
  
  function addAdminCustomerPartner(customerId, para) {
      return {
          type: ADD_ADMIN_CUSTOMER_PARTNER,
          payload: {
              promise: _commonHttp2["default"].post('admin/customer/partner/{customerId}', para, {
                  params: {
                      customerId: customerId
                  }
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
  /*{
   "brandAuth": "FALSE",
   "contentAuth": "FALSE",
   "mallAuth": "FALSE",
   "mallOpMode": "S",
   "partnerAuth": "FALSE",
   "yygAuth": "FALSE"
   }*/
  
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
  
  // 修改客户微信设置
  /*{
   "appid": "string",
   "enable": true,
   "muchId": "string",
   "muchKey": "string",
   "secret": "string"
   "useSys": true
   }*/
  
  function updateCustomerWechat(id, data) {
      return {
          type: UPDATE_CUSTOMER_WECHAT,
          payload: {
              promise: _commonHttp2["default"].post('admin/customer/wechat/{id}', data, {
                  params: {
                      id: id
                  }
              })
          }
      };
  }
  
  // 修改客户支付宝设置
  /*
   {
   "account": "string",
   "enable": true,
   "key": "string",
   "pid": "string",
   "useSys": true
   }
   */
  
  function updateCustomerAlipay(id, data) {
      return {
          type: UPDATE_CUSTOMER_ALIPAY,
          payload: {
              promise: _commonHttp2["default"].post('admin/customer/alipay/{id}', data, {
                  params: {
                      id: id
                  }
              })
          }
      };
  }
  
  // 修改银联设置
  
  function updateCustomerUnionpay(_ref2) {
      var id = _ref2.id;
      var data = _ref2.data;
  
      return {
          type: UPDATE_CUSTOMER_UNIONPAY,
          payload: {
              promise: _commonHttp2["default"].post('admin/customer/unionpay/{id}', data, {
                  params: {
                      id: id
                  }
              })
          }
      };
  }
  
  // 获取客户列表
  
  function getAdminCustomerList(_ref3) {
      var _ref3$type = _ref3.type;
      var type = _ref3$type === undefined ? 'PARTNER' : _ref3$type;
      var partnerId = _ref3.partnerId;
      var _ref3$page = _ref3.page;
      var page = _ref3$page === undefined ? 0 : _ref3$page;
      var _ref3$size = _ref3.size;
      var size = _ref3$size === undefined ? _commonConfig2["default"].SIZE : _ref3$size;
      var sort = _ref3.sort;
      var order = _ref3.order;
  
      return {
          type: GET_ADMIN_CUSTOMER_LIST,
          payload: {
              promise: _commonHttp2["default"].get('admin/customer/list', {
                  type: type,
                  partnerId: partnerId,
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
              })
          }
      };
  }
  
  //获取客户积分兑换设置
  
  function getIntegralExchange() {
      return {
          type: GET_INTEGRAL_EXCHANGE,
          payload: {
              promise: _commonHttp2["default"].get('admin/customer/integral/exchange')
          }
      };
  }
  
  //修改客户积分兑换设置
  
  function updateIntegralExchange(data) {
      return {
          type: UPDATE_INTEGRAL_EXCHANGE,
          payload: {
              promise: _commonHttp2["default"].post('admin/customer/integral/exchange/{id}', data.para, {
                  params: {
                      id: data.id,
                      value: data.para.integral
                  }
              })
          }
      };
  }
  
  // 获取会员卡风格
  
  function getCardStyle(id) {
      return {
          type: GET_CARD_STYLE,
          payload: {
              promise: _commonHttp2["default"].get('admin/customer/member/card/style')
          }
      };
  }
  
  // 设置会员卡风格
  
  function updateCardStyle(id, para) {
      return {
          type: UPDATE_CARD_STYLE,
          payload: {
              promise: _commonHttp2["default"].post('admin/customer/member/card/style/{id}', {
                  title: para.title,
                  style: para.style
              }, {
                  params: {
                      id: id
                  }
              })
          }
      };
  }

});
