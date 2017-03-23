define('node_modules/react/lib/ReactNodeTypes', function(require, exports, module) {

  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactNodeTypes
   * 
   */
  
  'use strict';
  
  var _prodInvariant = require('node_modules/react/lib/reactProdInvariant');
  
  var ReactElement = require('node_modules/react/lib/ReactElement');
  
  var invariant = require('node_modules/fbjs/lib/invariant');
  
  var ReactNodeTypes = {
    HOST: 0,
    COMPOSITE: 1,
    EMPTY: 2,
  
    getType: function (node) {
      if (node === null || node === false) {
        return ReactNodeTypes.EMPTY;
      } else if (ReactElement.isValidElement(node)) {
        if (typeof node.type === 'function') {
          return ReactNodeTypes.COMPOSITE;
        } else {
          return ReactNodeTypes.HOST;
        }
      }
      !false ? 'development' !== 'production' ? invariant(false, 'Unexpected node: %s', node) : _prodInvariant('26', node) : void 0;
    }
  };
  
  module.exports = ReactNodeTypes;

});
