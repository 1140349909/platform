define('admin/view/trade/index.jsx', function(require, exports, module) {

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
  
  var _storeTradeAction = require("admin/store/trade/action");
  
  var tradeAction = _interopRequireWildcard(_storeTradeAction);
  
  var _storeStatAction = require("admin/store/stat/action");
  
  var statAction = _interopRequireWildcard(_storeStatAction);
  
  var _componentTradeCard = require("admin/component/TradeCard/index.jsx");
  
  var _componentTradeCard2 = _interopRequireDefault(_componentTradeCard);
  
  var _componentTradeList = require("admin/component/TradeList/index.jsx");
  
  var _componentTradeList2 = _interopRequireDefault(_componentTradeList);
  
  var _componentTradeShow = require("admin/component/TradeShow/index.jsx");
  
  var _componentTradeShow2 = _interopRequireDefault(_componentTradeShow);
  
  var _componentTradeForm = require("admin/component/TradeForm/index.jsx");
  
  var _componentTradeForm2 = _interopRequireDefault(_componentTradeForm);
  
  var TradeIndex = (function (_PageBase) {
      _inherits(TradeIndex, _PageBase);
  
      function TradeIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _TradeIndex);
  
          _get(Object.getPrototypeOf(_TradeIndex.prototype), "constructor", this).call(this, props);
          this.state = {
              viewType: 'list',
              viewParam: null,
              viewData: null
          };
  
          this.list = function (page, size) {
  
              _this.props.actions.getTradeList({
                  buyType: _this.props.params.type,
                  page: page,
                  size: size
              });
          };
  
          this.save = function (data, record) {
  
              _this.props.actions.updateTradeLogistics(data, _this.props.params.type, record.id);
          };
  
          this.confirmDelete = function (data) {
  
              _this.props.actions.updateTradeLogisticsStatus(_this.props.params.type, data.record.id);
          };
  
          this.submit = function (id) {
              _this.showView('submit', id, {});
          };
  
          this.showConsignee = function (id) {
              _this.showView('showConsignee', id, {});
          };
  
          this.showLogistics = function (id) {
              _this.showView('showLogistics', id, {});
          };
      }
  
      _createClass(TradeIndex, [{
          key: "componentDidMount",
          value: function componentDidMount() {
  
              this.list(0);
              this.props.actions.getDataProductTotalSales(this.props.params.type);
          }
  
          //获取交易列表
      }, {
          key: "componentDidUpdate",
          value: function componentDidUpdate(prevProps) {
              // respond to parameter change in scenario 3
              var oldType = prevProps.params.type;
              var newType = this.props.params.type;
              if (newType !== oldType) {
                  this.list(0);
                  this.props.actions.getDataProductTotalSales(this.props.params.type);
              }
          }
      }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
  
                  // 临时处理：总计销售统计数据
                  case statAction.GET_DATA_PRODUCT_TOTAL_SALES:
                      break;
                  case tradeAction.GET_TRADE_LIST:
  
                      var items = {};
                      operation.data.content.forEach(function (item, index) {
                          items[item.id] = item;
                      });
  
                      this.setState({
                          list: operation.data,
                          items: items
                      });
  
                      break;
  
                  case tradeAction.UPDATE_TRADE_LOGISTIC:
                      _antd.message.success('提交成功！');
                      this.list(0);
                      this.reset();
                      break;
                  case tradeAction.UPDATE_TRADE_LOGISTIC_STATUS:
                      _antd.message.success('收货成功！');
                      this.list(0);
                      this.reset();
                      break;
  
              }
          }
  
          //提交暂不刷新
      }, {
          key: "render",
          value: function render() {
              var _state = this.state;
              var items = _state.items;
              var list = _state.list;
  
              if (!list) {
                  return null;
              }
  
              var item = this.state.viewParam ? items[this.state.viewParam] : null;
  
              // 是否显示modal
              var isShowConsignee = this.isShowView('showConsignee');
  
              // 是否显示modal
              var isShowLogistics = this.isShowView('showLogistics');
  
              // 是否显示form
              var isSubmit = this.isShowView('submit');
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(_componentTradeCard2["default"], { data: this.props.stat.saleTotal,
                      type: this.props.params.type }),
                  _react2["default"].createElement("br", null),
                  _react2["default"].createElement(_componentTradeList2["default"], { data: list.content,
                      total: list.totalElements,
                      list: this.list,
                      buyType: this.props.params.type,
                      submit: this.submit,
                      confirmDelete: this.confirmDelete,
                      showConsignee: this.showConsignee,
                      showLogistics: this.showLogistics }),
                  (isShowLogistics || isShowConsignee) && _react2["default"].createElement(_componentTradeShow2["default"], {
                      type: this.state.viewType,
                      data: item,
                      reset: this.reset
                  }),
                  isSubmit && _react2["default"].createElement(_componentTradeForm2["default"], {
                      type: this.state.viewType,
                      data: item,
                      reset: this.reset,
                      save: this.save })
              );
          }
      }]);
  
      var _TradeIndex = TradeIndex;
      TradeIndex = (0, _reactRedux.connect)(function (state) {
          return {
              trade: state.trade.toJS(),
              stat: state.trade.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, tradeAction, statAction), dispatch)
          };
      })(TradeIndex) || TradeIndex;
      return TradeIndex;
  })(_commonBasePageBase2["default"]);
  
  exports["default"] = TradeIndex;
  module.exports = exports["default"];
  
  //收货暂不刷新
  
  //提交表单

});
