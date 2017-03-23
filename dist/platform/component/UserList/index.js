define('platform/component/UserList/index.jsx', function(require, exports, module) {

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
  
  var UserList = (function (_Component) {
      _inherits(UserList, _Component);
  
      //static propTypes = {
      //    list: PropTypes.object
      //}
  
      function UserList(props) {
          _classCallCheck(this, UserList);
  
          _get(Object.getPrototypeOf(UserList.prototype), 'constructor', this).call(this, props);
          this.state = {};
      }
  
      _createClass(UserList, [{
          key: 'render',
          value: function render() {
              var _this = this;
  
              var columns = [{
                  title: '会员号',
                  dataIndex: 'id',
                  width: 180
              }, {
                  title: '姓名',
                  dataIndex: 'nickName'
              }, {
                  title: '手机号',
                  dataIndex: 'mobile'
              }, {
                  title: '状态',
                  dataIndex: 'status'
              }, {
                  title: '注册日期',
                  dataIndex: 'createdDate',
                  render: function render(text) {
                      return (0, _commonUtil.dateFormat)(new Date(text), 'yyyy-MM-dd');
                  }
              }, {
                  title: '最后修改时间',
                  dataIndex: 'lastModifiedDate',
                  render: function render(text) {
                      return (0, _commonUtil.dateFormat)(new Date(text), 'yyyy-MM-dd hh:mm');
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
  
      return UserList;
  })(_react.Component);
  
  exports['default'] = UserList;
  module.exports = exports['default'];

});
