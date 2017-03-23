define('admin/view/integral/index.jsx', function(require, exports, module) {

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
  
  var _storeIntegralAction = require("admin/store/integral/action");
  
  var integralAction = _interopRequireWildcard(_storeIntegralAction);
  
  var _storeIlokaAction = require("admin/store/iloka/action");
  
  var ilokaAction = _interopRequireWildcard(_storeIlokaAction);
  
  var _componentIntegralList = require("admin/component/IntegralList/index.jsx");
  
  var _componentIntegralList2 = _interopRequireDefault(_componentIntegralList);
  
  var _componentIntegralShow = require("admin/component/IntegralShow/index.jsx");
  
  var _componentIntegralShow2 = _interopRequireDefault(_componentIntegralShow);
  
  var _storeCustomerAction = require("admin/store/customer/action");
  
  var customerAction = _interopRequireWildcard(_storeCustomerAction);
  
  //基本设置中的平台交易积分设置应该挪到积分管理中；
  
  var IntegralIndex = (function (_PageBase) {
      _inherits(IntegralIndex, _PageBase);
  
      function IntegralIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _IntegralIndex);
  
          _get(Object.getPrototypeOf(_IntegralIndex.prototype), "constructor", this).call(this, props);
          this.state = {
              type: 'list',
              contentList: {},
  
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
  
              _this.props.actions.getIntegralList({
                  page: page,
                  size: size
              });
          };
  
          this.resList = function (id, page, size) {
  
              /*this.setState({
                  type: 'resList'
              });*/
  
              _this.props.actions.getIntegralResList({
                  id: id,
                  page: page,
                  size: 100
              });
          };
  
          this.addIntegral = function (data) {
  
              _this.props.actions.addIntegral(data);
  
              /* this.setState({
                   type: ''
               });
                this.list(0);*/
          };
  
          this.showAddNumber = function (id) {
              _this.showView('showAddNumber', id);
              _this.props.actions.getIntegral(id);
          };
  
          this.submit = function (data, id) {
  
              _this.props.actions.updateIntegral(id, data);
  
              /*this.setState({
                  type: ''
              });
               this.list(0);*/
          };
  
          this.showIntegralInfo = function (id) {
              _this.showView('showIntegralInfo', id);
              _this.props.actions.getIntegralResList({
                  id: id,
                  size: 100
              });
          };
  
          this.showAddModal = function () {
              _this.showView('showAddNew', null, {});
          };
  
          this.deleteIntegral = function (id) {
  
              var confirm = _antd.Modal.confirm;
  
              var test = _this;
  
              confirm({
                  title: '确认删除红包吗？',
                  content: '删除后不可恢复。',
                  onOk: function onOk() {
  
                      test.props.actions.deleteIntegral(id);
  
                      test.setState({
                          type: ''
                      });
  
                      test.list(0);
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
  
          this.updateIntegralExchange = function (data) {
  
              var submitData = {
                  id: _this.state.customerData.id,
                  para: data
              };
  
              _this.props.actions.updateIntegralExchange(submitData);
          };
      }
  
      _createClass(IntegralIndex, [{
          key: "componentDidMount",
          value: function componentDidMount() {
              this.list(0);
              //
              //this.props.actions.getAdminCustomer();
              //获取积分设置
              //this.props.actions.getIntegralExchange();
          }
      }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
                  case integralAction.GET_INTEGRAL_LIST:
  
                      break;
                  case integralAction.GET_INTEGRAL:
  
                      this.setState({
                          viewData: nextProps.integral.item
                      });
                      break;
                  case integralAction.UPDATE_INTEGRAL:
                  case integralAction.ADD_INTEGRAL:
                  case integralAction.DELETE_INTEGRAL:
                      this.list(0);
                      this.reset();
                      break;
                  case integralAction.GET_INTEGRAL_RES_LIST:
                      this.setState({
                          viewData: nextProps.integral.resList
                      });
                      this.getContentList(nextProps.integral.resContent);
                      break;
                  case ilokaAction.UPDATE_CONTENT_STATUS:
                      /*this.setState({
                          contentList: operation.data
                      });*/
                      break;
  
                  /*// 获取获取客户信息
                   case customerAction.GET_ADMIN_CUSTOMER:
                   this.setState({
                   type: 'loaded',
                   customerData: operation.data
                   });
                   break;
                   // 获取客户积分兑换信息
                   case customerAction.GET_INTEGRAL_EXCHANGE:
                   this.setState({
                   type: 'integral',
                   dataIntegral: operation.data.integral
                   });
                   break;
                   // 修改客户积分设置
                   case customerAction.UPDATE_INTEGRAL_EXCHANGE:
                   message.success('修改成功！');
                   this.setState({
                   type: 'integral',
                   dataIntegral: operation.params.value
                   });
                   this.props.actions.getIntegralExchange();
                    break;*/
              }
          }
  
          //更新资讯状态
      }, {
          key: "render",
          value: function render() {
              var operation = this.props.operation;
  
              var TabPane = _antd.Tabs.TabPane;
  
              // 是否显示loading
              var isListLoading = operation.type == integralAction.GET_INTEGRAL_LIST && operation.pending;
  
              // 是否显示修改form
              var isShowAddNumber = this.isShowView('showAddNumber');
  
              // 是否显示详情form
              var isShowIntegralInfo = this.isShowView('showIntegralInfo');
  
              // 是否显示新增form
              var isShowAddNew = this.isShowView('showAddNew');
  
              var operations = _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Button,
                      { style: { 'margin': '0 5px' }, type: "primary", size: "large", onClick: this.showAddModal },
                      "+ 添加新积分包"
                  ),
                  _react2["default"].createElement(
                      _antd.Button,
                      { style: { 'margin': '0 5px' }, type: "primary", size: "large", onClick: this.showModal },
                      "使用示例"
                  )
              );
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Tabs,
                      { tabBarExtraContent: operations },
                      _react2["default"].createElement(
                          TabPane,
                          { tab: "基本设置", key: "1" },
                          _react2["default"].createElement(
                              _antd.Tag,
                              { color: "blue" },
                              "积分"
                          ),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(_componentIntegralList2["default"], { data: this.props.integral.list.content,
                              total: this.props.integral.list.totalElements,
                              list: this.list,
                              loading: isListLoading,
                              showAddNumber: this.showAddNumber,
                              showIntegralInfo: this.showIntegralInfo,
                              deleteIntegral: this.deleteIntegral }),
                          (isShowAddNumber || isShowIntegralInfo || isShowAddNew) && _react2["default"].createElement(_componentIntegralShow2["default"], { type: this.state.viewType,
                              id: this.state.viewParam,
                              resList: this.resList,
                              data: this.state.viewData,
                              resData: this.props.integral.resList.content,
                              resTotal: this.props.integral.resList.totalElements,
                              addIntegral: this.addIntegral,
                              reset: this.reset,
                              submit: this.submit,
                              contentList: this.props.iloka.contentList
                          })
                      )
                  ),
                  _react2["default"].createElement(
                      _antd.Modal,
                      { visible: this.state.visible,
                          width: "960",
                          footer: "",
                          onCancel: this.handleCancel },
                      _react2["default"].createElement("img", { src: "/admin/view/integral/img/integral.png", alt: "流程图", style: { 'width': '100%', 'height': 'auto' } })
                  )
              );
          }
      }]);
  
      var _IntegralIndex = IntegralIndex;
      IntegralIndex = (0, _reactRedux.connect)(function (state) {
          return {
              integral: state.integral.toJS(),
              iloka: state.iloka.toJS(),
              operation: state.operation
          };
      }, // setting:state.setting.toJS()
      function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, integralAction, ilokaAction, customerAction), dispatch)
          };
      })(IntegralIndex) || IntegralIndex;
      return IntegralIndex;
  })(_commonBasePageBase2["default"]);
  
  exports["default"] = IntegralIndex;
  module.exports = exports["default"];
  
  // 获取列表
  
  // 获取列表
  
  //显示设置追加数量
  
  //追加
  
  //显示投放详情
  
  //显示新增对话框
  
  //删除
  
  //样式对话框
  
  //修改客户积分设置
  /*<Card title="平台交易积分设置" extra={'在此设置积分和现金的兑换比例'}>
  <SettingIntegralForm
  updateIntegralExchange={this.updateIntegralExchange}
  dataIntegral={{value:dataIntegral}}
  />
  </Card>*/

});
