import  * as apiContent from  '../../../common/api/content';

//用户获取“我的”资讯模板数据
export const GET_CONTENT_LIST = 'GET_CONTENT_LIST';
export const GET_CONTENT_LIST_PENDING = 'GET_CONTENT_LIST_PENDING';
export const GET_CONTENT_LIST_SUCCESS = 'GET_CONTENT_LIST_SUCCESS';
export const GET_CONTENT_LIST_FAILURE = 'GET_CONTENT_LIST_FAILURE';

//资讯V站下架
export const CANCEL_CONTENT_VSITE = 'CANCEL_CONTENT_VSITE';
export const CANCEL_CONTENT_VSITE_PENDING = 'CANCEL_CONTENT_VSITE_PENDING';
export const CANCEL_CONTENT_VSITE_SUCCESS = 'CANCEL_CONTENT_VSITE_SUCCESS';
export const CANCEL_CONTENT_VSITE_FAILURE = 'CANCEL_CONTENT_VSITE_FAILURE';
//删除资讯
export const DELETE_CONTENT = 'DELETE_CONTENT';
export const DELETE_CONTENT_PENDING = 'DELETE_CONTENT_PENDING';
export const DELETE_CONTENT_SUCCESS = 'DELETE_CONTENT_SUCCESS';
export const DELETE_CONTENT_FAILURE = 'DELETE_CONTENT_FAILURE';
//获取资讯详情
export const GET_CONTENT_DETAIL_INFO = 'GET_CONTENT_DETAIL_INFO';
export const GET_CONTENT_DETAIL_INFO_PENDING = 'GET_CONTENT_DETAIL_INFO_PENDING';
export const GET_CONTENT_DETAIL_INFO_SUCCESS = 'GET_CONTENT_DETAIL_INFO_SUCCESS';
export const GET_CONTENT_DETAIL_INFO_FAILURE = 'GET_CONTENT_DETAIL_INFO_FAILURE';
//用户获取“我的”资讯模板数据
export function getContentList(params) {
    return {
        type: GET_CONTENT_LIST,
        payload:  apiContent.getContentList(params)
    };
}

//资讯V站下架
export function  cancelContentVSite(id) {
    return {
        type: CANCEL_CONTENT_VSITE,
        payload:  apiContent.cancelContentVSite(id)
    };
}

//删除资讯
export function  deleteContent(id) {
    return {
        type: DELETE_CONTENT,
        payload:  apiContent.deleteContent(id)
    };
}
//获取资讯详情
export function getContent(id) {
    return {
        type: DELETE_CONTENT,
        payload:  apiContent.getContent(id)
    };
}
