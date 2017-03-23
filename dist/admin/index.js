define('admin/index.jsx', function(require, exports, module) {

  'use strict';
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = require('node_modules/react-dom/index');
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _reactRedux = require('node_modules/react-redux/lib/index');
  
  var _reactRouter = require('node_modules/react-router/lib/index');
  
  var _reactRouterRedux = require('node_modules/react-router-redux/lib/index');
  
  var _storeConfigureStore = require('admin/store/configureStore');
  
  var _storeConfigureStore2 = _interopRequireDefault(_storeConfigureStore);
  
  var _route = require('admin/route/index.jsx');
  
  var _route2 = _interopRequireDefault(_route);
  
  '';
  
  //const routerHistory = browserHistory;
  var routerHistory = _reactRouter.hashHistory;
  
  var initialState = window.__INITIAL_STATE__;
  var store = (0, _storeConfigureStore2['default'])(initialState, routerHistory);
  
  var history = (0, _reactRouterRedux.syncHistoryWithStore)(routerHistory, store);
  
  _reactDom2['default'].render(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(
          _reactRouter.Router,
          { history: history },
          (0, _route2['default'])()
      )
  ), document.getElementById('app'));

});
