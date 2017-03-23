define('common/layout/dashboard/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _redux = require('node_modules/redux/lib/index');
  
  var _reactRedux = require('node_modules/react-redux/lib/index');
  
  var _commonConfig = require("common/config/index");
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  var _antd = require('node_modules/antd/dist/antd');
  
  '';
  
  var _componentNavPath = require('common/component/NavPath/index.jsx');
  
  var _componentNavPath2 = _interopRequireDefault(_componentNavPath);
  
  var _componentHeader = require('common/component/Header/index.jsx');
  
  var _componentHeader2 = _interopRequireDefault(_componentHeader);
  
  var _componentSidebar = require('common/component/Sidebar/index.jsx');
  
  var _componentSidebar2 = _interopRequireDefault(_componentSidebar);
  
  var _componentFooter = require('common/component/Footer/index.jsx');
  
  var _componentFooter2 = _interopRequireDefault(_componentFooter);
  
  var _storeAuthAction = require('common/store/auth/action');
  
  var authAction = _interopRequireWildcard(_storeAuthAction);
  
  var Dashboard = (function (_React$Component) {
      _inherits(Dashboard, _React$Component);
  
      _createClass(Dashboard, null, [{
          key: 'propTypes',
  
          // 属性格式
          value: {
              auth: _react.PropTypes.object,
              children: _react.PropTypes.node.isRequired
          },
  
          // 默认属性
          enumerable: true
      }, {
          key: 'defaultProps',
          value: {
              auth: {},
              children: null
          },
  
          // 上下文类型
          enumerable: true
      }, {
          key: 'contextTypes',
          value: {
              history: _react.PropTypes.object.isRequired,
              store: _react.PropTypes.object.isRequired,
              router: _react2['default'].PropTypes.object.isRequired
          },
          enumerable: true
      }]);
  
      function Dashboard(props) {
          var _this = this;
  
          _classCallCheck(this, _Dashboard);
  
          _get(Object.getPrototypeOf(_Dashboard.prototype), 'constructor', this).call(this, props);
  
          this.logout = function () {
              _this.props.actions.logout();
          };
  
          this.logoutRedirect = function () {
              location.replace(_commonConfig2['default'].SSO_URL);
          };
      }
  
      _createClass(Dashboard, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
              this.props.actions.getUserInfo();
          }
      }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
              var auth = nextProps.auth;
  
              if (operation.type == authAction.GET_USER_INFO) {
                  // 获取用户信息失败或者权限不足
                  if (operation.success && !auth.logged || operation.failure) {
                      return this.logoutRedirect();
                  }
              }
  
              // 注销成功
              if (operation.type == authAction.LOGOUT && operation.success) {
                  return this.logoutRedirect();
              }
          }
      }, {
          key: 'render',
          value: function render() {
  
              return _react2['default'].createElement(
                  'div',
                  { className: 'ant-layout-aside' },
                  _react2['default'].createElement(_componentSidebar2['default'], { auth: this.props.auth }),
                  _react2['default'].createElement(
                      'div',
                      { className: 'ant-layout-main' },
                      _react2['default'].createElement(_componentHeader2['default'], { auth: this.props.auth, logout: this.logout }),
                      _react2['default'].createElement(
                          'div',
                          { className: 'ant-layout-container' },
                          _react2['default'].createElement(
                              'div',
                              { className: 'ant-layout-content' },
                              this.props.children
                          )
                      ),
                      _react2['default'].createElement(_componentFooter2['default'], null)
                  )
              );
          }
      }]);
  
      var _Dashboard = Dashboard;
      Dashboard = (0, _reactRedux.connect)(function (state) {
          return {
              auth: state.auth.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)({
                  getUserInfo: authAction.getUserInfo,
                  logout: authAction.logout
              }, dispatch)
          };
      })(Dashboard) || Dashboard;
      return Dashboard;
  })(_react2['default'].Component);
  
  exports['default'] = Dashboard;
  module.exports = exports['default'];
  
  // 注销跳转

});
