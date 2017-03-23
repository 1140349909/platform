define('admin/view/member/index.jsx', function(require, exports, module) {

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
  
  var _componentMemberList = require("admin/component/MemberList/index.jsx");
  
  var _componentMemberList2 = _interopRequireDefault(_componentMemberList);
  
  var _componentMemberShow = require("admin/component/MemberShow/index.jsx");
  
  var _componentMemberShow2 = _interopRequireDefault(_componentMemberShow);
  
  var _storeMemberAction = require("admin/store/member/action");
  
  var memberAction = _interopRequireWildcard(_storeMemberAction);
  
  var MemberIndex = (function (_PageBase) {
      _inherits(MemberIndex, _PageBase);
  
      function MemberIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _MemberIndex);
  
          _get(Object.getPrototypeOf(_MemberIndex.prototype), "constructor", this).call(this, props);
  
          this.state = {
              viewType: 'list',
              viewParam: null,
              viewData: null
          };
  
          this.list = function (page, size) {
  
              _this.props.actions.getMemberList({
                  page: page,
                  size: size
              });
          };
  
          this.showMemberMallOrderList = function (id) {
              _this.showView('memberMallOrderList', id, {});
              _this.getMemberMallOrdersList(id);
          };
  
          this.getMemberMallOrdersList = function (id, payType, tradeStatus) {
              _this.props.actions.getMemberMallOrdersList({ id: id, payType: payType, tradeStatus: tradeStatus });
          };
      }
  
      _createClass(MemberIndex, [{
          key: "componentDidMount",
          value: function componentDidMount() {
              this.list(0);
          }
      }, {
          key: "render",
          value: function render() {
              var operation = this.props.operation;
  
              // 是否显示loading
              var isListLoading = operation.type == memberAction.GET_MEMBER_LIST && operation.pending;
  
              // 是否显示会员订单列表
              var isShowMemberMallOrderList = this.isShowView('memberMallOrderList');
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Card,
                      { title: "会员管理" },
                      _react2["default"].createElement(_componentMemberList2["default"], {
                          data: this.props.member.list,
                          loading: isListLoading,
                          list: this.list,
                          showMemberMallOrderList: this.showMemberMallOrderList })
                  ),
                  isShowMemberMallOrderList && _react2["default"].createElement(_componentMemberShow2["default"], {
                      visible: isShowMemberMallOrderList,
                      reset: this.reset,
                      id: this.state.viewParam,
                      data: this.props.member.mallOrderList,
                      list: this.getMemberMallOrdersList
                  })
              );
          }
      }]);
  
      var _MemberIndex = MemberIndex;
      MemberIndex = (0, _reactRedux.connect)(function (state) {
          return {
              member: state.member.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, memberAction), dispatch)
          };
      })(MemberIndex) || MemberIndex;
      return MemberIndex;
  })(_commonBasePageBase2["default"]);
  
  exports["default"] = MemberIndex;
  module.exports = exports["default"];
  
  // 表格数据获取

});
