define('common/layout/layout1/index.jsx', function(require, exports, module) {

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
  
  var Dashboard = (function (_React$Component) {
      _inherits(Dashboard, _React$Component);
  
      function Dashboard(props) {
          _classCallCheck(this, Dashboard);
  
          _get(Object.getPrototypeOf(Dashboard.prototype), 'constructor', this).call(this, props);
          this.state = {};
      }
  
      // 属性格式
  
      _createClass(Dashboard, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
              this.props.actions.getUserInfo();
          }
      }, {
          key: 'render',
          value: function render() {
              return _react2['default'].createElement(
                  'div',
                  { className: 'ant-layout-top' },
                  _react2['default'].createElement(
                      'div',
                      { className: 'ant-layout-header' },
                      _react2['default'].createElement(
                          'div',
                          { className: 'ant-layout-wrapper' },
                          _react2['default'].createElement('div', { className: 'ant-layout-logo' }),
                          _react2['default'].createElement(
                              _antd.Menu,
                              { theme: 'dark', mode: 'horizontal',
                                  defaultSelectedKeys: ['2'], style: { lineHeight: '64px' } },
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '1' },
                                  '导航一'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '2' },
                                  '导航二'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '3' },
                                  '导航三'
                              )
                          )
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'ant-layout-subheader' },
                      _react2['default'].createElement(
                          'div',
                          { className: 'ant-layout-wrapper' },
                          _react2['default'].createElement(
                              _antd.Menu,
                              { mode: 'horizontal',
                                  defaultSelectedKeys: ['1'], style: { marginLeft: 124 } },
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '1' },
                                  '二级导航'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '2' },
                                  '二级导航'
                              ),
                              _react2['default'].createElement(
                                  _antd.Menu.Item,
                                  { key: '3' },
                                  '二级导航'
                              )
                          )
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'ant-layout-wrapper' },
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
                          this.props.children
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'ant-layout-footer' },
                      'Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持'
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
