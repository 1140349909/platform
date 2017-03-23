define('admin/store/withdraw/reducer', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var _reduxImmutablejs = require("node_modules/redux-immutablejs/lib/index");
  
  var _immutable = require("node_modules/immutable/dist/immutable");
  
  var _action = require("admin/store/withdraw/action");
  
  var initialState = (0, _immutable.fromJS)({
      data: {}
  });
  
  exports["default"] = (0, _reduxImmutablejs.createReducer)(initialState, _defineProperty({}, _action.GET_MANAGER_WITHDRAW_LIST_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
      return state.set('data', payload.data);
  }));
  module.exports = exports["default"];
  
  // 获取提现列表

});
