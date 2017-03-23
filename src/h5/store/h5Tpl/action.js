import * as apiTpl from '../../../common/api/tpl';

// 获取模板数据
export const GET_TPL_DATA = 'GET_TPL_DATA';
export const GET_TPL_DATA_PENDING = 'GET_TPL_DATA_PENDING';
export const GET_TPL_DATA_SUCCESS = 'GET_TPL_DATA_SUCCESS';
export const GET_TPL_DATA_FAILURE = 'GET_TPL_DATA_FAILURE';

// 使用单页时，获取单页模板数据
export const GET_TPL_SINGLE_DATA = 'GET_TPL_SINGLE_DATA';
export const GET_TPL_SINGLE_DATA_PENDING = 'GET_TPL_SINGLE_DATA_PENDING';
export const GET_TPL_SINGLE_DATA_SUCCESS = 'GET_TPL_SINGLE_DATA_SUCCESS';
export const GET_TPL_SINGLE_DATA_FAILURE = 'GET_TPL_SINGLE_DATA_FAILURE';

// 获取模板列表
export const GET_TPL_LIST = 'GET_TPL_LIST';
export const GET_TPL_LIST_PENDING = 'GET_TPL_LIST_PENDING';
export const GET_TPL_LIST_SUCCESS = 'GET_TPL_LIST_SUCCESS';
export const GET_TPL_LIST_FAILURE = 'GET_TPL_LIST_FAILURE';

// 更新模板数据服务
export const ADD_TPL_DATA = 'ADD_TPL_DATA';
export const ADD_TPL_DATA_PENDING = 'ADD_TPL_DATA_PENDING';
export const ADD_TPL_DATA_SUCCESS = 'ADD_TPL_DATA_SUCCESS';
export const ADD_TPL_DATA_FAILURE = 'ADD_TPL_DATA_FAILURE';

// 模板数据修改服务
export const SAVE_TPL_DATA = 'SAVE_TPL_DATA';
export const SAVE_TPL_DATA_PENDING = 'SAVE_TPL_DATA_PENDING';
export const SAVE_TPL_DATA_SUCCESS = 'SAVE_TPL_DATA_SUCCESS';
export const SAVE_TPL_DATA_FAILURE = 'SAVE_TPL_DATA_FAILURE';

//收藏H5模板
export const FAVORITE_TPL = 'FAVORITE_TPL';
export const FAVORITE_TPL_PENDING = 'FAVORITE_TPL_PENDING';
export const FAVORITE_TPL_SUCCESS = 'FAVORITE_TPL_SUCCESS';
export const FAVORITE_TPL_FAILURE = 'FAVORITE_TPL_FAILURE';

//取消收藏H5模板
export const CANCEL_FAV_TPL = 'CANCEL_FAV_TPL';
export const CANCEL_FAV_TPL_PENDING = 'CANCEL_FAV_TPL_PENDING';
export const CANCEL_FAV_TPL_SUCCESS = 'CANCEL_FAV_TPL_SUCCESS';
export const CANCEL_FAV_TPL_FAILURE = 'CANCEL_FAV_TPL_FAILURE';

//删除H5模板
export const DELETE_USER_TEMPLATE = 'DELETE_USER_TEMPLATE';
export const DELETE_USER_TEMPLATE_PENDING = 'DELETE_USER_TEMPLATE_PENDING';
export const DELETE_USER_TEMPLATE_SUCCESS = 'DELETE_USER_TEMPLATE_SUCCESS';
export const DELETE_USER_TEMPLATE_FAILURE = 'DELETE_USER_TEMPLATE_FAILURE';

// 核实应用是否能生成模板服务
export const GET_TPL_VERIFICATION = 'GET_TPL_VERIFICATION';
export const GET_TPL_VERIFICATION_PENDING = 'GET_TPL_VERIFICATION_PENDING';
export const GET_TPL_VERIFICATION_SUCCESS = 'GET_TPL_VERIFICATION_SUCCESS';
export const GET_TPL_VERIFICATION_FAILURE = 'GET_TPL_VERIFICATION_FAILURE';

// 购买模板成功
export const PURCHASE_TPL = 'PURCHASE_TPL';

// 自动同步作品数据
export const SYNC_TPL_DATA = 'SYNC_TPL_DATA';

// 获取模板数据
export function getTplData(id) {
    return {
        type: GET_TPL_DATA,
        payload: apiTpl.getTplData(id),
    };
}

// 使用单页时，获取单页模板数据
export function getTplSingleData(id) {
    return {
        type: GET_TPL_SINGLE_DATA,
        payload: apiTpl.getTplData(id),
    };
}

// 用户获取h5热门模板数据
export function getTplList(params) {
    return {
        type: GET_TPL_LIST,
        payload: apiTpl.getTplList(params)
    };
}
export function favTpl(id) {
    return {
        type: FAVORITE_TPL,
        payload: apiTpl.favTpl(id)
    };
}
export function cancelFavTpl(id) {
    return {
        type: CANCEL_FAV_TPL,
        payload: apiTpl.cancelFavTpl(id)
    };
}

export function deleteUserTemplate(id) {
    return {
        type: DELETE_USER_TEMPLATE,
        payload: apiTpl.deleteUserTemplate(id)
    };
}

export function updateTpl(params) {
    return params.id ? saveTpl(params) : addTpl(params);
}

// 模板数据服务
export function addTpl(params) {
    return {
        type: ADD_TPL_DATA,
        payload: apiTpl.addTpl(params)
    };
}

// 模板数据修改服务
export function saveTpl(params) {
    return {
        type: SAVE_TPL_DATA,
        payload: apiTpl.updateTpl(params)
    };
}


// 自动同步数据
export function syncTpl(item) {
    return {
        type: SYNC_TPL_DATA,
        payload: item,
    };
}

// 购买模板后处理
export function purchaseTpl(id) {
    return {
        type: PURCHASE_TPL,
        payload: id,
    };
}


// 核实应用是否能生成模板服务
export function getTplVerification(id) {
    return {
        type: GET_TPL_VERIFICATION,
        payload: apiTpl.getTplVerification(id),
        meta: {
            silent: true
        }
    };
}




