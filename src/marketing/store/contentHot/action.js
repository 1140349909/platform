import  * as apiContentHot from  '../../../common/api/contentHot';
// 用户获取热点资讯模板数据
export const GET_HOT_CONTENT_LIST = 'GET_HOT_CONTENT_LIST';
export const GET_HOT_CONTENT_LIST_PENDING = 'GET_HOT_CONTENT_LIST_PENDING';
export const GET_HOT_CONTENT_LIST_SUCCESS = 'GET_HOT_CONTENT_LIST_SUCCESS';
export const GET_HOT_CONTENT_LIST_FAILURE = 'GET_HOT_CONTENT_LIST_FAILURE';

//收藏平台热点资讯服务
export const FAV_CONTENT_HOT = 'FAV_CONTENT_HOT';
export const FAV_CONTENT_HOT_PENDING = 'FAV_CONTENT_HOT_PENDING';
export const FAV_CONTENT_HOT_SUCCESS = 'FAV_CONTENT_HOT_SUCCESS';
export const FAV_CONTENT_HOT_FAILURE = 'FAV_CONTENT_HOT_FAILURE';

//取消收藏平台热点资讯服务
export const CANCEL_FAV_CONTENT_HOT = 'CANCEL_FAV_CONTENT_HOT';
export const CANCEL_FAV_CONTENT_HOT_PENDING = 'CANCEL_FAV_CONTENT_HOT_PENDING';
export const CANCEL_FAV_CONTENT_HOT_SUCCESS = 'CANCEL_FAV_CONTENT_HOT_SUCCESS';
export const CANCEL_FAV_CONTENT_HOT_FAILURE = 'CANCEL_FAV_CONTENT_HOT_FAILURE';

//获取资讯详情
export const GET_CONTENT_HOT_DETAIL_INFO = 'GET_CONTENT_HOT_DETAIL_INFO';
export const GET_CONTENT_HOT_DETAIL_INFO_PENDING = 'GET_CONTENT_HOT_DETAIL_INFO_PENDING';
export const GET_CONTENT_HOT_DETAIL_INFO_SUCCESS = 'GET_CONTENT_HOT_DETAIL_INFO_SUCCESS';
export const GET_CONTENT_HOT_DETAIL_INFO_FAILURE = 'GET_CONTENT_HOT_DETAIL_INFO_FAILURE';

// 用户获取资讯模板数据
export function getContentHotList(params) {
    return {
        type: GET_HOT_CONTENT_LIST,
        payload: apiContentHot.getContentHotList(params)
    };
}

//收藏热点资讯服务
export function favContentHot(id) {
    return {
        type: FAV_CONTENT_HOT,
        payload: apiContentHot.favContentHot(id)
    };
}
//取消收藏热点资讯
export function cancelFavContentHot(id) {
    return {
        type: CANCEL_FAV_CONTENT_HOT,
        payload: apiContentHot.cancelFavContentHot(id)
    };
}

export function getContentHotDetail(id) {
    return {
        type: GET_CONTENT_HOT_DETAIL_INFO,
        payload: apiContentHot.getContentHotDetail(id)
    };
}

