window.__uri = function (path) {
    return path;
};
// 所属平台
const PLATFORM = 'buy';
// 所属客户端
const CLIENT = (location.search.match(new RegExp('(?:\\?|&)client=(.*?)(?=&|$)')) || ['', 'w1'])[1];
// 所属渠道
const CHANNEL = (location.search.match(new RegExp('(?:\\?|&)channel=(.*?)(?=&|$)')) || ['', 'linkin'])[1];

// 表情云appid
const BIAOQINGMM_APP_ID = '7974ba7888a04ce8a7fa3f48e342c0b9';

// 乐豆对换比  2(乐豆) / 1(人民币)
const LEDOU_PROPORTION = 10 / 1;

let ENV = '@ENV@';
let API_ORIGIN = '';
let ILOKA_ORIGIN = '';
let MALL_ORIGIN = '';
let BS_ORIGIN = '';
let SSO_ORIGIN = '';
let COMMON_ORIGIN = '';

switch (ENV) {
    default:
    case 'dev':
        ENV = 'dev';
        API_ORIGIN = 'http://api.dev.vveshow.com';
        ILOKA_ORIGIN = 'http://iloka.dev.vveshow.com';
        MALL_ORIGIN = 'http://m.dev.vveshow.com';
        //BS_ORIGIN = 'http://bs.dev.vveshow.com';
        BS_ORIGIN = location.origin;
        SSO_ORIGIN = 'http://sso.dev.vveshow.com';
        COMMON_ORIGIN = 'http://common.vveshow.com';
        break;
    case 'sit':
        ENV = 'sit';
        API_ORIGIN = 'http://api.sit.vveshow.com';
        ILOKA_ORIGIN = 'http://iloka.sit.vveshow.com';
        MALL_ORIGIN = 'http://m.sit.vveshow.com';
        BS_ORIGIN = 'http://bs.sit.vveshow.com';
        SSO_ORIGIN = 'http://sso.sit.vveshow.com';
        COMMON_ORIGIN = 'http://common.vveshow.com';
        break;
    case 'uat':
        API_ORIGIN = 'http://api.uat.vveshow.com';
        ILOKA_ORIGIN = 'http://iloka.uat.vveshow.com';
        MALL_ORIGIN = 'http://m.uat.vveshow.com';
        BS_ORIGIN = 'http://bs.uat.vveshow.com';
        SSO_ORIGIN = 'http://sso.uat.vveshow.com';
        COMMON_ORIGIN = 'http://common.vveshow.com';
        break;
    case 'prd':
        API_ORIGIN = 'http://api.linkin.mobi';
        ILOKA_ORIGIN = 'http://www.iloka.me';
        MALL_ORIGIN = 'http://m.iloka.me';
        BS_ORIGIN = 'http://bs.iloka.me';
        SSO_ORIGIN = 'http://sso.iloka.me';
        COMMON_ORIGIN = 'http://common.iloka.me';
        break;
}

const API_ROOT = API_ORIGIN + '/' + PLATFORM;  // http://api.sit.vveshow.com/buy
const API_BASE_PATH = '/api/v1/' + CLIENT + '/' + CHANNEL; //api/v1/{client}/{channel}
const API_BASE_URL = API_ROOT + API_BASE_PATH;  //http://api.sit.vveshow.com/buy/api/v1/{client}/{channel}

const API_ILOKA_ROOT = API_ORIGIN + '/iloka'; // http://api.sit.vveshow.com/iloka
const API_ILOKA_URL = API_ILOKA_ROOT + API_BASE_PATH;
const CND_ORIGIN = 'http://cdn.vveshow.com';
const BIAOQINGMM_ROOT = 'http://open-api.biaoqingmm.com/open-api';

const LEDOU_CHARGE_URL = BS_ORIGIN + '/marketing.html#/charge/list';
const UPGRADE_CHARGE_URL = BS_ORIGIN + '/marketing.html#/user/info';
const HELP_AILPAY_URL = BS_ORIGIN + '/marketing.html#/help/detail/58760f38a6dc365ba83f0ea6';

// 商城
const MEDIA_BASE_URL = ENV == 'prd' ? CND_ORIGIN + API_BASE_PATH : API_BASE_URL;

export default {
    //站点标识
    SITE: 'bs',

    NAME: '艾乐卡营销管家',

    // 分页加载数量
    SIZE: 20,

    ORDER: 'desc',

    // 所属平台
    PLATFORM,

    // 所属客户端
    CLIENT,

    // 所属频道
    CHANNEL,

    COMMON_ORIGIN,

    // 当前所在的环境 sit|uat|prd
    ENV: ENV,

    RELEASED: ENV == 'prd',

    // 版本号
    VERSION: '@VERSION@',

    // 默认首页地址
    HOME: 'index',

    API_ORIGIN,

    API_ROOT,

    API_ILOKA_URL,

    API_BASE_PATH,

    API_BASE_URL,

    CND_ORIGIN,

    ILOKA_ORIGIN,

    BS_ORIGIN,

    MEDIA_BASE_URL,

    MALL_ORIGIN,

    SSO_ORIGIN,

    BIAOQINGMM_ROOT,

    BIAOQINGMM_APP_ID,

    LEDOU_CHARGE_URL,

    UPGRADE_CHARGE_URL,

    LEDOU_PROPORTION,

    API_ILOKA_ROOT,

    UEDITOR_URL: __uri('/asset/lib/ueditor/wrank.html'),

    UEDITOR_BS_URL: __uri('/asset/lib/ueditor/bs.html'),

    UEDITOR_PLATFORM_URL: __uri('/asset/lib/ueditor/platform.html'),

    DATA_REGION_URL: __uri('/asset/data/region.json'),

    RESTYPE_CONTENT: 'content',

    RESTYPE_H5: 'h5',

    HELP_AILPAY_URL,

    // QQ客服Url
    CUSTOM_SERVICE_URL: 'http://q.url.cn/s/blGmRXm',

    // 产品最大版本号
    MAX_VERSION: 300
};


