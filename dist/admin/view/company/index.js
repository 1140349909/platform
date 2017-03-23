define('admin/view/company/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _redux = require("node_modules/redux/lib/index");
  
  var _reactRedux = require("node_modules/react-redux/lib/index");
  
  var _storeCustomerAction = require("admin/store/customer/action");
  
  var customerAction = _interopRequireWildcard(_storeCustomerAction);
  
  var _componentCompanyHead = require("admin/component/CompanyHead/index.jsx");
  
  var _componentCompanyHead2 = _interopRequireDefault(_componentCompanyHead);
  
  var _componentCompanyList = require("admin/component/CompanyList/index.jsx");
  
  var _componentCompanyList2 = _interopRequireDefault(_componentCompanyList);
  
  var _componentCompanyExtra = require("admin/component/CompanyExtra/index.jsx");
  
  var _componentCompanyExtra2 = _interopRequireDefault(_componentCompanyExtra);
  
  var _componentCompanyShowForm = require("admin/component/CompanyShowForm/index.jsx");
  
  var CompanyIndex = (function (_Component) {
      _inherits(CompanyIndex, _Component);
  
      function CompanyIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _CompanyIndex);
  
          _get(Object.getPrototypeOf(_CompanyIndex.prototype), "constructor", this).call(this, props);
          this.state = {
              id: '',
              customerList: '',
              employeeList: '',
              currentData: '',
              currentEmployeeData: '',
              currentImport: '',
              excitationData: '',
              type: 'init'
          };
  
          this.customerList = function () {
              var partnerId = arguments.length <= 0 || arguments[0] === undefined ? _this.state.id : arguments[0];
  
              _this.props.actions.getAdminCustomerList({
                  partnerId: partnerId
              });
          };
  
          this.employeeList = function (customerId, page, size) {
              if (customerId === undefined) customerId = _this.state.currentData.id;
  
              _this.props.actions.getAdminEmployeeList({
                  customerId: customerId,
                  page: page,
                  size: size,
                  name: name
              });
          };
  
          this.reset = function () {
              _this.setState({
                  type: 'init'
              });
          };
  
          this.currentCustomer = function (id) {
              _this.state.customerList.content.map(function (item) {
  
                  if (item.id == id) {
                      _this.setState({
                          currentData: item
                      });
  
                      _this.employeeList(item.id);
                  }
                  return false;
              });
          };
  
          this.showCustomer = function (type) {
              _this.setState({
                  type: 'showCustomer',
                  currentData: Object.assign(_this.state.currentData, { type: type })
              });
          };
  
          this.showEmployee = function (para) {
              _this.setState({
                  type: 'showEmployee',
                  currentEmployeeData: para
              });
          };
  
          this.showCustomerImport = function (data) {
              _this.setState({
                  type: 'showCustomerImport',
                  currentImport: data
              });
          };
  
          this.showStoreImport = function (data) {
              _this.setState({
                  type: 'showStoreImport',
                  currentImport: data
              });
          };
  
          this.showExcitation = function () {
              _this.props.actions.getEmployeeExcitation();
              _this.setState({
                  type: 'showExcitation'
              });
          };
  
          this.doExcitation = function (data) {
              _this.props.actions.updateEmployeeExcitation(data);
          };
  
          this.doCustomer = function (para) {
              if (para.id == '') {
                  _this.props.actions.addAdminCustomerPartner(_this.state.id, para);
              } else {
                  _this.props.actions.updateAdminCustomerPartner(para);
              }
              _this.reset();
          };
  
          this.doEmployee = function (para) {
              if (para.id == '') {
                  _this.props.actions.addAdminEmployee(Object.assign(para, { customerId: _this.state.currentData.id }));
              } else {
                  _this.props.actions.updateAdminEmployee(para);
              }
          };
  
          this.doEmployeeState = function (obj) {
              _this.props.actions.updateAdminEmployeeStatus(obj);
          };
      }
  
      _createClass(CompanyIndex, [{
          key: "componentWillMount",
          value: function componentWillMount() {
              this.props.actions.getAdminCustomer();
          }
  
          // 异步请求回调
          // 根据返回的nextProps.product.status处理回调
      }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
  
                  // 获取登录客户信息
                  case customerAction.GET_ADMIN_CUSTOMER:
                      this.setState({
                          id: nextProps.customer.customerInfo.id
                      });
                      this.customerList(nextProps.customer.customerInfo.id);
                      break;
  
                  // 获取客户列表
                  case customerAction.GET_ADMIN_CUSTOMER_LIST:
                      if (nextProps.customer.customerList.content.length > 0) {
                          this.setState({
                              currentData: nextProps.customer.customerList.content[0]
                          });
  
                          this.employeeList(nextProps.customer.customerList.content[0].id);
                      }
                      this.setState({
                          customerList: nextProps.customer.customerList
                      });
                      break;
  
                  // 新添客户
                  case customerAction.ADD_ADMIN_CUSTOMER_PARTNER:
                      this.customerList();
                      break;
  
                  // 更新客户
                  case customerAction.UPDATE_ADMIN_CUSTOMER_PARTNER:
                      this.customerList();
                      break;
  
                  // 获取员工列表
                  case customerAction.GET_ADMIN_EMPLOYEE_LIST:
                      this.setState({
                          employeeList: nextProps.customer.employeeList
                      });
                      break;
  
                  // 新增员工
                  case customerAction.ADD_ADMIN_EMPLOYEE:
                      this.reset();
                      this.employeeList();
                      break;
  
                  // 修改员工
                  case customerAction.UPDATE_ADMIN_EMPLOYEE:
                      this.reset();
                      this.employeeList();
                      break;
  
                  // 修改员工状态
                  case customerAction.UPDATE_ADMIN_EMPLOYEE_STATUS:
                      this.employeeList();
                      break;
  
                  // 获取激励
                  case customerAction.GET_ADMIN_EMPLOYEE_EXCITATION:
                      this.setState({
                          excitationData: nextProps.customer.excitation.content
                      });
                      break;
  
                  // 设置激励
                  case customerAction.UPDATE_ADMIN_EMPLOYEE_EXCITATION:
                      message.success('保存臧功');
                      break;
  
              }
          }
  
          // 获取对应客户列表
      }, {
          key: "render",
          value: function render() {
  
              var currentData = this.state.currentData || '';
              var customerList = this.state.customerList;
              var employeeList = this.state.employeeList;
  
              if (customerList) {
                  return _react2["default"].createElement(
                      "div",
                      null,
                      _react2["default"].createElement(
                          _antd.Card,
                          {
                              title: "线下渠道",
                              extra: _react2["default"].createElement(_componentCompanyExtra2["default"], {
                                  reset: this.reset,
                                  data: customerList,
                                  currentCustomer: this.currentCustomer,
                                  showCustomer: this.showCustomer }) },
                          customerList.length > 0 && _react2["default"].createElement(_componentCompanyHead2["default"], {
                              data: currentData,
                              reset: this.reset,
                              showCustomer: this.showCustomer,
                              showEmployee: this.showEmployee,
                              showCustomerImport: this.showCustomerImport,
                              showStoreImport: this.showStoreImport,
                              showExcitation: this.showExcitation }),
                          _react2["default"].createElement(_componentCompanyList2["default"], {
                              reset: this.reset,
                              doEmployeeState: this.doEmployeeState,
                              showEmployee: this.showEmployee,
                              employeeList: this.employeeList,
                              data: employeeList })
                      ),
                      _react2["default"].createElement(_componentCompanyShowForm.CompanyFormCustomer, {
                          type: this.state.type,
                          reset: this.reset,
                          data: this.state.currentData,
                          doCustomer: this.doCustomer }),
                      _react2["default"].createElement(_componentCompanyShowForm.CompanyFormEmployee, {
                          data: this.state.currentEmployeeData,
                          type: this.state.type,
                          reset: this.reset,
                          doEmployee: this.doEmployee }),
                      _react2["default"].createElement(_componentCompanyShowForm.CompanyFormCustomerImport, {
                          id: currentData.id,
                          type: this.state.type,
                          reset: this.reset }),
                      _react2["default"].createElement(_componentCompanyShowForm.CompanyFormStoreImport, {
                          id: currentData.id,
                          reset: this.reset,
                          type: this.state.type }),
                      _react2["default"].createElement(_componentCompanyShowForm.CompanyFormExcitation, {
                          data: this.state.excitationData || "",
                          type: this.state.type,
                          reset: this.reset,
                          doExcitation: this.doExcitation })
                  );
              } else {
                  return null;
              }
          }
      }]);
  
      var _CompanyIndex = CompanyIndex;
      CompanyIndex = (0, _reactRedux.connect)(function (state) {
          return {
              customer: state.customer.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, customerAction), dispatch)
          };
      })(CompanyIndex) || CompanyIndex;
      return CompanyIndex;
  })(_react.Component);
  
  exports["default"] = CompanyIndex;
  module.exports = exports["default"];
  
  // 获取对应员工列表
  
  // 重置type
  
  // 切换当前合作客户
  
  // 显示客户信息表单
  
  // 显示员工信息表单
  
  // 显示导入客户员工文件
  
  // 显示导入客户门店文件
  
  // 显示员工激励
  
  // 设置员工激励
  
  // 新增/修改客户合作伙伴
  
  // 新增/修改员工
  
  // 修改员工状态

});
