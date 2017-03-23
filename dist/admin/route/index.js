define('admin/route/index.jsx', function(require, exports, module) {

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
  
  var _viewHome = require("admin/view/home/home.jsx");
  
  var _viewHome2 = _interopRequireDefault(_viewHome);
  
  var _viewComment = require("admin/view/comment/index.jsx");
  
  var _viewComment2 = _interopRequireDefault(_viewComment);
  
  var _viewCompany = require("admin/view/company/index.jsx");
  
  var _viewCompany2 = _interopRequireDefault(_viewCompany);
  
  var _viewMember = require("admin/view/member/index.jsx");
  
  var _viewMember2 = _interopRequireDefault(_viewMember);
  
  var _viewProduct = require("admin/view/product/index.jsx");
  
  var _viewProduct2 = _interopRequireDefault(_viewProduct);
  
  var _viewYyg = require("admin/view/yyg/index.jsx");
  
  var _viewYyg2 = _interopRequireDefault(_viewYyg);
  
  var _viewSetting = require("admin/view/setting/index.jsx");
  
  var _viewSetting2 = _interopRequireDefault(_viewSetting);
  
  var _viewStat = require("admin/view/stat/index.jsx");
  
  var _viewStat2 = _interopRequireDefault(_viewStat);
  
  var _viewTrade = require("admin/view/trade/index.jsx");
  
  var _viewTrade2 = _interopRequireDefault(_viewTrade);
  
  var _viewIntegral = require("admin/view/integral/index.jsx");
  
  var _viewIntegral2 = _interopRequireDefault(_viewIntegral);
  
  var _viewCoupon = require("admin/view/coupon/index.jsx");
  
  var _viewCoupon2 = _interopRequireDefault(_viewCoupon);
  
  var _viewCouponAdd = require("admin/view/coupon/add.jsx");
  
  var _viewCouponAdd2 = _interopRequireDefault(_viewCouponAdd);
  
  var _viewContent = require("admin/view/content/index.jsx");
  
  var _viewContent2 = _interopRequireDefault(_viewContent);
  
  var _viewCard = require("admin/view/card/index.jsx");
  
  var _viewCard2 = _interopRequireDefault(_viewCard);
  
  var _viewBanner = require('admin/view/banner/index.jsx');
  
  var _viewBanner2 = _interopRequireDefault(_viewBanner);
  
  var _viewPermission = require('admin/view/permission/index.jsx');
  
  var _viewPermission2 = _interopRequireDefault(_viewPermission);
  
  var _viewImprove = require('admin/view/improve/index.jsx');
  
  var _viewImprove2 = _interopRequireDefault(_viewImprove);
  
  var _viewTker = require('admin/view/tker/index.jsx');
  
  var _viewTker2 = _interopRequireDefault(_viewTker);
  
  var _viewWithdraw = require('admin/view/withdraw/index.jsx');
  
  var _viewWithdraw2 = _interopRequireDefault(_viewWithdraw);
  
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
                  _react2['default'].createElement(_reactRouter.Route, { path: 'company', component: _viewCompany2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'member', component: _viewMember2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'product/add', component: _viewProduct2['default'].Add }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'product/list', component: _viewProduct2['default'].List }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'product/sale', component: _viewProduct2['default'].Sale }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'setting', component: _viewSetting2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'stat', component: _viewStat2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'trade/:type', component: _viewTrade2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'comment/:type', component: _viewComment2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'integral', component: _viewIntegral2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'coupon', component: _viewCoupon2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'coupon/add', component: _viewCouponAdd2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'card', component: _viewCard2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'yyg', component: _viewYyg2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'banner/:type', component: _viewBanner2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'permission', component: _viewPermission2['default'] }),
                  _react2['default'].createElement(
                      _reactRouter.Route,
                      { path: 'tker' },
                      _react2['default'].createElement(_reactRouter.Route, { path: 'config', component: _viewTker2['default'].Config }),
                      _react2['default'].createElement(_reactRouter.Route, { path: 'member', component: _viewTker2['default'].Member }),
                      _react2['default'].createElement(_reactRouter.Route, { path: 'product', component: _viewTker2['default'].Product })
                  ),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'withdraw', component: _viewWithdraw2['default'] }),
                  _react2['default'].createElement(_reactRouter.Route, { path: 'content/:type', component: _viewContent2['default'] })
              ),
              _react2['default'].createElement(_reactRouter.Route, { path: 'improve', component: _viewImprove2['default'] })
          ),
          _react2['default'].createElement(_reactRouter.Route, { path: '*', component: _commonComponentNotFound2['default'] })
      );
  };
  
  module.exports = exports['default'];

});
