define('admin/store/customer/reducer', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createReducer;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var _reduxImmutablejs = require("node_modules/redux-immutablejs/lib/index");
  
  var _immutable = require("node_modules/immutable/dist/immutable");
  
  var _commonUtilIndex = require("common/util/index");
  
  var _lodash = require("node_modules/lodash/lodash");
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _action = require("admin/store/customer/action");
  
  var initialState = (0, _immutable.fromJS)({
  
      // 客户信息
      customerInfo: {},
  
      // 获取激励信息
      excitation: '',
  
      // 获取客户列表
      customerList: {},
  
      // 获取客户员工列表
      employeeList: {},
      // 会员卡样式
      cardStyle: {},
  
      // 获取积分
      integral: 0
  
  });
  
  exports["default"] = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _action.GET_ADMIN_CUSTOMER_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
  
      //修复积分无法提交的bug
      var data = _lodash2["default"].assign({
          contact: {}
      }, payload.data);
  
      return state.set('customerInfo', data);
  }), _defineProperty(_createReducer, _action.GET_INTEGRAL_EXCHANGE_SUCCESS, function (state, _ref2) {
      var payload = _ref2.payload;
  
      var data = _lodash2["default"].assign({
          integral: 0
      }, payload.data);
  
      return state.set('integral', data.integral);
  }), _defineProperty(_createReducer, _action.UPDATE_INTEGRAL_EXCHANGE_SUCCESS, function (state, _ref3) {
      var payload = _ref3.payload;
      return state.set('integral', payload.params.value);
  }), _defineProperty(_createReducer, _action.GET_ADMIN_CUSTOMER_LIST_SUCCESS, function (state, _ref4) {
      var payload = _ref4.payload;
      return state.set('customerList', payload.data);
  }), _defineProperty(_createReducer, _action.GET_CARD_STYLE_SUCCESS, function (state, _ref5) {
      var payload = _ref5.payload;
      return state.set('cardStyle', payload.data);
  }), _defineProperty(_createReducer, _action.GET_ADMIN_EMPLOYEE_LIST_SUCCESS, function (state, _ref6) {
      var payload = _ref6.payload;
      return state.set('employeeList', payload.data);
  }), _defineProperty(_createReducer, _action.GET_ADMIN_EMPLOYEE_EXCITATION_SUCCESS, function (state, _ref7) {
      var payload = _ref7.payload;
      return state.set('excitation', payload.data);
  }), _createReducer));
  module.exports = exports["default"];
  
  // 获取客户信息
  
  // 获取客户积分兑换信息
  
  // 获取客户积分兑换信息
  
  // 获取客户列表
  
  // 获取会员卡风格
  
  // 获取客户员工列表
  
  // 获取激励

});
