define('platform/component/MallShow/index.jsx', function(require, exports, module) {

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
  
  var _MallAuth = require('platform/component/MallAuth/index.jsx');
  
  var _MallAuth2 = _interopRequireDefault(_MallAuth);
  
  var _MallFeatureAuth = require('platform/component/MallFeatureAuth/index.jsx');
  
  var _MallFeatureAuth2 = _interopRequireDefault(_MallFeatureAuth);
  
  var MallShow = (function (_Component) {
      _inherits(MallShow, _Component);
  
      function MallShow(props) {
          _classCallCheck(this, MallShow);
  
          _get(Object.getPrototypeOf(MallShow.prototype), 'constructor', this).call(this, props);
      }
  
      _createClass(MallShow, [{
          key: 'render',
          value: function render() {
              var data = this.props.data;
  
              if (!data) {
                  return null;
              }
  
              return _react2['default'].createElement(
                  'div',
                  null,
                  _react2['default'].createElement(
                      _antd.Modal,
                      { title: '商城运营详情',
                          visible: this.props.visible,
                          onOk: this.props.reset.bind(this),
                          onCancel: this.props.reset.bind(this) },
                      _react2['default'].createElement(
                          'p',
                          null,
                          '商城ID:',
                          data.id
                      ),
                      _react2['default'].createElement(
                          'p',
                          null,
                          '客户编号:',
                          data.uin
                      ),
                      _react2['default'].createElement(
                          'p',
                          null,
                          '商城名称:',
                          data.name
                      ),
                      _react2['default'].createElement(
                          'p',
                          null,
                          '商城账号:',
                          data.userName
                      ),
                      _react2['default'].createElement(
                          'p',
                          null,
                          '联系人:',
                          data.contact.name
                      ),
                      _react2['default'].createElement(
                          'p',
                          null,
                          '联系电话:',
                          data.contact.mobile
                      ),
                      _react2['default'].createElement(
                          'p',
                          null,
                          '平台权限:',
                          _react2['default'].createElement(_MallAuth2['default'], { mallAuth: data.mallAuth })
                      ),
                      _react2['default'].createElement(
                          'p',
                          null,
                          '功能权限:',
                          _react2['default'].createElement(_MallFeatureAuth2['default'], { mallAuth: data.mallAuth })
                      )
                  )
              );
          }
      }]);
  
      return MallShow;
  })(_react.Component);
  
  exports['default'] = MallShow;
  module.exports = exports['default'];

});
