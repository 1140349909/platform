define('admin/view/coupon/add.jsx', function(require, exports, module) {

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
  
  var _storeCouponAction = require("admin/store/coupon/action");
  
  var couponAction = _interopRequireWildcard(_storeCouponAction);
  
  var _componentCouponForm = require("admin/component/CouponForm/index.jsx");
  
  var _componentCouponForm2 = _interopRequireDefault(_componentCouponForm);
  
  var CouponAdd = (function (_PageBase) {
      _inherits(CouponAdd, _PageBase);
  
      function CouponAdd(props) {
          var _this = this;
  
          _classCallCheck(this, _CouponAdd);
  
          _get(Object.getPrototypeOf(_CouponAdd.prototype), "constructor", this).call(this, props);
          this.state = {
              faceValueList: []
          };
  
          this.save = function (data) {
  
              _this.props.actions.addCoupon(data);
          };
  
          this.jumpBack = function () {
              _this.props.router.push('coupon');
          };
      }
  
      _createClass(CouponAdd, [{
          key: "componentDidMount",
          value: function componentDidMount() {
              //优惠券面值列表
              this.props.actions.getCouponFaceValueList();
          }
      }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
                  case couponAction.GET_COUPON_FACE_VALUE_LIST:
                      break;
              }
          }
  
          //新建优惠券
      }, {
          key: "render",
          value: function render() {
  
              var TabPane = _antd.Tabs.TabPane;
  
              var couponData = {
  
                  faceValue: 0,
                  discount: 9.9,
  
                  name: '',
  
                  couponType: 'quota',
  
                  periodType: 'interval',
                  intervalStartDate: '20xx-xx-xx',
                  intervalEndDate: '20xx-xx-xx',
                  /*intervalStartDate:dateFormat(new Date(), "yyyy-MM-dd"),
                   intervalEndDate:dateFormat(new Date(), "yyyy-MM-dd"),*/
                  dynamicBegin: 0,
                  dynamicEnd: 1,
  
                  chargeEnable: false,
                  chargeMin: 0
              };
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Tabs,
                      null,
                      _react2["default"].createElement(
                          TabPane,
                          { tab: "优惠券设置", key: "1" },
                          _react2["default"].createElement(_componentCouponForm2["default"], { save: this.save,
                              list: this.props.coupon.faceValueList,
                              couponData: couponData,
                              jumpBack: this.jumpBack })
                      )
                  )
              );
          }
      }]);
  
      var _CouponAdd = CouponAdd;
      CouponAdd = (0, _reactRouter.withRouter)(CouponAdd) || CouponAdd;
      CouponAdd = (0, _reactRedux.connect)(function (state) {
          return {
              coupon: state.coupon.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, couponAction), dispatch)
          };
      })(CouponAdd) || CouponAdd;
      return CouponAdd;
  })(_commonBasePageBase2["default"]);
  
  exports["default"] = CouponAdd;
  module.exports = exports["default"];

});
