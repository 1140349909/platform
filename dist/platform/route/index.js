define('platform/route/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRouter = require('node_modules/react-router/lib/index');
  
  var _commonComponentNotFound = require('common/component/NotFound/index.jsx');
  
  var _commonComponentNotFound2 = _interopRequireDefault(_commonComponentNotFound);
  
  var _commonLayoutDashboard = require('common/layout/dashboard/index.jsx');
  
  var _commonLayoutDashboard2 = _interopRequireDefault(_commonLayoutDashboard);
  
  var _viewHome = require("platform/view/home/index.jsx");
  
  var _viewHome2 = _interopRequireDefault(_viewHome);
  
  var _viewUser = require('platform/view/user/index.jsx');
  
  var _viewUser2 = _interopRequireDefault(_viewUser);
  
  var _viewMall = require('platform/view/mall/index.jsx');
  
  var _viewMall2 = _interopRequireDefault(_viewMall);
  
  var _viewCompany = require('platform/view/company/index.jsx');
  
  var _viewCompany2 = _interopRequireDefault(_viewCompany);
  
  // TODO:[待优化]权限验证
  function requireAuth(next, replace, callback) {
      var isLoggedIn = true;
      if (!isLoggedIn && next.location.pathname != '/login') {
          replace('/login');
      }
      callback();
  }
  
  // 路由配置
  
  exports['default'] = function () {
      return _react2['default'].createElement(
          _reactRouter.Route,
          null,
          _react2['default'].createElement(
              _reactRouter.Route,
              { path: '/', onEnter: requireAuth },
              _react2['default'].createElement(_reactRouter.IndexRedirect, { to: 'home' }),
              _react2['default'].createElement(
                  _reactRouter.Route,
                  { component: _commonLayoutDashboard2['default'] },
                  _react2['default'].createElement(_reactRouter.Route, { path: 'home', component: _viewHome2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'user', component: _viewUser2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'mall', component: _viewMall2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'company', component: _viewCompany2['default'] })
              )
          ),
          _react2['default'].createElement(_reactRouter.Route, { path: '*', component: _commonComponentNotFound2['default'] })
      );
  };
  
  module.exports = exports['default'];

});
