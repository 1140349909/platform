import  * as apiSms from  '../../../common/api/sms';
//发送验证码
export const CAPTCHA_MOBILE = 'CAPTCHA_MOBILE';
export const CAPTCHA_MOBILE_PENDING = 'CAPTCHA_MOBILE_PENDING';
export const CAPTCHA_MOBILE_SUCCESS = 'CAPTCHA_MOBILE_SUCCESS';
export const CAPTCHA_MOBILE_FAILURE = 'CAPTCHA_MOBILE_FAILURE';

//昵称检测
export function captchaMobile(mobile) {
    return {
        meta: {
            silent: true
        },
        type: CAPTCHA_MOBILE,
        payload: apiSms.captchaMobile(mobile)
    };
}



