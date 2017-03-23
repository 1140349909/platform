define('admin/store/member/reducer', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createReducer;
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var _reduxImmutablejs = require("node_modules/redux-immutablejs/lib/index");
  
  var _immutable = require("node_modules/immutable/dist/immutable");
  
  var _action = require("admin/store/member/action");
  
  var initialState = (0, _immutable.fromJS)({
  
      // 会员列表
      list: {},
  
      // 会员商城订单列表
      mallOrderList: {}
  });
  
  exports["default"] = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _action.GET_MEMBER_LIST_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
      return state.set("list", payload.data);
  }), _defineProperty(_createReducer, _action.GET_MEMBER_MALL_ORDER_LIST_SUCCESS, function (state, _ref2) {
      var payload = _ref2.payload;
      return state.set("mallOrderList", payload.data);
  }), _createReducer));
  module.exports = exports["default"];
  
  // 获取会员列表
  
  // 获取会员商城订单列表

});
