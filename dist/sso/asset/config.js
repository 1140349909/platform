/**
 * Created by Asoiso on 16/8/10.
 * 业务配置
 */
Module('LK.config', function () {
    var ENV = '@ENV@';

    // 所属平台
    var PLATFORM = 'buy';

    // 所属客户端
    var CLIENT = (location.search.match(new RegExp("(?:\\?|&)client=(.*?)(?=&|$)")) || ['', 'w1'])[1];

    // 所属渠道
    var CHANNEL = (location.search.match(new RegExp("(?:\\?|&)channel=(.*?)(?=&|$)")) || ['', 'linkin'])[1];


    // 正则参数
    var PATTERNS = {
        EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        PHONE: /^(13|15|18|17)[0-9]{9}$/,
        PHONE_EMAIL: /^([a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)|(1[3|4|5|7|8]\d{9})$/,
        PASSWORD: /^\w{6,18}$/
    };

    var API_HOST = '';
    switch (ENV) {
        default:
            ENV = 'dev';
            API_HOST = 'api.sit.vveshow.com';
            break;
        case 'sit':
            ENV = 'sit';
            API_HOST = 'api.sit.vveshow.com';
            break;
        case 'uat':
            API_HOST = 'api.uat.vveshow.com';
            break;
        case 'prd':
            API_HOST = 'api.linkin.mobi';
            break;
    }

    const API_ORIGIN = 'http://' + API_HOST;  // http://api.sit.vveshow.com
    const API_ROOT = API_ORIGIN + '/buy';  // http://api.sit.vveshow.com/buy
    const API_BASE_PATH = API_ROOT + '/api/v1/' + CLIENT + '/' + CHANNEL;

    // API
    var APIS = {
        LOGIN: API_ROOT + '/security_check',
        USER_LOGGED: API_BASE_PATH + '/user/logged',

        USER_FORGOT_PASSWORD: API_BASE_PATH + '/user/forgot/password',
        // 获取图片验证码

        MEDIA_CAPTCHA: API_BASE_PATH + '/media/captcha',

        // 用户找回密码服务
        USER_FORGOT_PASSWORD_VALIDATE: API_BASE_PATH + '/user/forgot/password/validate',

        // 找回密码验证码短信发送
        SMS_CAPTCHA_FORGOT_PASSWORD: API_BASE_PATH + '/sms/captcha/forgot/password/{mobile}',

        // 用户通过邮箱地址注册
        USER_REG: API_BASE_PATH + '/user/reg',

        // 用户通过手机号重置密码服务
        USER_FORGOT_PASSWORD_MOBILE_RESET: API_BASE_PATH + '/user/forgot/password/mobile/reset',

        // 用户通过安全码重置密码服务
        USER_FORGOT_PASSWORD_RESET: API_BASE_PATH + '/user/forgot/password/reset',

        // 用户激活码重新发送服务
        USER_FORGOT_PASSWORD: API_BASE_PATH + '/user/forgot/password/{code}',

        // 检验邮箱是否有效
        USER_FORGOT_CODE_RESEND: API_BASE_PATH + '/user/forgot/code/resend/{code}',

        // 注册验证码短信发送
        SMS_CAPTCHA: API_BASE_PATH + '/sms/captcha/{mobile}',

        // 客户注册-验证账户
        CUSTOMER_REG_ACCOUNT_VALIDATE: API_BASE_PATH + '/customer/reg/account/validate',

        // 客户注册-完善信息
        CUSTOMER_REG_INFO: API_BASE_PATH + '/customer/reg/info',

        // 客户注册-审核
        PLATADMIN_CUSTOMER_APPROVER: API_BASE_PATH + '/platadmin/customer/approve/{id}',

        REGISTER_VALIDATE: API_BASE_PATH + '/api/v1/{client}/{channel}/customer/reg/account/validate',

        REGISTER: API_BASE_PATH + '/api/v1/{client}/{channel}/customer/reg/info',

        // 修改商城权限设置
        MANAGER_MALL_CONFIG_AUTH: API_BASE_PATH + '/manager/mall/config/auth',
    };

    for (var key in APIS) {
        APIS[key] = $.format(APIS[key], {
            client: CLIENT,
            channle: CHANNEL
        })
    }

    var CACHE_KEY = {
        USERNAME: (LK.config.PLATFORM + '_USERNAME').toUpperCase(),
        USERINFO: (LK.config.PLATFORM + '_USERINFO').toUpperCase(),
        FIX_CREDENTIALS: (LK.config.PLATFORM + 'FIX_CREDENTIALS').toUpperCase()
    };

    return {
        // 当前环境
        ENV: ENV,
        // 平台
        PLATFORM: PLATFORM,
        // 客户端
        CLIENT: CLIENT,
        // 渠道
        CHANNEL: CHANNEL,
        // 正则参数
        PATTERNS: PATTERNS,
        // 缓存Key
        CACHE_KEY: CACHE_KEY,
        // http://api.sit.vveshow.com
        API_ORIGIN: API_ORIGIN,
        // http://api.sit.vveshow.com/buy
        API_ROOT: API_ROOT,
        // http://api.sit.vveshow.com/buy/api/v1/{client}/{channel}
        API_BASE_PATH: API_BASE_PATH,
        // Api
        APIS: APIS
    };
});
