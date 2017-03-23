define('admin/component/CompanyExtra/index.jsx', function(require, exports, module) {

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
  
  '';
  
  var Option = _antd.Select.Option;
  
  var CompanyExtra = (function (_Component) {
      _inherits(CompanyExtra, _Component);
  
      function CompanyExtra(props) {
          var _this = this;
  
          _classCallCheck(this, CompanyExtra);
  
          _get(Object.getPrototypeOf(CompanyExtra.prototype), "constructor", this).call(this, props);
  
          this.handleChange = function (val) {
              _this.props.currentCustomer(val);
          };
      }
  
      _createClass(CompanyExtra, [{
          key: "render",
          value: function render() {
              var _this2 = this;
  
              var eles = [];
  
              var data = this.props.data.content;
  
              data.map(function (item, index) {
                  eles.push(_react2["default"].createElement(
                      Option,
                      { key: index, value: item.id },
                      item.name
                  ));
              });
  
              return _react2["default"].createElement(
                  "div",
                  { className: "company-extra" },
                  _react2["default"].createElement(
                      _antd.Select,
                      {
                          className: "productmanagement-select",
                          onChange: this.handleChange,
                          defaultValue: data.length > 0 ? data[0].id : "" },
                      eles
                  ),
                  _react2["default"].createElement(
                      _antd.Button,
                      { onClick: function () {
                              _this2.props.showCustomer('add');
                          } },
                      "新增合作客户"
                  )
              );
          }
      }]);
  
      return CompanyExtra;
  })(_react.Component);
  
  exports["default"] = CompanyExtra;
  module.exports = exports["default"];

});
