define('admin/store/channelProduct/reducer', function(require, exports, module) {

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
  
  var _lodash = require('node_modules/lodash/lodash');
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _action = require("admin/store/channelProduct/action");
  
  var _commonUtilMedia = require("common/util/media");
  
  var initialState = (0, _immutable.fromJS)({
      // 当前item
      item: null,
      // 列表map
      items: {},
      // 列表数据
      list: {}
  });
  
  exports["default"] = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _action.GET_CHANNEL_PRODUCT_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
      return state.set('item', _resolveItem(payload.data));
  }), _defineProperty(_createReducer, _action.GET_CHANNEL_PRODUCT_LIST_SUCCESS, function (state, _ref2) {
      var payload = _ref2.payload;
  
      var items = {};
      payload.data.content.forEach(function (item) {
          items[item.id] = _resolveItem(item);
      });
      return state.merge({
          'items': items,
          'list': payload.data
      });
  }), _defineProperty(_createReducer, _action.GET_CHANNEL_OPENING_LIST_SUCCESS, function (state, _ref3) {
      var payload = _ref3.payload;
  
      var items = {};
      payload.data.content.forEach(function (item) {
          items[item.channelId] = _resolveItem(item);
          items[item.channelId].id = item.channelId;
      });
  
      return state.merge({
          'items': items,
          'list': payload.data
      });
  }), _createReducer));
  
  // 通用Item数据处理
  function _resolveItem(item) {
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
  
      // 统计数据
      item.opdata = item.opdata || {};
  
      // 交易数据
      item.opdata.tradeData = item.opdata.tradeData || {};
  
      item.yygCfg = item.yygCfg || {};
  
      item.yygCfg.stock = (0, _commonUtil.getSafeValue)(item.yygCfg.stock, 0);
  
      // 库存余量
      var intensity = (0, _commonUtil.getSafeValue)(item.yygCfg.stock, 0) - (_lodash2["default"].has(item, 'opdata.tradeData.amount') ? item.opdata.tradeData.amount : 0);
      item.intensity = intensity;
  
      // 商品上架状态
      var status = undefined;
  
      if (item.yygCfg.enable) {
          if (item.bizStatus == 'soldout') {
              // 已售罄
              status = 'soldout';
          } else if (item.bizStatus == 'suspend') {
              // 已上架
              status = 'suspend';
          } else {
              if (item.bizStatus == 'finished') {
                  // 已下架
                  status = 'finished';
              } else {
                  // 活动中
                  status = 'opening';
              }
          }
      } else {
          if (item.yygCfg.issueNo == 0) {
              // 未上架
              status = 'news';
          } else {
              // 预下架
              status = 'closed';
          }
      }
  
      item.status = status;
  
      // 参与进度
      item.percent = status == 'news' ? 0 : item.creditRecieved / item.yygCfg.credit * 100;
  
      // 是否能删除
      item.canDel = status == 'news';
  
      // 是否能上架(未上架的商品|已下架的商品) -> 上架
      item.canOpening = item.status == 'news' || item.status == 'finished' || item.status == 'suspend';
  
      // 是否能续上架(预下架的商品|已售罄的商品) -> 续上架
      item.canReOpening = item.status == 'closed' || item.status == 'soldout';
  
      // 是否能预下架(活动中的商品)           -> 预下架
      item.canPreFinished = item.status == 'opening';
  
      // 资料是否完善完整
      item.isImprove = item.yygCfg.bidStep > 0 && item.yygCfg.credit > 0 && item.yygCfg.numOfOwners > 0;
  
      return item;
  }
  module.exports = exports["default"];
  
  // 获取交易渠道商品
  
  // 获取指定渠道商品列表
  
  // 获取已上架商品

});
