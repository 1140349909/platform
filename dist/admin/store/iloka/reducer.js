define('admin/store/iloka/reducer', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var _reduxImmutablejs = require("node_modules/redux-immutablejs/lib/index");
  
  var _immutable = require("node_modules/immutable/dist/immutable");
  
  var _action = require("admin/store/iloka/action");
  
  var initialState = (0, _immutable.fromJS)({
      contentList: {}
  });
  
  exports["default"] = (0, _reduxImmutablejs.createReducer)(initialState, _defineProperty({}, _action.UPDATE_CONTENT_STATUS_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
      return state.set('contentList', payload.data);
  }));
  module.exports = exports["default"];
  
  // 更新资讯

});
