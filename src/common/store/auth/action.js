import * as apiCommon from '../../api/common';
import * as apiVersion from '../../api/version';
import * as apiUser from '../../api/user';
import {getSSOUrl} from 'common/util/url';

// 登录用户信息
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_PENDING = 'GET_USER_INFO_PENDING';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';

// 登录用户信息
export const GET_UIN_VERSION_INFO = 'GET_UIN_VERSION_INFO';
export const GET_UIN_VERSION_INFO_PENDING = 'GET_UIN_VERSION_INFO_PENDING';
export const GET_UIN_VERSION_INFO_SUCCESS = 'GET_UIN_VERSION_INFO_SUCCESS';
export const GET_UIN_VERSION_INFO_FAILURE = 'GET_UIN_VERSION_INFO_FAILURE';

export const SWITCH_USER_ACCOUNT_UIN = 'SWITCH_USER_ACCOUNT_UIN';
export const SWITCH_USER_ACCOUNT_UIN_PENDING = 'SWITCH_USER_ACCOUNT_UIN_PENDING';
export const SWITCH_USER_ACCOUNT_UIN_SUCCESS = 'SWITCH_USER_ACCOUNT_UIN_SUCCESS';
export const SWITCH_USER_ACCOUNT_UIN_FAILURE = 'SWITCH_USER_ACCOUNT_UIN_FAILURE';

// 登录
export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// 退出
export const LOGOUT = 'LOGOUT';
export const LOGOUT_PENDING = 'LOGOUT_PENDING';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SELECT_MAIN_MENU = 'SELECT_MAIN_MENU';

// 获取当前登陆用户的信息, 是否支持匿名
export function getUserInfo(isAnonymous) {
    return {
        type: GET_USER_INFO,
        payload: isAnonymous ? apiUser.getUserDetail() : apiUser.getUserInfo(),
        meta: {
            silent: true
        }
    };
}


// 获取当前客户的营销版本信息
export function getUinVersionInfo() {
    return {
        type: GET_UIN_VERSION_INFO,
        payload: apiVersion.getVersionInfo(),
        meta: {
            silent: true
        }
    };
}

// 用户切换服务uin
export function switchUserAccountUin(uin) {
    return {
        type: SWITCH_USER_ACCOUNT_UIN,
        payload: apiUser.switchUserAccountUin(uin)
    };
}


// 登陆
export function login(username, password) {
    return {
        meta: {
            silent: true
        },
        type: LOGIN,
        payload: apiCommon.login(username, password)
    };
}

// 注销
export function logout(redirect) {
    if (redirect) {
        return function () {
            return apiCommon.logout().then(() => {
                location.replace(redirect === true ? getSSOUrl() : redirect);
            }, () => {
                location.replace(redirect === true ? getSSOUrl() : redirect);
            });
        };
    } else {
        return {
            type: LOGOUT,
            payload: apiCommon.logout()
        };
    }
}

