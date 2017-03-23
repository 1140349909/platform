define('admin/store/tker/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports.getManagerTkerList = getManagerTkerList;
  exports.getManagerTkerProfit = getManagerTkerProfit;
  exports.getManagerTkerSubMember = getManagerTkerSubMember;
  exports.getManagerTkerConfig = getManagerTkerConfig;
  exports.updateManagerTkerConfig = updateManagerTkerConfig;
  exports.getManagerTkerProductTop = getManagerTkerProductTop;
  exports.getManagerTkerMemberTop = getManagerTkerMemberTop;
  exports.getManagerTkerDataTotal = getManagerTkerDataTotal;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  var _commonConfig = require("common/config/index");
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  /*平台推客分销接口服务：tker*/
  
  // 获取分销分润设置
  var GET_MANAGER_TKER_CONFIG = 'GET_MANAGER_TKER_CONFIG';
  exports.GET_MANAGER_TKER_CONFIG = GET_MANAGER_TKER_CONFIG;
  var GET_MANAGER_TKER_CONFIG_PENDING = 'GET_MANAGER_TKER_CONFIG_PENDING';
  exports.GET_MANAGER_TKER_CONFIG_PENDING = GET_MANAGER_TKER_CONFIG_PENDING;
  var GET_MANAGER_TKER_CONFIG_SUCCESS = 'GET_MANAGER_TKER_CONFIG_SUCCESS';
  exports.GET_MANAGER_TKER_CONFIG_SUCCESS = GET_MANAGER_TKER_CONFIG_SUCCESS;
  var GET_MANAGER_TKER_CONFIG_FAILURE = 'GET_MANAGER_TKER_CONFIG_FAILURE';
  exports.GET_MANAGER_TKER_CONFIG_FAILURE = GET_MANAGER_TKER_CONFIG_FAILURE;
  // 获取分销会员
  var GET_MANAGER_TKER_LIST = 'GET_MANAGER_TKER_LIST';
  exports.GET_MANAGER_TKER_LIST = GET_MANAGER_TKER_LIST;
  var GET_MANAGER_TKER_LIST_PENDING = 'GET_MANAGER_TKER_LIST_PENDING';
  exports.GET_MANAGER_TKER_LIST_PENDING = GET_MANAGER_TKER_LIST_PENDING;
  var GET_MANAGER_TKER_LIST_SUCCESS = 'GET_MANAGER_TKER_LIST_SUCCESS';
  exports.GET_MANAGER_TKER_LIST_SUCCESS = GET_MANAGER_TKER_LIST_SUCCESS;
  var GET_MANAGER_TKER_LIST_FAILURE = 'GET_MANAGER_TKER_LIST_FAILURE';
  exports.GET_MANAGER_TKER_LIST_FAILURE = GET_MANAGER_TKER_LIST_FAILURE;
  // 获取分销会员收益提成
  var GET_MANAGER_TKER_PROFIT = 'GET_MANAGER_TKER_PROFIT';
  exports.GET_MANAGER_TKER_PROFIT = GET_MANAGER_TKER_PROFIT;
  var GET_MANAGER_TKER_PROFIT_PENDING = 'GET_MANAGER_TKER_PROFIT_PENDING';
  exports.GET_MANAGER_TKER_PROFIT_PENDING = GET_MANAGER_TKER_PROFIT_PENDING;
  var GET_MANAGER_TKER_PROFIT_SUCCESS = 'GET_MANAGER_TKER_PROFIT_SUCCESS';
  exports.GET_MANAGER_TKER_PROFIT_SUCCESS = GET_MANAGER_TKER_PROFIT_SUCCESS;
  var GET_MANAGER_TKER_PROFIT_FAILURE = 'GET_MANAGER_TKER_PROFIT_FAILURE';
  
  exports.GET_MANAGER_TKER_PROFIT_FAILURE = GET_MANAGER_TKER_PROFIT_FAILURE;
  // 获取分销会员集客
  var GET_MANAGER_TKER_SUB_MEMBER = 'GET_MANAGER_TKER_SUB_MEMBER';
  exports.GET_MANAGER_TKER_SUB_MEMBER = GET_MANAGER_TKER_SUB_MEMBER;
  var GET_MANAGER_TKER_SUB_MEMBER_PENDING = 'GET_MANAGER_TKER_SUB_MEMBER_PENDING';
  exports.GET_MANAGER_TKER_SUB_MEMBER_PENDING = GET_MANAGER_TKER_SUB_MEMBER_PENDING;
  var GET_MANAGER_TKER_SUB_MEMBER_SUCCESS = 'GET_MANAGER_TKER_SUB_MEMBER_SUCCESS';
  exports.GET_MANAGER_TKER_SUB_MEMBER_SUCCESS = GET_MANAGER_TKER_SUB_MEMBER_SUCCESS;
  var GET_MANAGER_TKER_SUB_MEMBER_FAILURE = 'GET_MANAGER_TKER_SUB_MEMBER_FAILURE';
  
  exports.GET_MANAGER_TKER_SUB_MEMBER_FAILURE = GET_MANAGER_TKER_SUB_MEMBER_FAILURE;
  // 配置分销分润设置服务
  var UPDATE_MANAGER_TKER_CONFIG = 'UPDATE_MANAGER_TKER_CONFIG';
  exports.UPDATE_MANAGER_TKER_CONFIG = UPDATE_MANAGER_TKER_CONFIG;
  var UPDATE_MANAGER_TKER_CONFIG_PENDING = 'UPDATE_MANAGER_TKER_CONFIG_PENDING';
  exports.UPDATE_MANAGER_TKER_CONFIG_PENDING = UPDATE_MANAGER_TKER_CONFIG_PENDING;
  var UPDATE_MANAGER_TKER_CONFIG_SUCCESS = 'UPDATE_MANAGER_TKER_CONFIG_SUCCESS';
  exports.UPDATE_MANAGER_TKER_CONFIG_SUCCESS = UPDATE_MANAGER_TKER_CONFIG_SUCCESS;
  var UPDATE_MANAGER_TKER_CONFIG_FAILURE = 'UPDATE_MANAGER_TKER_CONFIG_FAILURE';
  
  exports.UPDATE_MANAGER_TKER_CONFIG_FAILURE = UPDATE_MANAGER_TKER_CONFIG_FAILURE;
  /*平台推客分销接口服务：完*/
  
  // 获取客户分销平台商品TOP榜
  var GET_MANAGER_TKER_PRODUCT_TOP = 'GET_MANAGER_TKER_PRODUCT_TOP';
  exports.GET_MANAGER_TKER_PRODUCT_TOP = GET_MANAGER_TKER_PRODUCT_TOP;
  var GET_MANAGER_TKER_PRODUCT_TOP_SUCCESS = 'GET_MANAGER_TKER_PRODUCT_TOP_SUCCESS';
  exports.GET_MANAGER_TKER_PRODUCT_TOP_SUCCESS = GET_MANAGER_TKER_PRODUCT_TOP_SUCCESS;
  var GET_MANAGER_TKER_PRODUCT_TOP_PENDING = 'GET_MANAGER_TKER_PRODUCT_TOP_PENDING';
  exports.GET_MANAGER_TKER_PRODUCT_TOP_PENDING = GET_MANAGER_TKER_PRODUCT_TOP_PENDING;
  var GET_MANAGER_TKER_PRODUCT_TOP_FAILURE = 'GET_MANAGER_TKER_PRODUCT_TOP_FAILURE';
  
  exports.GET_MANAGER_TKER_PRODUCT_TOP_FAILURE = GET_MANAGER_TKER_PRODUCT_TOP_FAILURE;
  // 获取客户分销平台会员TOP榜
  var GET_MANAGER_TKER_MEMBER_TOP = 'GET_MANAGER_TKER_MEMBER_TOP';
  exports.GET_MANAGER_TKER_MEMBER_TOP = GET_MANAGER_TKER_MEMBER_TOP;
  var GET_MANAGER_TKER_MEMBER_TOP_SUCCESS = 'GET_MANAGER_TKER_MEMBER_TOP_SUCCESS';
  exports.GET_MANAGER_TKER_MEMBER_TOP_SUCCESS = GET_MANAGER_TKER_MEMBER_TOP_SUCCESS;
  var GET_MANAGER_TKER_MEMBER_TOP_PENDING = 'GET_MANAGER_TKER_MEMBER_TOP_PENDING';
  exports.GET_MANAGER_TKER_MEMBER_TOP_PENDING = GET_MANAGER_TKER_MEMBER_TOP_PENDING;
  var GET_MANAGER_TKER_MEMBER_TOP_FAILURE = 'GET_MANAGER_TKER_MEMBER_TOP_FAILURE';
  
  exports.GET_MANAGER_TKER_MEMBER_TOP_FAILURE = GET_MANAGER_TKER_MEMBER_TOP_FAILURE;
  // 获取客户分销平台汇总数据
  var GET_MANAGER_TKER_DATA_TOTAL = 'GET_MANAGER_TKER_DATA_TOTAL';
  exports.GET_MANAGER_TKER_DATA_TOTAL = GET_MANAGER_TKER_DATA_TOTAL;
  var GET_MANAGER_TKER_DATA_TOTAL_SUCCESS = 'GET_MANAGER_TKER_DATA_TOTAL_SUCCESS';
  exports.GET_MANAGER_TKER_DATA_TOTAL_SUCCESS = GET_MANAGER_TKER_DATA_TOTAL_SUCCESS;
  var GET_MANAGER_TKER_DATA_TOTAL_PENDING = 'GET_MANAGER_TKER_DATA_TOTAL_PENDING';
  exports.GET_MANAGER_TKER_DATA_TOTAL_PENDING = GET_MANAGER_TKER_DATA_TOTAL_PENDING;
  var GET_MANAGER_TKER_DATA_TOTAL_FAILURE = 'GET_MANAGER_TKER_DATA_TOTAL_FAILURE';
  
  exports.GET_MANAGER_TKER_DATA_TOTAL_FAILURE = GET_MANAGER_TKER_DATA_TOTAL_FAILURE;
  //获取所有已经开通分销功能的会员
  
  function getManagerTkerList(_ref) {
      var mobile = _ref.mobile;
      var _ref$page = _ref.page;
      var page = _ref$page === undefined ? 0 : _ref$page;
      var _ref$size = _ref.size;
      var size = _ref$size === undefined ? 10 : _ref$size;
      var sort = _ref.sort;
      var order = _ref.order;
  
      return {
          type: GET_MANAGER_TKER_LIST,
          payload: {
              promise: _commonHttp2["default"].get(_commonConfig2["default"].API_ROOT + '/manager/tker/member/list', {
  
                  mobile: mobile,
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
  
              })
          }
      };
  }
  
  //获取分销会员红利提成
  
  function getManagerTkerProfit(_ref2) {
      var id = _ref2.id;
      var level = _ref2.level;
      var _ref2$page = _ref2.page;
      var page = _ref2$page === undefined ? 0 : _ref2$page;
      var _ref2$size = _ref2.size;
      var size = _ref2$size === undefined ? 10 : _ref2$size;
      var sort = _ref2.sort;
      var order = _ref2.order;
  
      return {
          type: GET_MANAGER_TKER_PROFIT,
          payload: {
              promise: _commonHttp2["default"].get(_commonConfig2["default"].API_ROOT + '/manager/tker/member/profit/list/{id}', {
                  id: id,
                  level: level,
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
  
              })
          }
      };
  }
  
  //获取分销会员集客
  
  function getManagerTkerSubMember(_ref3) {
      var memberId = _ref3.memberId;
      var mobile = _ref3.mobile;
      var _ref3$page = _ref3.page;
      var page = _ref3$page === undefined ? 0 : _ref3$page;
      var _ref3$size = _ref3.size;
      var size = _ref3$size === undefined ? 10 : _ref3$size;
      var sort = _ref3.sort;
      var order = _ref3.order;
  
      return {
          type: GET_MANAGER_TKER_SUB_MEMBER,
          payload: {
              promise: _commonHttp2["default"].get(_commonConfig2["default"].API_ROOT + '/manager/tker/member/sub/list/{memberId}', {
                  memberId: memberId,
                  mobile: mobile,
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
  
              })
          }
      };
  }
  
  //获取当前客户的分销分润设置
  
  function getManagerTkerConfig() {
      return {
          type: GET_MANAGER_TKER_CONFIG,
          payload: {
              promise: _commonHttp2["default"].get(_commonConfig2["default"].API_ROOT + '/manager/tker/config')
          }
      };
  }
  
  //配置当前客户的分销分润设置
  
  function updateManagerTkerConfig(data) {
      return {
          type: UPDATE_MANAGER_TKER_CONFIG,
          payload: {
              promise: _commonHttp2["default"].post(_commonConfig2["default"].API_ROOT + '/manager/tker/config', data)
          }
      };
  }
  
  // 获取客户分销平台商品TOP榜
  
  function getManagerTkerProductTop() {
      var top = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
  
      var type = 'product';
      return {
          type: GET_MANAGER_TKER_PRODUCT_TOP,
          payload: {
              promise: _commonHttp2["default"].get(_commonConfig2["default"].API_ROOT + '/manager/tker/data/top/{type}/{top}', {
                  type: type,
                  top: top
              })
          }
      };
  }
  
  // 获取客户分销平台会员TOP榜
  
  function getManagerTkerMemberTop() {
      var top = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
  
      var type = 'member';
      return {
          type: GET_MANAGER_TKER_MEMBER_TOP,
          payload: {
              promise: _commonHttp2["default"].get(_commonConfig2["default"].API_ROOT + '/manager/tker/data/top/{type}/{top}', {
                  type: type,
                  top: top
              })
          }
      };
  }
  
  // 获取客户分销平台汇总数据
  
  function getManagerTkerDataTotal(para) {
      return {
          type: GET_MANAGER_TKER_DATA_TOTAL,
          payload: {
              promise: _commonHttp2["default"].get(_commonConfig2["default"].API_ROOT + '/manager/tker/data/total')
          }
      };
  }

});
