define('node_modules/react/lib/ReactInvalidSetStateWarningDevTool', function(require, exports, module) {

  /**
   * Copyright 2016-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactInvalidSetStateWarningDevTool
   */
  
  'use strict';
  
  var warning = require('node_modules/fbjs/lib/warning');
  
  if ('development' !== 'production') {
    var processingChildContext = false;
  
    var warnInvalidSetState = function () {
      'development' !== 'production' ? warning(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()') : void 0;
    };
  }
  
  var ReactInvalidSetStateWarningDevTool = {
    onBeginProcessingChildContext: function () {
      processingChildContext = true;
    },
    onEndProcessingChildContext: function () {
      processingChildContext = false;
    },
    onSetState: function () {
      warnInvalidSetState();
    }
  };
  
  module.exports = ReactInvalidSetStateWarningDevTool;

});
