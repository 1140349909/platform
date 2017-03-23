import  * as apiHongRen from  '../../api/hrdd';

//
export const LOGIN_HONGREN = 'LOGIN_HONGREN';
export const LOGIN_HONGREN_PENDING = 'LOGIN_HONGREN_PENDING';
export const LOGIN_HONGREN_SUCCESS = 'LOGIN_HONGREN_SUCCESS';
export const LOGIN_HONGREN_FAILURE = 'LOGIN_HONGREN_FAILURE';

//
export const SPREAD_HONGREN = 'SPREAD_HONGREN';
export const SPREAD_HONGREN_PENDING = 'SPREAD_HONGREN_PENDING';
export const SPREAD_HONGREN_SUCCESS = 'SPREAD_HONGREN_SUCCESS';
export const SPREAD_HONGREN_FAILURE = 'SPREAD_HONGREN_FAILURE';

//
export const LOGIN_HONGREN_AUTH = 'LOGIN_HONGREN_AUTH';
export const LOGIN_HONGREN_AUTH_PENDING = 'LOGIN_HONGREN_AUTH_PENDING';
export const LOGIN_HONGREN_AUTH_SUCCESS = 'LOGIN_HONGREN_AUTH_SUCCESS';
export const LOGIN_HONGREN_AUTH_FAILURE = 'LOGIN_HONGREN_AUTH_FAILURE';

export function loginHongrendd(code) {
    return {
        type: LOGIN_HONGREN,
        payload: apiHongRen.loginHongrendd(code)
    };
}

export function spreadHongrendd(params) {
    return {
        type: SPREAD_HONGREN,
        payload: apiHongRen.spreadHongrendd(params)
    };
}

export function loginHongrenddAuth(data) {
    return {
        type: LOGIN_HONGREN_AUTH,
        payload: apiHongRen.loginHongrenddAuth(data)
    };
}
