define('admin/view/improve/index.jsx', function(require, exports, module) {

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
  
  var _commonBasePageBase = require('common/base/PageBase.jsx');
  
  var _commonBasePageBase2 = _interopRequireDefault(_commonBasePageBase);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _redux = require("node_modules/redux/lib/index");
  
  var _reactRedux = require("node_modules/react-redux/lib/index");
  
  var _reactRouter = require("node_modules/react-router/lib/index");
  
  '';
  
  var _componentImproveForm = require("admin/component/ImproveForm/index.jsx");
  
  var _componentImproveForm2 = _interopRequireDefault(_componentImproveForm);
  
  var _storeMallAction = require("admin/store/mall/action");
  
  var mallAction = _interopRequireWildcard(_storeMallAction);
  
  var _storeCustomerAction = require("admin/store/customer/action");
  
  var customerAction = _interopRequireWildcard(_storeCustomerAction);
  
  var ImproveIndex = (function (_PageBase) {
      _inherits(ImproveIndex, _PageBase);
  
      function ImproveIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _ImproveIndex);
  
          _get(Object.getPrototypeOf(_ImproveIndex.prototype), "constructor", this).call(this, props);
          this.state = {
              data: {
                  mallName: '我的商城',
                  payType: {
                      wechat: {
                          "appid": "",
                          "enable": false,
                          "muchId": "",
                          "muchKey": "",
                          "secret": "",
                          "useSys": true
                      },
                      alipay: {
                          "name": "",
                          "account": "",
                          "enable": false,
                          "key": "",
                          "pid": "",
                          "useSys": true
                      }
                  },
                  mallAuth: {
                      "brandAuth": "TRUE",
                      "contentAuth": "TRUE",
                      "mallAuth": "TRUE",
                      "mallOpMode": "S",
                      "partnerAuth": "TRUE",
                      "yygAuth": "TRUE"
                  }
              },
              uin: ''
          };
  
          this.getAdminCustomer = function () {
              _this.props.actions.getAdminCustomer();
          };
  
          this.updateMallBasic = function (data) {
              _this.props.actions.updateMallBasic(data);
          };
  
          this.updateMallAuth = function (data) {
              _this.props.actions.updateMallAuth(data);
          };
  
          this.updateCustomerWechat = function (id, data) {
              _this.props.actions.updateCustomerWechat(id, data);
          };
  
          this.updateCustomerAlipay = function (id, data) {
              _this.props.actions.updateCustomerAlipay(id, data);
          };
  
          this.handleCancel = function () {
              _this.props.router.push('setting');
          };
  
          this.handleComplete = function () {
              _this.props.router.push('home');
          };
      }
  
      _createClass(ImproveIndex, [{
          key: "componentDidMount",
          value: function componentDidMount() {
              this.getAdminCustomer();
          }
      }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
  
              //console.log('improve', nextProps);
  
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
                  case customerAction.GET_ADMIN_CUSTOMER:
                      this.setState({
                          id: operation.data.id,
                          uin: operation.data.uin
                      });
                      break;
                  case mallAction.UPDATE_MALL_BASIC:
                      _antd.message.success('提交成功！');
                      break;
                  case customerAction.UPDATE_CUSTOMER_WECHAT:
                      _antd.message.success('提交成功！');
                      break;
                  case customerAction.UPDATE_CUSTOMER_ALIPAY:
                      _antd.message.success('提交成功！');
                      break;
                  case mallAction.UPDATE_MALL_AUTH:
                      _antd.message.success('提交成功！');
                      this.handleComplete();
                      break;
              }
          }
      }, {
          key: "render",
          value: function render() {
              var _state = this.state;
              var data = _state.data;
              var uin = _state.uin;
              var id = _state.id;
  
              return _react2["default"].createElement(
                  "div",
                  { className: "improve-parent-container" },
                  _react2["default"].createElement(
                      "div",
                      { className: "improve-parent-container-title" },
                      _react2["default"].createElement(
                          "span",
                          { className: "baseline-middle" },
                          "艾乐卡 营销平台"
                      )
                  ),
                  _react2["default"].createElement(
                      "div",
                      { className: "improve-parent-container-body" },
                      _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              "span",
                              { className: "improve-form-span-20" },
                              "基础设置"
                          ),
                          _react2["default"].createElement("hr", { className: "improve-hr" })
                      ),
                      _react2["default"].createElement("br", null),
                      _react2["default"].createElement(_componentImproveForm2["default"], { data: data,
                          uin: uin,
                          id: id,
                          updateCustomerWechat: this.updateCustomerWechat,
                          updateCustomerAlipay: this.updateCustomerAlipay,
                          updateMallBasic: this.updateMallBasic,
                          updateMallAuth: this.updateMallAuth,
                          handleCancel: this.handleCancel,
                          handleComplete: this.handleComplete
                      })
                  )
              );
          }
      }]);
  
      var _ImproveIndex = ImproveIndex;
      ImproveIndex = (0, _reactRouter.withRouter)(ImproveIndex) || ImproveIndex;
      ImproveIndex = (0, _reactRedux.connect)(function (state) {
          return {
              mall: state.mall.toJS(),
              customer: state.customer.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, customerAction, mallAction), dispatch)
          };
      })(ImproveIndex) || ImproveIndex;
      return ImproveIndex;
  })(_commonBasePageBase2["default"]);
  
  exports["default"] = ImproveIndex;
  module.exports = exports["default"];
  
  //暂不设置，跳过
  
  //完成，开启营销

});
