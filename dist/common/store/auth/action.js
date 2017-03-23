define('common/store/auth/action', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports.getUserInfo = getUserInfo;
  exports.login = login;
  exports.logout = logout;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _http = require("common/http/index");
  
  var _http2 = _interopRequireDefault(_http);
  
  // 登录用户信息
  var GET_USER_INFO = 'GET_USER_INFO';
  exports.GET_USER_INFO = GET_USER_INFO;
  var GET_USER_INFO_PENDING = 'GET_USER_INFO_PENDING';
  exports.GET_USER_INFO_PENDING = GET_USER_INFO_PENDING;
  var GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
  exports.GET_USER_INFO_SUCCESS = GET_USER_INFO_SUCCESS;
  var GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';
  
  exports.GET_USER_INFO_FAILURE = GET_USER_INFO_FAILURE;
  // 登录
  var LOGIN = 'LOGIN';
  exports.LOGIN = LOGIN;
  var LOGIN_PENDING = 'LOGIN_PENDING';
  exports.LOGIN_PENDING = LOGIN_PENDING;
  var LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  exports.LOGIN_SUCCESS = LOGIN_SUCCESS;
  var LOGIN_FAILURE = 'LOGIN_FAILURE';
  exports.LOGIN_FAILURE = LOGIN_FAILURE;
  // 退出
  var LOGOUT = 'LOGOUT';
  exports.LOGOUT = LOGOUT;
  var LOGOUT_PENDING = 'LOGOUT_PENDING';
  exports.LOGOUT_PENDING = LOGOUT_PENDING;
  var LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
  exports.LOGOUT_SUCCESS = LOGOUT_SUCCESS;
  var LOGOUT_FAILURE = 'LOGOUT_FAILURE';
  
  exports.LOGOUT_FAILURE = LOGOUT_FAILURE;
  // 获取当前登陆用户的信息
  
  function getUserInfo() {
      return {
          type: GET_USER_INFO,
          payload: {
              promise: _http2['default'].get('user/info')
          }
      };
  }
  
  // 登陆
  
  function login(username, password) {
      return {
          type: LOGIN,
          payload: {
              promise: _http2['default'].post('/buy/security_check', 'username=' + username + '&password=' + password, {
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                  },
                  responseType: 'json'
              })
          }
      };
  }
  
  // 注销
  
  function logout() {
      return {
          type: LOGOUT,
          payload: {
              promise: _http2['default'].get('/buy/logout')
          }
      };
  }

});
