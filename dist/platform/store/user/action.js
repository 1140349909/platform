define('platform/store/user/action', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports.getUsers = getUsers;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  var _commonConfig = require('common/config/index');
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  var GET_USERS = 'GET_USERS';
  exports.GET_USERS = GET_USERS;
  var GET_USERS_PENDING = 'GET_USERS_PENDING';
  exports.GET_USERS_PENDING = GET_USERS_PENDING;
  var GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
  exports.GET_USERS_SUCCESS = GET_USERS_SUCCESS;
  var GET_USERS_FAILURE = 'GET_USERS_FAILURE';
  
  exports.GET_USERS_FAILURE = GET_USERS_FAILURE;
  
  function getUsers(_ref) {
      var _ref$page = _ref.page;
      var page = _ref$page === undefined ? 0 : _ref$page;
      var _ref$size = _ref.size;
      var size = _ref$size === undefined ? 10 : _ref$size;
      var _ref$sort = _ref.sort;
      var sort = _ref$sort === undefined ? 'name' : _ref$sort;
      var _ref$order = _ref.order;
      var order = _ref$order === undefined ? 'desc' : _ref$order;
  
      return {
          type: GET_USERS,
          payload: {
              promise: _commonHttp2['default'].get('platadmin/user/list', {
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
              })
          }
      };
  }

});
