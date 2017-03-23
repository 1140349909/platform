define('admin/view/product/add.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _redux = require('node_modules/redux/lib/index');
  
  var _commonBasePageBase = require('common/base/PageBase.jsx');
  
  var _commonBasePageBase2 = _interopRequireDefault(_commonBasePageBase);
  
  var _reactRedux = require('node_modules/react-redux/lib/index');
  
  var _reactRouter = require('node_modules/react-router/lib/index');
  
  var _antd = require('node_modules/antd/dist/antd');
  
  var _componentProductBasic = require('admin/component/ProductBasic/index.jsx');
  
  var _componentProductBasic2 = _interopRequireDefault(_componentProductBasic);
  
  var _componentProductInfo = require('admin/component/ProductInfo/index.jsx');
  
  var _componentProductInfo2 = _interopRequireDefault(_componentProductInfo);
  
  var _componentProductPreview = require('admin/component/ProductPreview/index.jsx');
  
  var _componentProductPreview2 = _interopRequireDefault(_componentProductPreview);
  
  var _storeProductAction = require('admin/store/product/action');
  
  var productAction = _interopRequireWildcard(_storeProductAction);
  
  var _storeCustomerAction = require('admin/store/customer/action');
  
  var customerAction = _interopRequireWildcard(_storeCustomerAction);
  
  var _lodash = require('node_modules/lodash/lodash');
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  '';
  
  var _commonUtil = require('common/util/index');
  
  var Step = _antd.Steps.Step;
  
  var Add = (function (_PageBase) {
      _inherits(Add, _PageBase);
  
      function Add(props) {
          var _this = this;
  
          _classCallCheck(this, _Add);
  
          _get(Object.getPrototypeOf(_Add.prototype), 'constructor', this).call(this, props);
          this.state = {
  
              viewData: null,
              viewParam: null,
              viewType: null,
  
              // 客户信息
              customerInfo: null,
  
              // 处理调同一接口，做不同操作的依据
              callBackType: '',
  
              // 表单数据
              data: null,
  
              // 转换对应API数据
              dataConversion: null,
  
              // 基本信息及商品描述状态
              // pageType: 'info',
              pageType: 'basic'
          };
  
          this.onCancel = function () {
              _this.props.router.push(_this.props.config.list);
          };
  
          this.onBasicOk = function (formData, dataConversion) {
              _this.doDataConversion(formData, dataConversion);
              _this.setState({
                  pageType: 'info'
              });
          };
  
          this.onInfoPrev = function (formData, dataConversion) {
              _this.doDataConversion(formData, dataConversion);
              _this.setState({
                  pageType: 'basic'
              });
          };
  
          this.onInfoDone = function (formData, dataConversion) {
              var data = _this.doDataConversion(formData, dataConversion);
              _this.props.actions.saveProduct(data);
              _this.setState({
                  callBackType: 'done'
              });
          };
  
          this.onInfoOk = function (formData, dataConversion) {
              var data = _this.doDataConversion(formData, dataConversion);
              _this.props.actions.saveProduct(data);
              _this.setState({
                  callBackType: 'save'
              });
          };
  
          this.previewProduct = function (formData, dataConversion) {
              var data = _this.doDataConversion(formData, dataConversion);
              _this.props.actions.saveProduct(data);
              _this.setState({
                  callBackType: 'preview'
              });
          };
  
          this.onPreviewOk = function () {
              _this.props.actions.updateProductOpening(_this.state.viewParam);
          };
  
          this.onPreviewDone = function () {
              _this.props.router.push(_this.props.config.list + '?status=news');
          };
  
          this.doDataConversion = function (formData, dataConversion) {
  
              var stateMediaRes = _this.state.dataConversion !== null ? _this.state.dataConversion.mediaRes : {};
              var mediaRes = dataConversion.mediaRes;
  
              // 基本信息和产品详情API数据合并
              var conversion = _extends({}, _this.state.dataConversion, dataConversion, {
                  mediaRes: _extends({}, stateMediaRes, mediaRes)
              });
  
              // 表单值传给state.data
              _this.setState({
                  data: _extends({}, _this.state.data, formData),
                  dataConversion: conversion
              });
  
              return conversion;
          };
  
          this.onLink = function () {
              _this.props.router.push(_this.props.config.setting);
          };
      }
  
      // 保存成功
  
      _createClass(Add, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
              this.props.actions.getAdminCustomer();
          }
  
          // 异步请求回调
          // 根据返回的nextProps.product.status处理回调
      }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (operation.failure) {
                  this.reCallBackType();
                  return;
              }
  
              if (operation.opening) {
                  return;
              }
  
              if (operation.success) {
                  switch (operation.type) {
  
                      // 获取客户信息用于判断用户是否启用第三方
                      case customerAction.GET_ADMIN_CUSTOMER:
                          this.setState({
                              customerInfo: nextProps.customer.customerInfo
                          });
                          break;
  
                      // 新增商品
                      case productAction.ADD_PRODUCT:
                          saveMsg();
  
                          // 数据射到dataConversion保存起来
                          this.setState({
                              id: nextProps.product.item.id,
                              dataConversion: _extends({}, this.state.dataConversion, {
                                  id: nextProps.product.item.id
                              })
                          });
  
                          // 保存后跳转列表页
                          if (this.state.callBackType == 'done') {
                              this.props.router.push(this.props.config.list + '?status=news');
                          }
  
                          // 保存后预览
                          if (this.state.callBackType == 'preview') {
                              this.showView('previewProduct', nextProps.product.item.id);
                          }
                          this.reCallBackType();
  
                          break;
  
                      // 修改商品
                      case productAction.UPDATE_PRODUCT:
                          saveMsg();
                          this.reCallBackType();
  
                          // 保存后跳转列表页
                          if (this.state.callBackType == 'done') {
                              this.props.router.push(this.props.config.list);
                          }
  
                          // 保存后预览
                          if (this.state.callBackType == 'preview') {
                              this.showView('previewProduct', this.state.dataConversion.id, {});
                          }
                          break;
  
                      // 上架
                      case productAction.UPDATE_PRODUCT_OPENING:
                          this.props.router.push(this.props.config.list + '?status=opening');
                          break;
                  }
              }
          }
  
          // 退出编辑跳转列表页
      }, {
          key: 'render',
          value: function render() {
              var operation = this.props.operation;
              var viewParam = this.state.viewParam;
  
              // 预览弹出层
              var isShowPreviewProduct = this.isShowView('previewProduct');
  
              // 预览loading
              var isLoadingProductPreview = operation.type == productAction.UPDATE_PRODUCT && operation.pending;
  
              // 保存loading
              var isLoadingSave = this.state.callBackType == 'save';
  
              // 完成loading
              var isLoadingDone = this.state.callBackType == 'done';
  
              // 预览loading
              var isLoadingPreviewg = this.state.callBackType == 'preview';
  
              var isPay = _lodash2['default'].has(this.state.customerInfo, 'weChat') || _lodash2['default'].has(this.state.customerInfo, 'aliPay');
  
              return _react2['default'].createElement(
                  'div',
                  { className: 'product-add' },
                  _react2['default'].createElement(
                      'div',
                      { className: 'product-add-steps' },
                      _react2['default'].createElement(
                          _antd.Steps,
                          { current: this.state.pageType == 'basic' ? 0 : 1 },
                          _react2['default'].createElement(Step, { title: '基本信息' }),
                          _react2['default'].createElement(Step, { title: '商品描述' }),
                          _react2['default'].createElement(Step, { title: '预览/完成' })
                      )
                  ),
                  this.state.pageType == 'basic' && _react2['default'].createElement(_componentProductBasic2['default'], {
                      onLink: this.onLink,
                      payDisabled: isPay,
                      data: this.state.data,
                      onCancel: this.onCancel,
                      onNext: this.onBasicOk }),
                  this.state.pageType == 'info' && _react2['default'].createElement(_componentProductInfo2['default'], {
                      previewLoading: isLoadingPreviewg,
                      saveLoading: isLoadingSave,
                      doneLoading: isLoadingDone,
                      data: this.state.data,
                      onCancel: this.onCancel,
                      onPrev: this.onInfoPrev,
                      onOk: this.onInfoOk,
                      onPreview: this.previewProduct,
                      onDone: this.onInfoDone }),
                  isShowPreviewProduct && _react2['default'].createElement(_componentProductPreview2['default'], {
                      visible: isShowPreviewProduct,
                      id: viewParam,
                      okLoading: isLoadingProductPreview,
                      onOk: this.onPreviewOk,
                      onCancel: this.reset,
                      onDone: this.onPreviewDone })
              );
          }
      }], [{
          key: 'defaultProps',
          value: {
              config: {
                  list: '/product/list',
                  setting: '/setting'
              }
          },
          enumerable: true
      }]);
  
      var _Add = Add;
      Add = (0, _reactRouter.withRouter)(Add) || Add;
      Add = (0, _reactRedux.connect)(function (state) {
          return {
              product: state.product.toJS(),
              customer: state.customer.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, productAction, customerAction), dispatch)
          };
      })(Add) || Add;
      return Add;
  })(_commonBasePageBase2['default']);
  
  exports['default'] = Add;
  var saveMsg = function saveMsg() {
      _antd.message.success('保存成功！');
  };
  module.exports = exports['default'];
  
  // 基本信息下一步
  
  // 商品详情-上一步
  
  // 商品详情-完成
  
  // 商品详情-保存
  
  // 商品详情-预览
  
  // 商品预览-完成并上架
  
  // 商品预览-完成
  
  // 返回合并基本信息和产品详情API对应格式数据，并更新data及dataConversion状态
  
  // 跳转到第三方（基础设置）

});
