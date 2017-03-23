define('common/component/Sidebar/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _redux = require("node_modules/redux/lib/index");
  
  var _reactRedux = require("node_modules/react-redux/lib/index");
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _reactRouter = require("node_modules/react-router/lib/index");
  
  '';
  
  var SubMenu = _antd.Menu.SubMenu;
  
  var Sidebar = (function (_React$Component) {
      _inherits(Sidebar, _React$Component);
  
      _createClass(Sidebar, null, [{
          key: "propTypes",
          value: {
              items: _react.PropTypes.array,
              currentIndex: _react.PropTypes.number
          },
          enumerable: true
      }]);
  
      function Sidebar(props) {
          _classCallCheck(this, Sidebar);
  
          _get(Object.getPrototypeOf(Sidebar.prototype), "constructor", this).call(this, props);
          this.state = {
              selectedKeys: []
          };
          this.defaultProps = {
              items: [],
              currentIndex: 0
          };
      }
  
      _createClass(Sidebar, [{
          key: "render",
          value: function render() {
              var _props$auth = this.props.auth;
              var info = _props$auth.info;
              var permissions = _props$auth.permissions;
  
              var type = undefined;
              if (location.href.indexOf('admin.html') > -1) {
                  type = 'mall';
              } else if (location.href.indexOf('platform.html') > -1) {
                  type = 'platform';
              } else {
                  type = 'platform';
              }
  
              return _react2["default"].createElement(
                  "aside",
                  { className: "ant-layout-sider" },
                  _react2["default"].createElement("div", { className: "ant-layout-logo" }),
                  _react2["default"].createElement(
                      _antd.Menu,
                      { mode: "inline", theme: "dark",
                          defaultOpenKeys: ['menu-platform', 'menu-strategy', 'menu-product', 'menu-yyg', 'menu-tker', 'menu-mall', 'menu-user', 'menu-basic'],
                          defaultSelectedKeys: this.state.selectedKeys },
                      type == 'platform' && permissions.PLATFORM && _react2["default"].createElement(
                          SubMenu,
                          { key: "menu-platform", title: _react2["default"].createElement(
                                  "span",
                                  null,
                                  _react2["default"].createElement(_antd.Icon, { type: "setting" }),
                                  "平台管理"
                              ) },
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-platform-company" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/company" },
                                  "企业管理"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-platform-mall" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/mall" },
                                  "商城管理"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-platform-user" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/user" },
                                  "平台会员"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-platform-rest" },
                              _react2["default"].createElement(
                                  "a",
                                  { href: "http://api.sit.vveshow.com/buy/rest/",
                                      target: "_blank" },
                                  "接口管理"
                              )
                          )
                      ),
                      type == 'mall' && permissions.MALL && _react2["default"].createElement(
                          SubMenu,
                          { key: "menu-strategy", title: _react2["default"].createElement(
                                  "span",
                                  null,
                                  _react2["default"].createElement(_antd.Icon, { type: "solution" }),
                                  "营销策略"
                              ) },
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-strategy-content" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/content/list" },
                                  "内容引擎"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-strategy-site" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/content/site" },
                                  "内容站点"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-strategy-integral" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/integral" },
                                  "积分管理"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-strategy-coupon" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/coupon" },
                                  "优惠券管理"
                              )
                          )
                      ),
                      type == 'mall' && permissions.MALL && _react2["default"].createElement(
                          SubMenu,
                          { key: "menu-mall", title: _react2["default"].createElement(
                                  "span",
                                  null,
                                  _react2["default"].createElement(_antd.Icon, { type: "shopping-cart" }),
                                  "商品库"
                              ) },
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-product-add" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/product/add" },
                                  "新增商品"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-product-list" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/product/list" },
                                  "商品管理"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-mall-product" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/product/sale" },
                                  "在售商品"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-mall-trade" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/trade/mall" },
                                  "交易管理"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-mall-banner" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/banner/mall" },
                                  "客户端设置"
                              )
                          )
                      ),
                      type == 'mall' && permissions.MALL && _react2["default"].createElement(
                          SubMenu,
                          { key: "menu-yyg", title: _react2["default"].createElement(
                                  "span",
                                  null,
                                  _react2["default"].createElement(_antd.Icon, { type: "pay-circle-o" }),
                                  "一元购"
                              ) },
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-yyg-product" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/yyg" },
                                  "上架商品"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-yyg-trade" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/trade/yyg" },
                                  "交易管理"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-yyg-comment" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/comment/yyg" },
                                  "晒单管理"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-yyg-banner" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/banner/yyg" },
                                  "客户端设置"
                              )
                          )
                      ),
                      type == 'mall' && permissions.MALL && _react2["default"].createElement(
                          SubMenu,
                          { key: "menu-tker", title: _react2["default"].createElement(
                                  "span",
                                  null,
                                  _react2["default"].createElement(_antd.Icon, { type: "share-alt" }),
                                  "分销管理"
                              ) },
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-tker-product" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/tker/config" },
                                  "分销设置"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-tker-comment" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/tker/member" },
                                  "分销会员"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-tker-trade" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/tker/product" },
                                  "分销商品"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-tker-withdraw" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/withdraw" },
                                  "提现管理"
                              )
                          )
                      ),
                      type == 'mall' && permissions.MALL && _react2["default"].createElement(
                          SubMenu,
                          { key: "menu-user", title: _react2["default"].createElement(
                                  "span",
                                  null,
                                  _react2["default"].createElement(_antd.Icon, { type: "team" }),
                                  "会员中心"
                              ) },
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-user-member" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/member" },
                                  "会员详情"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-user-card" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/card" },
                                  "会员卡"
                              )
                          )
                      ),
                      type == 'mall' && permissions.MALL && _react2["default"].createElement(
                          SubMenu,
                          { key: "menu-basic", title: _react2["default"].createElement(
                                  "span",
                                  null,
                                  _react2["default"].createElement(_antd.Icon, { type: "setting" }),
                                  "基础设置"
                              ) },
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-basic-auth" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/permission" },
                                  "功能开通"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-basic-company" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/company" },
                                  "线下渠道"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Menu.Item,
                              { key: "menu-basic-setting" },
                              _react2["default"].createElement(
                                  _reactRouter.Link,
                                  { to: "/setting" },
                                  "基础设置"
                              )
                          )
                      )
                  )
              );
          }
      }]);
  
      return Sidebar;
  })(_react2["default"].Component);
  
  exports["default"] = Sidebar;
  module.exports = exports["default"];

});
