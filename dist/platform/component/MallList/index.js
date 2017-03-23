define('platform/component/MallList/index.jsx', function(require, exports, module) {

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
  
  var _MallAuth = require('platform/component/MallAuth/index.jsx');
  
  var _MallAuth2 = _interopRequireDefault(_MallAuth);
  
  var _MallFeatureAuth = require('platform/component/MallFeatureAuth/index.jsx');
  
  var _MallFeatureAuth2 = _interopRequireDefault(_MallFeatureAuth);
  
  var MallList = (function (_Component) {
      _inherits(MallList, _Component);
  
      //static propTypes = {
      //    list: PropTypes.object
      //}
  
      function MallList(props) {
          _classCallCheck(this, MallList);
  
          _get(Object.getPrototypeOf(MallList.prototype), 'constructor', this).call(this, props);
          this.state = {};
      }
  
      _createClass(MallList, [{
          key: 'render',
          value: function render() {
              var _this = this;
  
              var columns = [
              // {
              //     title: 'id',
              //     dataIndex: 'id',
              //     width:180
              // },
              {
                  title: 'id',
                  dataIndex: 'uin'
              }, {
                  title: '商城名称',
                  dataIndex: 'name'
              }, {
                  title: '商城账号',
                  dataIndex: 'userName'
              }, {
                  title: '联系人',
                  dataIndex: 'contact_name',
                  render: function render(text, record) {
                      return record.contact.name;
                  }
              }, {
                  title: '联系电话',
                  dataIndex: 'contact_mobile',
                  render: function render(text, record) {
                      return record.contact.mobile;
                  }
              }, {
                  title: '平台权限',
                  dataIndex: 'mallAuth',
                  render: function render(mallAuth) {
                      return _react2['default'].createElement(_MallAuth2['default'], { mallAuth: mallAuth, split: _react2['default'].createElement('br', null) });
                  }
              }, {
                  title: '功能权限',
                  dataIndex: 'mallFeatureAuth',
                  render: function render(val, record) {
                      return _react2['default'].createElement(_MallFeatureAuth2['default'], { mallAuth: record.mallAuth, split: _react2['default'].createElement('br', null) });
                  }
              }, {
                  title: "操作",
                  dataIndex: 'operation',
                  render: function render(text, record) {
                      return _react2['default'].createElement(
                          'span',
                          null,
                          _react2['default'].createElement(
                              'a',
                              { href: 'javascript:;', onClick: function () {
                                      return _this.props.edit(record.id);
                                  } },
                              '编辑'
                          ),
                          _react2['default'].createElement('span', { className: 'ant-divider' }),
                          _react2['default'].createElement(
                              'a',
                              { href: 'javascript:;', onClick: function () {
                                      return _this.props.show(record.id);
                                  } },
                              '运营详情'
                          )
                      );
                  }
              }];
  
              var pagination = {
                  total: this.props.total,
                  showSizeChanger: true,
                  onShowSizeChange: function onShowSizeChange(page, size) {
                      _this.props.list(0, size);
                  },
                  onChange: function onChange(page) {
                      _this.props.list(page - 1);
                  }
              };
  
              return _react2['default'].createElement(_antd.Table, { rowKey: function (record) {
                      return record.id;
                  },
                  columns: columns,
                  pagination: pagination,
                  dataSource: this.props.data,
                  loading: this.props.loading,
                  bordered: true });
          }
      }]);
  
      return MallList;
  })(_react.Component);
  
  exports['default'] = MallList;
  module.exports = exports['default'];

});
