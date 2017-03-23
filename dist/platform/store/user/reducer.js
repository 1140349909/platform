define('platform/store/user/reducer', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var _reduxImmutablejs = require('node_modules/redux-immutablejs/lib/index');
  
  var _immutable = require('node_modules/immutable/dist/immutable');
  
  var _action = require('platform/store/user/action');
  
  var initialState = (0, _immutable.fromJS)({
      list: {}
  });
  
  exports['default'] = (0, _reduxImmutablejs.createReducer)(initialState, _defineProperty({}, _action.GET_USERS_SUCCESS, function (state, _ref) {
      var payload = _ref.payload;
      return state.set("list", payload.data);
  }));
  module.exports = exports['default'];

});
