define('admin/view/coupon/index.jsx', function(require, exports, module) {

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
  
  var _storeIlokaAction = require("admin/store/iloka/action");
  
  var ilokaAction = _interopRequireWildcard(_storeIlokaAction);
  
  var _componentCouponList = require("admin/component/CouponList/index.jsx");
  
  var _componentCouponList2 = _interopRequireDefault(_componentCouponList);
  
  var _componentCouponShow = require("admin/component/CouponShow/index.jsx");
  
  var _componentCouponShow2 = _interopRequireDefault(_componentCouponShow);
  
  var CouponIndex = (function (_PageBase) {
      _inherits(CouponIndex, _PageBase);
  
      function CouponIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _CouponIndex);
  
          _get(Object.getPrototypeOf(_CouponIndex.prototype), "constructor", this).call(this, props);
          this.state = {
              id: '',
              type: 'list',
              list: '',
  
              viewType: 'list',
              viewParam: null,
              viewData: null
          };
  
          this.getContentList = function (data) {
              _this.props.actions.checkContent(data);
          };
  
          this.list = function (page, size) {
  
              /*this.setState({
                  type: 'list'
              });*/
  
              _this.props.actions.getCouponList({
                  page: page,
                  size: size
              });
          };
  
          this.resList = function (id, page, size) {
  
              /*this.setState({
                  type: 'resList'
              });*/
  
              _this.props.actions.getCouponResList({
                  id: id,
                  page: page,
                  size: 100
              });
          };
  
          this.submit = function (data, id) {
              _this.props.actions.updateCoupon(id, data);
          };
  
          this.deleteCoupon = function (idList) {
  
              var confirm = _antd.Modal.confirm;
  
              var test = _this;
  
              var submitList = [];
  
              for (var i = 0; i < idList.length; i++) {
                  submitList.push(idList[i].id);
              }
  
              confirm({
                  title: '确认删除优惠券吗？',
                  content: '删除后不可恢复。',
                  onOk: function onOk() {
  
                      test.props.actions.deleteCoupon(submitList.toString());
                  },
                  onCancel: function onCancel() {}
              });
          };
  
          this.showModal = function () {
              _this.setState({
                  visible: true
              });
          };
  
          this.handleCancel = function () {
              _this.setState({
                  visible: false
              });
          };
  
          this.jumpToAdd = function () {
              _this.props.router.push('coupon/add');
          };
  
          this.showAddNumber = function (id) {
              _this.showView('showAddNumber', id);
              _this.props.actions.getCoupon(id);
          };
  
          this.showCouponInfo = function (id) {
              _this.showView('showCouponInfo', id);
              _this.props.actions.getCouponResList({
                  id: id,
                  size: 100
              });
          };
      }
  
      _createClass(CouponIndex, [{
          key: "componentDidMount",
          value: function componentDidMount() {
              this.list(0);
          }
  
          // 异步请求回调
          // 返回的nextProps.product.status处理回调
      }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
                  case couponAction.GET_COUPON_LIST:
                      break;
                  case couponAction.GET_COUPON:
                      this.setState({
                          viewData: nextProps.coupon.item
                      });
                      break;
                  case couponAction.ADD_COUPON:
                      break;
                  case couponAction.UPDATE_COUPON:
                  case couponAction.DELETE_COUPON:
                      this.list(0);
                      this.reset();
                      break;
                  case couponAction.GET_COUPON_RES_LIST:
                      this.setState({
                          viewData: nextProps.coupon.resList
                      });
                      this.getContentList(nextProps.coupon.resContent);
                      break;
                  case ilokaAction.UPDATE_CONTENT_STATUS:
                      break;
              }
          }
  
          //更新资讯状态
      }, {
          key: "render",
          value: function render() {
              var operation = this.props.operation;
  
              var TabPane = _antd.Tabs.TabPane;
  
              // 是否显示form
              var isShowAddNumber = this.isShowView('showAddNumber');
  
              // 是否显示form
              var isShowCouponInfo = this.isShowView('showCouponInfo');
  
              var operations = _react2["default"].createElement(
                  "div",
                  { style: { 'margin': '-5px' } },
                  _react2["default"].createElement(
                      _antd.Button,
                      { className: "button-style", type: "primary", size: "large", onClick: this.jumpToAdd },
                      "+ 添加优惠券"
                  ),
                  _react2["default"].createElement(
                      _antd.Button,
                      { className: "button-style", type: "primary", size: "large", onClick: this.showModal },
                      "使用示例"
                  )
              );
  
              // 是否显示loading
              var isListLoading = operation.type == couponAction.GET_COUPON_LIST && operation.pending;
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Tabs,
                      { tabBarExtraContent: operations },
                      _react2["default"].createElement(TabPane, { tab: "所有", key: "all" })
                  ),
                  _react2["default"].createElement(_componentCouponList2["default"], { data: this.props.coupon.list.content,
                      total: this.props.coupon.list.totalElements,
                      list: this.list,
                      loading: isListLoading,
                      showAddNumber: this.showAddNumber,
                      showCouponInfo: this.showCouponInfo,
                      deleteCoupon: this.deleteCoupon }),
                  (isShowAddNumber || isShowCouponInfo) && _react2["default"].createElement(_componentCouponShow2["default"], { type: this.state.viewType,
                      id: this.state.viewParam,
                      data: this.state.viewData,
                      resList: this.resList,
                      resTotal: this.props.coupon.resList.totalElements,
                      resData: this.props.coupon.resList.content,
                      reset: this.reset,
                      submit: this.submit,
                      contentList: this.props.iloka.contentList
                  }),
                  _react2["default"].createElement(
                      _antd.Modal,
                      { visible: this.state.visible,
                          width: "960",
                          footer: "",
                          onCancel: this.handleCancel },
                      _react2["default"].createElement("img", { src: "/admin/view/coupon/img/coupon.png", alt: "流程图", style: { 'width': '100%', 'height': 'auto' } })
                  )
              );
          }
      }]);
  
      var _CouponIndex = CouponIndex;
      CouponIndex = (0, _reactRouter.withRouter)(CouponIndex) || CouponIndex;
      CouponIndex = (0, _reactRedux.connect)(function (state) {
          return {
              coupon: state.coupon.toJS(),
              iloka: state.iloka.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, couponAction, ilokaAction), dispatch)
          };
      })(CouponIndex) || CouponIndex;
      return CouponIndex;
  })(_commonBasePageBase2["default"]);
  
  exports["default"] = CouponIndex;
  module.exports = exports["default"];
  
  // 获取列表
  
  // 获取资源列表
  
  //追加
  
  //删除
  
  //样式对话框
  
  //样式对话框隐藏
  
  //跳转添加新优惠券
  
  //显示设置追加数量
  
  //显示投放详情

});
