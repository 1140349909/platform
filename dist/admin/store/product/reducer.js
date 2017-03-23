define('admin/store/product/reducer', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createReducer;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var _reduxImmutablejs = require("node_modules/redux-immutablejs/lib/index");
  
  var _immutable = require("node_modules/immutable/dist/immutable");
  
  var _commonUtil = require("common/util/index");
  
  var _commonUtilMedia = require("common/util/media");
  
  var _lodash = require('node_modules/lodash/lodash');
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _action = require("admin/store/product/action");
  
  var initialState = (0, _immutable.fromJS)({
      current: '',
  
      // 当前item
      item: null,
  
      // 列表map
      items: {},
  
      // 列表数据
      list: {},
  
      // 上架商品列表
      openingList: {},
  
      // 获取当前账户下的客户所有可添加到指定交易渠道的商品
      buyChannelList: {},
  
      // 获取已开通推客列表
      tkerProductList: {},
  
      // 获取可开通推客列表成功
      tkerEnableList: [],
  
      // 获取商品推客分销数据
      tkerItem: null
  });
  
  exports["default"] = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _action.ADD_PRODUCT_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
  
      return state.set('item', { id: payload.data });
  }), _defineProperty(_createReducer, _action.UPDATE_PRODUCT_SUCCESS, function (state, _ref2) {
      var payload = _ref2.payload;
      return state.set('item', payload.params);
  }), _defineProperty(_createReducer, _action.GET_PRODUCT_SUCCESS, function (state, _ref3) {
      var payload = _ref3.payload;
      return state.set('item', _resolveItem(payload.data));
  }), _defineProperty(_createReducer, _action.GET_PRODUCTS_SUCCESS, function (state, _ref4) {
      var payload = _ref4.payload;
  
      var items = {};
  
      payload.data.content.map(function (item) {
          items[item.id] = _resolveItem(item);
          items[item.id] = _resolveMediaRes(item);
      });
  
      return state.merge({
          list: payload.data,
          items: items
      });
  }), _defineProperty(_createReducer, _action.GET_OPENING_PRODUCTS_SUCCESS, function (state, _ref5) {
      var payload = _ref5.payload;
  
      payload.data.content.forEach(function (item) {
          _resolveItem(item);
      });
      return state.set("openingList", payload.data);
  }), _defineProperty(_createReducer, _action.GET_BUY_CHANNEL_LIST_SUCCESS, function (state, _ref6) {
      var payload = _ref6.payload;
  
      payload.data.content.forEach(function (item) {
          _resolveMediaRes(item);
      });
  
      return state.set("buyChannelList", payload.data);
  }), _defineProperty(_createReducer, _action.ADD_MANAGER_PRODUCT_TKER_SUCCESS, function (state, _ref7) {
      var payload = _ref7.payload;
  
      payload.params.id = payload.data;
      return state.set('item', payload.params);
  }), _defineProperty(_createReducer, _action.GET_MANAGER_PRODUCT_TKER_LIST_SUCCESS, function (state, _ref8) {
      var payload = _ref8.payload;
  
      var items = {};
  
      payload.data.content.forEach(function (item) {
          items[item.id] = _resolveItem(item);
          items[item.id] = _resolveMediaRes(item);
      });
  
      return state.merge({
          list: payload.data,
          items: items
      });
  }), _defineProperty(_createReducer, _action.GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_SUCCESS, function (state, _ref9) {
      var payload = _ref9.payload;
  
      var tkerEnableList = payload.data;
  
      tkerEnableList.content.forEach(function (item) {
          _resolveItem(item);
      });
  
      return state.set("tkerEnableList", tkerEnableList);
  }), _defineProperty(_createReducer, _action.UPDATE_MANAGER_PRODUCT_TKER_SUCCESS, function (state, _ref10) {
      var payload = _ref10.payload;
      return state.set('item', payload.params);
  }), _defineProperty(_createReducer, _action.GET_MANAGER_DATA_TKER_SUCCESS, function (state, _ref11) {
      var payload = _ref11.payload;
      return state.set("tkerItem", payload.data);
  }), _createReducer));
  
  function _resolveMediaRes(item) {
      item.mediaRes = item.mediaRes || {};
  
      // 商品图片
      if (item.mediaRes && item.mediaRes.productImgId) {
          item.mediaRes.productImgUrl = (0, _commonUtilMedia.getMediaUrl)(item.mediaRes.productImgId);
      }
  
      // 封面
      if (item.mediaRes && item.mediaRes.coverImgId) {
          item.mediaRes.coverImgUrl = (0, _commonUtilMedia.getMediaUrl)(item.mediaRes.coverImgId);
      }
  
      // 详情图片
      if (item.mediaRes && item.mediaRes.bannerImgs) {
          (function () {
              var bannerImgsUrl = [];
              item.mediaRes.bannerImgs.forEach(function (img) {
                  bannerImgsUrl.push((0, _commonUtilMedia.getMediaUrl)(img));
              });
              item.mediaRes.bannerImgsUrl = bannerImgsUrl;
          })();
      }
      return item;
  }
  
  // 通用Item数据处理
  function _resolveItem(item) {
  
      // 统计数据
      item.opdata = item.opdata || {};
  
      // 交易数据
      item.opdata.tradeData = item.opdata.tradeData || {};
  
      // 利润
      item.profits = item.mallCfg.price - item.cost;
  
      item.mallCfg = item.mallCfg || {};
  
      // 商品上架状态
      var statusText = undefined;
      if (item.mallCfg.enable) {
          statusText = '已上架';
      } else {
  
          if (item.mallCfg.issueNo == 0) {
              statusText = '未上架';
          } else {
              statusText = '已下架';
          }
      }
  
      item.statusText = statusText;
  
      // 是否能删除
      item.canDel = !item.mallCfg.enable && item.mallCfg.issueNo == 0 && (!item.buyChannels || item.buyChannels.length == 0);
  
      // 库存余量
      var intensity = (0, _commonUtil.getSafeValue)(item.mallCfg.stock, 0) - (_lodash2["default"].has(item, 'opdata.tradeData.amount') ? item.opdata.tradeData.amount : 0);
      item.intensity = intensity;
  
      item.intensity = intensity;
      return item;
  }
  module.exports = exports["default"];
  
  // 新增商品成功返回
  
  // 更新商品成功返回
  
  // 获取商品成功返回
  
  // 获取商品列表成功返回
  
  // 添加商品到推客分销平台
  
  // 获取已开通推客列表成功返回
  
  // 获取可开通推客列表成功返回
  
  // 修改商品推客分销配置
  
  // 获取商品推客分销数据

});
