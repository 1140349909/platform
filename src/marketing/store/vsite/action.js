import  * as apiVSite from '../../../common/api/vsite';
/*平台微站管理服务 : 管理内容微站*/

// 获取微站配置信息
export const GET_VSITE_CONFIG = 'GET_VSITE_CONFIG';
export const GET_VSITE_CONFIG_PENDING = 'GET_VSITE_CONFIG_PENDING';
export const GET_VSITE_CONFIG_SUCCESS = 'GET_VSITE_CONFIG_SUCCESS';
export const GET_VSITE_CONFIG_FAILURE = 'GET_VSITE_CONFIG_FAILURE';
// 设置微站基本信息
export const ADD_VSITE_BASIC = 'ADD_VSITE_BASIC';
export const ADD_VSITE_BASIC_PENDING = 'ADD_VSITE_BASIC_PENDING';
export const ADD_VSITE_BASIC_SUCCESS = 'ADD_VSITE_BASIC_SUCCESS';
export const ADD_VSITE_BASIC_FAILURE = 'ADD_VSITE_BASIC_FAILURE';
// 配置微站
export const ADD_VSITE_CONFIG = 'ADD_VSITE_CONFIG';
export const ADD_VSITE_CONFIG_PENDING = 'ADD_VSITE_CONFIG_PENDING';
export const ADD_VSITE_CONFIG_SUCCESS = 'ADD_VSITE_CONFIG_SUCCESS';
export const ADD_VSITE_CONFIG_FAILURE = 'ADD_VSITE_CONFIG_FAILURE';
// 配置微站模块
export const ADD_VSITE_CONFIG_AUTH = 'ADD_VSITE_CONFIG_AUTH';
export const ADD_VSITE_CONFIG_AUTH_PENDING = 'ADD_VSITE_CONFIG_AUTH_PENDING';
export const ADD_VSITE_CONFIG_AUTH_SUCCESS = 'ADD_VSITE_CONFIG_AUTH_SUCCESS';
export const ADD_VSITE_CONFIG_AUTH_FAILURE = 'ADD_VSITE_CONFIG_AUTH_FAILURE';
// 设置微站客服人员
export const ADD_VSITE_CUS = 'ADD_VSITE_CUS';
export const ADD_VSITE_CUS_PENDING = 'ADD_VSITE_CUS_PENDING';
export const ADD_VSITE_CUS_SUCCESS = 'ADD_VSITE_CUS_SUCCESS';
export const ADD_VSITE_CUS_FAILURE = 'ADD_VSITE_CUS_FAILURE';

// 获取微站配置信息
export function getVSiteConfig() {
    return {
        type: GET_VSITE_CONFIG,
        payload: apiVSite.getVSiteConfig()
    };
}

// 设置微站基本信息
export function addVSiteBasic(data) {
    return {
        type: ADD_VSITE_BASIC,
        payload: apiVSite.addVSiteBasic(data)
    };
}

// 配置微站
export function addVSiteConfig(data) {
    return {
        type: ADD_VSITE_CONFIG,
        payload: apiVSite.addVSiteConfig(data)
    };
}

// 配置微站模块
export function addVSiteConfigAuth(data) {
    return {
        type: ADD_VSITE_CONFIG_AUTH,
        payload: apiVSite.addVSiteConfigAuth(data)
    };
}

// 设置微站客服人员
export function addVSiteCus(data) {
    return {
        type: ADD_VSITE_CUS,
        payload: apiVSite.addVSiteCus(data)
    };
}

