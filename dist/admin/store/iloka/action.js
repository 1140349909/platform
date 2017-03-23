define('admin/store/iloka/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports.checkContent = checkContent;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  var _commonConfig = require("common/config/index");
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  /*艾乐卡*/
  var UPDATE_CONTENT_STATUS = 'UPDATE_CONTENT_STATUS';
  exports.UPDATE_CONTENT_STATUS = UPDATE_CONTENT_STATUS;
  var UPDATE_CONTENT_STATUS_PENDING = 'UPDATE_CONTENT_STATUS_PENDING';
  exports.UPDATE_CONTENT_STATUS_PENDING = UPDATE_CONTENT_STATUS_PENDING;
  var UPDATE_CONTENT_STATUS_SUCCESS = 'UPDATE_CONTENT_STATUS_SUCCESS';
  exports.UPDATE_CONTENT_STATUS_SUCCESS = UPDATE_CONTENT_STATUS_SUCCESS;
  var UPDATE_CONTENT_STATUS_FAILURE = 'UPDATE_CONTENT_STATUS_FAILURE';
  
  exports.UPDATE_CONTENT_STATUS_FAILURE = UPDATE_CONTENT_STATUS_FAILURE;
  // 查询资讯状态
  
  function checkContent(data) {
      return {
          type: UPDATE_CONTENT_STATUS,
          payload: {
              promise: _commonHttp2["default"].post(_commonConfig2["default"].API_ILOKA_URL + '/manager/content/status/list', data)
          }
      };
  }

});
