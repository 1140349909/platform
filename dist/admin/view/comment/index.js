define('admin/view/comment/index.jsx', function(require, exports, module) {

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
  
  var _storeTradeAction = require("admin/store/trade/action");
  
  var tradeAction = _interopRequireWildcard(_storeTradeAction);
  
  var _componentCommentList = require("admin/component/CommentList/index.jsx");
  
  var _componentCommentList2 = _interopRequireDefault(_componentCommentList);
  
  var _componentCommentShow = require("admin/component/CommentShow/index.jsx");
  
  var _componentCommentShow2 = _interopRequireDefault(_componentCommentShow);
  
  var CommentIndex = (function (_PageBase) {
      _inherits(CommentIndex, _PageBase);
  
      function CommentIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _CommentIndex);
  
          _get(Object.getPrototypeOf(_CommentIndex.prototype), "constructor", this).call(this, props);
          this.state = {
              id: '',
              type: 'list'
          };
  
          this.list = function (page, size) {
  
              _this.setState({
                  type: 'list'
              });
  
              //某晒单页面获取接口
              _this.props.actions.getTradeShowList({
                  page: page,
                  size: size
              });
          };
  
          this.deleteComment = function (id) {
              //console.log.log(id);
              _this.setState({
                  id: id,
                  type: 'deleteComment'
              });
          };
  
          this.confirmDelete = function (data) {
              _this.props.actions.deleteTradeShow(data);
  
              _this.setState({
                  type: ''
              });
          };
  
          this.showInfo = function (id) {
              //console.log.log(id);
              _this.setState({
                  id: id,
                  type: 'showInfo'
              });
          };
  
          this.reset = function () {
              //console.log.log(id);
              _this.setState({
                  id: '',
                  type: ''
              });
          };
      }
  
      _createClass(CommentIndex, [{
          key: "componentDidMount",
          value: function componentDidMount() {
              //console.log.log(this.props.actions);
              this.list(0);
          }
      }, {
          key: "componentDidUpdate",
  
          //切换时不同的接口
          value: function componentDidUpdate(prevProps) {
              // respond to parameter change in scenario 3
              var oldType = prevProps.params.type;
              var newType = this.props.params.type;
              if (newType !== oldType) {
                  this.list(0);
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
                  case tradeAction.GET_TRADE_SHOW_LIST:
                      //暂时恢复，等待items的解决方案
                      var items = [];
  
                      operation.data.content.forEach(function (item, index) {
  
                          // item.pageIndex = Math.floor((payload.data.number*payload.data.size+index)/payload.data.size);
                          items[item.id] = item;
                      });
  
                      this.setState({
                          data: operation.data.content,
                          total: operation.data.totalElements,
                          items: items
                      });
                      break;
                  case tradeAction.DELETE_TRADE_SHOW:
                      _antd.message.success('删除成功！');
                      this.list(0);
                      break;
              }
          }
  
          //删除晒图
      }, {
          key: "render",
          value: function render() {
              var operation = this.props.operation;
  
              // 是否显示loading
              var isListLoading = operation.type == tradeAction.GET_TRADE_SHOW_LIST && operation.pending;
  
              // const item = this.props.trade.items?this.props.trade.items[this.state.id]:null ;
  
              var item = this.state.items ? this.state.items[this.state.id] : null;
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(_componentCommentList2["default"], { type: this.state.type,
                      data: this.props.trade.data,
                      total: this.props.trade.total,
                      loading: isListLoading,
                      list: this.list,
                      showInfo: this.showInfo,
                      deleteComment: this.deleteComment }),
                  _react2["default"].createElement(_componentCommentShow2["default"], { type: this.state.type,
                      data: item,
                      reset: this.reset,
                      confirmDelete: this.confirmDelete,
                      deleteComment: this.deleteComment })
              );
          }
      }]);
  
      var _CommentIndex = CommentIndex;
      CommentIndex = (0, _reactRedux.connect)(function (state) {
          return {
              trade: state.trade.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, tradeAction), dispatch)
          };
      })(CommentIndex) || CommentIndex;
      return CommentIndex;
  })(_commonBasePageBase2["default"]);
  
  exports["default"] = CommentIndex;
  module.exports = exports["default"];
  
  //删除成功暂不刷新
  
  //显示详情的Modal
  
  //暂时沿用自己的reset
  //显示详情的Modal

});
