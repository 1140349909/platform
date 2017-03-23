define('admin/view/tker/config.jsx', function(require, exports, module) {

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
  
  var _commonBasePageBase = require('common/base/PageBase.jsx');
  
  var _commonBasePageBase2 = _interopRequireDefault(_commonBasePageBase);
  
  var _antd = require('node_modules/antd/dist/antd');
  
  var _redux = require('node_modules/redux/lib/index');
  
  var _reactRedux = require('node_modules/react-redux/lib/index');
  
  var _storeTkerAction = require("admin/store/tker/action");
  
  var tkerAction = _interopRequireWildcard(_storeTkerAction);
  
  var _componentTkerFenRunDetails = require('admin/component/TkerFenRunDetails/index.jsx');
  
  var _componentTkerFenRunDetails2 = _interopRequireDefault(_componentTkerFenRunDetails);
  
  var _componentTkerFenRunSetting = require('admin/component/TkerFenRunSetting/index.jsx');
  
  var _componentTkerFenRunSetting2 = _interopRequireDefault(_componentTkerFenRunSetting);
  
  var _componentTkerTopListProductList = require('admin/component/TkerTopList/ProductList.jsx');
  
  var _componentTkerTopListProductList2 = _interopRequireDefault(_componentTkerTopListProductList);
  
  var _componentTkerTopListMemberList = require('admin/component/TkerTopList/MemberList.jsx');
  
  var _componentTkerTopListMemberList2 = _interopRequireDefault(_componentTkerTopListMemberList);
  
  var Step = _antd.Steps.Step;
  
  // 分销设置
  
  var TKerConfig = (function (_PageBase) {
      _inherits(TKerConfig, _PageBase);
  
      function TKerConfig(props) {
          var _this = this;
  
          _classCallCheck(this, _TKerConfig);
  
          _get(Object.getPrototypeOf(_TKerConfig.prototype), 'constructor', this).call(this, props);
          this.state = {
              viewType: 'init',
              viewParam: null,
              viewData: null,
  
              // 分销设置数据
              settingData: null,
  
              // 客户分销平台汇总数据
              tkerData: null,
  
              // 会员TOP列表
              memberTopList: [],
  
              // 商品TOP列表
              productTopList: []
          };
  
          this.updateFormData = function (formData) {
              _this.setState({
                  viewData: formData
              });
          };
  
          this.reset = function () {
              _this.setState({
                  viewType: 'init',
                  viewParam: null,
                  viewData: null
              });
          };
  
          this.editSetting = function () {
              _this.showView('TkerFenRunSetting', null, _this.state.settingData);
          };
  
          this.saveSetting = function (formData) {
              _this.props.actions.updateManagerTkerConfig(formData);
  
              _this.updateFormData(formData);
          };
      }
  
      _createClass(TKerConfig, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
              this.props.actions.getManagerTkerConfig();
              this.props.actions.getManagerTkerDataTotal();
              this.props.actions.getManagerTkerMemberTop();
              this.props.actions.getManagerTkerProductTop();
          }
      }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
  
                  // 获取分销设置信息
                  case tkerAction.GET_MANAGER_TKER_CONFIG:
                      this.setState({
                          settingData: nextProps.tker.settingData
                      });
                      break;
  
                  // 配置分销设置
                  case tkerAction.UPDATE_MANAGER_TKER_CONFIG:
                      this.props.actions.getManagerTkerConfig();
                      _antd.message.success('保存成功');
                      this.reset();
                      break;
  
                  // 获取客户分销平台汇总数据
                  case tkerAction.GET_MANAGER_TKER_DATA_TOTAL:
                      this.setState({
                          tkerData: nextProps.tker.tkerData
                      });
                      break;
  
                  // 会员TOP列表
                  case tkerAction.GET_MANAGER_TKER_MEMBER_TOP:
                      this.setState({
                          memberTopList: nextProps.tker.memberTopList
                      });
                      break;
  
                  // 商品TOP列表
                  case tkerAction.GET_MANAGER_TKER_PRODUCT_TOP:
                      this.setState({
                          productTopList: nextProps.tker.productTopList
                      });
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
  
          // 修改表单数据后调用此方法，更新viewData的数据，防止保存数据时，返回保存数据瞬间之前
      }, {
          key: 'isShowView',
  
          // 是否显示viewType
          value: function isShowView(viewType) {
              return this.state.viewType == viewType;
          }
  
          // 重置页面
      }, {
          key: 'render',
          value: function render() {
              var operation = this.props.operation;
  
              // 显示分销设置窗口
              var isShowTkerFenRunSetting = this.isShowView('TkerFenRunSetting');
  
              var tkerFenRunSettingLoading = operation.type == tkerAction.UPDATE_MANAGER_TKER_CONFIG && operation.pending,
                  isLoadingtkerTopProductList = operation.type == tkerAction.GET_MANAGER_TKER_PRODUCT_TOP && operation.pending,
                  isLoadingtkerTopMemberList = operation.type == tkerAction.GET_MANAGER_TKER_MEMBER_TOP && operation.pending;
  
              return _react2['default'].createElement(
                  'div',
                  { className: 'tker-config' },
                  _react2['default'].createElement(
                      _antd.Card,
                      {
                          title: '分销流程',
                          className: 'tker-config-steps' },
                      _react2['default'].createElement(
                          _antd.Steps,
                          null,
                          _react2['default'].createElement(Step, { title: '开通分销', status: 'process', description: '在功能模块中开通分销功能' }),
                          _react2['default'].createElement(Step, { title: '分销设置', status: 'process', description: '在分销设置中进行商品分销积分信息的设置' }),
                          _react2['default'].createElement(Step, { title: '分销商品', status: 'process', description: '在商品库中选中需要分销的商品，开通分销，并对具体商品进行分销的设置修改' }),
                          _react2['default'].createElement(Step, { title: '会员开通分销', status: 'process', description: '商品开设分销后，会员会在客户端进行集客和商品的分销' }),
                          _react2['default'].createElement(Step, { title: '会员分销/提现', status: 'process', description: '在会员分销中查看参与分销的会员，并处理分销提现' })
                      )
                  ),
                  _react2['default'].createElement(_componentTkerFenRunDetails2['default'], {
                      settingData: this.state.settingData,
                      tkerData: this.state.tkerData,
                      onSetting: this.editSetting
                  }),
                  _react2['default'].createElement(
                      'div',
                      { className: 'tker-config-lists' },
                      _react2['default'].createElement(
                          'div',
                          { className: 'tker-config-l' },
                          _react2['default'].createElement(_componentTkerTopListProductList2['default'], {
                              loading: isLoadingtkerTopProductList,
                              data: this.state.productTopList })
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'tker-config-r' },
                          _react2['default'].createElement(_componentTkerTopListMemberList2['default'], {
                              loading: isLoadingtkerTopMemberList,
                              data: this.state.memberTopList })
                      )
                  ),
                  isShowTkerFenRunSetting && _react2['default'].createElement(_componentTkerFenRunSetting2['default'], {
                      data: this.state.viewData,
                      loading: tkerFenRunSettingLoading,
                      onCancel: this.reset,
                      onReturn: this.onReturn,
                      onSave: this.saveSetting })
              );
          }
      }]);
  
      var _TKerConfig = TKerConfig;
      TKerConfig = (0, _reactRedux.connect)(function (state) {
          return {
              tker: state.tker.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, tkerAction), dispatch)
          };
      })(TKerConfig) || TKerConfig;
      return TKerConfig;
  })(_commonBasePageBase2['default']);
  
  exports['default'] = TKerConfig;
  module.exports = exports['default'];
  
  // 编辑分销设置窗口
  
  // 保存分销设置

});
