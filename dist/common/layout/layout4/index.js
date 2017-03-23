define('common/layout/layout4/index.jsx', function(require, exports, module) {

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
  
  var _redux = require('node_modules/redux/lib/index');
  
  var _reactRedux = require('node_modules/react-redux/lib/index');
  
  var _antd = require('node_modules/antd/dist/antd');
  
  '';
  
  var _storeAuthAction = require('common/store/auth/action');
  
  var SubMenu = _antd.Menu.SubMenu;
  
  var Dashboard = (function (_React$Component) {
      _inherits(Dashboard, _React$Component);
  
      function Dashboard(props) {
          _classCallCheck(this, Dashboard);
  
          _get(Object.getPrototypeOf(Dashboard.prototype), 'constructor', this).call(this, props);
          this.state = {
              collapse: true
          };
      }
  
      // 属性格式
  
      _createClass(Dashboard, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
              this.props.actions.getUserInfo();
          }
      }, {
          key: 'onCollapseChange',
          value: function onCollapseChange() {
              this.setState({
                  collapse: !this.state.collapse
              });
          }
      }, {
          key: 'render',
          value: function render() {
              var collapse = this.state.collapse;
  
              return _react2['default'].createElement(
                  'div',
                  { className: collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside" },
                  _react2['default'].createElement(
                      'aside',
                      { className: 'ant-layout-sider' },
                      _react2['default'].createElement('div', { className: 'ant-layout-logo' }),
                      _react2['default'].createElement(
                          _antd.Menu,
                          { mode: 'inline', theme: 'dark', defaultSelectedKeys: ['user'] },
                          _react2['default'].createElement(
                              _antd.Menu.Item,
                              { key: 'user' },
                              _react2['default'].createElement(_antd.Icon, { type: 'user' }),
                              _react2['default'].createElement(
                                  'span',
                                  { className: 'nav-text' },
                                  '导航一'
                              )
                          ),
                          _react2['default'].createElement(
                              SubMenu,
                              { key: 'sub1', title: _react2['default'].createElement(
                                      'span',
                                      null,
                                      _react2['default'].createElement(_antd.Icon, { type: 'user' }),
                                      '导航一'
                                  ) },
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '1' },
                                  '选项1'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '2' },
                                  '选项2'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '3' },
                                  '选项3'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '4' },
                                  '选项4'
                              )
                          ),
                          _react2['default'].createElement(
                              SubMenu,
                              { key: 'sub2', title: _react2['default'].createElement(
                                      'span',
                                      null,
                                      _react2['default'].createElement(_antd.Icon, { type: 'laptop' }),
                                      '导航二'
                                  ) },
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '5' },
                                  '选项5'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '6' },
                                  '选项6'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '7' },
                                  '选项7'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '8' },
                                  '选项8'
                              )
                          ),
                          _react2['default'].createElement(
                              SubMenu,
                              { key: 'sub3', title: _react2['default'].createElement(
                                      'span',
                                      null,
                                      _react2['default'].createElement(_antd.Icon, { type: 'notification' }),
                                      '导航三'
                                  ) },
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '9' },
                                  '选项9'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '10' },
                                  '选项10'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '11' },
                                  '选项11'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '12' },
                                  '选项12'
                              )
                          ),
                          _react2['default'].createElement(
                              _antd.Menu.Item,
                              { key: 'setting' },
                              _react2['default'].createElement(_antd.Icon, { type: 'setting' }),
                              _react2['default'].createElement(
                                  'span',
                                  { className: 'nav-text' },
                                  '导航二'
                              )
                          ),
                          _react2['default'].createElement(
                              _antd.Menu.Item,
                              { key: 'laptop' },
                              _react2['default'].createElement(_antd.Icon, { type: 'laptop' }),
                              _react2['default'].createElement(
                                  'span',
                                  { className: 'nav-text' },
                                  '导航三'
                              )
                          ),
                          _react2['default'].createElement(
                              _antd.Menu.Item,
                              { key: 'notification' },
                              _react2['default'].createElement(_antd.Icon, { type: 'notification' }),
                              _react2['default'].createElement(
                                  'span',
                                  { className: 'nav-text' },
                                  '导航四'
                              )
                          ),
                          _react2['default'].createElement(
                              _antd.Menu.Item,
                              { key: 'folder' },
                              _react2['default'].createElement(_antd.Icon, { type: 'folder' }),
                              _react2['default'].createElement(
                                  'span',
                                  { className: 'nav-text' },
                                  '导航五'
                              )
                          )
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'ant-aside-action', onClick: this.onCollapseChange.bind(this) },
                          collapse ? _react2['default'].createElement(_antd.Icon, { type: 'right' }) : _react2['default'].createElement(_antd.Icon, { type: 'left' })
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'ant-layout-main' },
                      _react2['default'].createElement('div', { className: 'ant-layout-header' }),
                      _react2['default'].createElement(
                          'div',
                          { className: 'ant-layout-breadcrumb' },
                          _react2['default'].createElement(
                              _antd.Breadcrumb,
                              null,
                              _react2['default'].createElement(
                                  _antd.Breadcrumb.Item,
                                  null,
                                  '首页'
                              ),
                              _react2['default'].createElement(
                                  _antd.Breadcrumb.Item,
                                  null,
                                  '应用列表'
                              ),
                              _react2['default'].createElement(
                                  _antd.Breadcrumb.Item,
                                  null,
                                  '某应用'
                              )
                          )
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'ant-layout-container' },
                          _react2['default'].createElement(
                              'div',
                              { className: 'ant-layout-content' },
                              _react2['default'].createElement(
                                  'div',
                                  { style: { height: 220 } },
                                  this.props.children
                              )
                          )
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'ant-layout-footer' },
                          'Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持'
                      )
                  )
              );
          }
      }]);
  
      return Dashboard;
  })(_react2['default'].Component);
  
  Dashboard.propTypes = {
      user: _react.PropTypes.object,
      children: _react.PropTypes.node.isRequired
  };
  
  // 默认属性
  Dashboard.defaultProps = {
      auth: {},
      children: null
  };
  
  // 上下文类型
  Dashboard.contextTypes = {
      history: _react.PropTypes.object.isRequired,
      store: _react.PropTypes.object.isRequired
  };
  
  var mapStateToProps = function mapStateToProps(state) {
      var auth = state.auth;
  
      return {
          auth: auth ? auth : null
      };
  };
  
  function mapDispatchToProps(dispatch) {
      return {
          actions: (0, _redux.bindActionCreators)({
              getUserInfo: _storeAuthAction.getUserInfo,
              logout: _storeAuthAction.logout
          }, dispatch)
      };
  }
  
  exports['default'] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Dashboard);
  module.exports = exports['default'];

});
