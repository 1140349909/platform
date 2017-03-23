import  * as apiTpl from  '../../../common/api/tpl';

export const GET_TPL_DATA = 'GET_TPL_DATA';
export const GET_TPL_DATA_PENDING = 'GET_TPL_DATA_PENDING';
export const GET_TPL_DATA_SUCCESS = 'GET_TPL_DATA_SUCCESS';
export const GET_TPL_DATA_FAILURE = 'GET_TPL_DATA_FAILURE';

export const GET_TPL_BASEINFO = 'GET_TPL_BASEINFO';
export const GET_TPL_BASEINFO_PENDING = 'GET_TPL_BASEINFO_PENDING';
export const GET_TPL_BASEINFO_SUCCESS = 'GET_TPL_BASEINFO_SUCCESS';
export const GET_TPL_BASEINFO_FAILURE = 'GET_TPL_BASEINFO_FAILURE';

export const UPDATE_TPL = 'UPDATE_TPL';
export const UPDATE_TPL_PENDING = 'UPDATE_TPL_PENDING';
export const UPDATE_TPL_SUCCESS = 'UPDATE_TPL_SUCCESS';
export const UPDATE_TPL_FAILURE = 'UPDATE_TPL_FAILURE';

export const UPDATE_TPL_LEDOU = 'UPDATE_TPL_LEDOU';
export const UPDATE_TPL_LEDOU_PENDING = 'UPDATE_TPL_LEDOU_PENDING';
export const UPDATE_TPL_LEDOU_SUCCESS = 'UPDATE_TPL_LEDOU_SUCCESS';
export const UPDATE_TPL_LEDOU_FAILURE = 'UPDATE_TPL_LEDOU_FAILURE';

export const GET_PLAT_TPL_INFO = 'GET_PLAT_TPL_INFO';
export const GET_PLAT_TPL_INFO_PENDING = 'GET_PLAT_TPL_INFO_PENDING';
export const GET_PLAT_TPL_INFO_SUCCESS = 'GET_PLAT_TPL_INFO_SUCCESS';
export const GET_PLAT_TPL_INFO_FAILURE = 'GET_PLAT_TPL_INFO_FAILURE';

export function getTplData(id) {
    return {
        type: GET_TPL_DATA,
        payload: apiTpl.getTplData(id)
    };
}
export function getTplBaseInfo(id) {
    return {
        type: GET_TPL_BASEINFO,
        payload: apiTpl.getTplBaseInfo(id)
    };
}
export function updateTpl(params) {
    return {
        type: UPDATE_TPL,
        payload: apiTpl.updateTpl(params)
    };
}

export function updateTplLedou(params) {
    return {
        type: UPDATE_TPL_LEDOU,
        payload: apiTpl.updateTplLedou(params)
    };
}


export function getPlatTplInfo(id) {
    return {
        type: GET_PLAT_TPL_INFO,
        payload: apiTpl.getPlatTplInfo(id)
    };
}
