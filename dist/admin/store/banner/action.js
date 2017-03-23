define('admin/store/banner/action', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports.getManagerBanner = getManagerBanner;
  exports.updateManagerBanner = updateManagerBanner;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  // 获取商城首页的广告条
  var GET_MANAGER_BANNER = 'GET_MANAGER_BANNER';
  exports.GET_MANAGER_BANNER = GET_MANAGER_BANNER;
  var GET_MANAGER_BANNER_PENDING = 'GET_MANAGER_BANNER_PENDING';
  exports.GET_MANAGER_BANNER_PENDING = GET_MANAGER_BANNER_PENDING;
  var GET_MANAGER_BANNER_SUCCESS = 'GET_MANAGER_BANNER_SUCCESS';
  exports.GET_MANAGER_BANNER_SUCCESS = GET_MANAGER_BANNER_SUCCESS;
  var GET_MANAGER_BANNER_FAILURE = 'GET_MANAGER_BANNER_FAILURE';
  
  exports.GET_MANAGER_BANNER_FAILURE = GET_MANAGER_BANNER_FAILURE;
  // 商城首页广告条服务
  var UPDATE_MANAGER_BANNER = 'UPDATE_MANAGER_BANNER';
  exports.UPDATE_MANAGER_BANNER = UPDATE_MANAGER_BANNER;
  var UPDATE_MANAGER_BANNER_PENDING = 'UPDATE_MANAGER_BANNER_PENDING';
  exports.UPDATE_MANAGER_BANNER_PENDING = UPDATE_MANAGER_BANNER_PENDING;
  var UPDATE_MANAGER_BANNER_SUCCESS = 'UPDATE_MANAGER_BANNER_SUCCESS';
  exports.UPDATE_MANAGER_BANNER_SUCCESS = UPDATE_MANAGER_BANNER_SUCCESS;
  var UPDATE_MANAGER_BANNER_FAILURE = 'UPDATE_MANAGER_BANNER_FAILURE';
  
  exports.UPDATE_MANAGER_BANNER_FAILURE = UPDATE_MANAGER_BANNER_FAILURE;
  //获取商城广告条
  
  function getManagerBanner(buyType) {
      return {
          type: GET_MANAGER_BANNER,
          payload: {
              promise: _commonHttp2['default'].get('manager/banner/buy/{buyType}', {
                  buyType: buyType
              })
          }
      };
  }
  
  //修改商城广告条
  
  function updateManagerBanner(buyType, data) {
      return {
          type: UPDATE_MANAGER_BANNER,
          payload: {
              promise: _commonHttp2['default'].post('manager/banner/buy/{buyType}', data, {
                  params: {
                      buyType: buyType
                  }
              })
          }
      };
  }

});
