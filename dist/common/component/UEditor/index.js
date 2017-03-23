define('common/component/UEditor/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  exports.getEditor = getEditor;
  exports.setEditorValue = setEditorValue;
  exports.getEditorValue = getEditorValue;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _commonConfig = require('common/config/index');
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  // TODO:
  function getEditor(editorId) {
      return document.getElementById(editorId).contentWindow['Editor'] || {};
  }
  
  // 设置UEditor值
  
  function setEditorValue(editorId, val) {
      var iframeEditor = document.getElementById(editorId);
  
      if (!iframeEditor) {
          return;
      }
  
      function setVal() {
          setTimeout(function () {
              try {
                  getEditor(editorId).setContent(val);
              } catch (ex) {}
          }, 500);
      }
  
      if (iframeEditor.readyState) {
          iframeEditor.onreadystatechange = function () {
              if (iframeEditor.readyState && iframeEditor.readyState == 'complete') {
                  setVal();
              }
          };
      } else {
          iframeEditor.onload = function () {
              setVal();
          };
      }
  
      setVal();
  }
  
  // 获取UEditor值
  
  function getEditorValue(editorId) {
      return getEditor(editorId).getContent();
  }
  
  var Editor = (function (_Component) {
      _inherits(Editor, _Component);
  
      function Editor() {
          _classCallCheck(this, Editor);
  
          _get(Object.getPrototypeOf(Editor.prototype), 'constructor', this).apply(this, arguments);
      }
  
      _createClass(Editor, [{
          key: 'render',
          value: function render() {
              var _props = this.props;
              var id = _props.id;
              var _props$width = _props.width;
              var width = _props$width === undefined ? '100%' : _props$width;
              var _props$height = _props.height;
              var height = _props$height === undefined ? '600px' : _props$height;
              var _props$value = _props.value;
              var value = _props$value === undefined ? '' : _props$value;
  
              return _react2['default'].createElement(
                  'div',
                  { className: 'iframeUEditorWrap', style: { width: width, height: height } },
                  _react2['default'].createElement('iframe', { id: id, name: id, src: _commonConfig2['default'].UEDITOR_URL, width: '100%', height: '100%', frameBorder: '0' })
              );
          }
      }]);
  
      return Editor;
  })(_react.Component);
  
  exports.Editor = Editor;

});
