define('admin/store/coupon/action', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports.getCouponFaceValueList = getCouponFaceValueList;
  exports.getCouponList = getCouponList;
  exports.getCouponResList = getCouponResList;
  exports.updateCoupon = updateCoupon;
  exports.addCoupon = addCoupon;
  exports.deleteCoupon = deleteCoupon;
  exports.getCoupon = getCoupon;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  //删除优惠券
  var DELETE_COUPON = 'DELETE_COUPON';
  exports.DELETE_COUPON = DELETE_COUPON;
  var DELETE_COUPON_PENDING = 'DELETE_COUPON_PENDING';
  exports.DELETE_COUPON_PENDING = DELETE_COUPON_PENDING;
  var DELETE_COUPON_SUCCESS = 'DELETE_COUPON_SUCCESS';
  exports.DELETE_COUPON_SUCCESS = DELETE_COUPON_SUCCESS;
  var DELETE_COUPON_FAILURE = 'DELETE_COUPON_FAILURE';
  exports.DELETE_COUPON_FAILURE = DELETE_COUPON_FAILURE;
  // 优惠券面值列表
  var GET_COUPON_FACE_VALUE_LIST = 'GET_COUPON_FACE_VALUE_LIST';
  exports.GET_COUPON_FACE_VALUE_LIST = GET_COUPON_FACE_VALUE_LIST;
  var GET_COUPON_FACE_VALUE_LIST_PENDING = 'GET_COUPON_FACE_VALUE_LIST_PENDING';
  exports.GET_COUPON_FACE_VALUE_LIST_PENDING = GET_COUPON_FACE_VALUE_LIST_PENDING;
  var GET_COUPON_FACE_VALUE_LIST_SUCCESS = 'GET_COUPON_FACE_VALUE_LIST_SUCCESS';
  exports.GET_COUPON_FACE_VALUE_LIST_SUCCESS = GET_COUPON_FACE_VALUE_LIST_SUCCESS;
  var GET_COUPON_FACE_VALUE_LIST_FAILURE = 'GET_COUPON_FACE_VALUE_LIST_FAILURE';
  
  exports.GET_COUPON_FACE_VALUE_LIST_FAILURE = GET_COUPON_FACE_VALUE_LIST_FAILURE;
  // 优惠券列表
  var GET_COUPON_LIST = 'GET_COUPON_LIST';
  exports.GET_COUPON_LIST = GET_COUPON_LIST;
  var GET_COUPON_LIST_PENDING = 'GET_COUPON_LIST_PENDING';
  exports.GET_COUPON_LIST_PENDING = GET_COUPON_LIST_PENDING;
  var GET_COUPON_LIST_SUCCESS = 'GET_COUPON_LIST_SUCCESS';
  exports.GET_COUPON_LIST_SUCCESS = GET_COUPON_LIST_SUCCESS;
  var GET_COUPON_LIST_FAILURE = 'GET_COUPON_LIST_FAILURE';
  
  exports.GET_COUPON_LIST_FAILURE = GET_COUPON_LIST_FAILURE;
  // 优惠券资源绑定列表
  var GET_COUPON_RES_LIST = 'GET_COUPON_RES_LIST';
  exports.GET_COUPON_RES_LIST = GET_COUPON_RES_LIST;
  var GET_COUPON_RES_LIST_PENDING = 'GET_COUPON_RES_LIST_PENDING';
  exports.GET_COUPON_RES_LIST_PENDING = GET_COUPON_RES_LIST_PENDING;
  var GET_COUPON_RES_LIST_SUCCESS = 'GET_COUPON_RES_LIST_SUCCESS';
  exports.GET_COUPON_RES_LIST_SUCCESS = GET_COUPON_RES_LIST_SUCCESS;
  var GET_COUPON_RES_LIST_FAILURE = 'GET_COUPON_RES_LIST_FAILURE';
  
  exports.GET_COUPON_RES_LIST_FAILURE = GET_COUPON_RES_LIST_FAILURE;
  // 获取优惠券
  var GET_COUPON = 'GET_COUPON';
  exports.GET_COUPON = GET_COUPON;
  var GET_COUPON_PENDING = 'GET_COUPON_PENDING';
  exports.GET_COUPON_PENDING = GET_COUPON_PENDING;
  var GET_COUPON_SUCCESS = 'GET_COUPON_SUCCESS';
  exports.GET_COUPON_SUCCESS = GET_COUPON_SUCCESS;
  var GET_COUPON_FAILURE = 'GET_COUPON_FAILURE';
  
  exports.GET_COUPON_FAILURE = GET_COUPON_FAILURE;
  // 修改优惠券
  var UPDATE_COUPON = 'UPDATE_COUPON';
  exports.UPDATE_COUPON = UPDATE_COUPON;
  var UPDATE_COUPON_PENDING = 'UPDATE_COUPON_PENDING';
  exports.UPDATE_COUPON_PENDING = UPDATE_COUPON_PENDING;
  var UPDATE_COUPON_SUCCESS = 'UPDATE_COUPON_SUCCESS';
  exports.UPDATE_COUPON_SUCCESS = UPDATE_COUPON_SUCCESS;
  var UPDATE_COUPON_FAILURE = 'UPDATE_COUPON_FAILURE';
  
  exports.UPDATE_COUPON_FAILURE = UPDATE_COUPON_FAILURE;
  // 新增优惠券
  var ADD_COUPON = 'ADD_COUPON';
  exports.ADD_COUPON = ADD_COUPON;
  var ADD_COUPON_PENDING = 'ADD_COUPON_PENDING';
  exports.ADD_COUPON_PENDING = ADD_COUPON_PENDING;
  var ADD_COUPON_SUCCESS = 'ADD_COUPON_SUCCESS';
  exports.ADD_COUPON_SUCCESS = ADD_COUPON_SUCCESS;
  var ADD_COUPON_FAILURE = 'ADD_COUPON_FAILURE';
  
  exports.ADD_COUPON_FAILURE = ADD_COUPON_FAILURE;
  //优惠券面值列表
  
  function getCouponFaceValueList() {
      return {
          type: GET_COUPON_FACE_VALUE_LIST,
          payload: {
              promise: _commonHttp2['default'].get('manager/coupon/facevalue/list')
          }
      };
  }
  
  //优惠券列表
  
  function getCouponList(_ref) {
      var _ref$page = _ref.page;
      var page = _ref$page === undefined ? 0 : _ref$page;
      var _ref$size = _ref.size;
      var size = _ref$size === undefined ? 10 : _ref$size;
      var sort = _ref.sort;
      var order = _ref.order;
  
      return {
          type: GET_COUPON_LIST,
          payload: {
              promise: _commonHttp2['default'].get('manager/coupon/list', {
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
              })
          }
      };
  }
  
  //优惠券资源绑定列表
  
  function getCouponResList(_ref2) {
      var id = _ref2.id;
      var _ref2$page = _ref2.page;
      var page = _ref2$page === undefined ? 0 : _ref2$page;
      var _ref2$size = _ref2.size;
      var size = _ref2$size === undefined ? 10 : _ref2$size;
      var sort = _ref2.sort;
      var order = _ref2.order;
  
      return {
          type: GET_COUPON_RES_LIST,
          payload: {
              promise: _commonHttp2['default'].get('manager/coupon/res/list/{id}', {
                  id: id,
                  page: page,
                  size: size,
                  sort: sort,
                  order: order
              })
          }
      };
  }
  
  //修改优惠券
  /*var data = {
   id: '',
   para: {
   "perTotal": 0,
   "plusAmount": 0
   }
   };*/
  
  function updateCoupon(id, data) {
      return {
          type: UPDATE_COUPON,
          payload: {
              promise: _commonHttp2['default'].post('manager/coupon/{id}', data, {
                  params: {
                      id: id
                  }
              })
          }
      };
  }
  
  //新增优惠券
  /*var data = {
   para: {
   "couponType": "quota",
   "faceValue": 0,
   "name": "string",
   "rule": {
   "give": {
   "charge": {
   "enable": true,
   "min": 0
   },
   "period": {
   "dynamic": {
   "begin": 0,
   "enabel": true,
   "end": 0
   },
   "interval": {
   "enabel": true,
   "endDate": "2016-07-18T07:40:51.594Z",
   "startDate": "2016-07-18T07:40:51.594Z"
   }
   }
   },
   "receive": {
   "perTotal": 0
   }
   },
   "total": 0
   }
   };*/
  
  function addCoupon(data) {
      return {
          type: ADD_COUPON,
          payload: {
              promise: _commonHttp2['default'].post('manager/coupon', data)
          }
      };
  }
  
  // 删除优惠券
  
  function deleteCoupon(id) {
      return {
          type: DELETE_COUPON,
          payload: {
              promise: _commonHttp2['default']['delete']('manager/coupon/{id}', {
                  id: id
              })
          }
      };
  }
  
  //获取优惠券详情
  
  function getCoupon(id) {
      return {
          type: GET_COUPON,
          payload: {
              promise: _commonHttp2['default'].get('manager/coupon/{id}', {
                  id: id
              })
          }
      };
  }

});
