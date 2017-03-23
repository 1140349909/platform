define('admin/store/product/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports.addProduct = addProduct;
  exports.delProduct = delProduct;
  exports.updateProduct = updateProduct;
  exports.saveProduct = saveProduct;
  exports.getProduct = getProduct;
  exports.getProducts = getProducts;
  exports.getOpeningProducts = getOpeningProducts;
  exports.updateProductOpening = updateProductOpening;
  exports.updateProductFinished = updateProductFinished;
  exports.updateProductInfo = updateProductInfo;
  exports.updateProductTrade = updateProductTrade;
  exports.addBuyChannelProduct = addBuyChannelProduct;
  exports.getBuyChannelList = getBuyChannelList;
  exports.addManagerProductTker = addManagerProductTker;
  exports.updateManagerProductTker = updateManagerProductTker;
  exports.getManagerProductTkerList = getManagerProductTkerList;
  exports.getManagerProductTkerEnableList = getManagerProductTkerEnableList;
  exports.getManagerProductDataTker = getManagerProductDataTker;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  var _commonConfig = require("common/config/index");
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  /*商品后台管理*/
  
  // 新增商品
  var ADD_PRODUCT = 'ADD_PRODUCT';
  exports.ADD_PRODUCT = ADD_PRODUCT;
  var ADD_PRODUCT_PENDING = 'ADD_PRODUCT_PENDING';
  exports.ADD_PRODUCT_PENDING = ADD_PRODUCT_PENDING;
  var ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
  exports.ADD_PRODUCT_SUCCESS = ADD_PRODUCT_SUCCESS;
  var ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';
  exports.ADD_PRODUCT_FAILURE = ADD_PRODUCT_FAILURE;
  // 商品删除
  var DEL_PRODUCT = 'DEL_PRODUCT';
  exports.DEL_PRODUCT = DEL_PRODUCT;
  var DEL_PRODUCT_PENDING = 'DEL_PRODUCT_PENDING';
  exports.DEL_PRODUCT_PENDING = DEL_PRODUCT_PENDING;
  var DEL_PRODUCT_SUCCESS = 'DEL_PRODUCT_SUCCESS';
  exports.DEL_PRODUCT_SUCCESS = DEL_PRODUCT_SUCCESS;
  var DEL_PRODUCT_FAILURE = 'DEL_PRODUCT_FAILURE';
  exports.DEL_PRODUCT_FAILURE = DEL_PRODUCT_FAILURE;
  // 修改商品信息
  var UPDATE_PRODUCT = 'UPDATE_PRODUCT';
  exports.UPDATE_PRODUCT = UPDATE_PRODUCT;
  var UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
  exports.UPDATE_PRODUCT_SUCCESS = UPDATE_PRODUCT_SUCCESS;
  var UPDATE_PRODUCT_PENDING = 'UPDATE_PRODUCT_PENDING';
  exports.UPDATE_PRODUCT_PENDING = UPDATE_PRODUCT_PENDING;
  var UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';
  exports.UPDATE_PRODUCT_FAILURE = UPDATE_PRODUCT_FAILURE;
  // 商品下架
  var UPDATE_PRODUCT_FINISHED = 'UPDATE_PRODUCT_FINISHED';
  exports.UPDATE_PRODUCT_FINISHED = UPDATE_PRODUCT_FINISHED;
  var UPDATE_PRODUCT_FINISHED_PENDING = 'UPDATE_PRODUCT_FINISHED_PENDING';
  exports.UPDATE_PRODUCT_FINISHED_PENDING = UPDATE_PRODUCT_FINISHED_PENDING;
  var UPDATE_PRODUCT_FINISHED_SUCCESS = 'UPDATE_PRODUCT_FINISHED_SUCCESS';
  exports.UPDATE_PRODUCT_FINISHED_SUCCESS = UPDATE_PRODUCT_FINISHED_SUCCESS;
  var UPDATE_PRODUCT_FINISHED_FAILURE = 'UPDATE_PRODUCT_FINISHED_FAILURE';
  exports.UPDATE_PRODUCT_FINISHED_FAILURE = UPDATE_PRODUCT_FINISHED_FAILURE;
  // 修改商品图文信息
  var UPDATE_PRODUCT_INFO = 'UPDATE_PRODUCT_INFO';
  exports.UPDATE_PRODUCT_INFO = UPDATE_PRODUCT_INFO;
  var UPDATE_PRODUCT_INFO_SUCCESS = 'UPDATE_PRODUCT_INFO_SUCCESS';
  exports.UPDATE_PRODUCT_INFO_SUCCESS = UPDATE_PRODUCT_INFO_SUCCESS;
  var UPDATE_PRODUCT_INFO_PENDING = 'UPDATE_PRODUCT_INFO_PENDING';
  exports.UPDATE_PRODUCT_INFO_PENDING = UPDATE_PRODUCT_INFO_PENDING;
  var UPDATE_PRODUCT_INFO_FAILURE = 'UPDATE_PRODUCT_INFO_FAILURE';
  exports.UPDATE_PRODUCT_INFO_FAILURE = UPDATE_PRODUCT_INFO_FAILURE;
  // 修改商品交易属性
  var UPDATE_PRODUCT_TRADE = 'UPDATE_PRODUCT_TRADE';
  exports.UPDATE_PRODUCT_TRADE = UPDATE_PRODUCT_TRADE;
  var UPDATE_PRODUCT_TRADE_SUCCESS = 'UPDATE_PRODUCT_TRADE_SUCCESS';
  exports.UPDATE_PRODUCT_TRADE_SUCCESS = UPDATE_PRODUCT_TRADE_SUCCESS;
  var UPDATE_PRODUCT_TRADE_PENDING = 'UPDATE_PRODUCT_TRADE_PENDING';
  exports.UPDATE_PRODUCT_TRADE_PENDING = UPDATE_PRODUCT_TRADE_PENDING;
  var UPDATE_PRODUCT_TRADE_FAILURE = 'UPDATE_PRODUCT_TRADE_FAILURE';
  exports.UPDATE_PRODUCT_TRADE_FAILURE = UPDATE_PRODUCT_TRADE_FAILURE;
  // 商品上架
  var UPDATE_PRODUCT_OPENING = 'UPDATE_PRODUCT_OPENING';
  exports.UPDATE_PRODUCT_OPENING = UPDATE_PRODUCT_OPENING;
  var UPDATE_PRODUCT_OPENING_PENDING = 'UPDATE_PRODUCT_OPENING_PENDING';
  exports.UPDATE_PRODUCT_OPENING_PENDING = UPDATE_PRODUCT_OPENING_PENDING;
  var UPDATE_PRODUCT_OPENING_SUCCESS = 'UPDATE_PRODUCT_OPENING_SUCCESS';
  exports.UPDATE_PRODUCT_OPENING_SUCCESS = UPDATE_PRODUCT_OPENING_SUCCESS;
  var UPDATE_PRODUCT_OPENING_FAILURE = 'UPDATE_PRODUCT_OPENING_FAILURE';
  
  exports.UPDATE_PRODUCT_OPENING_FAILURE = UPDATE_PRODUCT_OPENING_FAILURE;
  // 获取商品信息
  var GET_PRODUCT = 'GET_PRODUCT';
  exports.GET_PRODUCT = GET_PRODUCT;
  var GET_PRODUCT_PENDING = 'GET_PRODUCT_PENDING';
  exports.GET_PRODUCT_PENDING = GET_PRODUCT_PENDING;
  var GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
  exports.GET_PRODUCT_SUCCESS = GET_PRODUCT_SUCCESS;
  var GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';
  exports.GET_PRODUCT_FAILURE = GET_PRODUCT_FAILURE;
  // 商品列表
  var GET_PRODUCTS = 'GET_PRODUCTS';
  exports.GET_PRODUCTS = GET_PRODUCTS;
  var GET_PRODUCTS_PENDING = 'GET_PRODUCTS_PENDING';
  exports.GET_PRODUCTS_PENDING = GET_PRODUCTS_PENDING;
  var GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
  exports.GET_PRODUCTS_SUCCESS = GET_PRODUCTS_SUCCESS;
  var GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';
  exports.GET_PRODUCTS_FAILURE = GET_PRODUCTS_FAILURE;
  // 已上架的商品列表
  var GET_OPENING_PRODUCTS = 'GET_OPENING_PRODUCTS';
  exports.GET_OPENING_PRODUCTS = GET_OPENING_PRODUCTS;
  var GET_OPENING_PRODUCTS_PENDING = 'GET_OPENING_PRODUCTS_PENDING';
  exports.GET_OPENING_PRODUCTS_PENDING = GET_OPENING_PRODUCTS_PENDING;
  var GET_OPENING_PRODUCTS_SUCCESS = 'GET_OPENING_PRODUCTS_SUCCESS';
  exports.GET_OPENING_PRODUCTS_SUCCESS = GET_OPENING_PRODUCTS_SUCCESS;
  var GET_OPENING_PRODUCTS_FAILURE = 'GET_OPENING_PRODUCTS_FAILURE';
  exports.GET_OPENING_PRODUCTS_FAILURE = GET_OPENING_PRODUCTS_FAILURE;
  // 添加商品到购买渠道
  var ADD_BUY_CHANNEL_PRODUCT = 'ADD_BUY_CHANNEL_PRODUCT';
  exports.ADD_BUY_CHANNEL_PRODUCT = ADD_BUY_CHANNEL_PRODUCT;
  var ADD_BUY_CHANNEL_PRODUCT_PENDING = 'ADD_BUY_CHANNEL_PRODUCT_PENDING';
  exports.ADD_BUY_CHANNEL_PRODUCT_PENDING = ADD_BUY_CHANNEL_PRODUCT_PENDING;
  var ADD_BUY_CHANNEL_PRODUCT_SUCCESS = 'ADD_BUY_CHANNEL_PRODUCT_SUCCESS';
  exports.ADD_BUY_CHANNEL_PRODUCT_SUCCESS = ADD_BUY_CHANNEL_PRODUCT_SUCCESS;
  var ADD_BUY_CHANNEL_PRODUCT_FAILURE = 'ADD_BUY_CHANNEL_PRODUCT_FAILURE';
  exports.ADD_BUY_CHANNEL_PRODUCT_FAILURE = ADD_BUY_CHANNEL_PRODUCT_FAILURE;
  // 商品可交易渠道列表
  var GET_BUY_CHANNEL_LIST = 'GET_BUY_CHANNEL_LIST';
  exports.GET_BUY_CHANNEL_LIST = GET_BUY_CHANNEL_LIST;
  var GET_BUY_CHANNEL_LIST_PENDING = 'GET_BUY_CHANNEL_LIST_PENDING';
  exports.GET_BUY_CHANNEL_LIST_PENDING = GET_BUY_CHANNEL_LIST_PENDING;
  var GET_BUY_CHANNEL_LIST_SUCCESS = 'GET_BUY_CHANNEL_LIST_SUCCESS';
  exports.GET_BUY_CHANNEL_LIST_SUCCESS = GET_BUY_CHANNEL_LIST_SUCCESS;
  var GET_BUY_CHANNEL_LIST_FAILURE = 'GET_BUY_CHANNEL_LIST_FAILURE';
  
  exports.GET_BUY_CHANNEL_LIST_FAILURE = GET_BUY_CHANNEL_LIST_FAILURE;
  /*商品后台管理：完*/
  
  var ADD_MANAGER_PRODUCT_TKER = 'ADD_MANAGER_PRODUCT_TKER';
  exports.ADD_MANAGER_PRODUCT_TKER = ADD_MANAGER_PRODUCT_TKER;
  var ADD_MANAGER_PRODUCT_TKER_PENDING = 'ADD_MANAGER_PRODUCT_TKER_PENDING';
  exports.ADD_MANAGER_PRODUCT_TKER_PENDING = ADD_MANAGER_PRODUCT_TKER_PENDING;
  var ADD_MANAGER_PRODUCT_TKER_SUCCESS = 'ADD_MANAGER_PRODUCT_TKER_SUCCESS';
  exports.ADD_MANAGER_PRODUCT_TKER_SUCCESS = ADD_MANAGER_PRODUCT_TKER_SUCCESS;
  var ADD_MANAGER_PRODUCT_TKER_FAILURE = 'ADD_MANAGER_PRODUCT_TKER_FAILURE';
  exports.ADD_MANAGER_PRODUCT_TKER_FAILURE = ADD_MANAGER_PRODUCT_TKER_FAILURE;
  // 修改商品推客分销配置
  var UPDATE_MANAGER_PRODUCT_TKER = 'UPDATE_MANAGER_PRODUCT_TKER';
  exports.UPDATE_MANAGER_PRODUCT_TKER = UPDATE_MANAGER_PRODUCT_TKER;
  var UPDATE_MANAGER_PRODUCT_TKER_PENDING = 'UPDATE_MANAGER_PRODUCT_TKER_PENDING';
  exports.UPDATE_MANAGER_PRODUCT_TKER_PENDING = UPDATE_MANAGER_PRODUCT_TKER_PENDING;
  var UPDATE_MANAGER_PRODUCT_TKER_SUCCESS = 'UPDATE_MANAGER_PRODUCT_TKER_SUCCESS';
  exports.UPDATE_MANAGER_PRODUCT_TKER_SUCCESS = UPDATE_MANAGER_PRODUCT_TKER_SUCCESS;
  var UPDATE_MANAGER_PRODUCT_TKER_FAILURE = 'UPDATE_MANAGER_PRODUCT_TKER_FAILURE';
  exports.UPDATE_MANAGER_PRODUCT_TKER_FAILURE = UPDATE_MANAGER_PRODUCT_TKER_FAILURE;
  // 已开通推客分销的商品列表
  var GET_MANAGER_PRODUCT_TKER_LIST = 'GET_MANAGER_PRODUCT_TKER_LIST';
  exports.GET_MANAGER_PRODUCT_TKER_LIST = GET_MANAGER_PRODUCT_TKER_LIST;
  var GET_MANAGER_PRODUCT_TKER_LIST_PENDING = 'GET_MANAGER_PRODUCT_TKER_LIST_PENDING';
  exports.GET_MANAGER_PRODUCT_TKER_LIST_PENDING = GET_MANAGER_PRODUCT_TKER_LIST_PENDING;
  var GET_MANAGER_PRODUCT_TKER_LIST_SUCCESS = 'GET_MANAGER_PRODUCT_TKER_LIST_SUCCESS';
  exports.GET_MANAGER_PRODUCT_TKER_LIST_SUCCESS = GET_MANAGER_PRODUCT_TKER_LIST_SUCCESS;
  var GET_MANAGER_PRODUCT_TKER_LIST_FAILURE = 'GET_MANAGER_PRODUCT_TKER_LIST_FAILURE';
  exports.GET_MANAGER_PRODUCT_TKER_LIST_FAILURE = GET_MANAGER_PRODUCT_TKER_LIST_FAILURE;
  // 商品可开通推客分销渠道列表
  var GET_MANAGER_PRODUCT_TKER_ENABLE_LIST = 'GET_MANAGER_PRODUCT_TKER_ENABLE_LIST';
  exports.GET_MANAGER_PRODUCT_TKER_ENABLE_LIST = GET_MANAGER_PRODUCT_TKER_ENABLE_LIST;
  var GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_SUCCESS = 'GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_SUCCESS';
  exports.GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_SUCCESS = GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_SUCCESS;
  var GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_PENDING = 'GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_PENDING';
  exports.GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_PENDING = GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_PENDING;
  var GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_FAILURE = 'GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_FAILURE';
  
  exports.GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_FAILURE = GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_FAILURE;
  // 获取商品推客分销数据
  var GET_MANAGER_DATA_TKER = 'GET_MANAGER_DATA_TKER';
  exports.GET_MANAGER_DATA_TKER = GET_MANAGER_DATA_TKER;
  var GET_MANAGER_DATA_TKER_SUCCESS = 'GET_MANAGER_DATA_TKER_SUCCESS';
  exports.GET_MANAGER_DATA_TKER_SUCCESS = GET_MANAGER_DATA_TKER_SUCCESS;
  var GET_MANAGER_DATA_TKER_PENDING = 'GET_MANAGER_DATA_TKER_PENDING';
  exports.GET_MANAGER_DATA_TKER_PENDING = GET_MANAGER_DATA_TKER_PENDING;
  var GET_MANAGER_DATA_TKER_FAILURE = 'GET_MANAGER_DATA_TKER_FAILURE';
  
  exports.GET_MANAGER_DATA_TKER_FAILURE = GET_MANAGER_DATA_TKER_FAILURE;
  // 添加商品
  
  function addProduct(product) {
      return {
          type: ADD_PRODUCT,
          payload: {
              promise: _commonHttp2["default"].post('manager/product', product)
          }
      };
  }
  
  // 删除商品
  
  function delProduct(id) {
      return {
          type: DEL_PRODUCT,
          payload: {
              promise: _commonHttp2["default"]["delete"]('manager/product/{id}', {
                  id: id
              })
          }
      };
  }
  
  // 修改商品
  
  function updateProduct(product) {
      return {
          type: UPDATE_PRODUCT,
          payload: {
              promise: _commonHttp2["default"].post('manager/product/{id}', product, {
                  params: {
                      id: product.id
                  }
              })
          }
      };
  }
  
  // 保存商品信息
  
  function saveProduct(product) {
      return product.id ? updateProduct(product) : addProduct(product);
  }
  
  // 获取商品详情
  
  function getProduct(id) {
      return {
          type: GET_PRODUCT,
          payload: {
              promise: _commonHttp2["default"].get('manager/product/{id}', {
                  id: id
              })
          }
      };
  }
  
  // 获取商品库列表
  
  function getProducts(_ref) {
      var _ref$page = _ref.page;
      var page = _ref$page === undefined ? 0 : _ref$page;
      var _ref$size = _ref.size;
      var size = _ref$size === undefined ? _commonConfig2["default"].SIZE : _ref$size;
      var sort = _ref.sort;
      var order = _ref.order;
      var status = _ref.status;
      var name = _ref.name;
  
      return {
          type: GET_PRODUCTS,
          payload: {
              promise: _commonHttp2["default"].get('manager/product/list', {
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
  
  // 获取商城上架商品列表
  
  function getOpeningProducts(_ref2) {
      var _ref2$page = _ref2.page;
      var page = _ref2$page === undefined ? 0 : _ref2$page;
      var _ref2$size = _ref2.size;
      var size = _ref2$size === undefined ? _commonConfig2["default"].SIZE : _ref2$size;
      var sort = _ref2.sort;
      var order = _ref2.order;
  
      return {
          type: GET_OPENING_PRODUCTS,
          payload: {
              promise: _commonHttp2["default"].get('manager/product/opening/list', {
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
              })
          }
      };
  }
  
  // 上架商城商品
  
  function updateProductOpening(productIds) {
      if (typeof productIds == 'string') {
          productIds = [productIds];
      }
      return {
          type: UPDATE_PRODUCT_OPENING,
          payload: {
              promise: _commonHttp2["default"].post('manager/product/opening', {
                  productIds: productIds
              })
          }
      };
  }
  
  // 下架商城商品
  
  function updateProductFinished(id, callback) {
      return {
          type: UPDATE_PRODUCT_FINISHED,
          payload: {
              promise: _commonHttp2["default"].post('manager/product/finished/{id}', null, {
                  params: {
                      id: id
                  }
              }),
              callback: callback
          }
      };
  }
  
  // 修改商品图文信息
  
  function updateProductInfo(product) {
      return {
          type: UPDATE_PRODUCT_INFO,
          payload: {
              promise: _commonHttp2["default"].post('manager/product/info/{id}', product, {
                  params: {
                      id: product.id
                  }
              })
          }
      };
  }
  
  // 修改商品交易设置
  
  function updateProductTrade(product) {
      return {
          type: UPDATE_PRODUCT_TRADE,
          payload: {
              promise: _commonHttp2["default"].post('manager/product/trade/{id}', product, {
                  params: {
                      id: product.id
                  }
              })
          }
      };
  }
  
  // POST /api/v1/{client}/{channel}/manager/product/{buyChannel}
  // 添加商品到购买渠道
  
  function addBuyChannelProduct(buyChannel, productIds) {
      return {
          type: ADD_BUY_CHANNEL_PRODUCT,
          payload: {
              promise: _commonHttp2["default"].post('manager/product/buychannel/{buyChannel}', {
                  productIds: productIds
              }, {
                  params: {
                      buyChannel: buyChannel
                  }
              })
          }
      };
  }
  
  // 获取当前账户下的客户所有可添加到指定交易渠道的商品
  
  function getBuyChannelList(buyChannel, _ref3) {
      var _ref3$page = _ref3.page;
      var page = _ref3$page === undefined ? 0 : _ref3$page;
      var _ref3$size = _ref3.size;
      var size = _ref3$size === undefined ? _commonConfig2["default"].SIZE : _ref3$size;
      var sort = _ref3.sort;
      var order = _ref3.order;
      var name = _ref3.name;
  
      return {
          type: GET_BUY_CHANNEL_LIST,
          payload: {
              promise: _commonHttp2["default"].get('manager/product/{buyChannel}/list', {
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
  
  // 添加商品到推客分销平台
  
  function addManagerProductTker(productIds) {
      return {
          type: ADD_MANAGER_PRODUCT_TKER,
          payload: {
              promise: _commonHttp2["default"].post('manager/product/tker', {
                  productIds: productIds
              })
          }
      };
  }
  
  // 修改商品推客分销配置
  
  function updateManagerProductTker(para) {
      return {
          type: UPDATE_MANAGER_PRODUCT_TKER,
          payload: {
              promise: _commonHttp2["default"].post('manager/product/tker/{id}', para, {
                  params: {
                      id: para.id
                  }
              })
          }
      };
  }
  
  // 已开通推客分销的商品列表
  
  function getManagerProductTkerList(_ref4) {
      var _ref4$page = _ref4.page;
      var page = _ref4$page === undefined ? 0 : _ref4$page;
      var _ref4$size = _ref4.size;
      var size = _ref4$size === undefined ? _commonConfig2["default"].SIZE : _ref4$size;
      var name = _ref4.name;
      var sort = _ref4.sort;
      var order = _ref4.order;
  
      return {
          type: GET_MANAGER_PRODUCT_TKER_LIST,
          payload: {
              promise: _commonHttp2["default"].get('manager/product/tker/list', {
                  page: page,
                  size: size,
                  sort: sort,
                  name: name,
                  order: order
              })
          }
      };
  }
  
  // 商品可开通推客分销渠道列表
  
  function getManagerProductTkerEnableList(_ref5) {
      var _ref5$page = _ref5.page;
      var page = _ref5$page === undefined ? 0 : _ref5$page;
      var _ref5$size = _ref5.size;
      var size = _ref5$size === undefined ? _commonConfig2["default"].SIZE : _ref5$size;
      var sort = _ref5.sort;
      var order = _ref5.order;
      var _ref5$name = _ref5.name;
      var name = _ref5$name === undefined ? '' : _ref5$name;
  
      return {
          type: GET_MANAGER_PRODUCT_TKER_ENABLE_LIST,
          payload: {
              promise: _commonHttp2["default"].get('manager/product/tker/enable/list', {
                  page: page,
                  size: size,
                  sort: sort,
                  order: order,
                  name: name
              })
          }
      };
  }
  
  // 获取商品推客分销数据
  
  function getManagerProductDataTker(id) {
      return {
          type: GET_MANAGER_DATA_TKER,
          payload: {
              promise: _commonHttp2["default"].get('manager/product/data/tker/{id}', {
                  id: id
              })
          }
      };
  }

});
