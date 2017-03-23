define('admin/store/trade/reducer', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createReducer;
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var _reduxImmutablejs = require("node_modules/redux-immutablejs/lib/index");
  
  var _immutable = require("node_modules/immutable/dist/immutable");
  
  var _action = require("admin/store/trade/action");
  
  var _adminStoreStatAction = require("admin/store/stat/action");
  
  var initialState = (0, _immutable.fromJS)({
      list: {},
      data: {},
      total: '',
      items: {}
  });
  
  exports["default"] = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _action.GET_TRADE_LIST_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
  
      var items = {};
      payload.data.content.forEach(function (item, index) {
          items[item.id] = item;
      });
  
      return state.merge({
          list: payload.data,
          items: items
      });
  }), _defineProperty(_createReducer, _action.GET_TRADE_SHOW_LIST_SUCCESS, function (state, _ref2) {
      var payload = _ref2.payload;
  
      var items = [];
  
      payload.data.content.forEach(function (item) {
          items[item.id] = item;
      });
  
      return state.merge({
          data: payload.data.content,
          total: payload.data.totalElements,
          items: items
      });
  }), _defineProperty(_createReducer, _adminStoreStatAction.GET_DATA_PRODUCT_TOTAL_SALES_SUCCESS, function (state, _ref3) {
      var payload = _ref3.payload;
      return state.set('saleTotal', payload.data);
  }), _createReducer));
  module.exports = exports["default"];
  
  // 获取交易列表成功
  
  // 获取交易晒单列表成功
  
  // 总计销售统计数据

});
