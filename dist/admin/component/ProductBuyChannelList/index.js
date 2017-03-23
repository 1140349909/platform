define('admin/component/ProductBuyChannelList/index.jsx', function(require, exports, module) {

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
  
  var _commonComponentSearchInput = require('common/component/SearchInput/index.jsx');
  
  var _commonComponentSearchInput2 = _interopRequireDefault(_commonComponentSearchInput);
  
  // 获取当前账户下的客户所有可添加到指定交易渠道的商品
  
  var ProductBuyChannelList = (function (_Component) {
      _inherits(ProductBuyChannelList, _Component);
  
      _createClass(ProductBuyChannelList, null, [{
          key: 'propTypes',
          value: {
              // 类型
              buyChannel: _react.PropTypes.string.isRequired
          },
          enumerable: true
      }]);
  
      function ProductBuyChannelList(props) {
          var _this = this;
  
          _classCallCheck(this, ProductBuyChannelList);
  
          _get(Object.getPrototypeOf(ProductBuyChannelList.prototype), 'constructor', this).call(this, props);
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
                  _this.props.save(_this.props.buyChannel, productIds);
              } else {
                  _antd.message.error('请选择要添加的商品');
              }
          };
      }
  
      _createClass(ProductBuyChannelList, [{
          key: 'getColumns',
  
          // 获取
          value: function getColumns() {
              var _this2 = this;
  
              return [{
                  title: '序号',
                  dataIndex: 'id',
                  width: 50,
                  render: function render(text, record, index) {
                      return index + 1 + _this2.props.size * _this2.props.page;
                  }
              }, {
                  title: '缩略图',
                  dataIndex: 'mediaRes',
                  width: 80,
                  render: function render(mediaRes) {
                      if (mediaRes.productImgUrl) {
                          return _react2['default'].createElement('img', { width: '60', src: mediaRes.productImgUrl });
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
                  title: '成本单价(元)',
                  dataIndex: 'cost',
                  width: 100,
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(text);
                  }
              }];
          }
      }, {
          key: 'getPagination',
          value: function getPagination() {
              return {
                  total: this.props.total,
                  pageSize: this.props.size,
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
              //SearchInput
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
                      dataSource: this.props.data,
                      bordered: true,
                      loading: this.props.loading,
                      onChange: this.handleChange })
              );
          }
      }]);
  
      return ProductBuyChannelList;
  })(_react.Component);
  
  exports['default'] = ProductBuyChannelList;
  module.exports = exports['default'];

});
