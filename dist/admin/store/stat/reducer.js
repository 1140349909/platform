define('admin/store/stat/reducer', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createReducer;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var _reduxImmutablejs = require("node_modules/redux-immutablejs/lib/index");
  
  var _immutable = require("node_modules/immutable/dist/immutable");
  
  var _commonUtilMedia = require("common/util/media");
  
  var _lodash = require('node_modules/lodash/lodash');
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _action = require("admin/store/stat/action");
  
  var initialState = (0, _immutable.fromJS)({
  
      // 一元购商城列表
      productSales: null,
  
      // 总销售额
      total: null,
  
      totalSales: null
  });
  
  exports["default"] = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _action.GET_DATA_PRODUCT_TOTAL_SALES_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
      return state.set("totalSales", payload.data);
  }), _defineProperty(_createReducer, _action.GET_DATA_PRODUCT_SALES_SUCCESS, function (state, _ref2) {
      var payload = _ref2.payload;
  
      var data = {
          total: {
              amount: 0,
              salesAmount: 0,
              profitAmount: 0
          }
      };
  
      var mall = payload[0].data;
      var yyg = payload[1].data;
  
      if (_lodash2["default"].isEmpty(mall) || mall.details.length == 0) {
          mall = null;
      } else {
          data.mall = mall;
      }
  
      if (_lodash2["default"].isEmpty(yyg) || yyg.details.length == 0) {
          yyg = null;
      } else {
          data.yyg = yyg;
      }
  
      if (yyg !== null) {
          data.total.amount = data.total.amount + yyg.total.amount;
          data.total.salesAmount = data.total.salesAmount + yyg.total.salesAmount;
          data.total.profitAmount = data.total.profitAmount + yyg.total.profitAmount;
      }
  
      if (mall !== null) {
          data.total.amount = data.total.amount + mall.total.amount;
          data.total.salesAmount = data.total.salesAmount + mall.total.salesAmount;
          data.total.profitAmount = data.total.profitAmount + mall.total.profitAmount;
      }
  
      data.total.salesAmount = data.total.salesAmount / 100;
      data.total.profitAmount = data.total.profitAmount / 100;
  
      return state.set('productSales', data);
  }), _defineProperty(_createReducer, _action.GET_DATA_PRODUCT_SALES_MALL_SUCCESS, function (state, _ref3) {
      var payload = _ref3.payload;
      return state.set('mallDataList', payload.data);
  }), _defineProperty(_createReducer, _action.GET_DATA_PRODUCT_SALES_YYG_SUCCESS, function (state, _ref4) {
      var payload = _ref4.payload;
      return state.set('yygDataList', payload.data);
  }), _createReducer));
  module.exports = exports["default"];
  
  // 总计销售统计数据
  
  // 获取商品销售统计数据
  
  // 获取商品销售统计数据
  
  // 获取一元购商品销售统计数据

});
