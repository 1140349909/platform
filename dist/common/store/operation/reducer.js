define('common/store/operation/reducer', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports['default'] = operation;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _reduxImmutablejs = require('node_modules/redux-immutablejs/lib/index');
  
  var _immutable = require('node_modules/immutable/dist/immutable');
  
  var _commonConfig = require('common/config/index');
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  var _antd = require('node_modules/antd/dist/antd');
  
  var _action = require('common/store/operation/action');
  
  // 操作快照
  var initialState = {
      // 操作类型
      type: '',
  
      // 操作状态
      status: '', //PENDING | SUCCESS | FAILURE
  
      // 是否正在操作
      pending: false, // status == 'PENDING'
      // 是否操作成功
      success: false, // status == 'SUCCESS'
      // 是否操作失败
      failure: false, // status == 'FAILURE'
  
      // 操作参数
      params: {},
      // 操作结果
      data: {},
      // 操作错误码
      errCode: 0,
      // 操作错误信息
      errMsg: ''
  };
  
  // 操作快照每个接口都会触发,考虑到性能问题此处不转换为immutable对象,使用最原始的写法
  
  function operation(state, action) {
      if (state === undefined) state = initialState;
  
      switch (action.type) {
          // 正在操作
          case _action.OPERATION_PENDING:
              // console.log(OPERATION_PENDING, action)
              return action.payload;
  
          // 操作成功
          case _action.OPERATION_SUCCESS:
              // console.log(OPERATION_SUCCESS, action)
              return action.payload;
  
          // 操作失败
          case _action.OPERATION_FAILURE:
              // console.log(OPERATION_FAILURE, action)
  
              // TODO: code要集中起来
              var error = action.payload;
              if (error.errCode == 40001) {
                  return location.replace(_commonConfig2['default'].SSO_URL);
              }
  
              // TODO: 错误处理要剥离出来
              _antd.notification['error']({
                  message: '业务错误:' + error.errCode,
                  description: error.errMsg
              });
              return action.payload;
      }
      return state;
  }
  
  module.exports = exports['default'];

});
