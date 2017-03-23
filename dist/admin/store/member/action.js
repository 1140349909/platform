define('admin/store/member/action', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports.getMemberList = getMemberList;
  exports.getMemberMallOrdersList = getMemberMallOrdersList;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  // 获取会员列表
  var GET_MEMBER_LIST = 'GET_MEMBER_LIST';
  exports.GET_MEMBER_LIST = GET_MEMBER_LIST;
  var GET_MEMBER_LIST_PENDING = 'GET_MEMBER_LIST_PENDING';
  exports.GET_MEMBER_LIST_PENDING = GET_MEMBER_LIST_PENDING;
  var GET_MEMBER_LIST_SUCCESS = 'GET_MEMBER_LIST_SUCCESS';
  exports.GET_MEMBER_LIST_SUCCESS = GET_MEMBER_LIST_SUCCESS;
  var GET_MEMBER_LIST_FAILURE = 'GET_MEMBER_LIST_FAILURE';
  
  exports.GET_MEMBER_LIST_FAILURE = GET_MEMBER_LIST_FAILURE;
  // 获取会员商城订单列表
  var GET_MEMBER_MALL_ORDER_LIST = 'GET_MEMBER_MALL_ORDER_LIST';
  exports.GET_MEMBER_MALL_ORDER_LIST = GET_MEMBER_MALL_ORDER_LIST;
  var GET_MEMBER_MALL_ORDER_LIST_PENDING = 'GET_MEMBER_MALL_ORDER_LIST_PENDING';
  exports.GET_MEMBER_MALL_ORDER_LIST_PENDING = GET_MEMBER_MALL_ORDER_LIST_PENDING;
  var GET_MEMBER_MALL_ORDER_LIST_SUCCESS = 'GET_MEMBER_MALL_ORDER_LIST_SUCCESS';
  exports.GET_MEMBER_MALL_ORDER_LIST_SUCCESS = GET_MEMBER_MALL_ORDER_LIST_SUCCESS;
  var GET_MEMBER_MALL_ORDER_LIST_FAILURE = 'GET_MEMBER_MALL_ORDER_LIST_FAILURE';
  
  exports.GET_MEMBER_MALL_ORDER_LIST_FAILURE = GET_MEMBER_MALL_ORDER_LIST_FAILURE;
  // 获取会员列表
  
  function getMemberList(_ref) {
      var _ref$page = _ref.page;
      var page = _ref$page === undefined ? 0 : _ref$page;
      var _ref$size = _ref.size;
      var size = _ref$size === undefined ? 10 : _ref$size;
      var sort = _ref.sort;
      var order = _ref.order;
  
      return {
          type: GET_MEMBER_LIST,
          payload: {
              promise: _commonHttp2['default'].get('admin/member/list', {
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
              })
          }
      };
  }
  
  //获取会员商城订单列表
  
  function getMemberMallOrdersList(_ref2) {
      var id = _ref2.id;
      var payType = _ref2.payType;
      var tradeStatus = _ref2.tradeStatus;
      var _ref2$page = _ref2.page;
      var page = _ref2$page === undefined ? 0 : _ref2$page;
      var _ref2$size = _ref2.size;
      var size = _ref2$size === undefined ? 10 : _ref2$size;
      var sort = _ref2.sort;
      var order = _ref2.order;
  
      return {
          type: GET_MEMBER_MALL_ORDER_LIST,
          payload: {
              promise: _commonHttp2['default'].get('admin/member/mall/orders/{memberId}', {
  
                  memberId: id,
                  payType: payType,
                  tradeStatus: tradeStatus,
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
              })
          }
      };
  }

});
