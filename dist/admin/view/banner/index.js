define('admin/view/banner/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _commonBasePageBase = require('common/base/PageBase.jsx');
  
  var _commonBasePageBase2 = _interopRequireDefault(_commonBasePageBase);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _redux = require("node_modules/redux/lib/index");
  
  var _reactRedux = require("node_modules/react-redux/lib/index");
  
  var _storeBannerAction = require('admin/store/banner/action');
  
  var bannerAction = _interopRequireWildcard(_storeBannerAction);
  
  var _componentBannerForm = require("admin/component/BannerForm/index.jsx");
  
  var _componentBannerForm2 = _interopRequireDefault(_componentBannerForm);
  
  var BannerIndex = (function (_PageBase) {
      _inherits(BannerIndex, _PageBase);
  
      function BannerIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _BannerIndex);
  
          _get(Object.getPrototypeOf(_BannerIndex.prototype), "constructor", this).call(this, props);
          this.state = {
              'buyType': this.props.params.type
          };
  
          this.getManagerBanner = function (buyType) {
  
              _this.props.actions.getManagerBanner(buyType);
          };
  
          this.updateManagerBanner = function (buyType, data) {
  
              _this.props.actions.updateManagerBanner(buyType, data);
          };
      }
  
      _createClass(BannerIndex, [{
          key: "componentDidMount",
          value: function componentDidMount() {
              this.getManagerBanner(this.props.params.type);
          }
      }, {
          key: "componentDidUpdate",
          value: function componentDidUpdate(prevProps) {
              // respond to parameter change in scenario 3
              var oldType = prevProps.params.type;
              var newType = this.props.params.type;
              if (newType !== oldType) {
                  this.getManagerBanner(this.props.params.type);
              }
          }
      }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
                  case bannerAction.GET_MANAGER_BANNER:
                      /*this.setState({
                          bannerItem: operation.data
                      });*/
                      break;
                  case bannerAction.UPDATE_MANAGER_BANNER:
                      _antd.message.success('保存成功！');
                      this.getManagerBanner(this.state.buyType);
                      break;
              }
          }
      }, {
          key: "render",
          value: function render() {
  
              if (!this.props.banner.bannerItems.banners) {
                  return null;
              }
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Card,
                      { title: "平台广告条设置", extra: '在此设置平台的广告条' },
                      _react2["default"].createElement(_componentBannerForm2["default"], {
                          buyType: this.state.buyType,
                          data: this.props.banner.bannerItems,
                          updateManagerBanner: this.updateManagerBanner
                      })
                  )
              );
          }
      }]);
  
      var _BannerIndex = BannerIndex;
      BannerIndex = (0, _reactRedux.connect)(function (state) {
          return {
              banner: state.banner.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, bannerAction), dispatch)
          };
      })(BannerIndex) || BannerIndex;
      return BannerIndex;
  })(_commonBasePageBase2["default"]);
  
  exports["default"] = BannerIndex;
  module.exports = exports["default"];

});
