define('platform/store/company/reducer', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createReducer;
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var _reduxImmutablejs = require('node_modules/redux-immutablejs/lib/index');
  
  var _immutable = require('node_modules/immutable/dist/immutable');
  
  var _action = require('platform/store/company/action');
  
  var initialState = (0, _immutable.fromJS)({
      // 企业信息
      item: {},
      // 企业列表
      list: {},
      // 企业权限
      mallAuth: {}
  });
  
  exports['default'] = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _action.GET_PLATFORM_CUSTOMER_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
      return state.set("item", payload.data);
  }), _defineProperty(_createReducer, _action.GET_PLATFORM_CUSTOMERS_SUCCESS, function (state, _ref2) {
      var payload = _ref2.payload;
      return state.set("list", payload.data);
  }), _defineProperty(_createReducer, _action.GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS, function (state, _ref3) {
      var payload = _ref3.payload;
  
      payload.data.id = payload.params.id;
      return state.set('mallAuth', payload.data);
  }), _createReducer));
  module.exports = exports['default'];
  
  // 获取企业信息
  
  // 获取企业列表
  
  // 获取企业权限

});
