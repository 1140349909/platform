define('admin/component/CompanyHead/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  '';
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var InputGroup = _antd.Input.Group;
  
  var CompanyHead = (function (_Component) {
      _inherits(CompanyHead, _Component);
  
      function CompanyHead(props) {
          _classCallCheck(this, CompanyHead);
  
          _get(Object.getPrototypeOf(CompanyHead.prototype), "constructor", this).call(this, props);
      }
  
      // 搜索
  
      _createClass(CompanyHead, [{
          key: "handleChange",
          value: function handleChange() {}
      }, {
          key: "render",
          value: function render() {
              var _this = this;
  
              var _props$data = this.props.data;
              var name = _props$data.name;
              var domain = _props$data.domain;
              var logo = _props$data.logo;
  
              return _react2["default"].createElement(
                  "div",
                  { className: "company" },
                  _react2["default"].createElement(
                      "div",
                      { className: "company-head" },
                      _react2["default"].createElement(
                          "div",
                          { className: "company-head-logo" },
                          _react2["default"].createElement("img", { src: _commonUtilMedia2["default"].getMediaUrl(logo) })
                      ),
                      _react2["default"].createElement(
                          "div",
                          { className: "company-head-info" },
                          _react2["default"].createElement(
                              "div",
                              { className: "company-head-info-tit" },
                              "企业名称:",
                              name
                          ),
                          _react2["default"].createElement(
                              "div",
                              { className: "company-head-info-show" },
                              _react2["default"].createElement(
                                  "div",
                                  null,
                                  "门店总数：-"
                              ),
                              _react2["default"].createElement(
                                  "div",
                                  null,
                                  "员工总数：-"
                              ),
                              _react2["default"].createElement(
                                  "div",
                                  null,
                                  "开展会员总数：-"
                              ),
                              _react2["default"].createElement(
                                  "div",
                                  null,
                                  "开展会员总交易：-"
                              )
                          )
                      ),
                      _react2["default"].createElement(
                          "div",
                          { className: "company-head-btns" },
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "company-head-btn", onClick: this.props.showExcitation },
                              "设置员工激励"
                          ),
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "company-head-btn", onClick: function () {
                                      _this.props.showCustomer('modify');
                                  } },
                              "修改企业信息"
                          ),
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "company-head-btn", onClick: this.props.showCustomerImport },
                              "导入客户员工"
                          ),
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "company-head-btn", onClick: this.props.showStoreImport },
                              "导入客户门店"
                          )
                      ),
                      _react2["default"].createElement(
                          "div",
                          { className: "company-searchinput" },
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "company-head-btnr", onClick: function () {
                                      _this.props.showEmployee('add');
                                  } },
                              "新增店员"
                          ),
                          _react2["default"].createElement(CompanySearchInput, {
                              placeholder: "input search text",
                              style: { width: 200 } })
                      )
                  )
              );
          }
      }]);
  
      return CompanyHead;
  })(_react.Component);
  
  exports["default"] = CompanyHead;
  
  var CompanySearchInput = (function (_Component2) {
      _inherits(CompanySearchInput, _Component2);
  
      function CompanySearchInput(props) {
          _classCallCheck(this, CompanySearchInput);
  
          _get(Object.getPrototypeOf(CompanySearchInput.prototype), "constructor", this).call(this, props);
          this.state = {
              value: '',
              focus: false
          };
      }
  
      _createClass(CompanySearchInput, [{
          key: "handleInputChange",
          value: function handleInputChange(e) {
              this.setState({
                  value: e.target.value
              });
          }
      }, {
          key: "handleFocusBlur",
          value: function handleFocusBlur(e) {
              this.setState({
                  focus: e.target === document.activeElement
              });
          }
      }, {
          key: "handleSearch",
          value: function handleSearch() {
              if (this.props.onSearch) {
                  this.props.onSearch(this.state.value);
              }
          }
      }, {
          key: "render",
          value: function render() {
              var _props = this.props;
              var style = _props.style;
              var size = _props.size;
  
              var restProps = _objectWithoutProperties(_props, ["style", "size"]);
  
              return _react2["default"].createElement(
                  "div",
                  { className: "ant-search-input-wrapper", style: style },
                  _react2["default"].createElement(
                      InputGroup,
                      null,
                      _react2["default"].createElement(_antd.Input, _extends({}, restProps, { value: this.state.value, onChange: this.handleInputChange.bind(this),
                          onFocus: this.handleFocusBlur.bind(this),
                          onBlur: this.handleFocusBlur.bind(this),
                          onPressEnter: this.handleSearch.bind(this) })),
                      _react2["default"].createElement(
                          "div",
                          { className: "ant-input-group-wrap" },
                          _react2["default"].createElement(_antd.Button, { icon: "search", className: "company-searchinput-btn", type: "primary", size: size,
                              onClick: this.handleSearch.bind(this) })
                      )
                  )
              );
          }
      }]);
  
      return CompanySearchInput;
  })(_react.Component);
  
  module.exports = exports["default"];

});
