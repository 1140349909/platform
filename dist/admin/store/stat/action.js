define('admin/store/stat/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports.getDataProductTotalSales = getDataProductTotalSales;
  exports.getDataProductSalesMall = getDataProductSalesMall;
  exports.getDataProductSalesYyg = getDataProductSalesYyg;
  exports.getDataProductSales = getDataProductSales;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _commonHttp = require("common/http/index");
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  var _commonConfig = require("common/config/index");
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  /*平台交易数据分析中心：sales*/
  
  // 总计销售统计数据
  var GET_DATA_PRODUCT_TOTAL_SALES = 'GET_DATA_PRODUCT_TOTAL_SALES';
  exports.GET_DATA_PRODUCT_TOTAL_SALES = GET_DATA_PRODUCT_TOTAL_SALES;
  var GET_DATA_PRODUCT_TOTAL_SALES_PENDING = 'GET_DATA_PRODUCT_TOTAL_SALES_PENDING';
  exports.GET_DATA_PRODUCT_TOTAL_SALES_PENDING = GET_DATA_PRODUCT_TOTAL_SALES_PENDING;
  var GET_DATA_PRODUCT_TOTAL_SALES_SUCCESS = 'GET_DATA_PRODUCT_TOTAL_SALES_SUCCESS';
  exports.GET_DATA_PRODUCT_TOTAL_SALES_SUCCESS = GET_DATA_PRODUCT_TOTAL_SALES_SUCCESS;
  var GET_DATA_PRODUCT_TOTAL_SALES_FAILURE = 'GET_DATA_PRODUCT_TOTAL_SALES_FAILURE';
  exports.GET_DATA_PRODUCT_TOTAL_SALES_FAILURE = GET_DATA_PRODUCT_TOTAL_SALES_FAILURE;
  // 获取销售统计数据
  var GET_DATA_PRODUCT_SALES = 'GET_DATA_PRODUCT_SALES';
  exports.GET_DATA_PRODUCT_SALES = GET_DATA_PRODUCT_SALES;
  var GET_DATA_PRODUCT_SALES_PENDING = 'GET_DATA_PRODUCT_SALES_PENDING';
  exports.GET_DATA_PRODUCT_SALES_PENDING = GET_DATA_PRODUCT_SALES_PENDING;
  var GET_DATA_PRODUCT_SALES_SUCCESS = 'GET_DATA_PRODUCT_SALES_SUCCESS';
  exports.GET_DATA_PRODUCT_SALES_SUCCESS = GET_DATA_PRODUCT_SALES_SUCCESS;
  var GET_DATA_PRODUCT_SALES_FAILURE = 'GET_DATA_PRODUCT_SALES_FAILURE';
  exports.GET_DATA_PRODUCT_SALES_FAILURE = GET_DATA_PRODUCT_SALES_FAILURE;
  // 获取商品销售统计数据
  var GET_DATA_PRODUCT_SALES_MALL = 'GET_DATA_PRODUCT_SALES_MALL';
  exports.GET_DATA_PRODUCT_SALES_MALL = GET_DATA_PRODUCT_SALES_MALL;
  var GET_DATA_PRODUCT_SALES_MALL_SUCCESS = 'GET_DATA_PRODUCT_SALES_MALL_SUCCESS';
  exports.GET_DATA_PRODUCT_SALES_MALL_SUCCESS = GET_DATA_PRODUCT_SALES_MALL_SUCCESS;
  var GET_DATA_PRODUCT_SALES_MALL_PENDING = 'GET_DATA_PRODUCT_SALES_MALL_PENDING';
  exports.GET_DATA_PRODUCT_SALES_MALL_PENDING = GET_DATA_PRODUCT_SALES_MALL_PENDING;
  var GET_DATA_PRODUCT_SALES_MALL_FAILURE = 'GET_DATA_PRODUCT_SALES_MALL_FAILURE';
  exports.GET_DATA_PRODUCT_SALES_MALL_FAILURE = GET_DATA_PRODUCT_SALES_MALL_FAILURE;
  // 获取一元购商品销售统计数据
  var GET_DATA_PRODUCT_SALES_YYG = 'GET_DATA_PRODUCT_SALES_YYG';
  exports.GET_DATA_PRODUCT_SALES_YYG = GET_DATA_PRODUCT_SALES_YYG;
  var GET_DATA_PRODUCT_SALES_YYG_SUCCESS = 'GET_DATA_PRODUCT_SALES_YYG_SUCCESS';
  exports.GET_DATA_PRODUCT_SALES_YYG_SUCCESS = GET_DATA_PRODUCT_SALES_YYG_SUCCESS;
  var GET_DATA_PRODUCT_SALES_YYG_PENDING = 'GET_DATA_PRODUCT_SALES_YYG_PENDING';
  exports.GET_DATA_PRODUCT_SALES_YYG_PENDING = GET_DATA_PRODUCT_SALES_YYG_PENDING;
  var GET_DATA_PRODUCT_SALES_YYG_FAILURE = 'GET_DATA_PRODUCT_SALES_YYG_FAILURE';
  
  exports.GET_DATA_PRODUCT_SALES_YYG_FAILURE = GET_DATA_PRODUCT_SALES_YYG_FAILURE;
  /*平台交易数据分析中心：完*/
  
  // 统计商城/一元购销售数据
  
  function getDataProductTotalSales(type) {
      return {
          type: GET_DATA_PRODUCT_TOTAL_SALES,
          payload: {
              promise: _commonHttp2["default"].get('manager/data/{buyType}/total', {
                  buyType: type
              })
          }
      };
  }
  
  // 获取商品销售统计数据
  
  function getDataProductSalesMall(_ref) {
      var id = _ref.id;
      var dateRange = _ref.dateRange;
      var startDate = _ref.startDate;
      var enDate = _ref.enDate;
  
      return {
          type: GET_DATA_PRODUCT_SALES_MALL,
          payload: {
              promise: _commonHttp2["default"].get('manager/data/product/sales/mall/{id}', {
                  id: id,
                  dateRange: dateRange,
                  startDate: startDate,
                  enDate: enDate
              })
          }
      };
  }
  
  // 获取一元购商品销售统计数据
  
  function getDataProductSalesYyg(_ref2) {
      var id = _ref2.id;
      var dateRange = _ref2.dateRange;
      var startDate = _ref2.startDate;
      var enDate = _ref2.enDate;
  
      return {
          type: GET_DATA_PRODUCT_SALES_YYG,
          payload: {
              promise: _commonHttp2["default"].get('manager/data/product/sales/yyg/{id}', {
                  id: id,
                  dateRange: dateRange,
                  startDate: startDate,
                  enDate: enDate
              })
          }
      };
  }
  
  // 获取商品统计
  
  function getDataProductSales(_ref3) {
      var id = _ref3.id;
      var dateRange = _ref3.dateRange;
      var startDate = _ref3.startDate;
      var enDate = _ref3.enDate;
  
      var mallPromise = _commonHttp2["default"].get('manager/data/product/sales/mall/{id}', null, {
          params: {
              id: id,
              dateRange: dateRange,
              startDate: startDate,
              enDate: enDate
          }
      });
  
      var yygPromise = _commonHttp2["default"].get('manager/data/product/sales/yyg/{id}', null, {
          params: {
              id: id,
              dateRange: dateRange,
              startDate: startDate,
              enDate: enDate
          }
      });
  
      return {
          type: GET_DATA_PRODUCT_SALES,
          payload: {
              promise: Promise.all([mallPromise, yygPromise])
          }
      };
  }

});
