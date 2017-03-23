define('admin/component/ProductPreview/index.jsx', function(require, exports, module) {

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
  
  var _rcQrcode = require('node_modules/rc-qrcode/lib/index');
  
  var _rcQrcode2 = _interopRequireDefault(_rcQrcode);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var _commonConfig = require('common/config/index');
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  '';
  
  var confirm = _antd.Modal.confirm;
  
  var ProductPreview = (function (_Component) {
      _inherits(ProductPreview, _Component);
  
      function ProductPreview(props) {
          var _this = this;
  
          _classCallCheck(this, ProductPreview);
  
          _get(Object.getPrototypeOf(ProductPreview.prototype), "constructor", this).call(this, props);
          this.state = {
              loading: false
          };
  
          this.onOk = function () {
              if (_this.props.onOk) {
                  _this.props.onOk();
                  _this.setState({
                      loading: true
                  });
              }
          };
  
          this.onDone = function () {
              if (_this.props.onDone) {
                  _this.props.onDone();
              }
          };
  
          this.onEdit = function () {
              if (_this.props.onEdit) {
                  _this.props.onEdit();
              }
          };
      }
  
      // document.frames('ifrmname').location.reload()
  
      // 手机预览
  
      _createClass(ProductPreview, [{
          key: "componentDidMount",
          value: function componentDidMount() {
              // window.document.frames('previewPhone').location.reload()
          }
      }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
              // window.document.frames('previewPhone').location.reload()
          }
      }, {
          key: "render",
          value: function render() {
  
              var buyChannel = typeof this.props.buyChannel == 'undefined' ? 'mall' : this.props.buyChannel;
  
              var url = _commonConfig2["default"].MOBILE_HOST + "/" + buyChannel + "/#!/product/preview/" + this.props.id;
  
              var footer = [];
  
              if (this.props.onDone) {
                  footer.push(_react2["default"].createElement(
                      _antd.Button,
                      {
                          key: "done",
                          type: "primary",
                          size: "large",
                          onClick: this.onDone },
                      "完成"
                  ));
              }
  
              if (this.props.onOk) {
                  footer.push(_react2["default"].createElement(
                      _antd.Button,
                      {
                          loading: this.props.okLoading,
                          key: "submit",
                          type: "ghost",
                          size: "large",
                          onClick: this.onOk },
                      "完成并上架"
                  ));
              }
  
              if (this.props.onEdit) {
                  footer.push(_react2["default"].createElement(
                      _antd.Button,
                      {
                          key: "outEdit",
                          type: "ghost",
                          size: "large",
                          onClick: this.onEdit },
                      "继续编辑"
                  ));
              }
  
              return _react2["default"].createElement(
                  _antd.Modal,
                  { ref: "modal",
                      className: "product-preview",
                      width: 700,
                      visible: this.props.visible,
                      title: "预览",
                      onCancel: this.props.onCancel,
                      footer: footer },
                  _react2["default"].createElement(
                      "div",
                      { className: "product-previewbox" },
                      _react2["default"].createElement(
                          "div",
                          { className: "product-preview-l" },
                          _react2["default"].createElement(ProductPreviewPhone, {
                              url: url,
                              id: this.props.id })
                      ),
                      _react2["default"].createElement(
                          "div",
                          { className: "product-preview-r" },
                          _react2["default"].createElement(ProductPreviewQrcode, {
                              url: url,
                              id: this.props.id })
                      )
                  )
              );
          }
      }]);
  
      return ProductPreview;
  })(_react.Component);
  
  exports["default"] = ProductPreview;
  
  var ProductPreviewPhone = (function (_Component2) {
      _inherits(ProductPreviewPhone, _Component2);
  
      function ProductPreviewPhone() {
          _classCallCheck(this, ProductPreviewPhone);
  
          _get(Object.getPrototypeOf(ProductPreviewPhone.prototype), "constructor", this).apply(this, arguments);
      }
  
      // 二维码
  
      _createClass(ProductPreviewPhone, [{
          key: "render",
          value: function render() {
              return _react2["default"].createElement(
                  "div",
                  { className: "product-preview-phone" },
                  _react2["default"].createElement(
                      "div",
                      { className: "product-preview-phone-iframebox" },
                      _react2["default"].createElement("iframe", {
                          id: "previewPhone",
                          name: "previewPhone",
                          className: "product-preview-phone-iframe",
                          src: this.props.url })
                  )
              );
          }
      }]);
  
      return ProductPreviewPhone;
  })(_react.Component);
  
  var ProductPreviewQrcode = (function (_Component3) {
      _inherits(ProductPreviewQrcode, _Component3);
  
      function ProductPreviewQrcode() {
          _classCallCheck(this, ProductPreviewQrcode);
  
          _get(Object.getPrototypeOf(ProductPreviewQrcode.prototype), "constructor", this).apply(this, arguments);
      }
  
      _createClass(ProductPreviewQrcode, [{
          key: "render",
          value: function render() {
              return _react2["default"].createElement(
                  "div",
                  { className: "product-preview-qrcode" },
                  _react2["default"].createElement("img", { src: _commonUtilMedia2["default"].getQrcodeUrl(1000, 1000, this.props.url) }),
                  _react2["default"].createElement(
                      "p",
                      null,
                      "扫一扫二维码，查看预览"
                  )
              );
          }
      }]);
  
      return ProductPreviewQrcode;
  })(_react.Component);
  
  module.exports = exports["default"];
  
  // 保存并上架
  
  // 保存
  
  // 返回

});
