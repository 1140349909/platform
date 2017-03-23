define('platform/store/mall/action', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports.addMall = addMall;
  exports.updateMall = updateMall;
  exports.saveMall = saveMall;
  exports.getMall = getMall;
  exports.getMalls = getMalls;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  var _commonConfig = require('common/config/index');
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  // 商城管理:增删查改
  var ADD_MALL = 'ADD_MALL';
  exports.ADD_MALL = ADD_MALL;
  var ADD_MALL_PENDING = 'ADD_MALL_PENDING';
  exports.ADD_MALL_PENDING = ADD_MALL_PENDING;
  var ADD_MALL_SUCCESS = 'ADD_MALL_SUCCESS';
  exports.ADD_MALL_SUCCESS = ADD_MALL_SUCCESS;
  var ADD_MALL_FAILURE = 'ADD_MALL_FAILURE';
  
  exports.ADD_MALL_FAILURE = ADD_MALL_FAILURE;
  var UPDATE_MALL = 'UPDATE_MALL';
  exports.UPDATE_MALL = UPDATE_MALL;
  var UPDATE_MALL_PENDING = 'UPDATE_MALL_PENDING';
  exports.UPDATE_MALL_PENDING = UPDATE_MALL_PENDING;
  var UPDATE_MALL_SUCCESS = 'UPDATE_MALL_SUCCESS';
  exports.UPDATE_MALL_SUCCESS = UPDATE_MALL_SUCCESS;
  var UPDATE_MAL_FAILURE = 'UPDATE_MAL_FAILURE';
  
  exports.UPDATE_MAL_FAILURE = UPDATE_MAL_FAILURE;
  var GET_MALL = 'GET_MALL';
  exports.GET_MALL = GET_MALL;
  var GET_MALL_PENDING = 'GET_MALL_PENDING';
  exports.GET_MALL_PENDING = GET_MALL_PENDING;
  var GET_MALL_SUCCESS = 'GET_MALL_SUCCESS';
  exports.GET_MALL_SUCCESS = GET_MALL_SUCCESS;
  var GET_MALL_FAILURE = 'GET_MALL_FAILURE';
  
  exports.GET_MALL_FAILURE = GET_MALL_FAILURE;
  var GET_MALLS = 'GET_MALLS';
  exports.GET_MALLS = GET_MALLS;
  var GET_MALLS_PENDING = 'GET_MALLS_PENDING';
  exports.GET_MALLS_PENDING = GET_MALLS_PENDING;
  var GET_MALLS_SUCCESS = 'GET_MALLS_SUCCESS';
  exports.GET_MALLS_SUCCESS = GET_MALLS_SUCCESS;
  var GET_MALLS_FAILURE = 'GET_MALLS_FAILURE';
  
  exports.GET_MALLS_FAILURE = GET_MALLS_FAILURE;
  
  function addMall(mall) {
      return {
          type: ADD_MALL,
          payload: {
              promise: _commonHttp2['default'].post('platadmin/mall', mall)
          }
      };
  }
  
  function updateMall(mall) {
      return {
          type: UPDATE_MALL,
          payload: {
              promise: _commonHttp2['default'].post('platadmin/mall/{id}', mall, {
                  params: {
                      id: mall.id
                  }
              })
          }
      };
  }
  
  function saveMall(mall) {
      return mall.id ? updateMall(mall) : addMall(mall);
  }
  
  function getMall(id) {
      return {
          type: GET_MALL,
          payload: {
              promise: _commonHttp2['default'].get('platadmin/mall/{id}', {
                  id: id
              })
          }
      };
  }
  
  function getMalls(_ref) {
      var _ref$page = _ref.page;
      var page = _ref$page === undefined ? 0 : _ref$page;
      var _ref$size = _ref.size;
      var size = _ref$size === undefined ? 10 : _ref$size;
      var _ref$sort = _ref.sort;
      var sort = _ref$sort === undefined ? 'name' : _ref$sort;
      var _ref$order = _ref.order;
      var order = _ref$order === undefined ? _commonConfig2['default'].ORDER : _ref$order;
  
      // 另外一种写法, 先保留作为示例
      //return function (dispatch, getState) {
      //    return http.get('platadmin/mall', {
      //            page,
      //            size,
      //            sort,
      //            order
      //        })
      //        .then((result) => {
      //            return dispatch({
      //                type: 'GET_MALLS_SUCCESS',
      //                payload: {
      //                    data: result.data
      //                }
      //            })
      //        })
      //}
  
      return {
          type: GET_MALLS,
          payload: {
              promise: _commonHttp2['default'].get('platadmin/mall', {
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
              })
          }
      };
  }

});
