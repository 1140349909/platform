define('common/util/media', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _commonConfig = require('common/config/index');
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  exports['default'] = {
  
      // 图片上传
      upLoad: _commonConfig2['default'].API_BASE_URL + '/media/platform/res',
  
      customerDataImport: _commonConfig2['default'].API_BASE_URL + '/customer/employee/data/import/',
  
      customerStoreImport: _commonConfig2['default'].API_BASE_URL + '/customer/store/data/import/',
  
      // 广告条图片上传
      upLoadBanner: _commonConfig2['default'].API_BASE_URL + '/media/users/banner',
  
      // 分享类图片上传
      uploadShare: _commonConfig2['default'].API_BASE_URL + '/media/users/share',
  
      // 维码获取
      getQrcodeUrl: function getQrcodeUrl(width, height, content) {
          return _commonConfig2['default'].API_BASE_URL + '/media/qrcode/' + width + '/' + height + '?content=' + content;
      },
  
      // 获取图片
      getMediaUrl: function getMediaUrl(mediaId) {
          if (mediaId) {
              return _commonConfig2['default'].MEDIA_BASE_URL + '/media/image/' + mediaId;
          } else {
              return '';
          }
      },
  
      // 获取支付证书上传地址
      getUploadCertUrl: function getUploadCertUrl(type) {
          return _commonConfig2['default'].MEDIA_BASE_URL + '/admin/customer/cert/' + type;
      }
  };
  module.exports = exports['default'];

});
