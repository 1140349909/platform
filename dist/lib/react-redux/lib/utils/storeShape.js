define('node_modules/react-redux/lib/utils/storeShape', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _react = require('node_modules/react/react');
  
  exports["default"] = _react.PropTypes.shape({
    subscribe: _react.PropTypes.func.isRequired,
    dispatch: _react.PropTypes.func.isRequired,
    getState: _react.PropTypes.func.isRequired
  });

});
