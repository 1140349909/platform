define('node_modules/echarts/lib/component/tooltip', function(require, exports, module) {

  // FIXME Better way to pack data in graphic element
  
  
      require('node_modules/echarts/lib/component/tooltip/TooltipModel');
  
      require('node_modules/echarts/lib/component/tooltip/TooltipView');
  
      // Show tip action
      /**
       * @action
       * @property {string} type
       * @property {number} seriesIndex
       * @property {number} dataIndex
       * @property {number} [x]
       * @property {number} [y]
       */
      require('node_modules/echarts/lib/echarts').registerAction(
          {
              type: 'showTip',
              event: 'showTip',
              update: 'none'
          },
          // noop
          function () {}
      );
      // Hide tip action
      require('node_modules/echarts/lib/echarts').registerAction(
          {
              type: 'hideTip',
              event: 'hideTip',
              update: 'none'
          },
          // noop
          function () {}
      );
  

});
