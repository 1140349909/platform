define('admin/component/TkerProductEnableList/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('node_modules/antd/dist/antd');
  
  var _commonUtil = require('common/util/index');
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonComponentSearchInput = require('common/component/SearchInput/index.jsx');
  
  var _commonComponentSearchInput2 = _interopRequireDefault(_commonComponentSearchInput);
  
  // 获取当前账户下的客户所有可添加到指定交易渠道的商品
  
  var TkerProductEnableList = (function (_Component) {
      _inherits(TkerProductEnableList, _Component);
  
      function TkerProductEnableList(props) {
          var _this = this;
  
          _classCallCheck(this, TkerProductEnableList);
  
          _get(Object.getPrototypeOf(TkerProductEnableList.prototype), 'constructor', this).call(this, props);
          this.state = {
              name: '',
              productIds: []
          };
  
          this.handleChange = function (pagination) {
              _this.props.list(pagination.current - 1, _this.state.name);
          };
  
          this.handleSearch = function (name) {
              _this.setState({
                  name: name
              }, function () {
                  _this.props.list(0, name);
              });
          };
  
          this.handleOk = function () {
              var productIds = _this.state.productIds;
              if (productIds.length > 0) {
                  _this.props.save(productIds);
              } else {
                  _antd.message.error('请选择要添加的商品');
              }
          };
      }
  
      _createClass(TkerProductEnableList, [{
          key: 'getColumns',
  
          // 获取
          value: function getColumns() {
              var _this2 = this;
  
              return [{
                  title: '序号',
                  dataIndex: 'id',
                  width: 50,
                  render: function render(text, record, index) {
                      var _props$data = _this2.props.data;
                      var size = _props$data.size;
                      var number = _props$data.number;
  
                      return index + 1 + size * number;
                  }
              }, {
                  title: '缩略图',
                  dataIndex: 'mediaRes',
                  width: 80,
                  render: function render(mediaRes) {
                      if (mediaRes.productImgId) {
                          return _react2['default'].createElement('img', { width: '60', src: (0, _commonUtilMedia.getMediaUrl)(mediaRes.productImgId) });
                      } else {
                          return '-';
                      }
                  }
              }, {
                  title: '商品编号',
                  dataIndex: 'code'
              }, {
                  title: '商品名称',
                  dataIndex: 'name'
              }, {
                  title: '商城上架状态',
                  dataIndex: 'statusText'
              }, {
                  title: '成本单价(元)',
                  dataIndex: 'cost',
                  width: 100,
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)((0, _commonUtil.moneyFormat)(text), 0);
                  }
              }, {
                  title: '销售价',
                  dataIndex: 'mallCfg.price',
                  width: 100,
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)((0, _commonUtil.moneyFormat)(text), 0);
                  }
              }, {
                  title: '利润',
                  dataIndex: 'profits',
                  width: 100,
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)((0, _commonUtil.moneyFormat)(text), 0);
                  }
              }];
          }
      }, {
          key: 'getPagination',
          value: function getPagination() {
              var _props$data2 = this.props.data;
              var total = _props$data2.total;
              var size = _props$data2.size;
  
              return {
                  total: total,
                  pageSize: size,
                  showSizeChanger: false,
                  showTotal: function showTotal(total) {
                      return '共 ' + total + ' 个商品';
                  }
              };
          }
      }, {
          key: 'getRowSelection',
          value: function getRowSelection() {
              var _this3 = this;
  
              return {
                  onChange: function onChange(selectedRowKeys, selectedRows) {
                      _this3.setState({
                          'productIds': selectedRowKeys
                      });
                  }
              };
          }
      }, {
          key: 'render',
          value: function render() {
              var columns = this.getColumns();
  
              var pagination = this.getPagination();
  
              var rowSelection = this.getRowSelection();
  
              var searchBar = _react2['default'].createElement(
                  'div',
                  { style: { height: 20 } },
                  _react2['default'].createElement(_commonComponentSearchInput2['default'], { style: { width: 200, float: 'right', marginRight: 30 }, placeholder: '请输入商品名称/编号',
                      onSearch: this.handleSearch }),
                  _react2['default'].createElement(
                      'div',
                      { className: 'ant-modal-title', style: { float: 'left' } },
                      '商品库商品列表'
                  )
              );
              return _react2['default'].createElement(
                  _antd.Modal,
                  {
                      className: 'modal-top',
                      width: 840,
                      title: searchBar,
                      visible: true,
                      onOk: this.handleOk,
                      onCancel: this.props.reset,
                      confirmLoading: this.props.confirmLoading },
                  _react2['default'].createElement(_antd.Table, { rowKey: 'id',
                      columns: columns,
                      pagination: pagination,
                      rowSelection: rowSelection,
                      dataSource: this.props.data.content,
                      bordered: true,
                      loading: this.props.loading,
                      onChange: this.handleChange })
              );
          }
      }]);
  
      return TkerProductEnableList;
  })(_react.Component);
  
  exports['default'] = TkerProductEnableList;
  module.exports = exports['default'];

});
