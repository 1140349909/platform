define('admin/component/ProductSaleList/index.jsx', function(require, exports, module) {

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
  
  // 在售商品
  
  var ProductSaleList = (function (_Component) {
      _inherits(ProductSaleList, _Component);
  
      _createClass(ProductSaleList, null, [{
          key: 'propTypes',
          value: {
              data: _react.PropTypes.array,
              list: _react.PropTypes.func.isRequired
          },
          enumerable: true
      }]);
  
      function ProductSaleList(props) {
          var _this = this;
  
          _classCallCheck(this, ProductSaleList);
  
          _get(Object.getPrototypeOf(ProductSaleList.prototype), 'constructor', this).call(this, props);
  
          this.handleChange = function (pagination, filters, sorter) {
              _this.props.list(pagination.current - 1, pagination.pageSize, {
                  sort: sorter.field,
                  order: (0, _commonUtil.getOrderValue)(sorter.order)
              });
          };
      }
  
      // 获取
  
      _createClass(ProductSaleList, [{
          key: 'getColumns',
          value: function getColumns() {
              return [{
                  title: '缩略图',
                  dataIndex: 'mediaRes',
                  render: function render(mediaRes, record) {
                      return _react2['default'].createElement('img', { width: '50', src: (0, _commonUtilMedia.getMediaUrl)(record.mediaRes.productImgId) });
                  }
              }, {
                  title: '商品编号',
                  dataIndex: 'code'
              }, {
                  title: '商品名称',
                  dataIndex: 'title'
              }, {
                  title: '已售量',
                  dataIndex: 'opdata.tradeData.amount',
                  className: 'text-center',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(record.opdata.tradeData.amount, 0);
                  },
                  sorter: true
              }, {
                  title: '库存余量',
                  dataIndex: 'intensity',
                  className: 'text-center',
                  render: function render(text, record) {
                      var intensity = (0, _commonUtil.getSafeValue)(record.mallCfg.stock, 0) - (0, _commonUtil.getSafeValue)(record.opdata.tradeData.amount, 0);
                      if (intensity < 0) {
                          intensity = 0;
                      }
                      return intensity;
                  }
              }, {
                  title: '成本单价(元)',
                  dataIndex: 'cost',
                  className: 'text-center',
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text, 0);
                  }
              }, {
                  title: '销售单价(元)',
                  dataIndex: 'mallCfg.price',
                  className: 'text-center',
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(record.mallCfg.price, 0);
                  }
              }, {
                  title: '积分',
                  dataIndex: 'mallCfg.integral',
                  className: 'text-center',
                  render: function render(text, record) {
                      var mallCfg = record.mallCfg;
  
                      if (mallCfg.enableCash && mallCfg.enableIntegralOffset) {
                          return '积分抵现';
                      } else if (mallCfg.enableIntegral || mallCfg.enableIntegralCash) {
                          // 积分支付 || 组合支付
                          return text;
                      } else {
                          return '-';
                      }
                  }
              }, {
                  title: '优惠券',
                  dataIndex: 'mallCfg.coupon',
                  className: 'text-center',
                  render: function render(text, record) {
                      if (record.mallCfg.enableCoupon) {
                          return '优惠券';
                      } else {
                          return '-';
                      }
                  }
              }, {
                  title: '交易总额(元)',
                  dataIndex: 'opdata.tradeData.salesAmount',
                  className: 'text-center',
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(record.opdata.tradeData.salesAmount, 0);
                  }
              }, {
                  title: '上架时间',
                  dataIndex: 'lastModifiedDate',
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.dateFormat)(text);
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
                  columns: columns,
                  pagination: pagination,
                  dataSource: this.props.data,
                  bordered: true,
                  loading: this.props.loading,
                  onChange: this.handleChange });
          }
      }]);
  
      return ProductSaleList;
  })(_react.Component);
  
  exports['default'] = ProductSaleList;
  module.exports = exports['default'];

});
