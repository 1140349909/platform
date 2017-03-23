define('admin/store/tker/reducer', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createReducer;
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var _reduxImmutablejs = require("node_modules/redux-immutablejs/lib/index");
  
  var _immutable = require("node_modules/immutable/dist/immutable");
  
  var _action = require("admin/store/tker/action");
  
  var _commonUtilMedia = require("common/util/media");
  
  var initialState = (0, _immutable.fromJS)({
      // 商品分销设置数据
      settingData: null,
  
      // 获取客户分销平台汇总数据
      tkerData: null,
  
      // TOP商品列表
      productTopList: [],
  
      // TOP会员列表
      memberTopList: []
  });
  
  exports["default"] = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _action.GET_MANAGER_TKER_CONFIG_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
  
      var settingData = null;
      if (payload.data) {
          settingData = payload.data;
      }
      return state.set('settingData', settingData);
  }), _defineProperty(_createReducer, _action.GET_MANAGER_TKER_PRODUCT_TOP_SUCCESS, function (state, _ref2) {
      var payload = _ref2.payload;
      return state.set('productTopList', payload.data);
  }), _defineProperty(_createReducer, _action.GET_MANAGER_TKER_MEMBER_TOP_SUCCESS, function (state, _ref3) {
      var payload = _ref3.payload;
      return state.set('memberTopList', payload.data);
  }), _defineProperty(_createReducer, _action.GET_MANAGER_TKER_DATA_TOTAL_SUCCESS, function (state, _ref4) {
      var payload = _ref4.payload;
      return state.set('tkerData', payload.data.tkerData);
  }), _createReducer));
  module.exports = exports["default"];
  
  // 获取商品分销设置数据
  
  // 获取客户分销商品TOP榜
  
  // 获取客户分销会员TOP榜
  
  // 获取客户分销平台汇总数据

});
