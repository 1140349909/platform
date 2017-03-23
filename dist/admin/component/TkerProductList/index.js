define('admin/component/TkerProductList/index.jsx', function(require, exports, module) {

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
  
  '';
  
  var TkerProductList = (function (_Component) {
      _inherits(TkerProductList, _Component);
  
      function TkerProductList(props) {
          var _this = this;
  
          _classCallCheck(this, TkerProductList);
  
          _get(Object.getPrototypeOf(TkerProductList.prototype), 'constructor', this).call(this, props);
  
          this.handleChange = function (pagination, filters, sorter) {
              _this.props.list(pagination.current - 1, pagination.pageSize, {
                  sort: sorter.field,
                  order: (0, _commonUtil.getOrderValue)(sorter.order)
              });
          };
      }
  
      // 获取
  
      _createClass(TkerProductList, [{
          key: 'getColumns',
          value: function getColumns() {
              var _this2 = this;
  
              return [{
                  title: '序号',
                  dataIndex: 'index',
                  width: 50,
                  className: 'text-center',
                  render: function render(mediaRes, record, index) {
                      return _react2['default'].createElement(
                          'span',
                          null,
                          index + 1
                      );
                  }
              }, {
                  title: '商品信息',
                  dataIndex: 'product.info',
                  render: function render(text, record) {
                      return _react2['default'].createElement(
                          'div',
                          { className: 'tker-product-list-info' },
                          _react2['default'].createElement('img', { className: 'tker-product-list-info-img', src: record.mediaRes.productImgUrl }),
                          _react2['default'].createElement(
                              'div',
                              { className: 'tker-product-list-info-text' },
                              _react2['default'].createElement(
                                  'p',
                                  null,
                                  record.name
                              ),
                              _react2['default'].createElement(
                                  'p',
                                  null,
                                  '商品编号：',
                                  record.code
                              ),
                              _react2['default'].createElement(
                                  'p',
                                  null,
                                  '成本单价：',
                                  (0, _commonUtil.getSafeValue)((0, _commonUtil.moneyFormat)(record.cost))
                              )
                          )
                      );
                  }
              }, {
                  title: '售价',
                  dataIndex: 'mallCfg.price',
                  className: 'text-center',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)((0, _commonUtil.moneyFormat)(text), 0);
                  }
              }, {
                  title: '毛利',
                  dataIndex: 'profits',
                  className: 'text-center',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)((0, _commonUtil.moneyFormat)(text), 0);
                  }
              }, {
                  title: '已分销数',
                  dataIndex: 'opdata.tradeData.amount',
                  className: 'text-center',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text, 0);
                  }
              }, {
                  title: '分销支出',
                  dataIndex: 'opdata.tradeData.profitAmount',
                  className: 'text-center',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)((0, _commonUtil.moneyFormat)(text), 0);
                  }
              }, {
                  title: '销售状态',
                  dataIndex: 'statusText',
                  className: 'text-center',
                  width: 80,
                  render: function render(text, record) {
                      return _react2['default'].createElement(
                          'span',
                          { className: text == '已上架' ? 'color-err' : '' },
                          text
                      );
                  }
              }, {
                  title: "操作",
                  dataIndex: 'btns',
                  width: 100,
                  render: function render(text, record) {
                      return _react2['default'].createElement(
                          _antd.Button,
                          {
                              type: 'primary',
                              onClick: function () {
                                  return _this2.props.showTkerDetails(record.id);
                              } },
                          '分销状态'
                      );
                  }
              }];
          }
      }, {
          key: 'getPagination',
          value: function getPagination() {
              var _props$data = this.props.data;
              var total = _props$data.total;
              var size = _props$data.size;
  
              return {
                  total: total,
                  pageSize: size,
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
                  dataSource: this.props.data.content,
                  bordered: true,
                  loading: this.props.loading,
                  onChange: this.handleChange });
          }
      }]);
  
      return TkerProductList;
  })(_react.Component);
  
  exports['default'] = TkerProductList;
  module.exports = exports['default'];

});
