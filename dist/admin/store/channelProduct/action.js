define('admin/store/channelProduct/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports.getProductChannelList = getProductChannelList;
  exports.getProductChannelOpeningList = getProductChannelOpeningList;
  exports.delChannelProduct = delChannelProduct;
  exports.getChannelProduct = getChannelProduct;
  exports.updateChannelProductOpening = updateChannelProductOpening;
  exports.updateChannelProductFinished = updateChannelProductFinished;
  exports.updateChannelProductInfo = updateChannelProductInfo;
  exports.updateChannelProductTrade = updateChannelProductTrade;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  var _commonConfig = require("common/config/index");
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  // 商品交易渠道后台管理 : 提供商品交易渠道管理服务
  // 商品列表
  var GET_CHANNEL_PRODUCT_LIST = 'GET_CHANNEL_PRODUCT_LIST';
  exports.GET_CHANNEL_PRODUCT_LIST = GET_CHANNEL_PRODUCT_LIST;
  var GET_CHANNEL_PRODUCT_LIST_PENDING = 'GET_CHANNEL_PRODUCT_LIST_PENDING';
  exports.GET_CHANNEL_PRODUCT_LIST_PENDING = GET_CHANNEL_PRODUCT_LIST_PENDING;
  var GET_CHANNEL_PRODUCT_LIST_SUCCESS = 'GET_CHANNEL_PRODUCT_LIST_SUCCESS';
  exports.GET_CHANNEL_PRODUCT_LIST_SUCCESS = GET_CHANNEL_PRODUCT_LIST_SUCCESS;
  var GET_CHANNEL_PRODUCT_LIST_FAILURE = 'GET_CHANNEL_PRODUCT_LIST_FAILURE';
  
  exports.GET_CHANNEL_PRODUCT_LIST_FAILURE = GET_CHANNEL_PRODUCT_LIST_FAILURE;
  // 已上架的商品列表
  var GET_CHANNEL_OPENING_LIST = 'GET_CHANNEL_OPENING_LIST';
  exports.GET_CHANNEL_OPENING_LIST = GET_CHANNEL_OPENING_LIST;
  var GET_CHANNEL_OPENING_LIST_SUCCESS = 'GET_CHANNEL_OPENING_LIST_SUCCESS';
  exports.GET_CHANNEL_OPENING_LIST_SUCCESS = GET_CHANNEL_OPENING_LIST_SUCCESS;
  var GET_CHANNEL_OPENING_LIST_PENDING = 'GET_CHANNEL_OPENING_LIST_PENDING';
  exports.GET_CHANNEL_OPENING_LIST_PENDING = GET_CHANNEL_OPENING_LIST_PENDING;
  var GET_CHANNEL_OPENING_LIST_FAILURE = 'GET_CHANNEL_OPENING_LIST_FAILURE';
  
  exports.GET_CHANNEL_OPENING_LIST_FAILURE = GET_CHANNEL_OPENING_LIST_FAILURE;
  // 商品删除
  var DEL_CHANNEL_PRODUCT = 'DEL_CHANNEL_PRODUCT';
  exports.DEL_CHANNEL_PRODUCT = DEL_CHANNEL_PRODUCT;
  var DEL_CHANNEL_PRODUCT_PENDING = 'DEL_CHANNEL_PRODUCT_PENDING';
  exports.DEL_CHANNEL_PRODUCT_PENDING = DEL_CHANNEL_PRODUCT_PENDING;
  var DEL_CHANNEL_PRODUCT_SUCCESS = 'DEL_CHANNEL_PRODUCT_SUCCESS';
  exports.DEL_CHANNEL_PRODUCT_SUCCESS = DEL_CHANNEL_PRODUCT_SUCCESS;
  var DEL_CHANNEL_PRODUCT_FAILURE = 'DEL_CHANNEL_PRODUCT_FAILURE';
  
  exports.DEL_CHANNEL_PRODUCT_FAILURE = DEL_CHANNEL_PRODUCT_FAILURE;
  // 获取商品信息
  var GET_CHANNEL_PRODUCT = 'GET_CHANNEL_PRODUCT';
  exports.GET_CHANNEL_PRODUCT = GET_CHANNEL_PRODUCT;
  var GET_CHANNEL_PRODUCT_PENDING = 'GET_CHANNEL_PRODUCT_PENDING';
  exports.GET_CHANNEL_PRODUCT_PENDING = GET_CHANNEL_PRODUCT_PENDING;
  var GET_CHANNEL_PRODUCT_SUCCESS = 'GET_CHANNEL_PRODUCT_SUCCESS';
  exports.GET_CHANNEL_PRODUCT_SUCCESS = GET_CHANNEL_PRODUCT_SUCCESS;
  var GET_CHANNEL_PRODUCT_FAILURE = 'GET_CHANNEL_PRODUCT_FAILURE';
  
  exports.GET_CHANNEL_PRODUCT_FAILURE = GET_CHANNEL_PRODUCT_FAILURE;
  // 商品上架
  var UPDATE_CHANNEL_PRODUCT_OPENING = 'UPDATE_CHANNEL_PRODUCT_OPENING';
  exports.UPDATE_CHANNEL_PRODUCT_OPENING = UPDATE_CHANNEL_PRODUCT_OPENING;
  var UPDATE_CHANNEL_PRODUCT_OPENING_PENDING = 'UPDATE_CHANNEL_PRODUCT_OPENING_PENDING';
  exports.UPDATE_CHANNEL_PRODUCT_OPENING_PENDING = UPDATE_CHANNEL_PRODUCT_OPENING_PENDING;
  var UPDATE_CHANNEL_PRODUCT_OPENING_SUCCESS = 'UPDATE_CHANNEL_PRODUCT_OPENING_SUCCESS';
  exports.UPDATE_CHANNEL_PRODUCT_OPENING_SUCCESS = UPDATE_CHANNEL_PRODUCT_OPENING_SUCCESS;
  var UPDATE_CHANNEL_PRODUCT_OPENING_FAILURE = 'UPDATE_CHANNEL_PRODUCT_OPENING_FAILURE';
  
  exports.UPDATE_CHANNEL_PRODUCT_OPENING_FAILURE = UPDATE_CHANNEL_PRODUCT_OPENING_FAILURE;
  // 商品下架
  var UPDATE_CHANNEL_PRODUCT_FINISHED = 'UPDATE_CHANNEL_PRODUCT_FINISHED';
  exports.UPDATE_CHANNEL_PRODUCT_FINISHED = UPDATE_CHANNEL_PRODUCT_FINISHED;
  var UPDATE_CHANNEL_PRODUCT_FINISHED_PENDING = 'UPDATE_CHANNEL_PRODUCT_FINISHED_PENDING';
  exports.UPDATE_CHANNEL_PRODUCT_FINISHED_PENDING = UPDATE_CHANNEL_PRODUCT_FINISHED_PENDING;
  var UPDATE_CHANNEL_PRODUCT_FINISHED_SUCCESS = 'UPDATE_CHANNEL_PRODUCT_FINISHED_SUCCESS';
  exports.UPDATE_CHANNEL_PRODUCT_FINISHED_SUCCESS = UPDATE_CHANNEL_PRODUCT_FINISHED_SUCCESS;
  var UPDATE_CHANNEL_PRODUCT_FINISHED_FAILURE = 'UPDATE_CHANNEL_PRODUCT_FINISHED_FAILURE';
  
  exports.UPDATE_CHANNEL_PRODUCT_FINISHED_FAILURE = UPDATE_CHANNEL_PRODUCT_FINISHED_FAILURE;
  // 修改商品图文信息
  var UPDATE_CHANNEL_PRODUCT_INFO = 'UPDATE_CHANNEL_PRODUCT_INFO';
  exports.UPDATE_CHANNEL_PRODUCT_INFO = UPDATE_CHANNEL_PRODUCT_INFO;
  var UPDATE_CHANNEL_PRODUCT_INFO_PENDING = 'UPDATE_CHANNEL_PRODUCT_INFO_PENDING';
  exports.UPDATE_CHANNEL_PRODUCT_INFO_PENDING = UPDATE_CHANNEL_PRODUCT_INFO_PENDING;
  var UPDATE_CHANNEL_PRODUCT_INFO_SUCCESS = 'UPDATE_CHANNEL_PRODUCT_INFO_SUCCESS';
  exports.UPDATE_CHANNEL_PRODUCT_INFO_SUCCESS = UPDATE_CHANNEL_PRODUCT_INFO_SUCCESS;
  var UPDATE_CHANNEL_PRODUCT_INFO_FAILURE = 'UPDATE_CHANNEL_PRODUCT_INFO_FAILURE';
  
  exports.UPDATE_CHANNEL_PRODUCT_INFO_FAILURE = UPDATE_CHANNEL_PRODUCT_INFO_FAILURE;
  // 修改商品交易属性
  var UPDATE_CHANNEL_PRODUCT_TRADE = 'UPDATE_CHANNEL_PRODUCT_TRADE';
  exports.UPDATE_CHANNEL_PRODUCT_TRADE = UPDATE_CHANNEL_PRODUCT_TRADE;
  var UPDATE_CHANNEL_PRODUCT_TRADE_PENDING = 'UPDATE_CHANNEL_PRODUCT_TRADE_PENDING';
  exports.UPDATE_CHANNEL_PRODUCT_TRADE_PENDING = UPDATE_CHANNEL_PRODUCT_TRADE_PENDING;
  var UPDATE_CHANNEL_PRODUCT_TRADE_SUCCESS = 'UPDATE_CHANNEL_PRODUCT_TRADE_SUCCESS';
  exports.UPDATE_CHANNEL_PRODUCT_TRADE_SUCCESS = UPDATE_CHANNEL_PRODUCT_TRADE_SUCCESS;
  var UPDATE_CHANNEL_PRODUCT_TRADE_FAILURE = 'UPDATE_CHANNEL_PRODUCT_TRADE_FAILURE';
  
  exports.UPDATE_CHANNEL_PRODUCT_TRADE_FAILURE = UPDATE_CHANNEL_PRODUCT_TRADE_FAILURE;
  // 获取渠道商品列表
  //GET manager/product/channel/{buyChannel}/list
  
  function getProductChannelList(buyChannel, _ref) {
      var _ref$page = _ref.page;
      var page = _ref$page === undefined ? 0 : _ref$page;
      var _ref$size = _ref.size;
      var size = _ref$size === undefined ? _commonConfig2["default"].SIZE : _ref$size;
      var sort = _ref.sort;
      var order = _ref.order;
      var status = _ref.status;
      var name = _ref.name;
  
      return {
          type: GET_CHANNEL_PRODUCT_LIST,
          payload: {
              promise: _commonHttp2["default"].get('manager/product/channel/{buyChannel}/list', {
                  buyChannel: buyChannel,
                  page: page,
                  size: size,
                  sort: sort,
                  order: order,
                  status: status,
                  name: name
              })
          }
      };
  }
  
  // 获取已上架的商品列表
  
  function getProductChannelOpeningList(buyChannel, _ref2) {
      var _ref2$page = _ref2.page;
      var page = _ref2$page === undefined ? 0 : _ref2$page;
      var _ref2$size = _ref2.size;
      var size = _ref2$size === undefined ? _commonConfig2["default"].SIZE : _ref2$size;
      var sort = _ref2.sort;
      var order = _ref2.order;
      var name = _ref2.name;
  
      return {
          type: GET_CHANNEL_OPENING_LIST,
          payload: {
              promise: _commonHttp2["default"].get('manager/product/channel/opening/{buyChannel}/list', {
                  buyChannel: buyChannel,
                  page: page,
                  size: size,
                  sort: sort,
                  order: order,
                  name: name
              })
          }
      };
  }
  
  //DELETE manager/product/channel/{buyChannel}/{id} 商品删除
  // 删除渠道商品
  
  function delChannelProduct(buyChannel, id) {
      return {
          type: DEL_CHANNEL_PRODUCT,
          payload: {
              promise: _commonHttp2["default"]["delete"]('manager/product/channel/{buyChannel}/{id}', {
                  buyChannel: buyChannel,
                  id: id
              })
          }
      };
  }
  
  // 获取渠道商品详情
  //GET manager/product/channel/{buyChannel}/{id} 获取商品信息
  
  function getChannelProduct(buyChannel, id) {
      return {
          type: GET_CHANNEL_PRODUCT,
          payload: {
              promise: _commonHttp2["default"].get('manager/product/channel/{buyChannel}/{id}', {
                  buyChannel: buyChannel,
                  id: id
              })
          }
      };
  }
  
  // 上架渠道商品
  //POST manager/product/channel/{buyChannel}/opening 商品上架
  
  function updateChannelProductOpening(buyChannel, productIds) {
      if (typeof productIds == 'string') {
          productIds = [productIds];
      }
      return {
          type: UPDATE_CHANNEL_PRODUCT_OPENING,
          payload: {
              promise: _commonHttp2["default"].post('manager/product/channel/{buyChannel}/opening', {
                  productIds: productIds
              }, {
                  params: {
                      buyChannel: buyChannel
                  }
              })
          }
      };
  }
  
  // 下架渠道商品
  //POST manager/product/channel/{buyChannel}/finished/{id} 商品下架
  
  function updateChannelProductFinished(buyChannel, id) {
      return {
          type: UPDATE_CHANNEL_PRODUCT_FINISHED,
          payload: {
              promise: _commonHttp2["default"].post('manager/product/channel/{buyChannel}/finished/{id}', null, {
                  params: {
                      buyChannel: buyChannel,
                      id: id
                  }
              })
          }
      };
  }
  
  // 修改渠道商品图文信息
  //POST manager/product/channel/{buyChannel}/info/{id} 修改商品图文信息
  
  function updateChannelProductInfo(buyChannel, product) {
      return {
          type: UPDATE_CHANNEL_PRODUCT_INFO,
          payload: {
              promise: _commonHttp2["default"].post('manager/product/channel/{buyChannel}/info/{id}', product, {
                  params: {
                      buyChannel: buyChannel,
                      id: product.id
                  }
              })
          }
      };
  }
  
  // 修改渠道商品交易设置
  //POST manager/product/channel/{buyChannel}/trade/{id} 修改商品交易属性
  
  function updateChannelProductTrade(buyChannel, product) {
      return {
          type: UPDATE_CHANNEL_PRODUCT_TRADE,
          payload: {
              promise: _commonHttp2["default"].post('manager/product/channel/{buyChannel}/trade/{id}', product, {
                  params: {
                      buyChannel: buyChannel,
                      id: product.id
                  }
              })
          }
      };
  }

});
