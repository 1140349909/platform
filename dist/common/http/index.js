define('common/http/index', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _axios = require('node_modules/axios/index');
  
  var _axios2 = _interopRequireDefault(_axios);
  
  var _es6Promise = require('node_modules/es6-promise/dist/es6-promise');
  
  var _es6Promise2 = _interopRequireDefault(_es6Promise);
  
  var _commonConfig = require("common/config/index");
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  var _commonUtil = require('common/util/index');
  
  _es6Promise2['default'].polyfill();
  
  var instance = _axios2['default'].create({
      baseURL: _commonConfig2['default'].API_BASE_URL,
      timeout: 30000,
      withCredentials: true
  });
  
  // Add a request interceptor
  instance.interceptors.request.use(function (config) {
  
      if (config.params) {
  
          // TODO: 转换URL的参数,需要自动删除没有的参数
          config.url = (0, _commonUtil.strFormat)(config.url, config.params);
  
          // 处理排序
          if (config.params.sort && config.params.order) {
              config.params.sort = config.params.sort + ',' + config.params.order;
              delete config.params.order;
          } else {
              delete config.params.sort;
              delete config.params.order;
          }
      }
  
      return config;
  });
  
  // Add a response interceptor
  instance.interceptors.response.use(function (response) {
      var _response$config = response.config;
      var params = _response$config.params;
      var data = _response$config.data;
  
      //if (typeof data == 'string') {
      //    data = JSON.parse(data)
      //}
  
      response.data.params = _extends({}, params, data);
      if (response.data.errCode == 0) {
          // console.info(response.config.url, response.data)
          return response.data;
      } else {
          // 业务错误
          console.error(response.config.url, response.data.errMsg);
          //console.log('response-reject-code', error)
          return Promise.reject(response.data);
      }
  }, function (response) {
      // Http错误
      console.log('response-reject-http', response);
  
      var error = undefined;
      if (response instanceof Error) {
          error = {
              errCode: 400,
              errMsg: response.message
          };
      } else {
          if (response.data) {
              error = response.data;
          } else {
              error = {
                  errCode: response.status,
                  errMsg: response.statusText
              };
          }
      }
      return Promise.reject(error);
  });
  var api = {
      request: function request(opts) {
          if (!/^http/i.test(opts.url)) {
              if (/^\//.test(opts.url)) {
                  opts.url = _commonConfig2['default'].DOMAIN + opts.url;
              }
          }
          return instance.request(opts);
      },
  
      get: function get(url, params, opts) {
          opts = opts || {};
          opts.method = 'get';
          opts.url = url;
          if (params) {
              opts.params = params;
          }
          return this.request(opts);
      },
  
      'delete': function _delete(url, params, opts) {
          opts = opts || {};
          opts.method = 'delete';
          opts.url = url;
          if (params) {
              opts.params = params;
          }
          return this.request(opts);
      },
  
      post: function post(url, data, opts) {
          opts = opts || {};
          opts.method = 'post';
          opts.url = url;
          if (data) {
              opts.data = data;
          }
          return this.request(opts);
      },
  
      put: function put(url, data, opts) {
          opts = opts || {};
          opts.method = 'put';
          opts.url = url;
          if (data) {
              opts.data = data;
          }
          return this.request(opts);
      },
  
      patch: function patch(url, data, opts) {
          opts = opts || {};
          opts.method = 'patch';
          opts.url = url;
          if (data) {
              opts.data = data;
          }
          return this.request(opts);
      }
  };
  
  exports['default'] = api;
  
  //export const ProductResource = (method, path = 'admin/product', id, data) => {
  //    return instance[method](path + (id ? ('/' + id) : ''), data)
  //}
  
  /*
   POST admin/product 新增商品
   GET admin/product/list 商品列表
   POST admin/product/opening 商品上架
   GET admin/product/{id} 获取商品信息
   POST admin/product/{id} 修改商品
  
   POST admin/product/{buyType}/finished/{id} 商城商品下架
   POST admin/product/{buyType}/info/{id} 修改商城商品图文信息
   GET admin/product/{buyType}/list 商城商品列表
   POST admin/product/{buyType}/trade/{id} 修改商城商品交易属性
  
  
   axios.request(config)                 vue.http(config)                      api.request(config)
   axios.get(url[, config])              vue.get(url, [params], [config])      api.get(url, [params], [config])
   axios.delete(url[, config])           vue.delete(url, [params], [config])   api.delete(url, [params], [config])
   axios.post(url[, data[, config]])     vue.post(url, [data], [config])       api.post(url, [data], [config])
   axios.put(url[, data[, config]])      vue.put(url, [data], [config])        api.put(url, [data], [config])
   axios.patch(url[, data[, config]])    vue.patch(url, [data], [config])      api.patch(url, [data], [config])
  
  
  
  
   resource
   resource(url, [params], [actions], [options])
   get: {method: 'GET'},
   save: {method: 'POST'},
   query: {method: 'GET'},
   update: {method: 'PUT'},
   remove: {method: 'DELETE'},
   delete: {method: 'DELETE'}
  
   export const CommentResource = Vue.resource(API_ROOT + 'comment{/id}{/controller}')
   CommentResource.get({id: id, controller: 'getFrontCommentList'})
   CommentResource.save({id: 'addNewComment'}, data)
   CommentResource.save({id: id, controller: 'addNewReply'}, data)
   CommentResource.remove({id: id})
   CommentResource.update({id: id, controller: 'delReply'}, data)
  
  
   */
  module.exports = exports['default'];

});
