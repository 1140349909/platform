define('admin/component/ProductList/index.jsx', function(require, exports, module) {

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
  
  var _BuyChannels = require('admin/component/ProductList/BuyChannels.jsx');
  
  var _BuyChannels2 = _interopRequireDefault(_BuyChannels);
  
  var _commonUtil = require('common/util/index');
  
  var _lodash = require('node_modules/lodash/lodash');
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  '';
  
  var ProductList = (function (_Component) {
      _inherits(ProductList, _Component);
  
      _createClass(ProductList, null, [{
          key: 'propTypes',
          value: {
              data: _react.PropTypes.array,
              list: _react.PropTypes.func.isRequired
          },
          enumerable: true
      }]);
  
      function ProductList(props) {
          var _this = this;
  
          _classCallCheck(this, ProductList);
  
          _get(Object.getPrototypeOf(ProductList.prototype), 'constructor', this).call(this, props);
  
          this.handleChange = function (pagination, filters, sorter) {
              _this.props.list(pagination.current - 1, pagination.pageSize, {
                  sort: sorter.field,
                  order: (0, _commonUtil.getOrderValue)(sorter.order)
              });
          };
      }
  
      // 获取
  
      _createClass(ProductList, [{
          key: 'getColumns',
          value: function getColumns() {
              var _this2 = this;
  
              return [{
                  title: '商品信息',
                  dataIndex: 'mediaRes',
                  width: 160,
                  fixed: 'left',
                  render: function render(mediaRes, record) {
                      return _react2['default'].createElement(
                          'div',
                          null,
                          _react2['default'].createElement('img', { width: '100', src: mediaRes.productImgUrl }),
                          _react2['default'].createElement('br', null),
                          '编号:',
                          record.code,
                          _react2['default'].createElement('br', null),
                          '名称:',
                          record.title
                      );
                  }
              }, {
                  title: '库存总量',
                  dataIndex: 'mallCfg.stock',
                  width: 100,
                  className: 'text-center',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(record.mallCfg.stock, 0);
                  },
                  sorter: true
              }, {
                  title: '已售量',
                  dataIndex: 'opdata.tradeData.amount',
                  width: 100,
                  className: 'text-center',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text, 0);
                  },
                  sorter: true
              }, {
                  title: '库存余量',
                  dataIndex: 'intensity',
                  width: 100,
                  className: 'text-center'
              }, {
                  title: '成本单价(元)',
                  dataIndex: 'cost',
                  width: 110,
                  className: 'text-center',
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(text);
                  }
              }, {
                  title: '销售单价(元)',
                  dataIndex: 'mallCfg.price',
                  width: 110,
                  className: 'text-center',
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(record.mallCfg.price);
                  }
              }, {
                  title: '交易总额(元)',
                  dataIndex: 'opdata.tradeData.salesAmount',
                  width: 110,
                  className: 'text-center',
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(record.opdata.tradeData.salesAmount);
                  }
              }, {
                  title: '盈利总额(元)',
                  dataIndex: 'opdata.tradeData.profitAmount',
                  width: 110,
                  className: 'text-center',
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(record.opdata.tradeData.profitAmount);
                  }
              }, {
                  title: '积分抵现总额(元)',
                  dataIndex: 'opdata.tradeData.offsetAmount',
                  width: 140,
                  className: 'text-center',
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(record.opdata.tradeData.offsetAmount);
                  }
              }, {
                  title: '优惠券抵现总额(元)',
                  dataIndex: 'opdata.tradeData.couponAmount',
                  width: 140,
                  className: 'text-center',
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(record.opdata.tradeData.couponAmount);
                  }
              }, {
                  title: '更新时间',
                  dataIndex: 'lastModifiedDate',
                  className: 'text-center',
                  width: 145,
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.dateFormat)(text);
                  }
              }, {
                  title: '入库时间',
                  dataIndex: 'createdDate',
                  className: 'text-center',
                  width: 145,
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.dateFormat)(text);
                  }
              }, {
                  title: '营销渠道',
                  dataIndex: 'buyChannels',
                  width: 80,
                  className: 'text-center',
                  render: function render(buyChannels) {
                      return _react2['default'].createElement(_BuyChannels2['default'], { data: buyChannels });
                  }
              }, {
                  title: '商城',
                  dataIndex: 'statusText',
                  width: 60,
                  className: 'text-center',
                  render: function render(text) {
                      var className = text == '已上架' ? 'text-enabled' : 'text-disabled';
                      return _react2['default'].createElement(
                          'span',
                          { className: className },
                          text
                      );
                  }
              }, {
                  title: "操作",
                  dataIndex: 'operation',
                  width: 120,
                  fixed: 'right',
                  render: function render(text, record) {
                      return _react2['default'].createElement(
                          'span',
                          { className: 'operation operation-vertical' },
                          _react2['default'].createElement(
                              'span',
                              { className: 'operation-item' },
                              record.mallCfg.enable && _react2['default'].createElement(
                                  _antd.Button,
                                  {
                                      onClick: function () {
                                          return _this2.props.finished(record.id);
                                      } },
                                  '从商城中下架'
                              ),
                              !record.mallCfg.enable && _react2['default'].createElement(
                                  _antd.Button,
                                  { onClick: function () {
                                          return _this2.props.opening(record.id);
                                      } },
                                  '上架到商城中'
                              )
                          ),
                          _react2['default'].createElement(
                              'span',
                              { className: 'operation-item' },
                              _react2['default'].createElement(
                                  _antd.Button,
                                  {
                                      onClick: function () {
                                          return _this2.props.editProductInfo(record.id);
                                      } },
                                  '修改商品详情'
                              )
                          ),
                          _react2['default'].createElement(
                              'span',
                              { className: 'operation-item' },
                              _react2['default'].createElement(
                                  _antd.Button,
                                  {
                                      onClick: function () {
                                          return _this2.props.editProductBasic(record.id);
                                      } },
                                  '修改交易设置'
                              )
                          ),
                          !record.canDel && _react2['default'].createElement(
                              'span',
                              { className: 'operation-item' },
                              _react2['default'].createElement(
                                  _antd.Button,
                                  {
                                      onClick: function () {
                                          return _this2.props.showProductSalesDetails(record.id);
                                      } },
                                  '查看销售详情'
                              )
                          ),
                          record.canDel && _react2['default'].createElement(
                              'span',
                              { className: 'operation-item' },
                              _react2['default'].createElement(
                                  _antd.Button,
                                  {
                                      onClick: function () {
                                          return _this2.props.del(record.id);
                                      } },
                                  '删除'
                              )
                          )
                      );
                  }
              }];
          }
      }, {
          key: 'getPagination',
          value: function getPagination() {
              return {
                  total: this.props.total,
                  pageSize: this.props.size,
                  showSizeChanger: true,
                  showTotal: function showTotal(total) {
                      return '共 ' + total + ' 个商品';
                  }
              };
          }
      }, {
          key: 'render',
          value: function render() {
  
              var columns = this.getColumns();
              var pagination = this.getPagination();
  
              return _react2['default'].createElement(_antd.Table, { rowKey: 'id',
                  className: 'product-list',
                  columns: columns,
                  pagination: pagination,
                  dataSource: this.props.data,
                  bordered: true,
                  loading: this.props.loading,
                  scroll: { x: 1700 },
                  onChange: this.handleChange });
          }
      }]);
  
      return ProductList;
  })(_react.Component);
  
  exports['default'] = ProductList;
  module.exports = exports['default'];

});
