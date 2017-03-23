define('common/component/Header/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('node_modules/antd/dist/antd');
  
  var _reactRouter = require('node_modules/react-router/lib/index');
  
  var _commonConfig = require("common/config/index");
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  '';
  
  var SubMenu = _antd.Menu.SubMenu;
  var MenuItemGroup = _antd.Menu.ItemGroup;
  
  var Header = (function (_React$Component) {
      _inherits(Header, _React$Component);
  
      function Header(props) {
          _classCallCheck(this, Header);
  
          _get(Object.getPrototypeOf(Header.prototype), 'constructor', this).call(this, props);
      }
  
      _createClass(Header, [{
          key: 'handleClick',
          value: function handleClick(target) {
              if (target.key == 'logout') {
                  this.props.logout();
              }
          }
      }, {
          key: 'render',
          value: function render() {
              var _props$auth = this.props.auth;
              var info = _props$auth.info;
              var permissions = _props$auth.permissions;
  
              //<Menu.Item key="setting:1">修改密码</Menu.Item>
              //<Menu.Divider />
              return _react2['default'].createElement(
                  'div',
                  { className: 'ant-layout-header' },
                  _react2['default'].createElement(
                      _antd.Menu,
                      { theme: 'dark', className: 'header-menu', onClick: this.handleClick.bind(this),
                          mode: 'horizontal' },
                      _react2['default'].createElement(
                          SubMenu,
                          { className: 'header-menu-user',
                              title: _react2['default'].createElement(
                                  'span',
                                  null,
                                  _react2['default'].createElement(_antd.Icon, { type: 'user' }),
                                  info ? info.name : '管理员'
                              ) },
                          _react2['default'].createElement(
                              _antd.Menu.Item,
                              { key: 'logout' },
                              '注销'
                          )
                      ),
                      permissions.MALL && permissions.PLATFORM && _react2['default'].createElement(
                          _antd.Menu.Item,
                          { key: 'buy' },
                          _react2['default'].createElement(
                              'a',
                              { href: 'admin.html' },
                              _react2['default'].createElement(_antd.Icon, { type: 'shopping-cart' }),
                              '商城管理'
                          )
                      ),
                      permissions.PLATFORM && _react2['default'].createElement(
                          _antd.Menu.Item,
                          { key: 'platform' },
                          _react2['default'].createElement(
                              'a',
                              { href: 'platform.html' },
                              _react2['default'].createElement(_antd.Icon, { type: 'setting' }),
                              '平台管理'
                          )
                      )
                  )
              );
          }
      }]);
  
      return Header;
  })(_react2['default'].Component);
  
  exports['default'] = Header;
  module.exports = exports['default'];

});
