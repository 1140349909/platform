define('admin/component/TkerFenRunDetails/EarningsDetail.jsx', function(require, exports, module) {

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
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var _echartsForReact = require('node_modules/echarts-for-react/lib/echarts-for-react');
  
  var _echartsForReact2 = _interopRequireDefault(_echartsForReact);
  
  var _commonUtil = require('common/util/index');
  
  '';
  
  var FormItem = _antd.Form.Item;
  
  var EarningsDetail = (function (_Component) {
      _inherits(EarningsDetail, _Component);
  
      function EarningsDetail(props) {
          _classCallCheck(this, EarningsDetail);
  
          _get(Object.getPrototypeOf(EarningsDetail.prototype), 'constructor', this).call(this, props);
  
          this.getOtion = function (data) {
              var legendName = ['佣工率', '一级分润率', '二级分润率', '三级分润率'],
                  seriesData = [{ value: data.lv0 / 100, name: '佣工率' }, { value: data.lv1 / 100, name: '一级分润率' }, { value: data.lv2 / 100, name: '二级分润率' }, { value: data.lv3 / 100, name: '三级分润率' }];
  
              for (var i in data) {
                  switch (i) {
                      case 'lv0':
                          if (data[i] == 0) {
                              legendName.splice(1, 3);
                              seriesData.splice(1, 3);
                          }
                          break;
                      case 'lv1':
                          if (data[i] == 0) {
                              legendName.splice(2, 2);
                              seriesData.splice(2, 2);
                          }
                          break;
                      case 'lv2':
                          if (data[i] == 0) {
                              legendName.splice(3, 1);
                              seriesData.splice(3, 1);
                          }
                          break;
                  }
              }
  
              return {
                  tooltip: {
                      trigger: 'item',
                      top: 0,
                      formatter: "{a} <br/>{b} : (￥{c}) ({d}%)"
                  },
                  legend: {
                      top: 0,
                      data: legendName
                  },
                  series: [{
                      name: '访问来源',
                      type: 'pie',
                      radius: '65%',
                      center: ['50%', '63%'],
                      data: seriesData,
                      itemStyle: {
                          emphasis: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          },
                          normal: {
                              label: {
                                  show: true,
                                  formatter: '{b} : (￥{c}) ({d}%)'
                              },
                              labelLine: { show: true }
                          }
                      }
                  }]
              };
          };
      }
  
      _createClass(EarningsDetail, [{
          key: 'render',
          value: function render() {
              var data = this.props.data || null;
              var profit = null;
  
              if (data !== null) {
                  profit = typeof this.props.data.profit == 'undefined' ? null : this.props.data.profit;
              }
  
              return _react2['default'].createElement(
                  _antd.Card,
                  {
                      title: '分销收益详情',
                      className: 'tker-fenrun-details' },
                  (data == null || profit == null) && _react2['default'].createElement(
                      'span',
                      { className: 'tker-fenrun-text' },
                      _react2['default'].createElement(_antd.Icon, { type: 'pie-chart' }),
                      _react2['default'].createElement('br', null),
                      '暂无数据'
                  ),
                  profit !== null && _react2['default'].createElement(
                      'div',
                      null,
                      _react2['default'].createElement(
                          'div',
                          { className: 'tker-fenrun-details-tip' },
                          _react2['default'].createElement(
                              'span',
                              null,
                              '总分销数量：',
                              data.totalAmount
                          ),
                          _react2['default'].createElement(
                              'span',
                              null,
                              '佣工数量：',
                              data.tkers
                          ),
                          _react2['default'].createElement(
                              'span',
                              null,
                              '总分销支付(元)：',
                              (0, _commonUtil.moneyFormat)(profit.total)
                          )
                      ),
                      _react2['default'].createElement(_echartsForReact2['default'], {
                          option: this.getOtion(profit) })
                  )
              );
          }
      }]);
  
      return EarningsDetail;
  })(_react.Component);
  
  exports['default'] = EarningsDetail;
  module.exports = exports['default'];

});
