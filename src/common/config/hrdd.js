const HONGREN_CODE = {
    INDEX: 1001, //红人点点首页
    ORDER: 1002, //红人点点订单列表页
    MISSION: 1003, //红人点点任务列表页
    SPREAD: 1004 //红人点点下单推广页
};

// let ENV = '@ENV@';
let API_ORIGIN = 'http://www.hongrendd.com/red/api/IFExternal';

/*switch (ENV) {
    default:
        API_ORIGIN = 'http://test.hongrendd.com/red/api/IFExternal';
        break;
    case 'prd':
        API_ORIGIN = 'http://www.hongrendd.com/red/api/IFExternal';
        break;
}*/

let TOKEN_URL = API_ORIGIN+'/token';
let LOGIN_URL = API_ORIGIN+'/login';
let HONGREN_URL = API_ORIGIN+'/HongRenUrl';
let AUTHORIZE_URL = API_ORIGIN+'/AuthorizeUrl';

export {
    HONGREN_CODE,
    TOKEN_URL,
    LOGIN_URL,
    HONGREN_URL,
    AUTHORIZE_URL
};


