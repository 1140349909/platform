define('admin/component/SettingCard/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var _commonConfig = require('common/config/index');
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  '';
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _componentSettingIntegralForm = require('admin/component/SettingIntegralForm/index.jsx');
  
  var _componentSettingIntegralForm2 = _interopRequireDefault(_componentSettingIntegralForm);
  
  var FormItem = _antd.Form.Item;
  var confirm = _antd.Modal.confirm;
  var Option = _antd.Select.Option;
  
  var SettingCard = (function (_Component) {
      _inherits(SettingCard, _Component);
  
      function SettingCard() {
          _classCallCheck(this, SettingCard);
  
          _get(Object.getPrototypeOf(SettingCard.prototype), 'constructor', this).apply(this, arguments);
      }
  
      // 平台设置
  
      _createClass(SettingCard, [{
          key: 'render',
          value: function render() {
              return _react2['default'].createElement(
                  'div',
                  { className: 'settingcard' },
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-info' },
                      _react2['default'].createElement(SettingCardPlatform, {
                          data: this.props.dataMall,
                          showMallModify: this.props.showMallModify }),
                      _react2['default'].createElement(SettingCardService, {
                          data: this.props.dataMall,
                          showCusModify: this.props.showCusModify }),
                      _react2['default'].createElement(SettingCardPublic, {
                          data: this.props.data.weChat,
                          showCustomerModify: this.props.showCustomerModify,
                          updateWechat: this.props.updateWechat })
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-pay' },
                      _react2['default'].createElement(
                          _antd.Card,
                          { title: '交易方式设置', extra: '系统开通三种支付方式，可以选择支付方式，便于用户支付参与商城活动' },
                          _react2['default'].createElement(SettingCardPayZhifubao, {
                              reset: this.props.reset,
                              data: this.props.data.aliPay,
                              updateAliPay: this.props.updateAliPay,
                              showAliPay: this.props.showAliPay }),
                          _react2['default'].createElement(SettingCardPayWeixin, {
                              reset: this.props.reset,
                              data: this.props.data.weChat,
                              updateWechat: this.props.updateWechat,
                              showWechat: this.props.showWechat })
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-pay' },
                      _react2['default'].createElement(
                          _antd.Card,
                          { title: '平台交易积分设置', extra: '在此设置积分和现金的兑换比例' },
                          _react2['default'].createElement(_componentSettingIntegralForm2['default'], {
                              updateIntegralExchange: this.props.updateIntegralExchange,
                              reset: this.props.reset,
                              dataIntegral: { value: this.props.dataIntegral }
                          })
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-pay' },
                      _react2['default'].createElement(
                          _antd.Card,
                          { title: '平台分享设置', extra: '在此设置平台的分享设置' },
                          _react2['default'].createElement(SettingCardShare, {
                              data: this.props.dataMall,
                              mallModify: this.props.mallModify,
                              showMallModify: this.props.showMallModify })
                      )
                  )
              );
          }
      }]);
  
      return SettingCard;
  })(_react.Component);
  
  exports['default'] = SettingCard;
  
  var SettingCardPlatform = (function (_Component2) {
      _inherits(SettingCardPlatform, _Component2);
  
      function SettingCardPlatform() {
          _classCallCheck(this, SettingCardPlatform);
  
          _get(Object.getPrototypeOf(SettingCardPlatform.prototype), 'constructor', this).apply(this, arguments);
      }
  
      // 客服设置
  
      _createClass(SettingCardPlatform, [{
          key: 'render',
          value: function render() {
              var _this = this;
  
              var _props$data = this.props.data;
              var _props$data$link = _props$data.link;
              var link = _props$data$link === undefined ? _commonConfig2['default'].API_ROOT + '/entry/' + this.props.data.uin + '/yyg/linkin' : _props$data$link;
              var name = _props$data.name;
              var _props$data$contactName = _props$data.contactName;
              var contactName = _props$data$contactName === undefined ? this.props.data.contact ? this.props.data.contact.name : '' : _props$data$contactName;
              var _props$data$contactMobile = _props$data.contactMobile;
              var contactMobile = _props$data$contactMobile === undefined ? this.props.data.contact ? this.props.data.contact.mobile : '' : _props$data$contactMobile;
  
              var popoverContainer = _react2['default'].createElement('img', { className: 'settingcard-p-imgmax',
                  src: _commonUtilMedia2['default'].getQrcodeUrl(400, 400, link) });
  
              var extra = _react2['default'].createElement(
                  _antd.Popover,
                  { content: popoverContainer },
                  _react2['default'].createElement('img', { className: 'settingcard-p-imgmin',
                      src: _commonUtilMedia2['default'].getQrcodeUrl(400, 400, link) })
              );
  
              return _react2['default'].createElement(
                  _antd.Card,
                  { className: 'settingcard-platform', title: '平台设置', extra: extra },
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-p' },
                      '平台名称：',
                      name,
                      _react2['default'].createElement(
                          'a',
                          { className: 'settingcard-p-edit', onClick: function () {
                                  _this.props.showMallModify({
                                      type: 'name',
                                      title: '平台名称',
                                      value: name
                                  });
                              } },
                          '修改'
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-p' },
                      '联系人：',
                      contactName,
                      _react2['default'].createElement(
                          'a',
                          { className: 'settingcard-p-edit', onClick: function () {
                                  _this.props.showMallModify({
                                      type: 'contactName',
                                      title: '联系人',
                                      value: contactName
                                  });
                              } },
                          '修改'
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-p' },
                      '联系电话：',
                      contactMobile,
                      _react2['default'].createElement(
                          'a',
                          { className: 'settingcard-p-edit', onClick: function () {
                                  _this.props.showMallModify({
                                      type: 'contactMobile',
                                      title: '联系电话',
                                      value: contactMobile
                                  });
                              } },
                          '修改'
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-link' },
                      _react2['default'].createElement(
                          'span',
                          { className: 'settingcard-link-tit' },
                          '平台链接：'
                      ),
                      _react2['default'].createElement(
                          'span',
                          { className: 'settingcard-link-a' },
                          link
                      )
                  )
              );
          }
      }]);
  
      return SettingCardPlatform;
  })(_react.Component);
  
  var SettingCardService = (function (_Component3) {
      _inherits(SettingCardService, _Component3);
  
      function SettingCardService() {
          _classCallCheck(this, SettingCardService);
  
          _get(Object.getPrototypeOf(SettingCardService.prototype), 'constructor', this).apply(this, arguments);
      }
  
      // 关注公众号
  
      _createClass(SettingCardService, [{
          key: 'render',
          value: function render() {
              var _this2 = this;
  
              return _react2['default'].createElement(
                  _antd.Card,
                  { className: 'settingcard-service', title: '客服设置', extra: '便于用户联系咨询' },
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-p' },
                      '联系电话：',
                      this.props.data.cusMobile,
                      _react2['default'].createElement(
                          'a',
                          { className: 'settingcard-p-edit', onClick: function () {
                                  _this2.props.showCusModify({
                                      type: 'serviceMobile',
                                      title: '联系电话',
                                      value: _this2.props.data.cusMobile
                                  });
                              } },
                          '修改'
                      )
                  )
              );
          }
      }]);
  
      return SettingCardService;
  })(_react.Component);
  
  var SettingCardPublic = (function (_Component4) {
      _inherits(SettingCardPublic, _Component4);
  
      function SettingCardPublic() {
          _classCallCheck(this, SettingCardPublic);
  
          _get(Object.getPrototypeOf(SettingCardPublic.prototype), 'constructor', this).apply(this, arguments);
      }
  
      // 支付设置-支付宝
  
      _createClass(SettingCardPublic, [{
          key: 'render',
          value: function render() {
              var _this3 = this;
  
              var props = {
  
                  name: 'media',
                  showUploadList: false,
                  withCredentials: true,
                  action: _commonUtilMedia2['default'].upLoad,
  
                  onChange: function onChange(info) {
                      if (info.file.status !== 'uploading') {}
                      if (info.file.status === 'done') {
  
                          _this3.props.updateWechat({
                              imgId: info.file.response.data
                          });
                      } else if (info.file.status === 'error') {}
                  }
              };
  
              var _ref = this.props.data || {};
  
              var _ref$imgId = _ref.imgId;
              var imgId = _ref$imgId === undefined ? "" : _ref$imgId;
              var name = _ref.name;
  
              var popoverContainer = _react2['default'].createElement('img', { className: 'settingcard-p-imgmax',
                  src: _commonUtilMedia2['default'].getMediaUrl(imgId) });
  
              return _react2['default'].createElement(
                  _antd.Card,
                  { className: 'settingcard-public', title: '关注公众号', extra: '引流关注公众号，进入商城' },
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-p' },
                      '公众号：',
                      name,
                      _react2['default'].createElement(
                          'a',
                          { className: 'settingcard-p-edit', onClick: function () {
                                  _this3.props.showCustomerModify({
                                      type: 'publicName',
                                      title: '公众号',
                                      value: name
                                  });
                              } },
                          '修改'
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-p' },
                      '公众号二维码',
                      _react2['default'].createElement(
                          _antd.Upload,
                          _extends({}, props, { className: 'settingcard-p-edit' }),
                          imgId !== "" && _react2['default'].createElement(
                              'a',
                              null,
                              '重新上传'
                          ),
                          imgId == "" && _react2['default'].createElement(
                              'a',
                              null,
                              '上传二维码'
                          )
                      )
                  ),
                  imgId !== "" && _react2['default'].createElement(
                      _antd.Popover,
                      { content: popoverContainer },
                      _react2['default'].createElement('img', { className: 'settingcard-p-img',
                          src: _commonUtilMedia2['default'].getMediaUrl(imgId) })
                  )
              );
          }
      }]);
  
      return SettingCardPublic;
  })(_react.Component);
  
  var SettingCardPayZhifubao = (function (_Component5) {
      _inherits(SettingCardPayZhifubao, _Component5);
  
      function SettingCardPayZhifubao(props) {
          _classCallCheck(this, SettingCardPayZhifubao);
  
          _get(Object.getPrototypeOf(SettingCardPayZhifubao.prototype), 'constructor', this).call(this, props);
      }
  
      // 支付设置-微信
  
      _createClass(SettingCardPayZhifubao, [{
          key: 'render',
          value: function render() {
              var _this4 = this;
  
              var ele = undefined;
  
              if (typeof this.props.data !== 'undefined' && this.props.data.enable) {
  
                  ele = _react2['default'].createElement(
                      'div',
                      null,
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-tit' },
                          '支付宝账号：'
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-number' },
                          this.props.data.account
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-btn' },
                          _react2['default'].createElement(
                              'a',
                              { className: 'settingcard-pay-text-btn-modify', onClick: function () {
                                      _this4.props.showAliPay();
                                  } },
                              '修改'
                          ),
                          _react2['default'].createElement(SettingUinBind, {
                              type: 'aliPay',
                              data: this.props.data,
                              reset: this.props.reset,
                              update: this.props.updateAliPay })
                      )
                  );
              } else {
  
                  ele = _react2['default'].createElement(
                      'div',
                      null,
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-no' },
                          '未开通'
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-btn' },
                          _react2['default'].createElement(
                              'a',
                              { className: 'settingcard-pay-text-btn-modify', onClick: function () {
                                      _this4.props.showAliPay();
                                  } },
                              '去绑定'
                          )
                      )
                  );
              }
  
              return _react2['default'].createElement(
                  _antd.Card,
                  { className: 'settingcard-pay-zhifubao' },
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-pay-img' },
                      _react2['default'].createElement('img', {
                          src: 'http://work.361ser.com/Content/ueditor/net/upload/image/20160528/6360004804336180465615025.jpg' })
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-pay-text' },
                      ele
                  )
              );
          }
      }]);
  
      return SettingCardPayZhifubao;
  })(_react.Component);
  
  var SettingCardPayWeixin = (function (_Component6) {
      _inherits(SettingCardPayWeixin, _Component6);
  
      function SettingCardPayWeixin(props) {
          _classCallCheck(this, SettingCardPayWeixin);
  
          _get(Object.getPrototypeOf(SettingCardPayWeixin.prototype), 'constructor', this).call(this, props);
      }
  
      // 支付设置-银联
  
      _createClass(SettingCardPayWeixin, [{
          key: 'render',
          value: function render() {
              var _this5 = this;
  
              var ele = undefined;
  
              if (typeof this.props.data !== 'undefined' && this.props.data.enable) {
                  ele = _react2['default'].createElement(
                      'div',
                      null,
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-tit' },
                          '微信账号：'
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-number' },
                          this.props.data.appid
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-btn' },
                          _react2['default'].createElement(
                              'a',
                              { className: 'settingcard-pay-text-btn-modify', onClick: function () {
                                      _this5.props.showWechat();
                                  } },
                              '修改'
                          ),
                          _react2['default'].createElement(SettingUinBind, {
                              type: 'wechat',
                              data: this.props.data,
                              reset: this.props.reset,
                              update: this.props.updateWechat })
                      )
                  );
              } else {
  
                  ele = _react2['default'].createElement(
                      'div',
                      null,
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-no' },
                          '未开通'
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-btn' },
                          _react2['default'].createElement(
                              'a',
                              { className: 'settingcard-pay-text-btn-modify', onClick: function () {
                                      _this5.props.showWechat();
                                  } },
                              '去绑定'
                          )
                      )
                  );
              }
              return _react2['default'].createElement(
                  _antd.Card,
                  { className: 'settingcard-pay-weixin ' },
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-pay-img' },
                      _react2['default'].createElement('img', { src: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2658307387,2538659503&fm=58' })
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-pay-text' },
                      ele
                  )
              );
          }
      }]);
  
      return SettingCardPayWeixin;
  })(_react.Component);
  
  var SettingCardPayYinlian = (function (_Component7) {
      _inherits(SettingCardPayYinlian, _Component7);
  
      function SettingCardPayYinlian(props) {
          _classCallCheck(this, SettingCardPayYinlian);
  
          _get(Object.getPrototypeOf(SettingCardPayYinlian.prototype), 'constructor', this).call(this, props);
      }
  
      // 解除绑定
  
      _createClass(SettingCardPayYinlian, [{
          key: 'render',
          value: function render() {
              var _this6 = this;
  
              var ele = undefined;
  
              if (typeof this.props.data !== 'undefined' && this.props.data.enable) {
  
                  ele = _react2['default'].createElement(
                      'div',
                      null,
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-tit' },
                          '银联卡号：'
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-number' },
                          this.props.data.appid
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-btn' },
                          _react2['default'].createElement(
                              'a',
                              { className: 'settingcard-pay-text-btn-modify',
                                  onClick: function () {
                                      _this6.props.showUnionpay();
                                  } },
                              '修改'
                          ),
                          _react2['default'].createElement(SettingUinBind, {
                              type: 'wechat',
                              data: this.props.data,
                              reset: this.props.reset,
                              update: this.props.updateUnionpay })
                      )
                  );
              } else {
  
                  ele = _react2['default'].createElement(
                      'div',
                      null,
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-no' },
                          '未开通'
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'settingcard-pay-text-btn' },
                          _react2['default'].createElement(
                              'a',
                              { className: 'settingcard-pay-text-btn-modify',
                                  onClick: function () {
                                      _this6.props.showUnionpay();
                                  } },
                              '去绑定'
                          )
                      )
                  );
              }
  
              return _react2['default'].createElement(
                  _antd.Card,
                  { className: 'settingcard-pay-yinlian ' },
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-pay-img' },
                      _react2['default'].createElement('img', { src: 'https://ss2.baidu.com/73Z1bjeh1BF3odCf/it/u=2140305828,3479586947&fm=202&gp=0.jpg' })
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-pay-text' },
                      ele
                  )
              );
          }
      }]);
  
      return SettingCardPayYinlian;
  })(_react.Component);
  
  var SettingUinBind = (function (_Component8) {
      _inherits(SettingUinBind, _Component8);
  
      function SettingUinBind() {
          var _this7 = this;
  
          _classCallCheck(this, SettingUinBind);
  
          _get(Object.getPrototypeOf(SettingUinBind.prototype), 'constructor', this).apply(this, arguments);
  
          this.showConfirm = function () {
              confirm({
                  title: '是否解除绑定',
                  content: '是否解除绑定',
                  onOk: function onOk() {
  
                      var data = undefined;
  
                      switch (_this7.props.type) {
  
                          case 'aliPay':
  
                              data = {
                                  "account": "",
                                  "enable": false,
                                  "key": "",
                                  "pid": "",
                                  "useSys": true
                              };
  
                              break;
  
                          case 'wechat':
  
                              data = {
                                  "appid": "",
                                  "enable": false,
                                  "muchId": "",
                                  "muchKey": "",
                                  "secret": "",
                                  "useSys": true
                              };
  
                              break;
                      }
  
                      _this7.props.update(data);
                  },
                  onCancel: function onCancel() {
                      _this7.props.reset();
                  }
              });
          };
      }
  
      // 平台分享设置
  
      _createClass(SettingUinBind, [{
          key: 'render',
          value: function render() {
              return _react2['default'].createElement(
                  'a',
                  { className: 'settingcard-pay-text-btn-unbind', onClick: this.showConfirm },
                  '解除绑定'
              );
          }
      }]);
  
      return SettingUinBind;
  })(_react.Component);
  
  var SettingCardShare = (function (_Component9) {
      _inherits(SettingCardShare, _Component9);
  
      function SettingCardShare() {
          _classCallCheck(this, SettingCardShare);
  
          _get(Object.getPrototypeOf(SettingCardShare.prototype), 'constructor', this).apply(this, arguments);
      }
  
      _createClass(SettingCardShare, [{
          key: 'render',
          value: function render() {
              var _this8 = this;
  
              var _props$data2 = this.props.data;
              var _props$data2$shareTitle = _props$data2.shareTitle;
              var shareTitle = _props$data2$shareTitle === undefined ? this.props.data.share ? this.props.data.share.title : '' : _props$data2$shareTitle;
              var _props$data2$shareDesc = _props$data2.shareDesc;
              var shareDesc = _props$data2$shareDesc === undefined ? this.props.data.share ? this.props.data.share.desc : '' : _props$data2$shareDesc;
              var _props$data2$imgId = _props$data2.imgId;
              var imgId = _props$data2$imgId === undefined ? this.props.data.share ? this.props.data.share.imgId : '' : _props$data2$imgId;
  
              //分享图片
              var props = {
  
                  name: 'media',
                  showUploadList: false,
                  withCredentials: true,
                  //分享用地址
                  action: _commonUtilMedia2['default'].uploadShare,
  
                  onChange: function onChange(info) {
                      if (info.file.status !== 'uploading') {}
                      if (info.file.status === 'done') {
  
                          _this8.props.mallModify({
                              share: {
                                  /*title:'',
                                  desc:'',*/
                                  imgId: info.file.response.data,
                                  imgIdUrl: _commonUtilMedia2['default'].getMediaUrl(info.file.response.data)
                              }
                          });
                      } else if (info.file.status === 'error') {}
                  }
              };
  
              var popoverContainer = _react2['default'].createElement('img', { className: 'settingcard-p-imgmax',
                  src: _commonUtilMedia2['default'].getMediaUrl(imgId) });
  
              return _react2['default'].createElement(
                  'div',
                  null,
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-p' },
                      '分享标题：',
                      shareTitle,
                      _react2['default'].createElement(
                          'a',
                          { className: 'settingcard-p-edit', onClick: function () {
                                  _this8.props.showMallModify({
                                      type: 'shareTitle',
                                      title: '分享标题',
                                      value: shareTitle
                                  });
                              } },
                          '修改'
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-p' },
                      '分享摘要：',
                      shareDesc,
                      _react2['default'].createElement(
                          'a',
                          { className: 'settingcard-p-edit', onClick: function () {
                                  _this8.props.showMallModify({
                                      type: 'shareDesc',
                                      title: '分享摘要',
                                      value: shareDesc
                                  });
                              } },
                          '修改'
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'settingcard-p' },
                      '分享图片',
                      _react2['default'].createElement(
                          'span',
                          { style: { 'color': '#FF9900'
                              } },
                          '（请上传300*300的图片）'
                      ),
                      _react2['default'].createElement(
                          _antd.Upload,
                          _extends({}, props, { className: 'settingcard-p-edit' }),
                          imgId !== "" && _react2['default'].createElement(
                              'a',
                              null,
                              '重新上传'
                          ),
                          imgId == "" && _react2['default'].createElement(
                              'a',
                              null,
                              '上传图片'
                          )
                      )
                  ),
                  imgId !== "" && _react2['default'].createElement(
                      _antd.Popover,
                      { content: popoverContainer },
                      _react2['default'].createElement('img', { className: 'settingcard-p-img',
                          src: _commonUtilMedia2['default'].getMediaUrl(imgId) })
                  )
              );
          }
      }]);
  
      return SettingCardShare;
  })(_react.Component);
  
  module.exports = exports['default'];
  /**/ /**/

});
