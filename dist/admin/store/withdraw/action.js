define('admin/store/withdraw/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports.getManagerWithdrawList = getManagerWithdrawList;
  exports.updateManagerWithdrawStatus = updateManagerWithdrawStatus;
  exports.updateManagerWithdrawConfirm = updateManagerWithdrawConfirm;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  var _commonConfig = require("common/config/index");
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  /*平台现金管理服务：withdraw*/
  
  // 客户会员提现列表
  var GET_MANAGER_WITHDRAW_LIST = 'GET_MANAGER_WITHDRAW_LIST';
  exports.GET_MANAGER_WITHDRAW_LIST = GET_MANAGER_WITHDRAW_LIST;
  var GET_MANAGER_WITHDRAW_LIST_PENDING = 'GET_MANAGER_WITHDRAW_LIST_PENDING';
  exports.GET_MANAGER_WITHDRAW_LIST_PENDING = GET_MANAGER_WITHDRAW_LIST_PENDING;
  var GET_MANAGER_WITHDRAW_LIST_SUCCESS = 'GET_MANAGER_WITHDRAW_LIST_SUCCESS';
  exports.GET_MANAGER_WITHDRAW_LIST_SUCCESS = GET_MANAGER_WITHDRAW_LIST_SUCCESS;
  var GET_MANAGER_WITHDRAW_LIST_FAILURE = 'GET_MANAGER_WITHDRAW_LIST_FAILURE';
  
  exports.GET_MANAGER_WITHDRAW_LIST_FAILURE = GET_MANAGER_WITHDRAW_LIST_FAILURE;
  // 获取会员现金提现处理状态
  var UPDATE_MANAGER_WITHDRAW_STATUS = 'UPDATE_MANAGER_WITHDRAW_STATUS';
  exports.UPDATE_MANAGER_WITHDRAW_STATUS = UPDATE_MANAGER_WITHDRAW_STATUS;
  var UPDATE_MANAGER_WITHDRAW_STATUS_PENDING = 'UPDATE_MANAGER_WITHDRAW_STATUS_PENDING';
  exports.UPDATE_MANAGER_WITHDRAW_STATUS_PENDING = UPDATE_MANAGER_WITHDRAW_STATUS_PENDING;
  var UPDATE_MANAGER_WITHDRAW_STATUS_SUCCESS = 'UPDATE_MANAGER_WITHDRAW_STATUS_SUCCESS';
  exports.UPDATE_MANAGER_WITHDRAW_STATUS_SUCCESS = UPDATE_MANAGER_WITHDRAW_STATUS_SUCCESS;
  var UPDATE_MANAGER_WITHDRAW_STATUS_FAILURE = 'UPDATE_MANAGER_WITHDRAW_STATUS_FAILURE';
  
  exports.UPDATE_MANAGER_WITHDRAW_STATUS_FAILURE = UPDATE_MANAGER_WITHDRAW_STATUS_FAILURE;
  // 确认会员现金提现
  var UPDATE_MANAGER_WITHDRAW_CONFIRM = 'UPDATE_MANAGER_WITHDRAW_CONFIRM';
  exports.UPDATE_MANAGER_WITHDRAW_CONFIRM = UPDATE_MANAGER_WITHDRAW_CONFIRM;
  var UPDATE_MANAGER_WITHDRAW_CONFIRM_PENDING = 'UPDATE_MANAGER_WITHDRAW_CONFIRM_PENDING';
  exports.UPDATE_MANAGER_WITHDRAW_CONFIRM_PENDING = UPDATE_MANAGER_WITHDRAW_CONFIRM_PENDING;
  var UPDATE_MANAGER_WITHDRAW_CONFIRM_SUCCESS = 'UPDATE_MANAGER_WITHDRAW_CONFIRM_SUCCESS';
  exports.UPDATE_MANAGER_WITHDRAW_CONFIRM_SUCCESS = UPDATE_MANAGER_WITHDRAW_CONFIRM_SUCCESS;
  var UPDATE_MANAGER_WITHDRAW_CONFIRM_FAILURE = 'UPDATE_MANAGER_WITHDRAW_CONFIRM_FAILURE';
  
  exports.UPDATE_MANAGER_WITHDRAW_CONFIRM_FAILURE = UPDATE_MANAGER_WITHDRAW_CONFIRM_FAILURE;
  /*平台现金管理服务：完*/
  
  // 返回当前客户的所有会员提现列表
  
  function getManagerWithdrawList(_ref) {
      var _ref$status = _ref.status;
      var status = _ref$status === undefined ? 'news' : _ref$status;
      var mobile = _ref.mobile;
      var _ref$page = _ref.page;
      var page = _ref$page === undefined ? 0 : _ref$page;
      var _ref$size = _ref.size;
      var size = _ref$size === undefined ? 10 : _ref$size;
      var sort = _ref.sort;
      var order = _ref.order;
  
      return {
          type: GET_MANAGER_WITHDRAW_LIST,
          payload: {
              promise: _commonHttp2["default"].get(_commonConfig2["default"].API_ROOT + '/api/cash/manager/withdraw/{status}/list', {
                  status: status,
                  mobile: mobile,
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
  
              })
          }
      };
  }
  
  // 提供获取会员现金提现处理状态服务
  
  function updateManagerWithdrawStatus(data) {
      return {
          type: UPDATE_MANAGER_WITHDRAW_STATUS,
          payload: {
              promise: _commonHttp2["default"].post(_commonConfig2["default"].API_ROOT + '/api/cash/manager/withdraw/status', data)
          }
      };
  }
  
  // 提供确认对会员提现自己的现金服务
  
  function updateManagerWithdrawConfirm(data) {
      return {
          type: UPDATE_MANAGER_WITHDRAW_CONFIRM,
          payload: {
              promise: _commonHttp2["default"].post(_commonConfig2["default"].API_ROOT + '/api/cash/manager/withdraw/confirmation', data)
          }
      };
  }

});
