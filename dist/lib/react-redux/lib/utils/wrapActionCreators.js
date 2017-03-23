define('node_modules/react-redux/lib/utils/wrapActionCreators', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  exports["default"] = wrapActionCreators;
  
  var _redux = require('node_modules/redux/lib/index');
  
  function wrapActionCreators(actionCreators) {
    return function (dispatch) {
      return (0, _redux.bindActionCreators)(actionCreators, dispatch);
    };
  }

});
