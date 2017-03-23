define('admin/component/TkerTopList/MemberList.jsx', function(require, exports, module) {

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
  
  var ProductList = (function (_Component) {
      _inherits(ProductList, _Component);
  
      function ProductList(props) {
          _classCallCheck(this, ProductList);
  
          _get(Object.getPrototypeOf(ProductList.prototype), 'constructor', this).call(this, props);
      }
  
      // 获取
  
      _createClass(ProductList, [{
          key: 'getColumns',
          value: function getColumns() {
  
              return [{
                  title: '名次',
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
                  title: '会员名称',
                  dataIndex: 'name',
                  render: function render(text, record) {
                      if (text) {
                          return text;
                      } else {
                          return record.mobile;
                      }
                  }
              }, {
                  title: '集客人数',
                  dataIndex: 'opdata.tkerData.members',
                  className: 'text-center',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text, 0);
                  }
              }, {
                  title: '分销商品数',
                  dataIndex: 'opdata.tkerData.products',
                  className: 'text-center',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text, 0);
                  }
              }, {
                  title: '分销红利额/元',
                  dataIndex: 'opdata.tkerData.profit.total',
                  className: 'text-center',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)((0, _commonUtil.moneyFormat)(text), 0);
                  }
              }];
          }
      }, {
          key: 'render',
          value: function render() {
              var columns = this.getColumns();
              return _react2['default'].createElement(_antd.Table, {
                  className: 'tker-top',
                  rowKey: 'id',
                  columns: columns,
                  dataSource: this.props.data,
                  bordered: true,
                  title: function () {
                      return '分销会员TOP10';
                  },
                  pagination: false,
                  loading: this.props.loading });
          }
      }]);
  
      return ProductList;
  })(_react.Component);
  
  exports['default'] = ProductList;
  module.exports = exports['default'];

});
