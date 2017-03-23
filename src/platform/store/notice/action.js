import  * as apiNotice from  '../../../common/api/notice';
//系统通知列表和搜索
export const GET_NOTICE_LIST = 'GET_NOTICE_LIST';
export const GET_NOTICE_LIST_PENDING = 'GET_NOTICE_LIST_PENDING';
export const GET_NOTICE_LIST_SUCCESS = 'GET_NOTICE_LIST_SUCCESS';
export const GET_NOTICE_LIST_FAILURE = 'GET_NOTICE_LIST_FAILURE';
//系统通知添加
export const ADD_NOTICE = 'ADD_NOTICE';
export const ADD_NOTICE_PENDING = 'ADD_NOTICE_PENDING';
export const ADD_NOTICE_SUCCESS = 'ADD_NOTICE_SUCCESS';
export const ADD_NOTICE_FAILURE = 'ADD_NOTICE_FAILURE';
//系统通知修改
export const UPDATE_NOTICE = 'UPDATE_NOTICE';
export const UPDATE_NOTICE_PENDING = 'UPDATE_NOTICE_PENDING';
export const UPDATE_NOTICE_SUCCESS = 'UPDATE_NOTICE_SUCCESS';
export const UPDATE_NOTICE_FAILURE = 'UPDATE_NOTICE_FAILURE';
//  系统通知详情
export const GET_NOTICE_DETAIL = 'GET_NOTICE_DETAIL';
export const GET_NOTICE_DETAIL_PENDING = 'GET_NOTICE_DETAIL_PENDING';
export const GET_NOTICE_DETAIL_SUCCESS = 'GET_NOTICE_DETAIL_SUCCESS';
export const GET_NOTICE_DETAIL_FAILURE = 'GET_NOTICE_DETAIL_FAILURE';

export function getNoticeList(params) {
    return {
        type: GET_NOTICE_LIST,
        payload: apiNotice.getNoticeList(params)
    };
}
export function addNotice(params) {
    return {
        type: ADD_NOTICE,
        payload: apiNotice.addNotice(params)
    };
}
export function updateNotice(id, params) {
    return {
        type: UPDATE_NOTICE,
        payload: apiNotice.updateNotice(id, params)
    };
}
export function getNoticeDetail(id) {
    return {
        type: GET_NOTICE_DETAIL,
        payload: apiNotice.getNoticeDetail(id)
    };
}
