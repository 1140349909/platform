define('admin/component/CommentList/index.jsx', function(require, exports, module) {

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
  
  var _commonUtilMedia = require("common/util/media");
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var _commonUtilIndex = require("common/util/index");
  
  var _antd = require("node_modules/antd/dist/antd");
  
  '';
  
  var CommentList = (function (_Component) {
      _inherits(CommentList, _Component);
  
      function CommentList(props) {
          _classCallCheck(this, CommentList);
  
          _get(Object.getPrototypeOf(CommentList.prototype), "constructor", this).call(this, props);
          this.state = {};
  
          this.moduleTypeCheck = function (data) {
  
              var moduleList = [{
                  'type': 'mall',
                  'name': '商城'
  
              }, {
                  'type': 'yyg',
                  'name': '一元购'
              }];
  
              if (data.mall) {
                  return {
                      'name': moduleList[0].name,
                      'cfg': data.mall
                  };
              } else {
                  return {
                      'name': moduleList[1].name,
                      'cfg': data.yyg
                  };
              }
  
              /*for (let i = 0; i < moduleList.length; i++) {
               if (data.buyType == moduleList[i].type) {
               //console.log(moduleList[i].type + 'Cfg');
               return {
               'name': moduleList[i].name,
               'cfg': data[moduleList[i].type + 'Cfg']
               };
               }
               }*/
          };
      }
  
      _createClass(CommentList, [{
          key: "render",
          value: function render() {
              var _this = this;
  
              var columns = [{
                  title: '期号',
                  dataIndex: 'issueNo',
                  key: 'issueNo',
                  render: function render(text, record) {
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          "第",
                          record.issueNo,
                          "期"
                      );
                  }
              }, {
                  title: '产品名称',
                  dataIndex: 'productName',
                  key: 'productName'
              }, {
                  title: '晒单时间',
                  dataIndex: 'date',
                  key: 'date',
                  render: function render(text, record) {
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          (0, _commonUtilIndex.dateFormat)(new Date(record.date), "yyyy-MM-dd")
                      );
                  }
              }, {
                  title: '晒单评论',
                  dataIndex: 'content',
                  key: 'content'
              }, {
                  title: '缩略图',
                  dataIndex: 'imgIds',
                  key: 'imgIds',
                  render: function render(text, record) {
  
                      var images = [];
  
                      for (var i = 0; i < record.imgIds.length; i++) {
  
                          images.push(_react2["default"].createElement("img", { src: _commonUtilMedia2["default"].getMediaUrl(record.imgIds[i]),
                              key: i,
                              alt: "",
                              style: { width: '60px', height: '60px', 'display': 'inline-block', 'margin': '5px' }
                          }));
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          images
                      );
                  }
              }, {
                  title: '审核处理',
                  dataIndex: 'process',
                  key: 'process',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "comment-btn", onClick: function () {
                                      return _this.props.showInfo(record.id);
                                  } },
                              "查看详情"
                          ),
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "comment-btn", onClick: function () {
                                      return _this.props.deleteComment(record.id);
                                  } },
                              "强制删除"
                          )
                      );
                  }
              }];
  
              var extra = _react2["default"].createElement(
                  "div",
                  null,
                  "晒单总数：",
                  _react2["default"].createElement(
                      "span",
                      null,
                      this.props.total
                  )
              );
  
              var dataList = this.props.data != undefined ? this.props.data : [];
  
              var dataSource = [];
  
              for (var i = 0; i < dataList.length; i++) {
  
                  var data = {
                      index: i + 1,
                      id: dataList[i].id,
                      issueNo: dataList[i].issueNo,
                      productName: dataList[i].productName,
                      date: dataList[i].lastModifiedDate,
                      content: dataList[i].content,
                      imgIds: dataList[i].imgIds
                  };
                  dataSource.push(data);
              }
  
              //分页
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
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Card,
                      { title: "晒单管理", extra: extra },
                      _react2["default"].createElement(_antd.Table, { rowKey: function (record) {
                              return record.id;
                          },
                          columns: columns,
                          loading: this.props.loading,
                          pagination: pagination,
                          dataSource: dataSource,
                          bordered: true })
                  )
              );
          }
      }]);
  
      return CommentList;
  })(_react.Component);
  
  exports["default"] = CommentList;
  module.exports = exports["default"];
  /*<Button className="comment-btn">查看详情</Button>
  <CommentDel/>*/ /*<Select className="productmanagement-select"
                  defaultValue="未上线">
                  <Option value="未上线">未上线</Option>
                  <Option value="已上线">已上线</Option>
                  <Option value="已下线">已下线</Option>
                  </Select>*/

});
