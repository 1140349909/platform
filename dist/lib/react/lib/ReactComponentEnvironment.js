define('node_modules/react/lib/ReactComponentEnvironment', function(require, exports, module) {

  /**
   * Copyright 2014-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactComponentEnvironment
   */
  
  'use strict';
  
  var _prodInvariant = require('node_modules/react/lib/reactProdInvariant');
  
  var invariant = require('node_modules/fbjs/lib/invariant');
  
  var injected = false;
  
  var ReactComponentEnvironment = {
  
    /**
     * Optionally injectable environment dependent cleanup hook. (server vs.
     * browser etc). Example: A browser system caches DOM nodes based on component
     * ID and must remove that cache entry when this instance is unmounted.
     */
    unmountIDFromEnvironment: null,
  
    /**
     * Optionally injectable hook for swapping out mount images in the middle of
     * the tree.
     */
    replaceNodeWithMarkup: null,
  
    /**
     * Optionally injectable hook for processing a queue of child updates. Will
     * later move into MultiChildComponents.
     */
    processChildrenUpdates: null,
  
    injection: {
      injectEnvironment: function (environment) {
        !!injected ? 'development' !== 'production' ? invariant(false, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : _prodInvariant('104') : void 0;
        ReactComponentEnvironment.unmountIDFromEnvironment = environment.unmountIDFromEnvironment;
        ReactComponentEnvironment.replaceNodeWithMarkup = environment.replaceNodeWithMarkup;
        ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
        injected = true;
      }
    }
  
  };
  
  module.exports = ReactComponentEnvironment;

});
