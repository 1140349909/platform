define('admin/component/YygProductList/index.jsx', function(require, exports, module) {

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
  
  var _BuyChannels = require('admin/component/YygProductList/BuyChannels.jsx');
  
  var _BuyChannels2 = _interopRequireDefault(_BuyChannels);
  
  var _commonUtil = require('common/util/index');
  
  var _lodash = require('node_modules/lodash/lodash');
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var YygProductList = (function (_Component) {
      _inherits(YygProductList, _Component);
  
      _createClass(YygProductList, null, [{
          key: 'propTypes',
          value: {
              data: _react.PropTypes.array,
              list: _react.PropTypes.func.isRequired
          },
          enumerable: true
      }]);
  
      function YygProductList(props) {
          var _this = this;
  
          _classCallCheck(this, YygProductList);
  
          _get(Object.getPrototypeOf(YygProductList.prototype), 'constructor', this).call(this, props);
  
          this.handleChange = function (pagination, filters, sorter) {
              _this.props.list(pagination.current - 1, pagination.pageSize, {
                  sort: sorter.field,
                  order: (0, _commonUtil.getOrderValue)(sorter.order)
              });
          };
      }
  
      // 获取
  
      _createClass(YygProductList, [{
          key: 'getColumns',
          value: function getColumns() {
              var _this2 = this;
  
              return [{
                  title: '商品信息',
                  dataIndex: 'mediaRes',
                  width: 120,
                  render: function render(mediaRes, record) {
                      return _react2['default'].createElement(
                          'div',
                          null,
                          _react2['default'].createElement('img', { width: '100', src: mediaRes.coverImgUrl }),
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
                  dataIndex: 'yygCfg.stock',
                  className: 'text-center',
                  render: function render(text, record) {
                      return record.yygCfg.stock;
                  }
              }, {
                  title: '已售量',
                  dataIndex: 'opdata.tradeData.amount',
                  className: 'text-center',
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text, 0);
                  }
              }, {
                  title: '库存余量',
                  dataIndex: 'intensity',
                  className: 'text-center'
              }, {
                  title: '商品成本(元)',
                  dataIndex: 'cost',
                  className: 'text-center',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)((0, _commonUtil.moneyFormat)(text), 0);
                  }
              }, {
                  title: '参与基数(币)',
                  dataIndex: 'yygCfg.bidStep',
                  className: 'text-center',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(record.yygCfg.bidStep, 0);
                  }
              }, {
                  title: '已交易期数',
                  dataIndex: 'yygCfg.issueNo',
                  className: 'text-center',
                  render: function render(text, record) {
                      return record.yygCfg.issueNo;
                  }
              }, {
                  title: '已交易总额(元)',
                  dataIndex: 'opdata.tradeData.salesAmount',
                  className: 'text-center',
                  sorter: true,
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(record.opdata.tradeData.salesAmount);
                  }
              }, {
                  title: '当期进度',
                  dataIndex: 'percent',
                  className: 'text-center',
                  width: 80,
                  render: function render(text, record) {
                      if (record.status != 'news') {
                          return _react2['default'].createElement(_antd.Progress, { type: 'circle', percent: Math.round(text), width: 72 });
                      } else {
                          return '-';
                      }
                  }
              }, {
                  title: "操作",
                  dataIndex: 'operation',
                  width: 120,
                  render: function render(text, record) {
                      return _react2['default'].createElement(
                          'span',
                          { className: 'operation operation-vertical' },
                          _react2['default'].createElement(
                              'span',
                              { className: 'operation-item' },
                              record.canOpening && _react2['default'].createElement(
                                  _antd.Button,
                                  { onClick: function () {
                                          return _this2.props.opening(record.id);
                                      } },
                                  '上架'
                              ),
                              record.canPreFinished && _react2['default'].createElement(
                                  _antd.Button,
                                  { onClick: function () {
                                          return _this2.props.finished(record.id);
                                      } },
                                  '预下架'
                              ),
                              record.canReOpening && _react2['default'].createElement(
                                  _antd.Button,
                                  { onClick: function () {
                                          return _this2.props.continueOpening(record.id);
                                      } },
                                  '续上架'
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
                          record.status !== 'closed' && _react2['default'].createElement(
                              'span',
                              { className: 'operation-item' },
                              _react2['default'].createElement(
                                  _antd.Button,
                                  {
                                      onClick: function () {
                                          return _this2.props.editProductTrade(record.id);
                                      } },
                                  '修改参与规则'
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
                                  '移除'
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
              return _react2['default'].createElement(_antd.Table, { rowKey: function (record, index) {
                      return index;
                  },
                  columns: columns,
                  pagination: pagination,
                  dataSource: this.props.data,
                  bordered: true,
                  loading: this.props.loading,
                  onChange: this.handleChange });
          }
      }]);
  
      return YygProductList;
  })(_react.Component);
  
  exports['default'] = YygProductList;
  module.exports = exports['default'];

});
