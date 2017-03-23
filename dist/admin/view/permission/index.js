define('admin/view/permission/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _commonBasePageBase = require("common/base/PageBase.jsx");
  
  var _commonBasePageBase2 = _interopRequireDefault(_commonBasePageBase);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _redux = require("node_modules/redux/lib/index");
  
  var _reactRedux = require("node_modules/react-redux/lib/index");
  
  var _storeMallAction = require("admin/store/mall/action");
  
  var mallAction = _interopRequireWildcard(_storeMallAction);
  
  var _storeCustomerAction = require("admin/store/customer/action");
  
  var customerAction = _interopRequireWildcard(_storeCustomerAction);
  
  var _componentPermissionTable = require("admin/component/PermissionTable/index.jsx");
  
  var _componentPermissionTable2 = _interopRequireDefault(_componentPermissionTable);
  
  var _componentPermissionForm = require("admin/component/PermissionForm/index.jsx");
  
  var _componentPermissionForm2 = _interopRequireDefault(_componentPermissionForm);
  
  var permissionIndex = (function (_PageBase) {
      _inherits(permissionIndex, _PageBase);
  
      function permissionIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _permissionIndex);
  
          _get(Object.getPrototypeOf(_permissionIndex.prototype), "constructor", this).call(this, props);
  
          this.state = {};
  
          this.getAdminCustomer = function () {
              _this.props.actions.getAdminCustomer();
          };
  
          this.getMallBasic = function () {
  
              _this.props.actions.getMallBasic();
          };
  
          this.updateMallAuth = function (data) {
  
              _this.props.actions.updateMallAuth(data);
          };
      }
  
      _createClass(permissionIndex, [{
          key: "componentDidMount",
          value: function componentDidMount() {
              this.getAdminCustomer();
          }
      }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
                  case customerAction.GET_ADMIN_CUSTOMER:
                      this.setState({
                          'uin': operation.data.uin
                      });
                      this.getMallBasic();
                      break;
                  case mallAction.GET_MALL_BASIC:
                      this.setState({
                          'mallItem': operation.data
                      });
                      break;
                  case mallAction.UPDATE_MALL_AUTH:
                      _antd.message.success('提交成功！');
                      break;
  
              }
          }
  
          //获取客户信息
      }, {
          key: "render",
          value: function render() {
  
              var TabPane = _antd.Tabs.TabPane;
  
              var mallItem = this.state.mallItem;
  
              //console.log(mallItem);
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Tabs,
                      null,
                      _react2["default"].createElement(
                          TabPane,
                          { tab: "平台开通功能", key: "1" },
                          _react2["default"].createElement(_componentPermissionTable2["default"], {
                              mallAuth: this.updateMallAuth,
                              data: mallItem })
                      ),
                      _react2["default"].createElement(
                          TabPane,
                          { tab: "客户端开通设置", key: "2" },
                          _react2["default"].createElement(_componentPermissionForm2["default"], {
                              uin: this.state.uin,
                              mallAuth: this.updateMallAuth,
                              data: mallItem })
                      )
                  )
              );
          }
      }]);
  
      var _permissionIndex = permissionIndex;
      permissionIndex = (0, _reactRedux.connect)(function (state) {
          return {
              mall: state.mall.toJS(),
              customer: state.customer.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, customerAction, mallAction), dispatch)
          };
      })(permissionIndex) || permissionIndex;
      return permissionIndex;
  })(_commonBasePageBase2["default"]);
  
  exports["default"] = permissionIndex;
  module.exports = exports["default"];
  
  //获取商城信息
  
  //更新商城权限配置

});
