define('common/config/constants', function(require, exports, module) {

  /**
   * Created by Asoiso on 16/8/18.
   */
  // 常量库
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  var PROMISE_TYPE_SUFFIX = {
      'PENDING': 'PENDING',
      'SUCCESS': 'SUCCESS',
      'FAILURE': 'FAILURE'
  };
  
  exports.PROMISE_TYPE_SUFFIX = PROMISE_TYPE_SUFFIX;
  // 角色等级
  var ROLE = {
      // 游客
      VISITOR: 0,
      // 会员
      MEMBER: 10,
      // 用户
      USER: 20,
      // 运营
      MANAGER: 30,
      // 管理
      ADMIN: 40,
      // 运维
      PLATFORM: 100
  };
  exports.ROLE = ROLE;

});
