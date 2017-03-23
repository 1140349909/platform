define('common/store/auth/reducer', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createReducer;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var _reduxImmutablejs = require('node_modules/redux-immutablejs/lib/index');
  
  var _immutable = require('node_modules/immutable/dist/immutable');
  
  var _commonConfigConstants = require('common/config/constants');
  
  var _lodash = require('node_modules/lodash/lodash');
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _action = require('common/store/auth/action');
  
  var initialState = (0, _immutable.fromJS)({
      // 用户信息
      info: null,
      // 是否已经登陆
      logged: false,
      // 功能权限列表
      permissions: {}
  });
  
  exports['default'] = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _action.LOGIN_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
      return state.set({
          info: null,
          logged: true,
          permissions: {}
      });
  }), _defineProperty(_createReducer, _action.LOGIN_FAILURE, function (state, _ref2) {
      var payload = _ref2.payload;
      return state.set({
          info: null,
          logged: false,
          permissions: {}
      });
  }), _defineProperty(_createReducer, _action.LOGOUT_SUCCESS, function (state, _ref3) {
      var payload = _ref3.payload;
      return state.set({
          info: null,
          logged: false,
          permissions: {}
      });
  }), _defineProperty(_createReducer, _action.GET_USER_INFO_SUCCESS, function (state, _ref4) {
      var payload = _ref4.payload;
  
      var info = payload.data;
  
      // 最大的角色
      var role = getRole(info.roles);
  
      if (role < _commonConfigConstants.ROLE.MANAGER) {
          return state.set({
              info: null,
              logged: false,
              permissions: {}
          });
      }
  
      info.role = role;
      var permissions = getPermissions(info.roles);
      return state.merge({
          info: info,
          logged: true,
          permissions: permissions
      });
  }), _createReducer));
  
  // 获取用户最大角色
  function getRole(roles) {
  
      if (_lodash2['default'].isEmpty(roles)) {
          return _commonConfigConstants.ROLE.VISITOR;
      }
  
      if (roles.indexOf('PLATFORM') != -1) {
          return _commonConfigConstants.ROLE.PLATFORM;
      }
  
      if (roles.indexOf('ADMIN') != -1) {
          return _commonConfigConstants.ROLE.ADMIN;
      }
  
      if (roles.indexOf('MANAGER') != -1) {
          return _commonConfigConstants.ROLE.MANAGER;
      }
  
      if (roles.indexOf('USER') != -1) {
          return _commonConfigConstants.ROLE.USER;
      }
  
      if (roles.indexOf('MEMBER') != -1) {
          return _commonConfigConstants.ROLE.MEMBER;
      }
  }
  
  // 是否有权限
  function hasPermissions(userRoles, authRoles) {
      var role = getRole(userRoles);
  
      if (role < _commonConfigConstants.ROLE.MANAGER) {
          return false;
      }
  
      for (var i = 0; i < authRoles.length; i++) {
          if (userRoles.indexOf(authRoles[i]) != -1) {
              return true;
          }
      }
      return false;
  }
  
  // 获取用户功能权限
  function getPermissions(userRoles) {
      return {
          PLATFORM: hasPermissions(userRoles, ['PLATFORM']),
          MALL: hasPermissions(userRoles, ['ADMIN', 'MANAGER'])
      };
  }
  module.exports = exports['default'];
  
  // 登陆成功
  
  // 登陆失败
  
  // 注销成功
  
  // 获取登陆用户信息

});
