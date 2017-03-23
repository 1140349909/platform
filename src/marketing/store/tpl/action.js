import  * as apiTpl from  '../../../common/api/tpl';

export const GET_TPL_LIST = 'GET_TPL_LIST';
export const GET_TPL_LIST_PENDING = 'GET_TPL_LIST_PENDING';
export const GET_TPL_LIST_SUCCESS = 'GET_TPL_LIST_SUCCESS';
export const GET_TPL_LIST_FAILURE = 'GET_TPL_LIST_FAILURE';

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

export const GET_TPL_DATA = 'GET_TPL_DATA';
export const GET_TPL_DATA_PENDING = 'GET_TPL_DATA_PENDING';
export const GET_TPL_DATA_SUCCESS = 'GET_TPL_DATA_SUCCESS';
export const GET_TPL_DATA_FAILURE = 'GET_TPL_DATA_FAILURE';


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

export function getTplData(id) {
    return {
        type: GET_TPL_DATA,
        payload: apiTpl.getTplData(id)
    };
}



