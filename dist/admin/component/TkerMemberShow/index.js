define('admin/component/TkerMemberShow/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _commonUtilIndex = require("common/util/index");
  
  '';
  
  var _commonComponentSearchInput = require("common/component/SearchInput/index.jsx");
  
  var _commonComponentSearchInput2 = _interopRequireDefault(_commonComponentSearchInput);
  
  var Option = _antd.Select.Option;
  
  var TkerMemberShow = (function (_Component) {
      _inherits(TkerMemberShow, _Component);
  
      function TkerMemberShow(props) {
          var _this = this;
  
          _classCallCheck(this, TkerMemberShow);
  
          _get(Object.getPrototypeOf(TkerMemberShow.prototype), "constructor", this).call(this, props);
          this.state = {
              level: '',
              mobile: ''
          };
  
          this.handleSearch = function (mobile) {
              _this.setState({
                  mobile: mobile
              }, function () {
                  _this.props.getManagerTkerSubMember(_this.props.id, _this.state.mobile);
              });
          };
  
          this.onChange = function (value) {
              _this.setState({
                  level: value
              }, function () {
                  return _this.props.getManagerTkerProfit(_this.props.id, _this.state.level);
              });
          };
      }
  
      _createClass(TkerMemberShow, [{
          key: "render",
          value: function render() {
              var _this2 = this;
  
              var _props = this.props;
              var type = _props.type;
              var data = _props.data;
              var loading = _props.loading;
              var id = _props.id;
  
              if (!data) {
                  return null;
              }
  
              var dataSource = data.content;
  
              var _state = this.state;
              var paginationValue = _state.paginationValue;
              var filtersValue = _state.filtersValue;
              var sorterValue = _state.sorterValue;
  
              var visible = false,
                  title = '',
                  columns = [],
                  leftText = undefined,
                  leftValue = '',
                  rightText = undefined,
                  rightValue = '',
                  pagination = {},
                  filters = [],
                  value = 0;
  
              switch (type) {
                  case 'tker':
                      title = '会员集客';
                      visible = true;
  
                      value = data.totalElements;
  
                      leftText = '集客详情';
                      leftValue = value;
  
                      columns = [{
                          title: '集客名称',
                          dataIndex: 'name',
                          render: function render(text, record) {
                              return _react2["default"].createElement(
                                  "div",
                                  null,
                                  record.name ? record.name : record.mobile
                              );
                          }
                      }, {
                          title: '联系电话',
                          dataIndex: 'mobile',
                          render: function render(text, record) {
                              return _react2["default"].createElement(
                                  "div",
                                  null,
                                  record.mobile ? record.mobile : '-'
                              );
                          }
                      }, {
                          title: '下线人数',
                          dataIndex: 'opdata.tkerData.members',
                          render: function render(text, record) {
                              return _react2["default"].createElement(
                                  "div",
                                  null,
                                  record.opdata ? record.opdata.tkerData.members : '-'
                              );
                          }
                      }];
  
                      pagination = {
                          pageSize: data.size,
                          total: data.totalElements,
                          onShowSizeChange: function onShowSizeChange(page, size) {
                              _this2.props.getManagerTkerSubMember(id, 0, size);
                          },
                          onChange: function onChange(page) {
                              _this2.props.getManagerTkerSubMember(id, page - 1);
                          }
                      };
                      break;
                  case 'dividend':
                      title = '收益明细';
                      visible = true;
  
                      leftText = '收益总额';
  
                      dataSource.map(function (item) {
  
                          value += item.tkerData.money;
                      });
  
                      leftValue = '￥' + (value / 100).toFixed(2);
  
                      rightText = '统计金额';
                      rightValue = '￥' + (value / 100).toFixed(2);
  
                      filters = [{
                          text: '佣金',
                          value: 0
                      }, {
                          text: '一级分润',
                          value: 1
                      }, {
                          text: '二级分润',
                          value: 2
                      }, {
                          text: '三级分润',
                          value: 3
                      }];
  
                      columns = [{
                          title: '时间',
                          dataIndex: 'lastModifiedDate',
                          render: function render(text, record, index) {
                              return _react2["default"].createElement(
                                  "div",
                                  null,
                                  (0, _commonUtilIndex.dateFormat)(new Date(record.lastModifiedDate), "yyyy-MM-dd hh:mm:ss.S")
                              );
                          }
                      }, {
                          title: '类型',
                          dataIndex: 'tkerData.lv',
                          render: function render(text, record, index) {
  
                              var filters = ['佣金', '一级分润', '二级分润', '三级分润'];
  
                              return _react2["default"].createElement(
                                  "div",
                                  null,
                                  record.tkerData.lv != undefined ? filters[record.tkerData.lv] : '-'
                              );
                          }
                      }, {
                          title: '集客名称',
                          dataIndex: 'userInfo',
                          render: function render(text, record) {
                              return _react2["default"].createElement(
                                  "div",
                                  null,
                                  record.userInfo.nickName ? record.userInfo.nickName : record.userInfo.mobile
                              );
                          }
                      }, {
                          title: '商品来源',
                          dataIndex: 'resName'
                      }, {
                          title: '金额/元',
                          dataIndex: 'tkerData.money',
                          render: function render(text, record) {
                              return _react2["default"].createElement(
                                  "div",
                                  null,
                                  (record.tkerData.money / 100).toFixed(2)
                              );
                          }
                      }];
  
                      pagination = {
                          pageSize: data.size,
                          total: data.totalElements,
                          onShowSizeChange: function onShowSizeChange(page, size) {
                              _this2.props.getManagerTkerProfit(id, 0, size);
                          },
                          onChange: function onChange(page) {
                              _this2.props.getManagerTkerProfit(id, page - 1);
                          }
                      };
                      break;
                  default:
                      visible = false;
                      break;
              }
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Modal,
                      { title: title,
                          width: 960,
                          visible: visible,
                          onOk: this.props.handleComplete,
                          onCancel: this.props.handleComplete },
                      _react2["default"].createElement(
                          "div",
                          { style: { 'height': '50px' } },
                          leftText && _react2["default"].createElement(
                              "span",
                              { style: { 'float': 'left' } },
                              leftText,
                              "：",
                              leftValue
                          ),
                          rightText && _react2["default"].createElement(
                              "span",
                              { style: { 'float': 'right' } },
                              rightText,
                              "：",
                              rightValue
                          ),
                          type == 'tker' && _react2["default"].createElement(_commonComponentSearchInput2["default"], { placeholder: "请输入手机号进行查询",
                              onSearch: this.handleSearch,
                              style: { width: 200, 'float': 'right' } })
                      ),
                      _react2["default"].createElement(_antd.Table, { rowKey: function (record) {
                              return record.id ? record.id : record.lastModifiedDate;
                          },
                          columns: columns,
                          loading: loading,
                          dataSource: dataSource,
                          pagination: pagination,
                          bordered: true }),
                      type == 'dividend' && dataSource.length != 0 && _react2["default"].createElement(
                          "div",
                          { style: { 'bottom': '50px', 'position': 'relative' } },
                          _react2["default"].createElement(
                              _antd.Select,
                              { placeholder: "请选择利润类型",
                                  onChange: this.onChange,
                                  style: { width: 120, 'margin': '5px' } },
                              _react2["default"].createElement(
                                  Option,
                                  { value: "" },
                                  "全部"
                              ),
                              _react2["default"].createElement(
                                  Option,
                                  { value: "0" },
                                  "佣金"
                              ),
                              _react2["default"].createElement(
                                  Option,
                                  { value: "1" },
                                  "一级分润"
                              ),
                              _react2["default"].createElement(
                                  Option,
                                  { value: "2" },
                                  "二级分润"
                              ),
                              _react2["default"].createElement(
                                  Option,
                                  { value: "3" },
                                  "三级分润"
                              )
                          )
                      )
                  )
              );
          }
      }]);
  
      return TkerMemberShow;
  })(_react.Component);
  
  exports["default"] = TkerMemberShow;
  module.exports = exports["default"];
  
  // 搜索集客

});
