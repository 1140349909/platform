define('admin/store/integral/action', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports.getIntegralList = getIntegralList;
  exports.getIntegralResList = getIntegralResList;
  exports.updateIntegral = updateIntegral;
  exports.addIntegral = addIntegral;
  exports.deleteIntegral = deleteIntegral;
  exports.getIntegral = getIntegral;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  /*平台积分管理服务：integral*/
  
  // 删除积分
  var DELETE_INTEGRAL = 'DELETE_INTEGRAL';
  exports.DELETE_INTEGRAL = DELETE_INTEGRAL;
  var DELETE_INTEGRAL_PENDING = 'DELETE_INTEGRAL_PENDING';
  exports.DELETE_INTEGRAL_PENDING = DELETE_INTEGRAL_PENDING;
  var DELETE_INTEGRAL_SUCCESS = 'DELETE_INTEGRAL_SUCCESS';
  exports.DELETE_INTEGRAL_SUCCESS = DELETE_INTEGRAL_SUCCESS;
  var DELETE_INTEGRAL_FAILURE = 'DELETE_INTEGRAL_FAILURE';
  exports.DELETE_INTEGRAL_FAILURE = DELETE_INTEGRAL_FAILURE;
  // 积分列表
  var GET_INTEGRAL_LIST = 'GET_INTEGRAL_LIST';
  exports.GET_INTEGRAL_LIST = GET_INTEGRAL_LIST;
  var GET_INTEGRAL_LIST_PENDING = 'GET_INTEGRAL_LIST_PENDING';
  exports.GET_INTEGRAL_LIST_PENDING = GET_INTEGRAL_LIST_PENDING;
  var GET_INTEGRAL_LIST_SUCCESS = 'GET_INTEGRAL_LIST_SUCCESS';
  exports.GET_INTEGRAL_LIST_SUCCESS = GET_INTEGRAL_LIST_SUCCESS;
  var GET_INTEGRAL_LIST_FAILURE = 'GET_INTEGRAL_LIST_FAILURE';
  exports.GET_INTEGRAL_LIST_FAILURE = GET_INTEGRAL_LIST_FAILURE;
  // 积分资源绑定列表
  var GET_INTEGRAL_RES_LIST = 'GET_INTEGRAL_RES_LIST';
  exports.GET_INTEGRAL_RES_LIST = GET_INTEGRAL_RES_LIST;
  var GET_INTEGRAL_RES_LIST_PENDING = 'GET_INTEGRAL_RES_LIST_PENDING';
  exports.GET_INTEGRAL_RES_LIST_PENDING = GET_INTEGRAL_RES_LIST_PENDING;
  var GET_INTEGRAL_RES_LIST_SUCCESS = 'GET_INTEGRAL_RES_LIST_SUCCESS';
  exports.GET_INTEGRAL_RES_LIST_SUCCESS = GET_INTEGRAL_RES_LIST_SUCCESS;
  var GET_INTEGRAL_RES_LIST_FAILURE = 'GET_INTEGRAL_RES_LIST_FAILURE';
  exports.GET_INTEGRAL_RES_LIST_FAILURE = GET_INTEGRAL_RES_LIST_FAILURE;
  // 获取积分详情
  var GET_INTEGRAL = 'GET_INTEGRAL';
  exports.GET_INTEGRAL = GET_INTEGRAL;
  var GET_INTEGRAL_PENDING = 'GET_INTEGRAL_PENDING';
  exports.GET_INTEGRAL_PENDING = GET_INTEGRAL_PENDING;
  var GET_INTEGRAL_SUCCESS = 'GET_INTEGRAL_SUCCESS';
  exports.GET_INTEGRAL_SUCCESS = GET_INTEGRAL_SUCCESS;
  var GET_INTEGRAL_FAILURE = 'GET_INTEGRAL_FAILURE';
  exports.GET_INTEGRAL_FAILURE = GET_INTEGRAL_FAILURE;
  // 修改积分
  var UPDATE_INTEGRAL = 'UPDATE_INTEGRAL';
  exports.UPDATE_INTEGRAL = UPDATE_INTEGRAL;
  var UPDATE_INTEGRAL_PENDING = 'UPDATE_INTEGRAL_PENDING';
  exports.UPDATE_INTEGRAL_PENDING = UPDATE_INTEGRAL_PENDING;
  var UPDATE_INTEGRAL_SUCCESS = 'UPDATE_INTEGRAL_SUCCESS';
  exports.UPDATE_INTEGRAL_SUCCESS = UPDATE_INTEGRAL_SUCCESS;
  var UPDATE_INTEGRAL_FAILURE = 'UPDATE_INTEGRAL_FAILURE';
  exports.UPDATE_INTEGRAL_FAILURE = UPDATE_INTEGRAL_FAILURE;
  // 新增积分
  var ADD_INTEGRAL = 'ADD_INTEGRAL';
  exports.ADD_INTEGRAL = ADD_INTEGRAL;
  var ADD_INTEGRAL_PENDING = 'ADD_INTEGRAL_PENDING';
  exports.ADD_INTEGRAL_PENDING = ADD_INTEGRAL_PENDING;
  var ADD_INTEGRAL_SUCCESS = 'ADD_INTEGRAL_SUCCESS';
  exports.ADD_INTEGRAL_SUCCESS = ADD_INTEGRAL_SUCCESS;
  var ADD_INTEGRAL_FAILURE = 'ADD_INTEGRAL_FAILURE';
  
  exports.ADD_INTEGRAL_FAILURE = ADD_INTEGRAL_FAILURE;
  /*平台积分管理服务：完*/
  
  //积分列表
  
  function getIntegralList(_ref) {
      var _ref$page = _ref.page;
      var page = _ref$page === undefined ? 0 : _ref$page;
      var _ref$size = _ref.size;
      var size = _ref$size === undefined ? 10 : _ref$size;
      var sort = _ref.sort;
      var order = _ref.order;
  
      return {
          type: GET_INTEGRAL_LIST,
          payload: {
              promise: _commonHttp2['default'].get('manager/integral/list', {
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
              })
          }
      };
  }
  
  //积分资源绑定列表
  
  function getIntegralResList(_ref2) {
      var id = _ref2.id;
      var _ref2$page = _ref2.page;
      var page = _ref2$page === undefined ? 0 : _ref2$page;
      var _ref2$size = _ref2.size;
      var size = _ref2$size === undefined ? 10 : _ref2$size;
      var sort = _ref2.sort;
      var order = _ref2.order;
  
      return {
          type: GET_INTEGRAL_RES_LIST,
          payload: {
              promise: _commonHttp2['default'].get('manager/integral/res/list/{id}', {
                  id: id,
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
              })
          }
      };
  }
  
  //修改积分
  /*var data = {
   id: '',
   para: {
   "perTotal": 0,
   "plusAmount": 0
   }
   };*/
  
  function updateIntegral(id, data) {
      return {
          type: UPDATE_INTEGRAL,
          payload: {
              promise: _commonHttp2['default'].post('manager/integral/{id}', data, {
                  params: {
                      id: id
                  }
              })
          }
      };
  }
  
  //新增积分
  /*var data = {
   para: {
   "integral": 0,
   "perTotal": 0,
   "total": 0
   }
   };*/
  
  function addIntegral(data) {
      return {
          type: ADD_INTEGRAL,
          payload: {
              promise: _commonHttp2['default'].post('manager/integral', data)
          }
      };
  }
  
  // 删除积分
  
  function deleteIntegral(id) {
      return {
          type: DELETE_INTEGRAL,
          payload: {
              promise: _commonHttp2['default']['delete']('manager/integral/{id}', {
                  id: id
              })
          }
      };
  }
  
  //获取积分详情
  
  function getIntegral(id) {
      return {
          type: GET_INTEGRAL,
          payload: {
              promise: _commonHttp2['default'].get('manager/integral/{id}', {
                  id: id
              })
          }
      };
  }

});
