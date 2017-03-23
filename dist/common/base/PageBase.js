define('common/base/PageBase.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  // 页面基类
  
  var PageBase = (function (_Component) {
      _inherits(PageBase, _Component);
  
      function PageBase(props) {
          var _this = this;
  
          _classCallCheck(this, PageBase);
  
          _get(Object.getPrototypeOf(PageBase.prototype), 'constructor', this).call(this, props);
  
          this.isShowView = function (viewType) {
              return _this.state.viewType == viewType && _this.state.viewData != null;
          };
  
          this.showView = function (viewType, viewParam, viewData) {
              _this.setState({
                  viewType: viewType,
                  viewParam: viewParam,
                  viewData: viewData
              });
          };
  
          this.reset = function () {
              _this.setState({
                  viewType: 'list',
                  viewParam: null,
                  viewData: null
              });
          };
  
          this.reCallBackType = function () {
              _this.setState({
                  callBackType: ''
              });
          };
      }
  
      // 是否显示viewType
      return PageBase;
  })(_react.Component);
  
  exports['default'] = PageBase;
  module.exports = exports['default'];
  
  // 显示view
  
  // 重置页面
  
  // TODO: 暂时加个清空callBackType属性，callBackType用于判断多个按钮调用同一接口及loading处理
  // 重置callBackType

});
