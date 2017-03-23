define('admin/view/card/index.jsx', function(require, exports, module) {

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
  
  var _redux = require("node_modules/redux/lib/index");
  
  var _reactRedux = require("node_modules/react-redux/lib/index");
  
  var _commonBasePageBase = require('common/base/PageBase.jsx');
  
  var _commonBasePageBase2 = _interopRequireDefault(_commonBasePageBase);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _componentCardForm = require("admin/component/CardForm/index.jsx");
  
  var _componentCardForm2 = _interopRequireDefault(_componentCardForm);
  
  var _componentCardStyle = require("admin/component/CardStyle/index.jsx");
  
  var _componentCardStyle2 = _interopRequireDefault(_componentCardStyle);
  
  '';
  
  var _storeCustomerAction = require("admin/store/customer/action");
  
  var customerAction = _interopRequireWildcard(_storeCustomerAction);
  
  var CardIndex = (function (_PageBase) {
      _inherits(CardIndex, _PageBase);
  
      function CardIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _CardIndex);
  
          _get(Object.getPrototypeOf(_CardIndex.prototype), "constructor", this).call(this, props);
          this.state = {
  
              // 客户信息
              users: {},
  
              // 当前客户会员卡样式样式(默认)
              cardStyle: {
                  bgColor: '#fff',
                  alpha: 100,
                  bgImg: '579856eb0f93d566a79bd714',
                  fontColor: '#fff',
                  bgRadio: 'img',
                  title: '卡券标题'
              }
          };
  
          this.updateCardStyle = function (para) {
              var data = {
                  title: para.title,
                  style: para
              };
              delete data.style.title;
              _this.props.actions.updateCardStyle(_this.state.users.id, data);
          };
  
          this.setCardStyle = function (para) {
              var data = _extends({}, _this.state.cardStyle, para);
  
              _this.setState({
                  cardStyle: data
              });
          };
      }
  
      // componentWillMount
      // 保存草稿提示信息
  
      _createClass(CardIndex, [{
          key: "componentWillMount",
          value: function componentWillMount() {
              // 获取客户信息
              this.props.actions.getAdminCustomer();
          }
      }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
  
                  // 设置会员卡样式
                  case customerAction.UPDATE_CARD_STYLE:
                      saveInfo(nextProps.customer.cardStyle);
                      break;
  
                  // 获取客户信息
                  case customerAction.GET_ADMIN_CUSTOMER:
                      this.setState({
                          users: nextProps.customer.customerInfo
                      });
                      // 获取客户会员卡样式
                      this.props.actions.getCardStyle(nextProps.customer.customerInfo.id);
                      break;
  
                  // 获取会员卡信息
                  case customerAction.GET_CARD_STYLE:
                      if (nextProps.customer.cardStyle) {
                          var nextData = nextProps.customer.cardStyle;
  
                          var data = _extends({}, nextData.style, nextData);
  
                          delete data.style;
  
                          this.setState({
                              cardStyle: data
                          });
                      }
                      break;
              }
          }
  
          // 提交会员卡样式
      }, {
          key: "render",
          value: function render() {
              return _react2["default"].createElement(
                  "div",
                  { className: "card" },
                  _react2["default"].createElement(
                      "div",
                      { className: "card-cardstyle" },
                      _react2["default"].createElement(_componentCardStyle2["default"], {
                          cardStyle: this.state.cardStyle })
                  ),
                  _react2["default"].createElement(
                      "div",
                      { className: "card-cardform" },
                      _react2["default"].createElement(_componentCardForm2["default"], {
                          cardStyle: this.state.cardStyle,
                          setCardStyle: this.setCardStyle,
                          updateCardStyle: this.updateCardStyle })
                  )
              );
          }
      }]);
  
      var _CardIndex = CardIndex;
      CardIndex = (0, _reactRedux.connect)(function (state) {
          return {
              customer: state.customer.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)({
                  updateCardStyle: customerAction.updateCardStyle,
                  getCardStyle: customerAction.getCardStyle,
                  getAdminCustomer: customerAction.getAdminCustomer
              }, dispatch)
          };
      })(CardIndex) || CardIndex;
      return CardIndex;
  })(_commonBasePageBase2["default"]);
  
  exports["default"] = CardIndex;
  var saveInfo = function saveInfo() {
      _antd.message.info('保存成功!');
  };
  module.exports = exports["default"];
  
  // 修复会员卡样式

});
