define('admin/view/yyg/index.jsx', function(require, exports, module) {

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
  
  var _antd = require('node_modules/antd/dist/antd');
  
  '';
  
  var _reactRedux = require('node_modules/react-redux/lib/index');
  
  var _reactRouter = require('node_modules/react-router/lib/index');
  
  var _storeChannelProductAction = require("admin/store/channelProduct/action");
  
  var channelProductAction = _interopRequireWildcard(_storeChannelProductAction);
  
  var _storeProductAction = require('admin/store/product/action');
  
  var productAction = _interopRequireWildcard(_storeProductAction);
  
  var _componentYygProductList = require('admin/component/YygProductList/index.jsx');
  
  var _componentYygProductList2 = _interopRequireDefault(_componentYygProductList);
  
  var _commonComponentSearchInput = require('common/component/SearchInput/index.jsx');
  
  var _commonComponentSearchInput2 = _interopRequireDefault(_commonComponentSearchInput);
  
  var _componentProductBuyChannelList = require('admin/component/ProductBuyChannelList/index.jsx');
  
  var _componentProductBuyChannelList2 = _interopRequireDefault(_componentProductBuyChannelList);
  
  var _componentProductInfo = require('admin/component/ProductInfo/index.jsx');
  
  var _componentProductInfo2 = _interopRequireDefault(_componentProductInfo);
  
  var _componentProductPreview = require('admin/component/ProductPreview/index.jsx');
  
  var _componentProductPreview2 = _interopRequireDefault(_componentProductPreview);
  
  var _componentProductInfoExtra = require('admin/component/ProductInfoExtra/index.jsx');
  
  var _componentProductInfoExtra2 = _interopRequireDefault(_componentProductInfoExtra);
  
  var _componentYygProductTrade = require('admin/component/YygProductTrade/index.jsx');
  
  var _componentYygProductTrade2 = _interopRequireDefault(_componentYygProductTrade);
  
  var _lodash = require('node_modules/lodash/lodash');
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var confirm = _antd.Modal.confirm;
  var TabPane = _antd.Tabs.TabPane;
  
  var YygIndex = (function (_PageBase) {
      _inherits(YygIndex, _PageBase);
  
      function YygIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _YygIndex);
  
          _get(Object.getPrototypeOf(_YygIndex.prototype), 'constructor', this).call(this, props);
          this.state = {
              name: '',
              status: 'opening',
              page: 0,
              size: 5,
  
              // 临时存取数据
              cacheData: null,
  
              // 当前view类型
              viewType: 'list',
              // 当前参数
              viewParam: null,
              // 当前数据,
              viewData: null,
  
              // 用于多个功能调用同一接口，返回后执行不同处理，做为识别依据
              callbackType: 'init',
  
              // 渠道类型
              buyChannel: 'yyg'
          };
  
          this.reset = function () {
              _this.setState({
                  viewType: 'list',
                  viewParam: null,
                  viewData: null,
                  callbackType: 'reset'
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
              if (_this.state.status == 'opening') {
                  _this.props.actions.getProductChannelOpeningList(_this.state.buyChannel, _extends({
                      page: page,
                      size: size,
                      name: _this.state.name
                  }, params));
              } else {
                  _this.props.actions.getProductChannelList(_this.state.buyChannel, _extends({
                      page: page,
                      size: size,
                      status: _this.state.status,
                      name: _this.state.name
                  }, params));
              }
          };
  
          this.get = function (id) {
              _this.props.actions.getChannelProduct(_this.state.buyChannel, id);
          };
  
          this.add = function () {
              _this.showView('add', _this.state.buyChannel, {});
              _this.getBuyChannelList(0, '');
          };
  
          this.getBuyChannelList = function (page, name) {
              _this.props.actions.getBuyChannelList(_this.state.buyChannel, {
                  page: page,
                  size: 5,
                  name: name
              });
          };
  
          this.addBuyChannelProduct = function (buyChannel, productIds) {
              _this.props.actions.addBuyChannelProduct(buyChannel, productIds);
          };
  
          this.del = function (id) {
              confirm({
                  title: '删除商品',
                  content: '确定要把商品从此渠道移除吗？',
                  onOk: function onOk() {
                      _this.props.actions.delChannelProduct(_this.state.buyChannel, id);
                  }
              });
          };
  
          this.continueOpening = function (id) {
              var item = _this.props.channelProduct.items[id];
              /*
               1、商品基本信息、交易设置、交易详情已完成配置
               2、商品上架余量不可以为0
               */
              // 参与规则未配置
              if (!item) {
                  return _antd.message.error('该商品商品不存在,无法上架');
              }
  
              // 上架余量为0，调用修改参与规则编辑
              if (_this.state.status == 'soldout') {
                  confirm({
                      title: '库存不足',
                      content: '库存不足，请追加库存!',
                      onOk: function onOk() {
                          _this.editProductTrade(id);
                      }
                  });
              } else if (_this.state.status == 'closed') {
                  _this.editProductTrade(id);
              } else {
                  confirm({
                      title: '一元购续上架',
                      content: '确定续上架到一元购？',
                      onOk: function onOk() {
  
                          var product = {
                              id: id,
                              openingAgain: true,
                              yygCfg: {
                                  bidStep: item.yygCfg.bidStep,
                                  credit: item.yygCfg.credit,
                                  numOfOwners: item.yygCfg.numOfOwners,
                                  stock: item.yygCfg.stock
                              }
                          };
  
                          if (_this.state.status == 'soldout') {
                              product.opening = true;
                          }
                          _this.props.actions.updateChannelProductTrade(_this.state.buyChannel, product);
                          _this.setState({
                              callbackType: 'continueOpening'
                          });
                      }
                  });
              }
          };
  
          this.opening = function (id) {
              var item = _this.props.channelProduct.items[id];
              /*
               1、商品基本信息、交易设置、交易详情已完成配置
               2、商品上架余量不可以为0
               */
              // 参与规则未配置
              if (!item) {
                  return _antd.message.error('该商品商品不存在,无法上架');
              }
  
              if (!item.isImprove) {
                  confirm({
                      title: '商品上架',
                      content: '参与规则未配置,无法上架,请先配置参与规则',
                      onOk: function onOk() {
                          _this.editProductTrade(id);
                      }
                  });
                  return;
              }
  
              // 上架余量为0
              if (item.intensity <= 0) {
                  return _antd.message.error('该商品商品库存余量为0，无法上架');
              }
  
              confirm({
                  title: '一元购上架',
                  content: '确定上架到一元购？',
                  onOk: function onOk() {
                      _this.props.actions.updateChannelProductOpening(_this.state.buyChannel, id);
                  }
              });
          };
  
          this.finished = function (id) {
              confirm({
                  title: '商品预下架',
                  content: '当期结束后，下一期将不再自动上架，确定要预下架该商品吗？',
                  onOk: function onOk() {
                      _this.props.actions.updateChannelProductFinished(_this.state.buyChannel, id);
                  }
              });
          };
  
          this.editProductInfo = function (id) {
              _this.showView('editProductInfo', id);
              _this.get(id);
          };
  
          this.editProductTrade = function (id) {
              if (_this.state.status == 'opening') {
                  confirm({
                      title: '修改参与规则',
                      content: '商品已上架，重置参与规则后，当期不影响，将在下一期进行同步，确认重置规则？',
                      onOk: function onOk() {
                          _this.showView('editProductTrade', id);
                          _this.get(id);
                      }
                  });
              } else {
                  _this.showView('editProductTrade', id);
                  _this.get(id);
              }
          };
  
          this.saveProductTrade = function (data) {
              _this.setState({
                  callbackType: 'save'
              });
  
              var product = _this.handelSaveProductTrade(data);
              if (_this.state.status == 'closed') {
                  product.openingAgain = true;
                  product.opening = false;
              }
              _this.props.actions.updateChannelProductTrade(_this.state.buyChannel, product);
          };
  
          this.saveSubmitProductTrade = function (data) {
              var callbackType = undefined,
                  product = _this.handelSaveProductTrade(data);
  
              // 预下架
              if (_this.state.status == "closed") {
                  product.openingAgain = false;
                  product.opening = true;
                  callbackType = 'continueOpening';
  
                  // 已售罄
              } else if (_this.state.status == 'soldout') {
                      product.opening = true;
                      product.openingAgain = true;
                      callbackType = 'continueOpening';
  
                      // 未上架
                  } else {
                          callbackType = 'saveSubmit';
                      }
  
              _this.setState({
                  callbackType: callbackType
              });
  
              _this.props.actions.updateChannelProductTrade(_this.state.buyChannel, product);
          };
  
          this.handelSaveProductTrade = function (data) {
              // 提交后保持表单数据同步,防止点击后，表单数据变为打开时的数据
  
              _this.setState({
                  viewData: _extends({}, _this.state.viewData, data)
              });
  
              var product = _extends({
                  id: _this.state.viewParam
              }, data);
  
              return product;
          };
  
          this.saveProductInfo = function (formData, dataConversion) {
              _this.setState({
                  callbackType: 'infoSave'
              });
              _this.handleSaveInfo(formData, dataConversion);
          };
  
          this.previewProduct = function (formData, dataConversion) {
              _this.setState({
                  callbackType: 'preview'
              });
              _this.handleSaveInfo(formData, dataConversion);
          };
  
          this.onPreviewEdit = function () {
              _this.showView('editProductInfo', _this.state.viewParam, _this.state.viewData);
          };
  
          this.onPreviewEdit = function () {
              _this.showView('editProductInfo', _this.state.viewParam, _this.state.viewData);
          };
  
          this.onPreviewDone = function () {
              _this.reset();
          };
  
          this.handleSaveInfo = function (formData, dataConversion) {
  
              // 提交后保持表单数据同步,防止点击后，表单数据变为打开时的数据
              _this.setState({
                  viewData: _extends({}, _this.state.viewData, dataConversion)
              });
  
              var data = _extends({}, _this.state.viewData, formData);
  
              var product = {
                  id: data.id,
                  code: data.code,
                  title: data.title
              };
  
              _this.props.actions.updateChannelProductInfo(_this.state.buyChannel, _extends({}, product, dataConversion));
          };
  
          this.handleStatusChange = function (status) {
              _this.setState({
                  status: status
              }, function () {
                  _this.list(0);
              });
          };
  
          this.handleSearch = function (name) {
              _this.setState({
                  name: name
              }, function () {
                  _this.list(0);
              });
          };
      }
  
      // 保存成功
  
      _createClass(YygIndex, [{
          key: 'componentDidMount',
  
          // 组件加载
          value: function componentDidMount() {
              this.list(0);
          }
      }, {
          key: 'componentWillMount',
          value: function componentWillMount() {
              var status = this.props.location.query.status;
              if (status && status != this.state.status) {
                  this.setState({
                      status: status
                  });
              }
          }
      }, {
          key: 'componentDidUpdate',
          value: function componentDidUpdate(prevProps) {
              var oldStatus = prevProps.location.query.status;
              var newStatus = this.props.location.query.status;
              if (oldStatus != newStatus) {
                  this.handleStatusChange(newStatus);
              }
          }
  
          // 数据更新
      }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              // 错误处理
              if (operation.failure) {
                  // 上架
                  switch (operation.type) {
                      case channelProductAction.UPDATE_CHANNEL_PRODUCT_OPENING:
                          this.reset();
                          break;
                  }
                  return;
              }
  
              // 发送中处理
              if (operation.opening) {
                  return;
              }
  
              // 成功处理
              if (operation.success) {
  
                  switch (operation.type) {
  
                      // 获取商品成功
                      case channelProductAction.GET_CHANNEL_PRODUCT:
  
                          // 新上商品会获取商品库商品的单价，作为默认总币数
                          if (this.state.status == 'news' && nextProps.channelProduct.item.yygCfg.credit < 1) {
                              this.setState({
                                  cacheData: nextProps.channelProduct.item
                              });
                              this.props.actions.getProduct(nextProps.channelProduct.item.productId);
                          } else {
                              if (this.state.viewParam) {
                                  this.setState({
                                      viewData: nextProps.channelProduct.item
                                  });
                              }
                          }
                          break;
  
                      // 获取商城商品信息
                      case productAction.GET_PRODUCT:
                          var data = this.state.cacheData;
                          data.yygCfg.credit = nextProps.productItem.mallCfg.price / 100;
                          this.setState({
                              viewData: data
                          });
                          break;
  
                      // 可添加的商品列表
                      case productAction.GET_BUY_CHANNEL_LIST:
                          this.setState({
                              viewData: nextProps.buyChannelList
                          });
                          break;
  
                      // 修改商品交易设置
                      case channelProductAction.UPDATE_CHANNEL_PRODUCT_TRADE:
  
                          // 保存操作
                          if (this.state.callbackType == 'save') {
                              // 交易设置修改后刷新此项参数
                              this.get(this.state.viewParam);
                              this.list();
                              this.reset();
                              saveMsg();
                          }
  
                          // 保存并上架
                          if (this.state.callbackType == 'saveSubmit') {
                              // 交易设置修改后刷新此项参数
                              this.get(this.state.viewParam);
                              this.props.actions.updateChannelProductOpening(this.state.buyChannel, this.state.viewParam);
                          }
  
                          // 保存并续上架
                          if (this.state.callbackType == 'continueOpening') {
                              _antd.message.success('续上架成功');
                              this.list();
                              this.reset();
                          }
  
                          break;
  
                      // 修改图文详情
                      case channelProductAction.UPDATE_CHANNEL_PRODUCT_INFO:
  
                          // 保存
                          if (this.state.callbackType == 'infoSave') {
                              saveMsg();
                              this.reset();
                          }
                          // 保存及预览
                          if (this.state.callbackType == 'preview') {
                              this.reset();
                              this.showView('previewProduct', this.state.viewParam, this.state.viewData);
                          }
                          this.list();
                          break;
  
                      // 添加到交易渠道成功
                      case productAction.ADD_BUY_CHANNEL_PRODUCT:
                          _antd.message.success('添加商品成功');
                          this.reset();
                          break;
  
                      // 上架成功
                      case channelProductAction.UPDATE_CHANNEL_PRODUCT_OPENING:
                          _antd.message.success('上架成功');
                          this.reset();
                          this.list();
  
                          break;
                      // 下架成功
                      case channelProductAction.UPDATE_CHANNEL_PRODUCT_FINISHED:
                          _antd.message.success('下架成功');
                          this.list();
                          break;
  
                      // 删除成功
                      case channelProductAction.DEL_CHANNEL_PRODUCT:
                          _antd.message.success('删除成功！');
                          this.list();
                          break;
                  }
              }
          }
  
          // 是否显示viewType
      }, {
          key: 'isShowView',
          value: function isShowView(viewType) {
              return this.state.viewType == viewType && this.state.viewData != null;
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
  
          // 重置页面
      }, {
          key: 'render',
          value: function render() {
              var operation = this.props.operation;
              var _state = this.state;
              var viewType = _state.viewType;
              var viewParam = _state.viewParam;
              var viewData = _state.viewData;
  
              // 是否显示loading
              var isProductListLoading = operation.type == channelProductAction.GET_CHANNEL_PRODUCT_LIST && operation.pending;
              var isProductBuyChannelListLoading = operation.type == productAction.GET_BUY_CHANNEL_LIST && operation.pending;
              var isAddBuyChannelProductLoading = operation.type == productAction.ADD_BUY_CHANNEL_PRODUCT && operation.pending;
              var isSaveTradeLoadingLoading = this.state.callbackType == 'save';
              var isSaveSubmitTradeLoading = this.state.callbackType == 'saveSubmit';
              var isSaveInfoLoading = this.state.callbackType == 'infoSave';
              var isPreviewLoading = this.state.callbackType == 'preview';
  
              // 是否显示预览
              var isShowPreviewProduct = this.isShowView('previewProduct');
  
              // 是否显示添加对话框
              var isShowAdd = this.isShowView('add');
  
              // 是否显示修改商品详情
              var isShowEditProductInfo = this.isShowView('editProductInfo');
  
              // 是否显示修改基本信息
              var isShowEditProductTrade = this.isShowView('editProductTrade');
  
              // 保存并上架是否显示
              var isSnSaveSubmit = this.state.status == 'opening' ? null : this.saveSubmitProductTrade;
  
              var searchBar = _react2['default'].createElement(
                  'span',
                  { className: 'yyg-searchinput' },
                  _react2['default'].createElement(
                      _antd.Button,
                      { type: 'primary', onClick: this.add, style: { marginRight: '5px' } },
                      '添加商品'
                  ),
                  _react2['default'].createElement(_commonComponentSearchInput2['default'], {
                      placeholder: '请输入商品名称/编号',
                      onSearch: this.handleSearch,
                      style: { width: 200 } })
              );
              return _react2['default'].createElement(
                  'div',
                  null,
                  _react2['default'].createElement(
                      _antd.Tabs,
                      { onChange: this.handleStatusChange,
                          type: 'card',
                          activeKey: this.state.status,
                          tabBarExtraContent: searchBar },
                      _react2['default'].createElement(TabPane, { tab: '所有商品', key: '' }),
                      _react2['default'].createElement(TabPane, { tab: '新上商品', key: 'news' }),
                      _react2['default'].createElement(TabPane, { tab: '待上架商品', key: 'suspend' }),
                      _react2['default'].createElement(TabPane, { tab: '已上架商品', key: 'opening' }),
                      _react2['default'].createElement(TabPane, { tab: '预下架商品', key: 'closed' }),
                      _react2['default'].createElement(TabPane, { tab: '已下架商品', key: 'finished' }),
                      _react2['default'].createElement(TabPane, { tab: '已售罄商品', key: 'soldout' })
                  ),
                  _react2['default'].createElement(_componentYygProductList2['default'], {
                      editProductInfo: this.editProductInfo,
                      editProductTrade: this.editProductTrade,
                      data: this.props.channelProduct.list.content,
                      total: this.props.channelProduct.list.totalElements,
                      size: this.state.size,
                      list: this.list,
                      del: this.del,
                      continueOpening: this.continueOpening,
                      opening: this.opening,
                      finished: this.finished,
                      loading: isProductListLoading }),
                  isShowAdd && _react2['default'].createElement(_componentProductBuyChannelList2['default'], {
                      buyChannel: 'yyg',
                      data: this.props.buyChannelList.content,
                      total: this.props.buyChannelList.totalElements,
                      size: this.props.buyChannelList.size,
                      page: this.props.buyChannelList.number,
                      list: this.getBuyChannelList,
                      save: this.addBuyChannelProduct,
                      reset: this.reset,
                      loading: isProductBuyChannelListLoading,
                      confirmLoading: isAddBuyChannelProductLoading }),
                  isShowEditProductInfo && _react2['default'].createElement(
                      _antd.Modal,
                      {
                          className: 'modal-top',
                          width: 840,
                          title: _react2['default'].createElement(_componentProductInfoExtra2['default'], {
                              data: this.state.viewData }),
                          visible: isShowEditProductInfo,
                          onCancel: this.reset,
                          footer: null },
                      _react2['default'].createElement(_componentProductInfo2['default'], {
                          saveLoading: isSaveInfoLoading,
                          previewLoading: isPreviewLoading,
                          onOk: this.saveProductInfo,
                          onPreview: this.previewProduct,
                          mold: 'show',
                          onExit: this.reset,
                          data: this.state.viewData })
                  ),
                  isShowEditProductTrade && _react2['default'].createElement(_componentYygProductTrade2['default'], {
                      saveSubmitLoading: isSaveSubmitTradeLoading,
                      saveLoading: isSaveTradeLoadingLoading,
                      data: this.state.viewData,
                      onCancel: this.reset,
                      onOk: this.saveProductTrade,
                      onSaveSubmit: isSnSaveSubmit,
                      visible: isShowEditProductTrade }),
                  isShowPreviewProduct && _react2['default'].createElement(_componentProductPreview2['default'], {
                      buyChannel: 'yyg',
                      visible: isShowPreviewProduct,
                      id: this.state.viewParam,
                      onEdit: this.onPreviewEdit,
                      onOk: this.onPreviewOk,
                      onCancel: this.reset,
                      onDone: this.onPreviewDone })
              );
          }
      }]);
  
      var _YygIndex = YygIndex;
      YygIndex = (0, _reactRouter.withRouter)(YygIndex) || YygIndex;
      YygIndex = (0, _reactRedux.connect)(function (state) {
          return {
              productItem: state.product.toJS().item,
              channelProduct: state.channelProduct.toJS(),
              buyChannelList: state.product.toJS().buyChannelList,
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({
                  addBuyChannelProduct: productAction.addBuyChannelProduct,
                  getBuyChannelList: productAction.getBuyChannelList,
                  getProduct: productAction.getProduct
              }, channelProductAction), dispatch)
          };
      })(YygIndex) || YygIndex;
      return YygIndex;
  })(_commonBasePageBase2['default']);
  
  exports['default'] = YygIndex;
  var saveMsg = function saveMsg() {
      _antd.message.success('保存成功！');
  };
  module.exports = exports['default'];
  
  // 获取列表
  
  // 获取商品详情
  
  // 添加商品
  
  // 获取列表
  
  // 添加指定的商品到指定的玩法购买渠道
  
  // 移除商品
  
  // 续上架
  
  // 上架商品
  
  // 商品下架
  
  // 修改商品详情
  
  // 修改参与规则
  
  // 参与规则-保存
  
  // 参与规则-保存并提交
  
  // 参与规则-保存数据处理
  
  // 商品详情-保存
  
  // 商品详情-保存并预览
  
  // 预览-预览继续编辑
  
  // 预览-预览继续编辑
  
  // 预览-预览完成
  
  // 商品详情-数据合并转换
  
  // 获取不同状态的商品列表
  
  // 搜索商品

});
