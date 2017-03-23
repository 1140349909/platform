define('admin/store/integral/reducer', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createReducer;
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var _reduxImmutablejs = require("node_modules/redux-immutablejs/lib/index");
  
  var _immutable = require("node_modules/immutable/dist/immutable");
  
  var _action = require("admin/store/integral/action");
  
  var initialState = (0, _immutable.fromJS)({
  
      list: {},
  
      resList: {},
  
      resContent: []
  });
  
  exports["default"] = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _action.GET_INTEGRAL_LIST_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
      return state.set('list', payload.data);
  }), _defineProperty(_createReducer, _action.GET_INTEGRAL_SUCCESS, function (state, _ref2) {
      var payload = _ref2.payload;
      return state.set('item', payload.data);
  }), _defineProperty(_createReducer, _action.GET_INTEGRAL_RES_LIST_SUCCESS, function (state, _ref3) {
      var payload = _ref3.payload;
  
      var resContent = [];
  
      payload.data.content.forEach(function (item, index) {
          resContent.push(item.resId);
      });
  
      return state.merge({
          "resContent": resContent,
          "resList": payload.data
      });
  }), _createReducer));
  module.exports = exports["default"];
  
  // 获取积分列表成功返回
  
  // 获取积分成功返回
  
  // 获取积分资源绑定列表成功返回

});
