define('admin/view/tker/product.jsx', function(require, exports, module) {

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
  
  var _antd = require('node_modules/antd/dist/antd');
  
  var _reactRouter = require('node_modules/react-router/lib/index');
  
  var _commonComponentSearchInput = require('common/component/SearchInput/index.jsx');
  
  var _commonComponentSearchInput2 = _interopRequireDefault(_commonComponentSearchInput);
  
  var _componentTkerProductList = require('admin/component/TkerProductList/index.jsx');
  
  var _componentTkerProductList2 = _interopRequireDefault(_componentTkerProductList);
  
  var _componentTkerFenRunDetails = require('admin/component/TkerFenRunDetails/index.jsx');
  
  var _componentTkerFenRunDetails2 = _interopRequireDefault(_componentTkerFenRunDetails);
  
  var _componentTkerProductEnableList = require('admin/component/TkerProductEnableList/index.jsx');
  
  var _componentTkerProductEnableList2 = _interopRequireDefault(_componentTkerProductEnableList);
  
  var _componentTkerProductExtra = require('admin/component/TkerProductExtra/index.jsx');
  
  var _componentTkerProductExtra2 = _interopRequireDefault(_componentTkerProductExtra);
  
  var _componentTkerFenRunSetting = require('admin/component/TkerFenRunSetting/index.jsx');
  
  var _componentTkerFenRunSetting2 = _interopRequireDefault(_componentTkerFenRunSetting);
  
  var _storeProductAction = require('admin/store/product/action');
  
  var productAction = _interopRequireWildcard(_storeProductAction);
  
  var _storeTkerAction = require("admin/store/tker/action");
  
  var tkerAction = _interopRequireWildcard(_storeTkerAction);
  
  // 分销商品
  
  var confirm = _antd.Modal.confirm;
  var TabPane = _antd.Tabs.TabPane;
  
  var TKerProduct = (function (_PageBase) {
      _inherits(TKerProduct, _PageBase);
  
      function TKerProduct(props) {
          var _this = this;
  
          _classCallCheck(this, _TKerProduct);
  
          _get(Object.getPrototypeOf(_TKerProduct.prototype), 'constructor', this).call(this, props);
          this.state = {
              name: '',
              page: 0,
              size: 5,
              list: [],
  
              viewType: 'init',
              viewParam: null,
              viewData: null,
  
              // 平台分销利润
              settingData: null,
  
              // 接口返回处理
              callbackType: ''
  
          };
  
          this.reset = function () {
              _this.setState({
                  viewType: 'init',
                  viewParam: null,
                  viewData: null,
                  callbackType: ''
              });
          };
  
          this.updateFormData = function (formData) {
              _this.setState({
                  viewData: formData
              });
          };
  
          this.list = function (page, size, params) {
              if (!isNaN(size)) {
                  _this.setState({
                      size: size
                  });
              } else {
                  size = _this.state.size;
              }
  
              if (!isNaN(page)) {
                  _this.setState({
                      page: page
                  });
              } else {
                  page = _this.state.page;
              }
              _this.props.actions.getManagerProductTkerList(_extends({
                  page: page,
                  size: size,
                  name: _this.state.name
              }, params));
          };
  
          this.handleSearch = function (val) {
              _this.setState({
                  name: val
              }, function () {
                  return _this.list();
              });
          };
  
          this.add = function () {
              _this.showView('add', '');
              _this.getTkerList(0, '');
          };
  
          this.getTker = function (id) {
              _this.props.actions.getManagerProductDataTker(id);
          };
  
          this.getTkerList = function (page, name) {
              _this.props.actions.getManagerProductTkerEnableList({
                  page: page,
                  size: 5,
                  name: name
              });
          };
  
          this.addTkerEnable = function (productIds) {
              _this.props.actions.addManagerProductTker(productIds);
          };
  
          this.showTkerDetails = function (id) {
              _this.showView('TkerFenRunDetails', id);
              _this.getTker(id);
          };
  
          this.editSetting = function () {
              _this.showView('TkerFenRunSetting', _this.state.viewParam, _this.state.viewData);
          };
  
          this.onReturn = function () {
              _this.showView('TkerFenRunDetails', _this.state.viewParam, _this.state.viewData);
          };
  
          this.saveSetting = function (formData) {
              // 如果没有进行设置，同不保存
              var tkerConfig = _this.state.viewData.tkerConfig;
              if (formData.lv0ProfitRate == tkerConfig.lv0ProfitRate && formData.lv1ProfitRate == tkerConfig.lv1ProfitRate && formData.lv2ProfitRate == tkerConfig.lv2ProfitRate && formData.lv3ProfitRate == tkerConfig.lv3ProfitRate) {
                  _this.reset();
                  return;
              }
  
              _this.props.actions.updateManagerProductTker(_extends({
                  id: _this.state.viewParam
              }, formData));
  
              _this.updateFormData({
                  tkerConfig: formData
              });
          };
      }
  
      _createClass(TKerProduct, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
              this.list();
              this.props.actions.getManagerTkerConfig();
          }
      }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
  
                  case productAction.GET_MANAGER_PRODUCT_TKER_LIST:
                      this.setState({
                          list: nextProps.product.list
                      });
                      break;
  
                  // 获取商品推客分销数据
                  case productAction.GET_MANAGER_DATA_TKER:
                      if (this.state.viewParam) {
  
                          var data = {},
                              tradeData = null,
                              tkerData = null,
                              item = nextProps.product.items[this.state.viewParam],
                              tkerItem = nextProps.product.tkerItem;
  
                          if (tkerItem.opdata && tkerItem.opdata.tkerData) {
                              tkerData = tkerItem.opdata.tkerData;
                          }
  
                          if (item.opdata && item.opdata.tradeData) {
                              tradeData = item.opdata.tradeData;
                          }
  
                          data = _extends({}, item, {
                              opdata: {
                                  tradeData: tradeData,
                                  tkerData: tkerData
                              },
                              tkerConfig: nextProps.product.tkerItem.tkerConfig
                          });
  
                          this.setState({
                              viewData: data
                          });
                      }
                      break;
  
                  // 获取分销设置信息
                  case tkerAction.GET_MANAGER_TKER_CONFIG:
                      this.setState({
                          settingData: nextProps.tker.settingData
                      });
                      break;
  
                  // 获取可开通分销商品
                  case productAction.GET_MANAGER_PRODUCT_TKER_ENABLE_LIST:
                      this.setState({
                          viewData: nextProps.product.tkerEnableList
                      });
                      break;
  
                  // 增加商品到推客平台
                  case productAction.ADD_MANAGER_PRODUCT_TKER:
                      _antd.message.success('添加成功！');
                      this.reset();
                      this.list();
                      break;
  
                  // 修改分销配置
                  case productAction.UPDATE_MANAGER_PRODUCT_TKER:
                      _antd.message.success('保存成功');
                      this.reset();
                      this.list();
                      break;
              }
          }
  
          // 显示view
      }, {
          key: 'showView',
          value: function showView(viewType, viewParam, viewData) {
              this.setState({
                  viewType: viewType,
                  viewParam: viewParam,
                  viewData: viewData
              });
          }
  
          // 是否显示viewType
      }, {
          key: 'isShowView',
          value: function isShowView(viewType) {
              return this.state.viewType == viewType && this.state.viewData != null;
          }
  
          // 重置页面
      }, {
          key: 'render',
          value: function render() {
              var operation = this.props.operation;
  
              // 显示分销设置窗口
              var isShowProductBuyChannelList = this.isShowView('add'),
                  isShowTkerFenRunDetails = this.isShowView('TkerFenRunDetails'),
                  isShowTkerFenRunSetting = this.isShowView('TkerFenRunSetting'),
                  isProductBuyChannelListLoading = operation.type == productAction.ADD_MANAGER_PRODUCT_TKER && operation.pending,
                  isLoadingTkerFenRunSetting = operation.type == productAction.UPDATE_MANAGER_PRODUCT_TKER && operation.pending,
                  isLoadingList = operation.type == productAction.GET_MANAGER_PRODUCT_TKER_LIST && operation.pending;
  
              return _react2['default'].createElement(
                  'div',
                  { className: 'tker-product' },
                  _react2['default'].createElement(
                      _antd.Card,
                      { className: 'tker-product-hd' },
                      _react2['default'].createElement(
                          'div',
                          { className: 'tker-product-total' },
                          _react2['default'].createElement(
                              'span',
                              { style: { fontSize: '14px' } },
                              '分销商品总计：'
                          ),
                          _react2['default'].createElement(
                              'span',
                              { style: { fontSize: '22px' } },
                              '230件'
                          )
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'tker-product-search' },
                          _react2['default'].createElement(
                              _antd.Button,
                              { type: 'primary', onClick: this.add, style: { marginRight: '5px' } },
                              '添加商品'
                          ),
                          _react2['default'].createElement(_commonComponentSearchInput2['default'], {
                              placeholder: '请输入商品名称/编号',
                              onSearch: this.handleSearch,
                              style: { width: 200 } })
                      )
                  ),
                  _react2['default'].createElement(_componentTkerProductList2['default'], {
                      showTkerDetails: this.showTkerDetails,
                      loading: isLoadingList,
                      data: this.state.list }),
                  isShowProductBuyChannelList && _react2['default'].createElement(_componentTkerProductEnableList2['default'], {
                      data: this.state.viewData,
                      list: this.getTkerList,
                      save: this.addTkerEnable,
                      reset: this.reset,
                      confirmLoading: isProductBuyChannelListLoading }),
                  isShowTkerFenRunDetails && _react2['default'].createElement(
                      _antd.Modal,
                      {
                          title: _react2['default'].createElement(_componentTkerProductExtra2['default'], {
                              data: this.state.viewData }),
                          onOk: this.reset,
                          onCancel: this.reset,
                          visible: true,
                          width: 1200,
                          footer: [_react2['default'].createElement(
                              _antd.Button,
                              {
                                  key: 'reset',
                                  size: 'large',
                                  onClick: this.reset },
                              '返回'
                          )] },
                      _react2['default'].createElement(_componentTkerFenRunDetails2['default'], {
                          onSetting: this.editSetting,
                          tkerData: this.state.viewData.opdata.tkerData,
                          model: 'show',
                          settingData: this.state.viewData.tkerConfig })
                  ),
                  isShowTkerFenRunSetting && _react2['default'].createElement(_componentTkerFenRunSetting2['default'], {
                      model: 'show',
                      profit: this.state.viewData.profits,
                      data: this.state.viewData.tkerConfig,
                      loading: isLoadingTkerFenRunSetting,
                      onCancel: this.reset,
                      onReturn: this.onReturn,
                      onSave: this.saveSetting })
              );
          }
      }]);
  
      var _TKerProduct = TKerProduct;
      TKerProduct = (0, _reactRouter.withRouter)(TKerProduct) || TKerProduct;
      TKerProduct = (0, _reactRedux.connect)(function (state) {
          return {
              product: state.product.toJS(),
              tker: state.tker,
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, productAction, tkerAction), dispatch)
          };
      })(TKerProduct) || TKerProduct;
      return TKerProduct;
  })(_commonBasePageBase2['default']);
  
  exports['default'] = TKerProduct;
  module.exports = exports['default'];
  
  // 修改表单数据后调用此方法，更新viewData的数据，防止保存数据时，返回保存数据瞬间之前
  
  // 获取列表
  
  // 已开能商口列表搜索
  
  // 添加分销商品列表商品
  
  // 获取可开通商品
  
  // 获取可分销商品列表列表
  
  // 添加分销商品
  
  // 分销详情-弹出
  
  // 分销分润设置-弹出
  
  // 分销分润设置-返回
  
  // 保存分销设置

});
