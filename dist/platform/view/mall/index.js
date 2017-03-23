define('platform/view/mall/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _commonBasePageBase = require('common/base/PageBase.jsx');
  
  var _commonBasePageBase2 = _interopRequireDefault(_commonBasePageBase);
  
  var _antd = require('node_modules/antd/dist/antd');
  
  var _redux = require('node_modules/redux/lib/index');
  
  var _reactRedux = require('node_modules/react-redux/lib/index');
  
  var _storeMallAction = require("platform/store/mall/action");
  
  var mallAction = _interopRequireWildcard(_storeMallAction);
  
  var _componentMallList = require('platform/component/MallList/index.jsx');
  
  var _componentMallList2 = _interopRequireDefault(_componentMallList);
  
  var _componentMallForm = require('platform/component/MallForm/index.jsx');
  
  var _componentMallForm2 = _interopRequireDefault(_componentMallForm);
  
  var _componentMallShow = require('platform/component/MallShow/index.jsx');
  
  var _componentMallShow2 = _interopRequireDefault(_componentMallShow);
  
  var MallIndex = (function (_PageBase) {
      _inherits(MallIndex, _PageBase);
  
      function MallIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _MallIndex);
  
          _get(Object.getPrototypeOf(_MallIndex.prototype), 'constructor', this).call(this, props);
          this.state = {
              viewType: 'list',
              viewParam: null,
              viewData: null
          };
  
          this.add = function () {
              _this.showView('form', null, {});
          };
  
          this.edit = function (id) {
              _this.showView('form', id);
              _this.props.actions.getMall(id);
          };
  
          this.save = function (mall) {
              _this.props.actions.saveMall(mall);
          };
  
          this.show = function (id) {
              _this.showView('show', id);
              _this.props.actions.getMall(id);
          };
  
          this.list = function (page, size) {
  
              _this.props.actions.getMalls({
                  page: page,
                  size: size
              });
          };
      }
  
      _createClass(MallIndex, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
              this.list(0);
          }
      }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
                  case mallAction.GET_MALL:
                      this.setState({
                          viewData: nextProps.mall.item
                      });
                      break;
                  case mallAction.UPDATE_MALL:
                  case mallAction.ADD_MALL:
                      this.list(0);
                      this.reset();
                      break;
              }
          }
      }, {
          key: 'render',
          value: function render() {
              var operation = this.props.operation;
  
              // 是否显示loading
              var isListLoading = operation.type == mallAction.GET_MALLS && operation.pending;
  
              // 是否显示show
              var isShowMallShow = this.isShowView('show');
  
              // 是否显示form
              var isShowMallForm = this.isShowView('form');
  
              return _react2['default'].createElement(
                  'div',
                  null,
                  _react2['default'].createElement(
                      _antd.Card,
                      { title: '商城列表',
                          extra: _react2['default'].createElement(
                              _antd.Button,
                              { type: 'primary', icon: 'plus', onClick: this.add.bind(this) },
                              '新增'
                          ) },
                      _react2['default'].createElement(_componentMallList2['default'], { data: this.props.mall.list.content,
                          total: this.props.mall.list.totalElements,
                          loading: isListLoading,
                          edit: this.edit,
                          show: this.show,
                          list: this.list }),
                      isShowMallShow && _react2['default'].createElement(_componentMallShow2['default'], { data: this.state.viewData,
                          visible: isShowMallShow,
                          reset: this.reset }),
                      isShowMallForm && _react2['default'].createElement(_componentMallForm2['default'], { data: this.state.viewData,
                          visible: isShowMallForm,
                          save: this.save,
                          reset: this.reset })
                  )
              );
          }
      }]);
  
      var _MallIndex = MallIndex;
      MallIndex = (0, _reactRedux.connect)(function (state) {
          return {
              mall: state.mall.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, mallAction), dispatch)
          };
      })(MallIndex) || MallIndex;
      return MallIndex;
  })(_commonBasePageBase2['default']);
  
  exports['default'] = MallIndex;
  module.exports = exports['default'];

});
