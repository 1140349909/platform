define('admin/component/CommentShow/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _commonUtilMedia = require("common/util/media");
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  /*封装模态框类，与表单配合使用*/
  
  var CommentShow = (function (_Component) {
      _inherits(CommentShow, _Component);
  
      function CommentShow(props) {
          var _this = this;
  
          _classCallCheck(this, CommentShow);
  
          _get(Object.getPrototypeOf(CommentShow.prototype), "constructor", this).call(this, props);
  
          this.render = function () {
              var data = _this.props.data;
  
              if (!data) {
                  return null;
              }
  
              var title = '',
                  visible1 = false,
                  visible2 = false;
  
              switch (_this.props.type) {
                  case 'showInfo':
                      title = '查看详情';
                      visible2 = true;
                      break;
                  case 'deleteComment':
                      title = '强制删除';
                      visible1 = true;
                      break;
  
              }
  
              var images = [];
  
              for (var i = 0; i < _this.props.data.imgIds.length; i++) {
                  images.push(_react2["default"].createElement("img", { src: _commonUtilMedia2["default"].getMediaUrl(_this.props.data.imgIds[i]),
                      key: i,
                      alt: "", style: { width: '120px', height: '120px', 'display': 'inline-block', 'margin': '5px' } }));
              }
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Modal,
                      {
                          title: title,
                          visible: visible1,
                          onCancel: _this.props.reset,
                          onOk: function () {
                              return _this.props.confirmDelete(_this.props.data);
                          } },
                      _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              "span",
                              null,
                              "确定要强制删除吗？"
                          )
                      )
                  ),
                  _react2["default"].createElement(
                      _antd.Modal,
                      {
                          title: title,
                          visible: visible2,
                          onCancel: _this.props.reset,
                          onOk: _this.props.reset },
                      _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              "div",
                              null,
                              images
                          ),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(
                              _antd.Row,
                              null,
                              _react2["default"].createElement(
                                  _antd.Col,
                                  { span: 24 },
                                  _this.props.data.content
                              )
                          )
                      )
                  )
              );
          };
      }
  
      return CommentShow;
  })(_react.Component);
  
  exports["default"] = CommentShow;
  module.exports = exports["default"];

});
