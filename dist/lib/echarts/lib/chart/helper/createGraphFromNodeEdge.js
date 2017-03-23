define('node_modules/echarts/lib/chart/helper/createGraphFromNodeEdge', function(require, exports, module) {

  
  
      var List = require('node_modules/echarts/lib/data/List');
      var Graph = require('node_modules/echarts/lib/data/Graph');
      var linkList = require('node_modules/echarts/lib/data/helper/linkList');
      var completeDimensions = require('node_modules/echarts/lib/data/helper/completeDimensions');
      var CoordinateSystem = require('node_modules/echarts/lib/CoordinateSystem');
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var createListFromArray = require('node_modules/echarts/lib/chart/helper/createListFromArray');
  
      module.exports = function (nodes, edges, hostModel, directed, beforeLink) {
          var graph = new Graph(directed);
          for (var i = 0; i < nodes.length; i++) {
              graph.addNode(zrUtil.retrieve(
                  // Id, name, dataIndex
                  nodes[i].id, nodes[i].name, i
              ), i);
          }
  
          var linkNameList = [];
          var validEdges = [];
          var linkCount = 0;
          for (var i = 0; i < edges.length; i++) {
              var link = edges[i];
              var source = link.source;
              var target = link.target;
              // addEdge may fail when source or target not exists
              if (graph.addEdge(source, target, linkCount)) {
                  validEdges.push(link);
                  linkNameList.push(zrUtil.retrieve(link.id, source + ' > ' + target));
                  linkCount++;
              }
          }
  
          var coordSys = hostModel.get('coordinateSystem');
          var nodeData;
          if (coordSys === 'cartesian2d' || coordSys === 'polar') {
              nodeData = createListFromArray(nodes, hostModel, hostModel.ecModel);
          }
          else {
              // FIXME
              var coordSysCtor = CoordinateSystem.get(coordSys);
              // FIXME
              var dimensionNames = completeDimensions(
                  ((coordSysCtor && coordSysCtor.type !== 'view') ? (coordSysCtor.dimensions || []) : []).concat(['value']),
                  nodes
              );
              nodeData = new List(dimensionNames, hostModel);
              nodeData.initData(nodes);
          }
  
          var edgeData = new List(['value'], hostModel);
          edgeData.initData(validEdges, linkNameList);
  
          beforeLink && beforeLink(nodeData, edgeData);
  
          linkList({
              mainData: nodeData,
              struct: graph,
              structAttr: 'graph',
              datas: {node: nodeData, edge: edgeData},
              datasAttr: {node: 'data', edge: 'edgeData'}
          });
  
          // Update dataIndex of nodes and edges because invalid edge may be removed
          graph.update();
  
          return graph;
      };
  

});
