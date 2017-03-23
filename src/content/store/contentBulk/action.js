import  * as apiContentBulk from  '../../../common/api/contentBulk';

// 获取版式类型列表
export const GET_BULK_TYPES = 'GET_BULK_TYPES';

// 按版式分类获取系统的版式列表
export const GET_CONTENT_BULK_LIST = 'GET_CONTENT_BULK_LIST';
export const GET_CONTENT_BULK_LIST_PENDING = 'GET_CONTENT_BULK_LIST_PENDING';
export const GET_CONTENT_BULK_LIST_SUCCESS = 'GET_CONTENT_BULK_LIST_SUCCESS';
export const GET_CONTENT_BULK_LIST_FAILURE = 'GET_CONTENT_BULK_LIST_FAILURE';

// 按版式分类获取收藏的版式列表
export const GET_CONTENT_BULK_FAV_LIST = 'GET_CONTENT_BULK_FAV_LIST';
export const GET_CONTENT_BULK_FAV_LIST_PENDING = 'GET_CONTENT_BULK_FAV_LIST_PENDING';
export const GET_CONTENT_BULK_FAV_LIST_SUCCESS = 'GET_CONTENT_BULK_FAV_LIST_SUCCESS';
export const GET_CONTENT_BULK_FAV_LIST_FAILURE = 'GET_CONTENT_BULK_FAV_LIST_FAILURE';

// 按版式分类获取已购的版式列表
export const GET_CONTENT_BULK_BOUGHT_LIST = 'GET_CONTENT_BULK_BOUGHT_LIST';
export const GET_CONTENT_BULK_BOUGHT_LIST_PENDING = 'GET_CONTENT_BULK_BOUGHT_LIST_PENDING';
export const GET_CONTENT_BULK_BOUGHT_LIST_SUCCESS = 'GET_CONTENT_BULK_BOUGHT_LIST_SUCCESS';
export const GET_CONTENT_BULK_BOUGHT_LIST_FAILURE = 'GET_CONTENT_BULK_BOUGHT_LIST_FAILURE';


// 收藏版式
export const FAV_CONTENT_BULK = 'FAV_CONTENT_BULK';
export const FAV_CONTENT_BULK_PENDING = 'FAV_CONTENT_BULK_PENDING';
export const FAV_CONTENT_BULK_SUCCESS = 'FAV_CONTENT_BULK_SUCCESS';
export const FAV_CONTENT_BULK_FAILURE = 'FAV_CONTENT_BULK_FAILURE';

// 取消收藏版式
export const CANCEL_FAV_CONTENT_BULK = 'CANCEL_FAV_CONTENT_BULK';
export const CANCEL_FAV_CONTENT_BULK_PENDING = 'CANCEL_FAV_CONTENT_BULK_PENDING';
export const CANCEL_FAV_CONTENT_BULK_SUCCESS = 'CANCEL_FAV_CONTENT_BULK_SUCCESS';
export const CANCEL_FAV_CONTENT_BULK_FAILURE = 'CANCEL_FAV_CONTENT_BULK_FAILURE';

// 获取版式类型列表
export function getBulkTypes() {
    return {
        type: GET_BULK_TYPES,
        payload: {}
    };
}

// 按版式分类获取系统的版式列表
export function getContentBulkList(params) {
    return {
        type: GET_CONTENT_BULK_LIST,
        payload: apiContentBulk.getContentBulkList(params)
    };
}

// 按版式分类获取收藏的版式列表
export function getContentBulkFavList(params) {
    return {
        type: GET_CONTENT_BULK_FAV_LIST,
        payload: apiContentBulk.getContentBulkFavList(params)
    };
}

// 按版式分类获取已购的版式列表
export function getContentBulkBoughtList(params) {
    return {
        type: GET_CONTENT_BULK_BOUGHT_LIST,
        payload: apiContentBulk.getContentBulkBoughtList(params)
        //payload: apiContentBulk.getContentBulkFavList(params)
    };
}

// 收藏版式
export function favContentBulk(id, bulkType) {
    return {
        type: FAV_CONTENT_BULK,
        payload: apiContentBulk.favContentBulk(id, bulkType)
    };
}

// 取消收藏版式
export function cancelFavContentBulk(id, bulkType) {
    return {
        type: CANCEL_FAV_CONTENT_BULK,
        payload: apiContentBulk.cancelFavContentBulk(id, bulkType)
    };
}
