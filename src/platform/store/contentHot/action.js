/**
 * Created by Asoiso on 16/8/20.
 */
import * as apiContentHot from '../../../common/api/contentHot';

//
export const DELETE_CONTENT_HOT = 'DELETE_CONTENT_HOT';
export const DELETE_CONTENT_HOT_PENDING = 'DELETE_CONTENT_HOT_PENDING';
export const DELETE_CONTENT_HOT_SUCCESS = 'DELETE_CONTENT_HOT_SUCCESS';
export const DELETE_CONTENT_HOT_FAILURE = 'DELETE_CONTENT_HOT_FAILURE';

export const GET_CONTENT_HOT_PLATFORM_LIST = 'GET_CONTENT_HOT_PLATFORM_LIST';
export const GET_CONTENT_HOT_PLATFORM_LIST_PENDING = 'GET_CONTENT_HOT_PLATFORM_LIST_PENDING';
export const GET_CONTENT_HOT_PLATFORM_LIST_SUCCESS = 'GET_CONTENT_HOT_PLATFORM_LIST_SUCCESS';
export const GET_CONTENT_HOT_PLATFORM_LIST_FAILURE = 'GET_CONTENT_HOT_PLATFORM_LIST_FAILURE';

export const GET_CONTENT_HOT_LIST = 'GET_CONTENT_HOT_LIST';
export const GET_CONTENT_HOT_LIST_PENDING = 'GET_CONTENT_HOT_LIST_PENDING';
export const GET_CONTENT_HOT_LIST_SUCCESS = 'GET_CONTENT_HOT_LIST_SUCCESS';
export const GET_CONTENT_HOT_LIST_FAILURE = 'GET_CONTENT_HOT_LIST_FAILURE';

export const GET_CONTENT_HOT_FAV_LIST = 'GET_CONTENT_HOT_FAV_LIST';
export const GET_CONTENT_HOT_FAV_LIST_PENDING = 'GET_CONTENT_HOT_FAV_LIST_PENDING';
export const GET_CONTENT_HOT_FAV_LIST_SUCCESS = 'GET_CONTENT_HOT_FAV_LIST_SUCCESS';
export const GET_CONTENT_HOT_FAV_LIST_FAILURE = 'GET_CONTENT_HOT_FAV_LIST_FAILURE';

export const GET_CONTENT_HOT = 'GET_CONTENT_HOT';
export const GET_CONTENT_HOT_PENDING = 'GET_CONTENT_HOT_PENDING';
export const GET_CONTENT_HOT_SUCCESS = 'GET_CONTENT_HOT_SUCCESS';
export const GET_CONTENT_HOT_FAILURE = 'GET_CONTENT_HOT_FAILURE';

export const ADD_CONTENT_HOT = 'ADD_CONTENT_HOT';
export const ADD_CONTENT_HOT_PENDING = 'ADD_CONTENT_HOT_PENDING';
export const ADD_CONTENT_HOT_SUCCESS = 'ADD_CONTENT_HOT_SUCCESS';
export const ADD_CONTENT_HOT_FAILURE = 'ADD_CONTENT_HOT_FAILURE';

export const UPDATE_CONTENT_HOT = 'UPDATE_CONTENT_HOT';
export const UPDATE_CONTENT_HOT_PENDING = 'UPDATE_CONTENT_HOT_PENDING';
export const UPDATE_CONTENT_HOT_SUCCESS = 'UPDATE_CONTENT_HOT_SUCCESS';
export const UPDATE_CONTENT_HOT_FAILURE = 'UPDATE_CONTENT_HOT_FAILURE';

export const CANCEL_FAV_CONTENT_HOT = 'CANCEL_FAV_CONTENT_HOT';
export const CANCEL_FAV_CONTENT_HOT_PENDING = 'CANCEL_FAV_CONTENT_HOT_PENDING';
export const CANCEL_FAV_CONTENT_HOT_SUCCESS = 'CANCEL_FAV_CONTENT_HOT_SUCCESS';
export const CANCEL_FAV_CONTENT_HOT_FAILURE = 'CANCEL_FAV_CONTENT_HOT_FAILURE';

export const FAV_CONTENT_HOT = 'FAV_CONTENT_HOT';
export const FAV_CONTENT_HOT_PENDING = 'FAV_CONTENT_HOT_PENDING';
export const FAV_CONTENT_HOT_SUCCESS = 'FAV_CONTENT_HOT_SUCCESS';
export const FAV_CONTENT_HOT_FAILURE = 'FAV_CONTENT_HOT_FAILURE';

export const GET_CONTENT_HOT_DETAIL = 'GET_CONTENT_HOT_DETAIL';
export const GET_CONTENT_HOT_DETAIL_PENDING = 'GET_CONTENT_HOT_DETAIL_PENDING';
export const GET_CONTENT_HOT_DETAIL_SUCCESS = 'GET_CONTENT_HOT_DETAIL_SUCCESS';
export const GET_CONTENT_HOT_DETAIL_FAILURE = 'GET_CONTENT_HOT_DETAIL_FAILURE';

//
export function deleteContentHot(id) {
    return {
        type: DELETE_CONTENT_HOT,
        payload: apiContentHot.deleteContentHot(id)
    };
}

//
export function getContentHotPlatformList(params) {
    return {
        type: GET_CONTENT_HOT_PLATFORM_LIST,
        payload: apiContentHot.getContentHotPlatformList(params)
    };
}

//
export function getContentHotList(params) {
    return {
        type: GET_CONTENT_HOT_LIST,
        payload: apiContentHot.getContentHotList(params)
    };
}

//
export function getContentHotFavList(params) {
    return {
        type: GET_CONTENT_HOT_FAV_LIST,
        payload: apiContentHot.getContentHotFavList(params)
    };
}

//
export function getContentHot(id) {
    return {
        type: GET_CONTENT_HOT,
        payload: apiContentHot.getContentHot(id)
    };
}

//
export function addContentHot(item) {
    return {
        type: ADD_CONTENT_HOT,
        payload: apiContentHot.addContentHot(item)
    };
}

export function updateContentHot(item) {
    return {
        type: UPDATE_CONTENT_HOT,
        payload: apiContentHot.updateContentHot(item)
    };
}

export function cancelFavContentHot(id) {
    return {
        type: CANCEL_FAV_CONTENT_HOT,
        payload: apiContentHot.cancelFavContentHot(id)
    };
}

export function favContentHot(id) {
    return {
        type: FAV_CONTENT_HOT,
        payload: apiContentHot.favContentHot(id)
    };
}

export function getContentHotDetail(id) {
    return {
        type: GET_CONTENT_HOT_DETAIL,
        payload: apiContentHot.getContentHotDetail(id)
    };
}

