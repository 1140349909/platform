import  * as apiContentHot from  '../../../common/api/contentHot';

export const GET_CONTENT_HOT = 'GET_CONTENT_HOT';
export const GET_CONTENT_HOT_PENDING = 'GET_CONTENT_HOT_PENDING';
export const GET_CONTENT_HOT_SUCCESS = 'GET_CONTENT_HOT_SUCCESS';
export const GET_CONTENT_HOT_FAILURE = 'GET_CONTENT_HOT_FAILURE';

export const UPDATE_CONTENT_HOT = 'UPDATE_CONTENT_HOT';
export const UPDATE_CONTENT_HOT_PENDING = 'UPDATE_CONTENT_HOT_PENDING';
export const UPDATE_CONTENT_HOT_SUCCESS = 'UPDATE_CONTENT_HOT_SUCCESS';
export const UPDATE_CONTENT_HOT_FAILURE = 'UPDATE_CONTENT_HOT_FAILURE';

export const ADD_CONTENT_HOT = 'ADD_CONTENT_HOT';
export const ADD_CONTENT_HOT_PENDING = 'ADD_CONTENT_HOT_PENDING';
export const ADD_CONTENT_HOT_SUCCESS = 'ADD_CONTENT_HOT_SUCCESS';
export const ADD_CONTENT_HOT_FAILURE = 'ADD_CONTENT_HOT_FAILURE';

export const GET_CONTENT_HOT_FAV_LIST = 'GET_CONTENT_HOT_FAV_LIST';
export const GET_CONTENT_HOT_FAV_LIST_PENDING = 'GET_CONTENT_HOT_FAV_LIST_PENDING';
export const GET_CONTENT_HOT_FAV_LIST_SUCCESS = 'GET_CONTENT_HOT_FAV_LIST_SUCCESS';
export const GET_CONTENT_HOT_FAV_LIST_FAILURE = 'GET_CONTENT_HOT_FAV_LIST_FAILURE';

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

// 根据热门资讯Id,获取资讯详情
export function getContentHot(id) {
    return {
        type: GET_CONTENT_HOT,
        payload: apiContentHot.getContentHot(id)
    };
}

// 修改内容
export function addContentHot(item) {
    return {
        type: ADD_CONTENT_HOT,
        payload: apiContentHot.addContentHot(item)
    };
}

// 修改内容
export function updateContentHot(item) {
    return {
        type: UPDATE_CONTENT_HOT,
        payload: apiContentHot.updateContentHot(item)
    };
}

// 保存内容
export function saveContentHot(item) {

    // {
    //     "author": "string",
    //     "content": "string",
    //     "contentStatus": "edit",
    //     "desc": "string",
    //     "thumbMediaId": "string",
    //     "title": "string"
    // }

    return item.id ? updateContentHot(item) : addContentHot(item);
}

// 获取已收藏的平台热点资讯
export function getContentHotFavList(params) {
    return {
        type: GET_CONTENT_HOT_FAV_LIST,
        payload: apiContentHot.getContentHotFavList(params)
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

