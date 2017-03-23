define('admin/view/product/list.jsx', function(require, exports, module) {

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
  
  var _reactRedux = require('node_modules/react-redux/lib/index');
  
  var _reactRouter = require('node_modules/react-router/lib/index');
  
  var _storeProductAction = require('admin/store/product/action');
  
  var productAction = _interopRequireWildcard(_storeProductAction);
  
  var _storeStatAction = require('admin/store/stat/action');
  
  var statAction = _interopRequireWildcard(_storeStatAction);
  
  var _componentProductList = require('admin/component/ProductList/index.jsx');
  
  var _componentProductList2 = _interopRequireDefault(_componentProductList);
  
  var _componentProductDataCards = require('admin/component/ProductDataCards/index.jsx');
  
  var _componentProductDataCards2 = _interopRequireDefault(_componentProductDataCards);
  
  var _commonComponentSearchInput = require('common/component/SearchInput/index.jsx');
  
  var _commonComponentSearchInput2 = _interopRequireDefault(_commonComponentSearchInput);
  
  var _componentProductBasic = require('admin/component/ProductBasic/index.jsx');
  
  var _componentProductBasic2 = _interopRequireDefault(_componentProductBasic);
  
  var _componentProductInfo = require('admin/component/ProductInfo/index.jsx');
  
  var _componentProductInfo2 = _interopRequireDefault(_componentProductInfo);
  
  var _componentProductPreview = require('admin/component/ProductPreview/index.jsx');
  
  var _componentProductPreview2 = _interopRequireDefault(_componentProductPreview);
  
  var _componentProductInfoExtra = require('admin/component/ProductInfoExtra/index.jsx');
  
  var _componentProductInfoExtra2 = _interopRequireDefault(_componentProductInfoExtra);
  
  var _componentProductSalesDetails = require('admin/component/ProductSalesDetails/index.jsx');
  
  var _componentProductSalesDetails2 = _interopRequireDefault(_componentProductSalesDetails);
  
  var confirm = _antd.Modal.confirm;
  var TabPane = _antd.Tabs.TabPane;
  
  var List = (function (_PageBase) {
      _inherits(List, _PageBase);
  
      function List(props) {
          var _this = this;
  
          _classCallCheck(this, _List);
  
          _get(Object.getPrototypeOf(_List.prototype), 'constructor', this).call(this, props);
          this.state = {
              name: '',
              status: 'opening',
              page: 0,
              size: 5,
  
              viewType: 'list',
  
              // 当前参数
              viewParam: null,
  
              // 当前数据,
              viewData: null,
  
              formState: false,
  
              // 调用同一接口，返回处理type
              callBackType: '',
  
              addUrl: '/product/add'
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
  
              _this.props.actions.getProducts(_extends({
                  page: page,
                  size: size,
                  status: _this.state.status,
                  name: _this.state.name
              }, params));
          };
  
          this.add = function () {
              _this.props.router.push(_this.state.addUrl);
          };
  
          this.del = function (id) {
              confirm({
                  title: '删除商品',
                  content: '确定要删除商品吗,删除后不可恢复？',
                  onOk: function onOk() {
                      _this.props.actions.delProduct(id);
                  }
              });
          };
  
          this.opening = function (id) {
              var item = _this.props.product.items[id];
              /*
               1、商品基本信息、交易设置、交易详情已完成配置
               2、商品上架余量不可以为0
               */
              if (!item) {
                  return _antd.message.error('该商品商品不存在,无法上架');
              }
  
              if (item.intensity <= 0) {
                  return _antd.message.error('该商品商品库存余量为0，无法上架');
              }
  
              confirm({
                  title: '商品上架',
                  content: '确定上架到商城？',
                  onOk: function onOk() {
                      _this.props.actions.updateProductOpening(id);
                  }
              });
          };
  
          this.finished = function (id) {
              confirm({
                  title: '商品下架',
                  content: '商品确定下架？',
                  onOk: function onOk() {
                      _this.props.actions.updateProductFinished(id);
                  }
              });
          };
  
          this.editProductInfo = function (id) {
              _this.showView('editProductInfo', id);
              _this.props.actions.getProduct(id);
          };
  
          this.editProductBasic = function (id) {
              var item = _this.props.product.items[id];
  
              if (!item) {
                  return _antd.message.error('该商品商品不存在,无法修改');
              }
  
              if (item.mallCfg.enable) {
                  confirm({
                      title: '修改交易设置',
                      content: '商品已上架，需先下架才能进行交易设置修改。确认先下架？',
                      onOk: function onOk() {
                          _this.showView('editProductBasic', id);
                          _this.props.actions.updateProductFinished(id);
                      }
                  });
              } else {
                  _this.showView('editProductBasic', id);
                  _this.props.actions.getProduct(id);
              }
          };
  
          this.saveOpeningBasic = function (formData, dataConversion) {
              _this.setState({
                  callBackType: 'opening'
              });
              _this.handleSaveBasic(formData, dataConversion);
          };
  
          this.saveBasic = function (formData, dataConversion) {
              _this.setState({
                  callBackType: 'basicSave'
              });
              _this.handleSaveBasic(formData, dataConversion);
          };
  
          this.showProductSalesDetails = function (id) {
              _this.showView('showProductSalesDetails', id, null);
  
              _this.setState({
                  callBackType: 'salesDetails'
              });
              _this.props.actions.getProduct(id);
              _this.props.actions.getDataProductSales({
                  id: id
              });
          };
  
          this.onSalesDetailsDatePicker = function (startDate, enDate) {
              _this.props.actions.getDataProductSales({
                  id: _this.state.viewParam,
                  startDate: startDate,
                  enDate: enDate
              });
  
              _this.setState({
                  callBackType: 'salesDetails'
              });
          };
  
          this.onSalesDetailsDateRange = function (type) {
              _this.props.actions.getDataProductSales({
                  id: _this.state.viewParam,
                  dateRange: type
              });
  
              _this.setState({
                  callBackType: 'salesDetails'
              });
          };
  
          this.onPreviewEdit = function () {
              _this.showView('editProductInfo', _this.state.viewParam, _this.state.viewData);
          };
  
          this.onPreviewDone = function () {
              _this.reset();
          };
  
          this.saveProductInfo = function (formData, dataConversion) {
              _this.setState({
                  callBackType: 'infoSave'
              });
              _this.handleSaveInfo(formData, dataConversion);
          };
  
          this.previewProduct = function (formData, dataConversion) {
              _this.setState({
                  callBackType: 'preview'
              });
              _this.handleSaveInfo(formData, dataConversion);
          };
  
          this.handleSaveInfo = function (formData, dataConversion) {
              var data = _extends({}, _this.state.viewData, formData);
  
              // 提交后保持表单数据同步,防止点击后，表单数据变为打开时的数据
              _this.setState({
                  viewData: data
              });
  
              var product = {
                  id: data.id,
                  code: data.code,
                  title: data.title
              };
  
              _this.props.actions.updateProductInfo(_extends({}, product, dataConversion));
          };
  
          this.handleSaveBasic = function (formData, dataConversion) {
  
              // 合并当前数据和表单转换后的数据
              var data = _extends({}, _this.state.viewData, dataConversion, {
                  mediaRes: _extends({}, _this.state.viewData.mediaRes, dataConversion.mediaRes)
              });
  
              // 提交后保持表单数据同步,防止点击后，表单数据变为打开时的数据
              _this.setState({
                  viewData: data
              });
  
              // 修改基本信息接口数据拼接
              var product = _extends({}, dataConversion, {
                  id: data.id,
                  digest: data.digest,
                  content: data.content,
                  name: data.name,
                  mallCfg: dataConversion.mallCfg,
                  mediaRes: data.mediaRes
              });
              _this.props.actions.saveProduct(product);
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
  
          this.onLink = function () {
              _this.props.router.push(_this.props.config.setting);
          };
      }
  
      // 保存成功
  
      _createClass(List, [{
          key: 'componentDidMount',
  
          // 组件加载
          value: function componentDidMount() {
              this.list(0);
              this.props.actions.getDataProductTotalSales('mall');
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
  
              if (operation.failure) {
                  this.reCallBackType();
                  return;
              }
  
              if (operation.opening) {
                  return;
              }
  
              if (operation.success) {
                  // 获取销售信息
                  if (this.state.viewType == 'showProductSalesDetails' && nextProps.stat.productSales !== null) {
                      var data = _extends({}, this.state.viewData, nextProps.stat.productSales);
  
                      this.setState({
                          viewData: data
                      });
  
                      this.reCallBackType();
  
                      return;
                  }
  
                  switch (operation.type) {
  
                      // 获取商品成功
                      case productAction.GET_PRODUCT:
                          // 销售详情射进viewData
                          if (this.state.callBackType == 'salesDetails') {
                              var data = _extends({}, this.state.viewData, nextProps.product.item);
                              this.setState({
                                  viewData: data
                              });
                          } else if (this.state.viewParam) {
                              this.setState({
                                  viewData: nextProps.product.item
                              });
                          }
  
                          break;
  
                      // 修改详情
                      case productAction.UPDATE_PRODUCT_INFO:
  
                          if (this.state.callBackType == 'infoSave') {
                              saveMsg();
                              this.reset();
                          }
  
                          if (this.state.callBackType == 'preview') {
                              this.showView('previewProduct', this.state.viewParam, this.state.viewData);
                          }
                          this.reCallBackType();
                          this.list();
  
                          break;
  
                      // 修改基本信息
                      case productAction.UPDATE_PRODUCT_TRADE:
                          saveMsg();
                          break;
  
                      // 上架成功
                      case productAction.UPDATE_PRODUCT_OPENING:
                          _antd.message.success('上架成功');
                          this.reCallBackType();
                          this.list();
                          break;
  
                      // 下架成功
                      case productAction.UPDATE_PRODUCT_FINISHED:
                          _antd.message.success('下架成功');
                          this.list();
                          this.reset();
                          this.reCallBackType();
                          if (this.state.viewType == 'editProductBasic') {
                              this.props.actions.getProduct(this.state.viewParam);
                          }
                          break;
  
                      // 删除成功
                      case productAction.DEL_PRODUCT:
                          _antd.message.success('删除成功！');
                          this.list();
                          break;
  
                      // 基本信息更新成功
                      case productAction.UPDATE_PRODUCT:
                          if (this.state.callBackType == 'opening') {
                              this.props.actions.updateProductOpening(this.state.viewParam);
                              this.reset();
                          } else if (this.state.callBackType == 'basicSave') {
                              saveMsg();
                              this.list();
                              this.reCallBackType();
                              this.reset();
                          }
                          break;
  
                      // 总计销售统计数据
                      case statAction.GET_DATA_PRODUCT_TOTAL_SALES:
                          this.setState({
                              saleTotal: operation.data
                          });
                          break;
                  }
              }
          }
  
          // 获取列表
      }, {
          key: 'render',
          value: function render() {
  
              var searchBar = _react2['default'].createElement(
                  'span',
                  null,
                  _react2['default'].createElement(_commonComponentSearchInput2['default'], {
                      placeholder: '请输入商品名称/编号',
                      onSearch: this.handleSearch,
                      style: { width: 200 } })
              );
  
              var operation = this.props.operation;
              var _state = this.state;
              var viewParam = _state.viewParam;
              var viewData = _state.viewData;
              var saleTotal = _state.saleTotal;
  
              // 是否显示loading
              var isProductListLoading = operation.type == productAction.GET_PRODUCTS && operation.pending;
  
              // 是否显示修改商品详情
              var isShowEditProductInfo = this.isShowView('editProductInfo');
  
              // 是否显示修改基本信息
              var isShowEditProductBasic = this.isShowView('editProductBasic');
  
              // 是否显示预览
              var isShowPreviewProduct = this.isShowView('previewProduct');
  
              // 是否显示销售详情
              var isShowProductSalesDetails = this.isShowView('showProductSalesDetails');
  
              // 交易设置-保存loading
              var isLoadingBasicSave = this.state.callBackType == 'basicSave';
  
              // 交易设置-保存并上架loading
              var isLoadingOpeningBasic = this.state.callBackType == 'opening';
  
              // 商品详情-保存loading
              var isLoadingInfoSave = this.state.callBackType == 'infoSave';
  
              // 商品详情预览loading
              var isLoadingPreview = this.state.callBackType == 'preview';
  
              // 获取商品统计loading
              var isLoadingSalesDetails = this.state.callBackType == 'salesDetails';
  
              return _react2['default'].createElement(
                  'div',
                  null,
                  _react2['default'].createElement(_componentProductDataCards2['default'], {
                      locationAdd: this.add,
                      saleTotal: saleTotal }),
                  _react2['default'].createElement(
                      _antd.Tabs,
                      { onChange: this.handleStatusChange,
                          type: 'card',
                          activeKey: this.state.status,
                          tabBarExtraContent: searchBar },
                      _react2['default'].createElement(TabPane, { tab: '所有商品', key: '' }),
                      _react2['default'].createElement(TabPane, { tab: '已上架商品', key: 'opening' }),
                      _react2['default'].createElement(TabPane, { tab: '未上架商品', key: 'news' }),
                      _react2['default'].createElement(TabPane, { tab: '已下架商品', key: 'finished' })
                  ),
                  _react2['default'].createElement(_componentProductList2['default'], {
                      editProductInfo: this.editProductInfo,
                      editProductBasic: this.editProductBasic,
                      showProductSalesDetails: this.showProductSalesDetails,
                      data: this.props.product.list.content,
                      total: this.props.product.list.totalElements,
                      size: this.state.size,
                      list: this.list,
                      del: this.del,
                      opening: this.opening,
                      finished: this.finished,
                      loading: isProductListLoading }),
                  isShowEditProductBasic && _react2['default'].createElement(
                      _antd.Modal,
                      {
                          className: 'modal-top',
                          width: 840,
                          title: _react2['default'].createElement(_componentProductInfoExtra2['default'], {
                              data: this.state.viewData }),
                          visible: isShowEditProductBasic,
                          onCancel: this.reset,
                          footer: null },
                      _react2['default'].createElement(_componentProductBasic2['default'], {
                          onLink: this.onLink,
                          payDisabled: true,
                          readOnly: this.state.viewData.buyChannels ? true : false,
                          saveLoading: isLoadingBasicSave,
                          saveOpeningLoading: isLoadingOpeningBasic,
                          onSave: this.saveBasic,
                          onSaveOpening: this.saveOpeningBasic,
                          onExit: this.reset,
                          mold: 'show',
                          data: this.state.viewData })
                  ),
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
                          saveLoading: isLoadingInfoSave,
                          previewLoading: isLoadingPreview,
                          onOk: this.saveProductInfo,
                          onPreview: this.previewProduct,
                          onExit: this.reset,
                          mold: 'show',
                          data: this.state.viewData })
                  ),
                  isShowPreviewProduct && _react2['default'].createElement(_componentProductPreview2['default'], {
                      visible: isShowPreviewProduct,
                      id: viewParam,
                      onEdit: this.onPreviewEdit,
                      onOk: this.onPreviewOk,
                      onCancel: this.reset,
                      onDone: this.onPreviewDone }),
                  isShowProductSalesDetails && _react2['default'].createElement(_componentProductSalesDetails2['default'], {
                      extra: _react2['default'].createElement(_componentProductInfoExtra2['default'], {
                          data: this.state.viewData }),
                      visible: isShowProductSalesDetails,
                      loading: isLoadingSalesDetails,
                      data: this.state.viewData,
                      onDatePicker: this.onSalesDetailsDatePicker,
                      onOk: this.onSalesDetailsDateRange,
                      onCancel: this.reset })
              );
          }
      }], [{
          key: 'defaultProps',
          value: {
              config: {
                  setting: '/setting'
              }
          },
          enumerable: true
      }]);
  
      var _List = List;
      List = (0, _reactRouter.withRouter)(List) || List;
      List = (0, _reactRedux.connect)(function (state) {
          return {
              product: state.product.toJS(),
              stat: state.stat.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, productAction, statAction), dispatch)
          };
      })(List) || List;
      return List;
  })(_commonBasePageBase2['default']);
  
  exports['default'] = List;
  var saveMsg = function saveMsg() {
      _antd.message.success('保存成功！');
  };
  module.exports = exports['default'];
  
  // 新增跳转
  
  // 删除商品
  
  //上架商品
  
  //下架商品
  
  //修改商品详情
  
  //修改基本信息
  
  // 基本信息-保存并上架
  
  // 基本信息-保存
  
  //查看销售详情
  
  // 销售详情-日期选择
  
  // 销售详情-天数按钮选择
  
  // 预览-预览继续编辑
  
  // 预览-预览完成
  
  // 商品详情-保存
  
  // 商品详情-保存并预览
  
  // 商品详情-数据合并转换
  
  // 基本信息保存，数据合并转换
  
  // 获取不同状态的商品列表
  
  // 搜索商品
  
  // 跳转到第三方（基础设置）

});
