define('admin/store/trade/action', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports.updateTradeLogistics = updateTradeLogistics;
  exports.updateTradeLogisticsStatus = updateTradeLogisticsStatus;
  exports.getTradeList = getTradeList;
  exports.getTradeShowList = getTradeShowList;
  exports.deleteTradeShow = deleteTradeShow;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  // 商品交易记录列表
  var GET_TRADE_LIST = 'GET_TRADE_LIST';
  exports.GET_TRADE_LIST = GET_TRADE_LIST;
  var GET_TRADE_LIST_PENDING = 'GET_TRADE_LIST_PENDING';
  exports.GET_TRADE_LIST_PENDING = GET_TRADE_LIST_PENDING;
  var GET_TRADE_LIST_SUCCESS = 'GET_TRADE_LIST_SUCCESS';
  exports.GET_TRADE_LIST_SUCCESS = GET_TRADE_LIST_SUCCESS;
  var GET_TRADE_LIST_FAILURE = 'GET_TRADE_LIST_FAILURE';
  
  exports.GET_TRADE_LIST_FAILURE = GET_TRADE_LIST_FAILURE;
  // 商品交易记录物流信息
  var UPDATE_TRADE_LOGISTIC = 'UPDATE_TRADE_LOGISTIC';
  exports.UPDATE_TRADE_LOGISTIC = UPDATE_TRADE_LOGISTIC;
  var UPDATE_TRADE_LOGISTIC_PENDING = 'UPDATE_TRADE_LOGISTIC_PENDING';
  exports.UPDATE_TRADE_LOGISTIC_PENDING = UPDATE_TRADE_LOGISTIC_PENDING;
  var UPDATE_TRADE_LOGISTIC_SUCCESS = 'UPDATE_TRADE_LOGISTIC_SUCCESS';
  exports.UPDATE_TRADE_LOGISTIC_SUCCESS = UPDATE_TRADE_LOGISTIC_SUCCESS;
  var UPDATE_TRADE_LOGISTIC_FAILURE = 'UPDATE_TRADE_LOGISTIC_FAILURE';
  
  exports.UPDATE_TRADE_LOGISTIC_FAILURE = UPDATE_TRADE_LOGISTIC_FAILURE;
  // 商品交易物流状态
  var UPDATE_TRADE_LOGISTIC_STATUS = 'UPDATE_TRADE_LOGISTIC_STATUS';
  exports.UPDATE_TRADE_LOGISTIC_STATUS = UPDATE_TRADE_LOGISTIC_STATUS;
  var UPDATE_TRADE_LOGISTIC_STATUS_PENDING = 'UPDATE_TRADE_LOGISTIC_STATUS_PENDING';
  exports.UPDATE_TRADE_LOGISTIC_STATUS_PENDING = UPDATE_TRADE_LOGISTIC_STATUS_PENDING;
  var UPDATE_TRADE_LOGISTIC_STATUS_SUCCESS = 'UPDATE_TRADE_LOGISTIC_STATUS_SUCCESS';
  exports.UPDATE_TRADE_LOGISTIC_STATUS_SUCCESS = UPDATE_TRADE_LOGISTIC_STATUS_SUCCESS;
  var UPDATE_TRADE_LOGISTIC_STATUS_FAILURE = 'UPDATE_TRADE_LOGISTIC_STATUS_FAILURE';
  
  exports.UPDATE_TRADE_LOGISTIC_STATUS_FAILURE = UPDATE_TRADE_LOGISTIC_STATUS_FAILURE;
  // 交易晒单列表
  var GET_TRADE_SHOW_LIST = 'GET_TRADE_SHOW_LIST';
  exports.GET_TRADE_SHOW_LIST = GET_TRADE_SHOW_LIST;
  var GET_TRADE_SHOW_LIST_PENDING = 'GET_TRADE_SHOW_LIST_PENDING';
  exports.GET_TRADE_SHOW_LIST_PENDING = GET_TRADE_SHOW_LIST_PENDING;
  var GET_TRADE_SHOW_LIST_SUCCESS = 'GET_TRADE_SHOW_LIST_SUCCESS';
  exports.GET_TRADE_SHOW_LIST_SUCCESS = GET_TRADE_SHOW_LIST_SUCCESS;
  var GET_TRADE_SHOW_LIST_FAILURE = 'GET_TRADE_SHOW_LIST_FAILURE';
  
  exports.GET_TRADE_SHOW_LIST_FAILURE = GET_TRADE_SHOW_LIST_FAILURE;
  // 交易晒单删除
  var DELETE_TRADE_SHOW = 'DELETE_TRADE_SHOW';
  exports.DELETE_TRADE_SHOW = DELETE_TRADE_SHOW;
  var DELETE_TRADE_SHOW_PENDING = 'DELETE_TRADE_SHOW_PENDING';
  exports.DELETE_TRADE_SHOW_PENDING = DELETE_TRADE_SHOW_PENDING;
  var DELETE_TRADE_SHOW_SUCCESS = 'DELETE_TRADE_SHOW_SUCCESS';
  exports.DELETE_TRADE_SHOW_SUCCESS = DELETE_TRADE_SHOW_SUCCESS;
  var DELETE_TRADE_SHOW_FAILURE = 'DELETE_TRADE_SHOW_FAILURE';
  
  exports.DELETE_TRADE_SHOW_FAILURE = DELETE_TRADE_SHOW_FAILURE;
  // 修改商城商品物流信息
  
  function updateTradeLogistics(data, buyType, id) {
      return {
          type: UPDATE_TRADE_LOGISTIC,
          payload: {
              promise: _commonHttp2['default'].post('manager/product/trade/{buyType}/logistic/{id}', data, {
                  params: {
                      buyType: buyType,
                      id: id
                  }
              })
          }
      };
  }
  
  // 修改商城商品交易记录物流状态为己收货
  
  function updateTradeLogisticsStatus(buyType, id) {
      return {
          type: UPDATE_TRADE_LOGISTIC_STATUS,
          payload: {
              promise: _commonHttp2['default'].put('manager/product/trade/{buyType}/logistic/status/received/{id}', null, {
                  params: {
                      buyType: buyType,
                      id: id
                  }
              })
          }
      };
  }
  
  // 获取商城商品交易记录列表
  // 假借商城商品列表数据已调通，从商城商品列表换为商城商品交易记录列表
  // 当然，现在没有交易记录，所以数据为空
  
  function getTradeList(_ref) {
      var buyType = _ref.buyType;
      var _ref$page = _ref.page;
      var page = _ref$page === undefined ? 0 : _ref$page;
      var _ref$size = _ref.size;
      var size = _ref$size === undefined ? 10 : _ref$size;
      var sort = _ref.sort;
      var order = _ref.order;
  
      return {
          type: GET_TRADE_LIST,
          payload: {
              promise: _commonHttp2['default'].get('manager/product/trade/{buyType}/list', {
                  buyType: buyType,
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
              })
          }
      };
  }
  
  // 返回当前账户下所有交易晒单
  
  function getTradeShowList(_ref2) {
      var _ref2$page = _ref2.page;
      var page = _ref2$page === undefined ? 0 : _ref2$page;
      var _ref2$size = _ref2.size;
      var size = _ref2$size === undefined ? 10 : _ref2$size;
      var sort = _ref2.sort;
      var order = _ref2.order;
  
      return {
          type: GET_TRADE_SHOW_LIST,
          payload: {
              promise: _commonHttp2['default'].get('manager/trade/show/list', {
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
              })
          }
      };
  }
  
  // 删除商品晒单记录
  
  function deleteTradeShow(data) {
      return {
          type: DELETE_TRADE_SHOW,
          payload: {
              promise: _commonHttp2['default']['delete']('manager/trade/show/{id}', {
                  id: data.id
              }, {
                  params: {
                      pageIndex: data.pageIndex
                  }
              })
          }
      };
  }

});
