import  * as apiApp from  '../../../common/api/app';

//} 作品列表服务
export const GET_APP_DATA_LIST = 'GET_APP_DATA_LIST';
export const GET_APP_DATA_LIST_PENDING = 'GET_APP_DATA_LIST_PENDING';
export const GET_APP_DATA_LIST_SUCCESS = 'GET_APP_DATA_LIST_SUCCESS';
export const GET_APP_DATA_LIST_FAILURE = 'GET_APP_DATA_LIST_FAILURE';
//从V站下架
export const CANCEL_APP_FROM_VSITE = 'CANCEL_APP_FROM_VSITE';
export const CANCEL_APP_FROM_VSITE_PENDING = 'CANCEL_APP_FROM_VSITE_PENDING';
export const CANCEL_APP_FROM_VSITE_SUCCESS = 'CANCEL_APP_FROM_VSITE_SUCCESS';
export const CANCEL_APP_FROM_VSITE_FAILURE = 'CANCEL_APP_FROM_VSITE_FAILURE';
//删除
export const DELETE_APP_DATA = 'DELETE_APP_DATA';
export const DELETE_APP_DATA_PENDING = 'DELETE_APP_DATA_PENDING';
export const DELETE_APP_DATA_SUCCESS = 'DELETE_APP_DATA_SUCCESS';
export const DELETE_APP_DATA_FAILURE = 'DELETE_APP_DATA_FAILURE';

// 作品列表服务
export function getAppDataList(params) {
    return {
        type: GET_APP_DATA_LIST,
        payload: apiApp.getAppDataList(params)
    };
}

export function cancelAppVsite(id) {
    return {
        type: CANCEL_APP_FROM_VSITE,
        payload: apiApp.cancelAppVsite(id)
    };
}
export function deleteAppData(appid) {
    return {
        type: DELETE_APP_DATA,
        payload: apiApp.deleteAppData(appid)
    };
}

export const GET_APP_TEMPLATE_LIST = 'GET_APP_TEMPLATE_LIST';
export const GET_APP_TEMPLATE_LIST_PENDING = 'GET_APP_TEMPLATE_LIST_PENDING';
export const GET_APP_TEMPLATE_LIST_SUCCESS = 'GET_APP_TEMPLATE_LIST_SUCCESS';
export const GET_APP_TEMPLATE_LIST_FAILURE = 'GET_APP_TEMPLATE_LIST_FAILURE';
// 作品列表服务
export function getAppTemplateList(params) {
    return {
        type: GET_APP_TEMPLATE_LIST,
        payload: apiApp.getAppDataList(params)
    };
}

//获取作品表单数据
export const COLLECT_APP_DATA = 'COLLECT_APP_DATA';
export const COLLECT_APP_DATA_PENDING = 'COLLECT_APP_DATA_PENDING';
export const COLLECT_APP_DATA_SUCCESS = 'COLLECT_APP_DATA_SUCCESS';
export const COLLECT_APP_DATA_FAILURE = 'COLLECT_APP_DATA_FAILURE';

export function collectAppData(params) {
    return {
        type: COLLECT_APP_DATA,
        payload: apiApp.collectAppData(params)
    };
}

//导出数据
export const EXPORT_APP_COLLECT_DATA = 'EXPORT_APP_COLLECT_DATA';
export const EXPORT_APP_COLLECT_DATA_PENDING = 'EXPORT_APP_COLLECT_DATA_PENDING';
export const EXPORT_APP_COLLECT_DATA_SUCCESS = 'EXPORT_APP_COLLECT_DATA_SUCCESS';
export const EXPORT_APP_COLLECT_DATA_FAILURE = 'EXPORT_APP_COLLECT_DATA_FAILURE';
export function exportAppCollectData(appid) {
    return {
        type: EXPORT_APP_COLLECT_DATA,
        payload: apiApp.exportAppCollectData(appid)
    };
}
