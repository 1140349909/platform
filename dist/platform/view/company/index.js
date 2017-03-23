define('platform/view/company/index.jsx', function(require, exports, module) {

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
  
  var _commonComponentSearchInput = require('common/component/SearchInput/index.jsx');
  
  var _commonComponentSearchInput2 = _interopRequireDefault(_commonComponentSearchInput);
  
  var _storeCompanyAction = require("platform/store/company/action");
  
  var companyAction = _interopRequireWildcard(_storeCompanyAction);
  
  var _componentCompanyList = require("platform/component/CompanyList/index.jsx");
  
  var _componentCompanyList2 = _interopRequireDefault(_componentCompanyList);
  
  var _componentCompanyShow = require("platform/component/CompanyShow/index.jsx");
  
  var _componentCompanyShow2 = _interopRequireDefault(_componentCompanyShow);
  
  var _componentCompanyForm = require("platform/component/CompanyForm/index.jsx");
  
  var _componentCompanyForm2 = _interopRequireDefault(_componentCompanyForm);
  
  var CompanyIndex = (function (_PageBase) {
      _inherits(CompanyIndex, _PageBase);
  
      function CompanyIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _CompanyIndex);
  
          _get(Object.getPrototypeOf(_CompanyIndex.prototype), "constructor", this).call(this, props);
          this.state = {
              viewType: 'list',
              viewParam: null,
              viewData: null
          };
  
          this.showForm = function (id) {
              _this.showView('form', id);
              _this.props.actions.getPlatformCustomer(id);
          };
  
          this.showModal = function (id) {
              _this.showView('show', id);
              _this.props.actions.getPlatformCustomerMallAuth(id);
          };
  
          this.list = function (page, size) {
              _this.props.actions.getPlatformCustomers({
                  type: 'MALL',
                  name: _this.state.name,
                  page: page,
                  size: size
              });
          };
  
          this.approve = function (id, data) {
              _this.props.actions.updatePlatformCustomerStatus(id, data);
          };
  
          this.mallAuth = function (id, data) {
              _this.props.actions.updatePlatformCustomerMallAuth(id, data);
          };
  
          this.handleSearch = function (name) {
              _this.setState({
                  name: name
              }, function () {
                  _this.list(0);
              });
          };
  
          console.log(this);
      }
  
      _createClass(CompanyIndex, [{
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
                  case companyAction.UPDATE_PLATFORM_CUSTOMER_STATUS:
                  case companyAction.UPDATE_PLATFORM_CUSTOMER_MALL_AUTH:
                      this.list(0);
                      this.reset();
                      break;
                  case companyAction.GET_PLATFORM_CUSTOMER:
                      this.setState({
                          viewData: nextProps.company.item
                      });
                      break;
                  case companyAction.GET_PLATFORM_CUSTOMER_MALL_AUTH:
                      this.setState({
                          viewData: nextProps.company.mallAuth
                      });
                      break;
              }
          }
      }, {
          key: "render",
          value: function render() {
              var operation = this.props.operation;
  
              var extra = _react2["default"].createElement(_commonComponentSearchInput2["default"], { placeholder: "请输入企业名称进行查询", onSearch: this.handleSearch, style: { width: 200 } });
  
              // 是否显示loading
              var isListLoading = operation.type == companyAction.GET_PLATFORM_CUSTOMERS && operation.pending;
  
              // 是否显示form
              var isShowForm = this.isShowView('form');
  
              // 是否显示show
              var isShowShow = this.isShowView('show');
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Card,
                      { title: "企业列表", extra: extra },
                      _react2["default"].createElement(_componentCompanyList2["default"], { data: this.props.company.list.content,
                          total: this.props.company.list.totalElements,
                          showForm: this.showForm,
                          showModal: this.showModal,
                          loading: isListLoading,
                          list: this.list })
                  ),
                  isShowForm && _react2["default"].createElement(_componentCompanyForm2["default"], { approve: this.approve,
                      reset: this.reset,
                      visible: isShowForm,
                      data: this.state.viewData }),
                  isShowShow && _react2["default"].createElement(_componentCompanyShow2["default"], { mallAuth: this.mallAuth,
                      reset: this.reset,
                      visible: isShowShow,
                      data: this.state.viewData })
              );
          }
      }]);
  
      var _CompanyIndex = CompanyIndex;
      CompanyIndex = (0, _reactRedux.connect)(function (state) {
          return {
              company: state.company.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, companyAction), dispatch)
          };
      })(CompanyIndex) || CompanyIndex;
      return CompanyIndex;
  })(_commonBasePageBase2["default"]);
  
  exports["default"] = CompanyIndex;
  module.exports = exports["default"];
  
  // 搜索企业

});
