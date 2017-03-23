define('admin/view/tker/member.jsx', function(require, exports, module) {

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
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _commonBasePageBase = require('common/base/PageBase.jsx');
  
  var _commonBasePageBase2 = _interopRequireDefault(_commonBasePageBase);
  
  var _redux = require("node_modules/redux/lib/index");
  
  var _reactRedux = require("node_modules/react-redux/lib/index");
  
  var _storeTkerAction = require("admin/store/tker/action");
  
  var tkerAction = _interopRequireWildcard(_storeTkerAction);
  
  var _componentTkerMemberList = require("admin/component/TkerMemberList/index.jsx");
  
  var _componentTkerMemberList2 = _interopRequireDefault(_componentTkerMemberList);
  
  var _componentTkerMemberShow = require("admin/component/TkerMemberShow/index.jsx");
  
  var _componentTkerMemberShow2 = _interopRequireDefault(_componentTkerMemberShow);
  
  var _commonComponentSearchInput = require("common/component/SearchInput/index.jsx");
  
  var _commonComponentSearchInput2 = _interopRequireDefault(_commonComponentSearchInput);
  
  // 分销会员
  
  var TKerMember = (function (_PageBase) {
      _inherits(TKerMember, _PageBase);
  
      function TKerMember(props) {
          var _this = this;
  
          _classCallCheck(this, _TKerMember);
  
          _get(Object.getPrototypeOf(_TKerMember.prototype), "constructor", this).call(this, props);
          this.state = {};
  
          this.list = function (page, size) {
  
              _this.setState({
                  loading: true
  
              });
  
              _this.props.actions.getManagerTkerList({
  
                  mobile: _this.state.mobile,
                  page: page,
                  size: size
              });
          };
  
          this.handleSearch = function (mobile) {
              _this.setState({
                  mobile: mobile
              }, function () {
                  _this.list(0);
              });
          };
  
          this.getManagerTkerSubMember = function (memberId, mobile) {
  
              _this.props.actions.getManagerTkerSubMember({
                  memberId: memberId,
                  mobile: mobile
              });
          };
  
          this.viewTker = function (memberId) {
  
              _this.setState({
                  id: memberId,
                  type: 'tker',
                  loading: true
              });
  
              _this.getManagerTkerSubMember(memberId);
          };
  
          this.getManagerTkerProfit = function (id, level) {
              _this.props.actions.getManagerTkerProfit({
                  id: id,
                  level: level
              });
          };
  
          this.viewDividend = function (id) {
  
              _this.setState({
                  id: id,
                  type: 'dividend',
                  loading: true
              });
  
              _this.getManagerTkerProfit(id);
          };
  
          this.handleComplete = function () {
  
              _this.setState({
                  type: 'list',
                  modalData: null
              });
          };
      }
  
      _createClass(TKerMember, [{
          key: "componentDidMount",
          value: function componentDidMount() {
              this.list(0);
          }
      }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
  
                  case tkerAction.GET_MANAGER_TKER_LIST:
  
                      this.setState({
                          loading: false,
                          data: operation.data
                      });
  
                      break;
                  case tkerAction.GET_MANAGER_TKER_PROFIT:
  
                      this.setState({
                          loading: false,
                          modalData: operation.data
                      });
  
                      break;
                  case tkerAction.GET_MANAGER_TKER_SUB_MEMBER:
  
                      this.setState({
                          loading: false,
                          modalData: operation.data
                      });
  
                      break;
  
              }
          }
  
          // 获取列表
      }, {
          key: "render",
          value: function render() {
              var _state = this.state;
              var data = _state.data;
              var type = _state.type;
              var modalData = _state.modalData;
              var loading = _state.loading;
              var id = _state.id;
  
              var extra = _react2["default"].createElement(_commonComponentSearchInput2["default"], { placeholder: "请输入手机号进行查询",
                  onSearch: this.handleSearch,
                  style: { width: 200 } });
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Card,
                      { title: "分销会员", extra: extra },
                      _react2["default"].createElement(_componentTkerMemberList2["default"], {
                          loading: loading,
                          data: data,
                          list: this.list,
                          viewTker: this.viewTker,
                          viewDividend: this.viewDividend
  
                      })
                  ),
                  _react2["default"].createElement(_componentTkerMemberShow2["default"], {
                      loading: loading,
                      id: id,
                      type: type,
                      data: modalData,
                      getManagerTkerSubMember: this.getManagerTkerSubMember,
                      getManagerTkerProfit: this.getManagerTkerProfit,
                      handleComplete: this.handleComplete
                  })
              );
          }
      }]);
  
      var _TKerMember = TKerMember;
      TKerMember = (0, _reactRedux.connect)(function (state) {
          return {
              tkerMember: state.tkerMember,
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, tkerAction), dispatch)
          };
      })(TKerMember) || TKerMember;
      return TKerMember;
  })(_commonBasePageBase2["default"]);
  
  exports["default"] = TKerMember;
  module.exports = exports["default"];
  
  // 搜索企业
  
  //获取集客
  
  //打开集客模态框
  
  //获取红利
  
  //打开红利模态框
  
  //关闭模态框

});
