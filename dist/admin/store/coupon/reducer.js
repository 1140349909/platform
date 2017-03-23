define('admin/store/coupon/reducer', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createReducer;
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var _reduxImmutablejs = require("node_modules/redux-immutablejs/lib/index");
  
  var _immutable = require("node_modules/immutable/dist/immutable");
  
  var _action = require("admin/store/coupon/action");
  
  var initialState = (0, _immutable.fromJS)({
      item: {},
  
      list: {},
  
      resList: {},
  
      faceValueList: {}
  
  });
  
  exports["default"] = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _action.GET_COUPON_FACE_VALUE_LIST_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
      return state.set('faceValueList', payload.data);
  }), _defineProperty(_createReducer, _action.GET_COUPON_SUCCESS, function (state, _ref2) {
      var payload = _ref2.payload;
      return state.set('item', payload.data);
  }), _defineProperty(_createReducer, _action.GET_COUPON_LIST_SUCCESS, function (state, _ref3) {
      var payload = _ref3.payload;
      return state.set('list', payload.data);
  }), _defineProperty(_createReducer, _action.GET_COUPON_RES_LIST_SUCCESS, function (state, _ref4) {
      var payload = _ref4.payload;
  
      var resContent = [];
  
      payload.data.content.forEach(function (item) {
          resContent.push(item.resId);
      });
  
      return state.merge({
          "resContent": resContent,
          "resList": payload.data
      });
  }), _createReducer));
  module.exports = exports["default"];
  
  // 获取优惠券面值列表成功返回
  
  // 获取优惠券成功返回
  
  // 获取优惠券列表成功返回
  
  // 获取优惠券资源绑定列表成功返回

});
