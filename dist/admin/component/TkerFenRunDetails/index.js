define('admin/component/TkerFenRunDetails/index.jsx', function(require, exports, module) {

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
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var _EarningsDetail = require('admin/component/TkerFenRunDetails/EarningsDetail.jsx');
  
  var _EarningsDetail2 = _interopRequireDefault(_EarningsDetail);
  
  var _FenRunDetail = require('admin/component/TkerFenRunDetails/FenRunDetail.jsx');
  
  var _FenRunDetail2 = _interopRequireDefault(_FenRunDetail);
  
  '';
  
  var FormItem = _antd.Form.Item;
  
  var TkerFenRunDetail = (function (_Component) {
      _inherits(TkerFenRunDetail, _Component);
  
      function TkerFenRunDetail(props) {
          var _this = this;
  
          _classCallCheck(this, TkerFenRunDetail);
  
          _get(Object.getPrototypeOf(TkerFenRunDetail.prototype), 'constructor', this).call(this, props);
  
          this.onSetting = function () {
              if (!_this.props.onSetting) return;
              _this.props.onSetting();
          };
      }
  
      // 分销设置按钮
  
      _createClass(TkerFenRunDetail, [{
          key: 'render',
          value: function render() {
              var settingData = this.props.settingData || null;
              var tkerData = this.props.tkerData || null;
              var tkerClassName = this.props.model == 'show' ? 'tker-fenrun-show' : '';
              return _react2['default'].createElement(
                  'div',
                  { className: "tker-fenrun " + tkerClassName },
                  _react2['default'].createElement(
                      'div',
                      { className: 'tker-fenrun-box' },
                      _react2['default'].createElement(
                          'div',
                          { className: 'tker-fenrun-l' },
                          _react2['default'].createElement(_FenRunDetail2['default'], {
                              data: settingData,
                              model: this.props.model,
                              onSetting: this.onSetting })
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'tker-fenrun-r' },
                          _react2['default'].createElement(_EarningsDetail2['default'], {
                              model: this.props.model,
                              data: tkerData })
                      )
                  )
              );
          }
      }]);
  
      return TkerFenRunDetail;
  })(_react.Component);
  
  exports['default'] = TkerFenRunDetail;
  module.exports = exports['default'];

});
