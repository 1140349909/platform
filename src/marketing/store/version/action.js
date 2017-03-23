import * as apiVersion from '../../../common/api/version';

export const GET_VERSION_INFO = 'GET_VERSION_INFO';
export const GET_VERSION_INFO_PENDING = 'GET_VERSION_INFO_PENDING';
export const GET_VERSION_INFO_SUCCESS = 'GET_VERSION_INFO_SUCCESS';
export const GET_VERSION_INFO_FAILURE = 'GET_VERSION_INFO_FAILURE';

export const SWITCH_VERSION_STATUS = 'SWITCH_VERSION_STATUS';
export const SWITCH_VERSION_STATUS_PENDING = 'SWITCH_VERSION_STATUS_PENDING';
export const SWITCH_VERSION_STATUS_SUCCESS = 'SWITCH_VERSION_STATUS_SUCCESS';
export const SWITCH_VERSION_STATUS_FAILURE = 'SWITCH_VERSION_STATUS_FAILURE';

export const GET_VERSION_PRICE = 'GET_VERSION_PRICE';
export const GET_VERSION_PRICE_PENDING = 'GET_VERSION_PRICE_PENDING';
export const GET_VERSION_PRICE_SUCCESS = 'GET_VERSION_PRICE_SUCCESS';
export const GET_VERSION_PRICE_FAILURE = 'GET_VERSION_PRICE_FAILURE';

//GET_USER_VERSION_LIST
export const GET_USER_VERSION_LIST = 'GET_USER_VERSION_LIST';
export const GET_USER_VERSION_LIST_PENDING = 'GET_USER_VERSION_LIST_PENDING';
export const GET_USER_VERSION_LIST_SUCCESS = 'GET_USER_VERSION_LIST_SUCCESS';
export const GET_USER_VERSION_LIST_FAILURE = 'GET_USER_VERSION_LIST_FAILURE';

export function getVersionPrice(id) {
    return {
        type: GET_VERSION_PRICE,
        payload: apiVersion.getVersionPrice(id)
    };
}

//获取当前用户营销版本信息
export function getVersionInfo(versionId) {
    return {
        type: GET_VERSION_INFO,
        payload: apiVersion.getVersionInfo(versionId)
    };
}

//获取当前用户营销版本信息
export function getUserVersionList(params) {
    return {
        type: GET_USER_VERSION_LIST,
        payload: apiVersion.getUserVersionList(params)
    };
}
