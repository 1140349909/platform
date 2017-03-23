/**
 * Created by Asoiso on 16/8/20.
 */
import * as apiContentBulk from '../../../common/api/contentBulk';

//
export const DELETE_CONTENT_BULK = 'DELETE_CONTENT_BULK';
export const DELETE_CONTENT_BULK_PENDING = 'DELETE_CONTENT_BULK_PENDING';
export const DELETE_CONTENT_BULK_SUCCESS = 'DELETE_CONTENT_BULK_SUCCESS';
export const DELETE_CONTENT_BULK_FAILURE = 'DELETE_CONTENT_BULK_FAILURE';

export const GET_CONTENT_BULK_FAV_LIST = 'GET_CONTENT_BULK_FAV_LIST';
export const GET_CONTENT_BULK_FAV_LIST_PENDING = 'GET_CONTENT_BULK_FAV_LIST_PENDING';
export const GET_CONTENT_BULK_FAV_LIST_SUCCESS = 'GET_CONTENT_BULK_FAV_LIST_SUCCESS';
export const GET_CONTENT_BULK_FAV_LIST_FAILURE = 'GET_CONTENT_BULK_FAV_LIST_FAILURE';

export const GET_CONTENT_BULK_LIST = 'GET_CONTENT_BULK_LIST';
export const GET_CONTENT_BULK_LIST_PENDING = 'GET_CONTENT_BULK_LIST_PENDING';
export const GET_CONTENT_BULK_LIST_SUCCESS = 'GET_CONTENT_BULK_LIST_SUCCESS';
export const GET_CONTENT_BULK_LIST_FAILURE = 'GET_CONTENT_BULK_LIST_FAILURE';

export const GET_CONTENT_BULK = 'GET_CONTENT_BULK';
export const GET_CONTENT_BULK_PENDING = 'GET_CONTENT_BULK_PENDING';
export const GET_CONTENT_BULK_SUCCESS = 'GET_CONTENT_BULK_SUCCESS';
export const GET_CONTENT_BULK_FAILURE = 'GET_CONTENT_BULK_FAILURE';

export const ADD_CONTENT_BULK = 'ADD_CONTENT_BULK';
export const ADD_CONTENT_BULK_PENDING = 'ADD_CONTENT_BULK_PENDING';
export const ADD_CONTENT_BULK_SUCCESS = 'ADD_CONTENT_BULK_SUCCESS';
export const ADD_CONTENT_BULK_FAILURE = 'ADD_CONTENT_BULK_FAILURE';

export const UPDATE_CONTENT_BULK = 'UPDATE_CONTENT_BULK';
export const UPDATE_CONTENT_BULK_PENDING = 'UPDATE_CONTENT_BULK_PENDING';
export const UPDATE_CONTENT_BULK_SUCCESS = 'UPDATE_CONTENT_BULK_SUCCESS';
export const UPDATE_CONTENT_BULK_FAILURE = 'UPDATE_CONTENT_BULK_FAILURE';

export const CANCEL_FAV_CONTENT_BULK = 'CANCEL_FAV_CONTENT_BULK';
export const CANCEL_FAV_CONTENT_BULK_PENDING = 'CANCEL_FAV_CONTENT_BULK_PENDING';
export const CANCEL_FAV_CONTENT_BULK_SUCCESS = 'CANCEL_FAV_CONTENT_BULK_SUCCESS';
export const CANCEL_FAV_CONTENT_BULK_FAILURE = 'CANCEL_FAV_CONTENT_BULK_FAILURE';

export const FAV_CONTENT_BULK = 'FAV_CONTENT_BULK';
export const FAV_CONTENT_BULK_PENDING = 'FAV_CONTENT_BULK_PENDING';
export const FAV_CONTENT_BULK_SUCCESS = 'FAV_CONTENT_BULK_SUCCESS';
export const FAV_CONTENT_BULK_FAILURE = 'FAV_CONTENT_BULK_FAILURE';

//
export function deleteContentBulk(id, bulkType) {
    return {
        type: DELETE_CONTENT_BULK,
        payload: apiContentBulk.deleteContentBulk(id, bulkType)
    };
}

//
export function getContentBulkFavList(params) {
    return {
        type: GET_CONTENT_BULK_FAV_LIST,
        payload: apiContentBulk.getContentBulkFavList(params)
    };
}

//获取客户商城权限配置
export function getContentBulkList(params) {
    return {
        type: GET_CONTENT_BULK_LIST,
        payload: apiContentBulk.getContentBulkList(params)
    };
}

//更新客户商城权限配置
export function getContentBulk(id, bulkType) {
    return {
        type: GET_CONTENT_BULK,
        payload: apiContentBulk.getContentBulk(id, bulkType)
    };
}

//
export function addContentBulk(item, bulkType) {
    return {
        type: ADD_CONTENT_BULK,
        payload: apiContentBulk.addContentBulk(item, bulkType)
    };
}

export function updateContentBulk(item, bulkType) {
    return {
        type: UPDATE_CONTENT_BULK,
        payload: apiContentBulk.updateContentBulk(item, bulkType)
    };
}

export function cancelFavContentBulk(id, bulkType) {
    return {
        type: CANCEL_FAV_CONTENT_BULK,
        payload: apiContentBulk.cancelFavContentBulk(id, bulkType)
    };
}

export function favContentBulk(id, bulkType) {
    return {
        type: FAV_CONTENT_BULK,
        payload: apiContentBulk.favContentBulk(id, bulkType)
    };
}

