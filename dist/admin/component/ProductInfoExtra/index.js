define('admin/component/ProductInfoExtra/index.jsx', function(require, exports, module) {

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
  
  var _lodash = require('node_modules/lodash/lodash');
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  '';
  
  // Card-select和新增按钮
  
  var ProductInfoExtra = (function (_Component) {
      _inherits(ProductInfoExtra, _Component);
  
      function ProductInfoExtra() {
          _classCallCheck(this, ProductInfoExtra);
  
          _get(Object.getPrototypeOf(ProductInfoExtra.prototype), "constructor", this).apply(this, arguments);
      }
  
      _createClass(ProductInfoExtra, [{
          key: "render",
          value: function render() {
              var data = this.props.data;
  
              if (!data) return null;
  
              var url = _lodash2["default"].has(data, 'mediaRes.productImgId') ? _commonUtilMedia2["default"].getMediaUrl(data.mediaRes.productImgId) : '',
                  code = data.code,
                  title = data.title;
  
              return _react2["default"].createElement(
                  "div",
                  { className: "product-infoextra" },
                  _react2["default"].createElement(
                      "div",
                      { className: "product-infoextra-l" },
                      _react2["default"].createElement("img", { className: "product-infoextra-img", src: url })
                  ),
                  _react2["default"].createElement(
                      "div",
                      { className: "product-infoextra-r" },
                      _react2["default"].createElement(
                          "p",
                          { className: "product-infoextra-p" },
                          "商品编号: ",
                          code
                      ),
                      _react2["default"].createElement(
                          "p",
                          { className: "product-infoextra-p" },
                          "商品名称: ",
                          title
                      )
                  )
              );
          }
      }]);
  
      return ProductInfoExtra;
  })(_react.Component);
  
  exports["default"] = ProductInfoExtra;
  module.exports = exports["default"];

});
