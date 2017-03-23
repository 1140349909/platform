import http from '../http';
import config from '../config';
import * as hrdd from '../config/hrdd';

// GET /api/v1/{client}/{channel}/spread/hongrendd/auth/login/{code} 红人点点登陆接口
export function loginHongrendd(code = hrdd.HONGREN_CODE.INDEX) {
    return http.get(config.API_ILOKA_URL + '/spread/hongrendd/auth/login/{code}', {
        code
    });
}

// POST /api/v1/{client}/{channel}/spread/hongrendd/{resId} 红人点点推广
export function spreadHongrendd({resId, data}) {
    return http.post(config.API_ILOKA_URL + '/spread/hongrendd/{resId}', data, {
        params: {
            resId
        }
    });
}

// 登录接口
export function loginHongrenddAuth(data) {
    return http.get(hrdd.AUTHORIZE_URL, data);
}

// Token接口
export function sendHongrenddTokenForm(data) {
    return http.sendForm(hrdd.TOKEN_URL, data);
}

// 用户登录接口
export function sendHongrenddLoginForm(data) {
    return http.sendForm(hrdd.LOGIN_URL, data);
}

// 授权登录接口
export function sendHongrenddOrderForm(data) {
    return http.sendForm(hrdd.HONGREN_URL, data, {method: 'GET'});
}





