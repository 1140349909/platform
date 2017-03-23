define('node_modules/echarts/lib/chart/graph/simpleLayoutHelper', function(require, exports, module) {

  
  
      var simpleLayoutEdge = require('node_modules/echarts/lib/chart/graph/simpleLayoutEdge');
  
      module.exports = function (seriesModel) {
          var coordSys = seriesModel.coordinateSystem;
          if (coordSys && coordSys.type !== 'view') {
              return;
          }
          var graph = seriesModel.getGraph();
  
          graph.eachNode(function (node) {
              var model = node.getModel();
              node.setLayout([+model.get('x'), +model.get('y')]);
          });
  
          simpleLayoutEdge(graph);
      };
  

});
