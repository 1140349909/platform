define('common/config/index', function(require, exports, module) {

  // 所属平台
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  var PLATFORM = 'buy';
  // 所属客户端
  var CLIENT = (location.search.match(new RegExp("(?:\\?|&)client=(.*?)(?=&|$)")) || ['', 'w1'])[1];
  // 所属渠道
  var CHANNEL = (location.search.match(new RegExp("(?:\\?|&)channel=(.*?)(?=&|$)")) || ['', 'linkin'])[1];
  
  var ENV = '@ENV@';
  var API_HOST = '';
  var ILOKA_HOST = '';
  var MOBILE_HOST = '';
  switch (ENV) {
      default:
          ENV = 'dev';
          API_HOST = 'api.sit.vveshow.com';
          ILOKA_HOST = 'iloka.sit.vveshow.com';
          MOBILE_HOST = 'http://mall.sit.vveshow.com';
          break;
      case 'sit':
          ENV = 'sit';
          API_HOST = 'api.sit.vveshow.com';
          ILOKA_HOST = 'iloka.sit.vveshow.com';
          MOBILE_HOST = 'http://mall.sit.vveshow.com';
  
          //ILOKA_HOST = 'localhost:8090';
          break;
      case 'uat':
          API_HOST = 'api.uat.vveshow.com';
          ILOKA_HOST = 'iloka.uat.vveshow.com';
          MOBILE_HOST = 'http://mall.uat.vveshow.com';
  
          break;
      case 'prd':
          API_HOST = 'api.linkin.mobi';
          ILOKA_HOST = 'www.iloka.mobi';
          MOBILE_HOST = 'http://mall.iloka.me';
          ILOKA_HOST = 'www.iloka.me';
          break;
  }
  
  var API_ORIGIN = 'http://' + API_HOST; // http://api.sit.vveshow.com
  var API_ROOT = API_ORIGIN + '/' + PLATFORM; // http://api.sit.vveshow.com/buy
  var API_BASE_PATH = '/api/v1/' + CLIENT + '/' + CHANNEL; //api/v1/{client}/{channel}
  var API_BASE_URL = API_ROOT + API_BASE_PATH; //http://api.sit.vveshow.com/buy/api/v1/{client}/{channel}
  var CND_ORIGIN = 'http://cdn.vveshow.com';
  
  var API_ILOKA_ROOT = API_ORIGIN + '/iloka'; // http://api.sit.vveshow.com/iloka
  var API_ILOKA_URL = API_ILOKA_ROOT + API_BASE_PATH;
  
  // 商城
  var MEDIA_BASE_URL = ENV == 'prd' ? CND_ORIGIN + API_BASE_PATH : API_BASE_URL;
  
  exports['default'] = {
      //站点标识
      SITE: 'admin',
  
      NAME: '艾乐卡营销管家',
  
      // 分页加载数量
      SIZE: 20,
  
      ORDER: 'desc',
  
      // 所属平台
      PLATFORM: PLATFORM,
  
      // 所属客户端
      CLIENT: CLIENT,
  
      // 所属频道
      CHANNEL: CHANNEL,
  
      // 当前所在的环境 sit|uat|prd
      ENV: ENV,
  
      RELEASED: ENV == 'prd',
  
      // 版本号
      VERSION: '@VERSION@',
  
      // 默认首页地址
      HOME: 'index',
  
      API: API_HOST,
  
      DOMAIN: API_ORIGIN,
  
      ILOKA_HOST: ILOKA_HOST,
  
      API_HOST: API_HOST,
  
      API_ORIGIN: API_ORIGIN,
  
      API_ROOT: API_ROOT,
  
      API_ILOKA_URL: API_ILOKA_URL,
  
      API_BASE_PATH: API_BASE_PATH,
  
      API_BASE_URL: API_BASE_URL,
  
      CND_ORIGIN: CND_ORIGIN,
  
      MEDIA_BASE_URL: MEDIA_BASE_URL,
  
      MOBILE_HOST: MOBILE_HOST,
  
      // 用户登陆中心
      SSO_URL: 'sso',
  
      EDITOR_URL: '/asset/lib/ckeditor/index.html',
  
      UEDITOR_URL: '/asset/lib/ueditor/index.html',
  
      EDITOP_IMG_URL: '/asset/lib/ckeditor/ckeditor/plugins/addpic/addpic.jpg'
  };
  module.exports = exports['default'];

});
