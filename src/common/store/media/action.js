import * as apiMedia from '../../api/media';

// 用户获取媒体资源
export const GET_COMMON_MEDIA_LIST = 'GET_COMMON_MEDIA_LIST';
export const GET_COMMON_MEDIA_LIST_PENDING = 'GET_COMMON_MEDIA_LIST_PENDING';
export const GET_COMMON_MEDIA_LIST_SUCCESS = 'GET_COMMON_MEDIA_LIST_SUCCESS';
export const GET_COMMON_MEDIA_LIST_FAILURE = 'GET_COMMON_MEDIA_LIST_FAILURE';

// 删除媒体文件
export const DELETE_MEDIA = 'DELETE_MEDIA';
export const DELETE_MEDIA_PENDING = 'DELETE_MEDIA_PENDING';
export const DELETE_MEDIA_SUCCESS = 'DELETE_MEDIA_SUCCESS';
export const DELETE_MEDIA_FAILURE = 'DELETE_MEDIA_FAILURE';

export const DELETE_ADMIN_MEDIA = 'DELETE_ADMIN_MEDIA';
export const DELETE_ADMIN_MEDIA_PENDING = 'DELETE_ADMIN_MEDIA_PENDING';
export const DELETE_ADMIN_MEDIA_SUCCESS = 'DELETE_ADMIN_MEDIA_SUCCESS';
export const DELETE_ADMIN_MEDIA_FAILURE = 'DELETE_ADMIN_MEDIA_FAILURE';

//
export const ADD_MEDIA = 'ADD_MEDIA';
export const ADD_MEDIA_PENDING = 'ADD_MEDIA_PENDING';
export const ADD_MEDIA_SUCCESS = 'ADD_MEDIA_SUCCESS';
export const ADD_MEDIA_FAILURE = 'ADD_MEDIA_FAILURE';

export const GET_MEDIA_TYPES = 'GET_MEDIA_TYPES';
export const GET_MEDIA_TYPES_PENDING = 'GET_MEDIA_TYPES_PENDING';
export const GET_MEDIA_TYPES_SUCCESS = 'GET_MEDIA_TYPES_SUCCESS';
export const GET_MEDIA_TYPES_FAILURE = 'GET_MEDIA_TYPES_FAILURE';

export const ADD_MEDIA_TYPE = 'ADD_MEDIA_TYPE';
export const ADD_MEDIA_TYPE_PENDING = 'ADD_MEDIA_TYPE_PENDING';
export const ADD_MEDIA_TYPE_SUCCESS = 'ADD_MEDIA_TYPE_SUCCESS';
export const ADD_MEDIA_TYPE_FAILURE = 'ADD_MEDIA_TYPE_FAILURE';

export const DELETE_MEDIA_TYPE = 'DELETE_MEDIA_TYPE';
export const DELETE_MEDIA_TYPE_PENDING = 'DELETE_MEDIA_TYPE_PENDING';
export const DELETE_MEDIA_TYPE_SUCCESS = 'DELETE_MEDIA_TYPE_SUCCESS';
export const DELETE_MEDIA_TYPE_FAILURE = 'DELETE_MEDIA_TYPE_FAILURE';

export const UPDATE_MEDIA_TYPE = 'UPDATE_MEDIA_TYPE';
export const UPDATE_MEDIA_TYPE_PENDING = 'UPDATE_MEDIA_TYPE_PENDING';
export const UPDATE_MEDIA_TYPE_SUCCESS = 'UPDATE_MEDIA_TYPE_SUCCESS';
export const UPDATE_MEDIA_TYPE_FAILURE = 'UPDATE_MEDIA_TYPE_FAILURE';

export const UPDATE_MEDIA = 'UPDATE_MEDIA';
export const UPDATE_MEDIA_PENDING = 'UPDATE_MEDIA_PENDING';
export const UPDATE_MEDIA_SUCCESS = 'UPDATE_MEDIA_SUCCESS';
export const UPDATE_MEDIA_FAILURE = 'UPDATE_MEDIA_FAILURE';

// GET /api/v1/{client}/{channel}/media/{owner}/{restype} 用户获取媒体资源
export function getMediaList(params) {
    return {
        type: GET_COMMON_MEDIA_LIST,
        payload: apiMedia.getMediaList(params)
    };
}


// DELETE /api/v1/{client}/{channel}/media 删除媒体文件
export function deleteMedia(ids, mediaType) {
    return {
        type: DELETE_MEDIA,
        payload: apiMedia.deleteMedia(ids, mediaType)
    };
}

// DELETE /api/v1/{client}/{channel}/platadmin/media 平台用户删除媒体文件
export function deleteAdminMedia(ids) {
    return {
        type: DELETE_ADMIN_MEDIA,
        payload: apiMedia.deleteAdminMedia(ids)
    };
}

// POST /api/v1/{client}/{channel}/media/{owner}/{restype} 上传媒体文件
export function addMedia(media, params) {
    return {
        type: ADD_MEDIA,
        payload: apiMedia.addMedia(media, params)
    };
}

export function updateMedia(id, data) {
    return {
        type: UPDATE_MEDIA,
        payload: apiMedia.updateMedia(id, data)
    };
}

// GET /api/v1/{client}/{channel}/media/type 获取媒体文件分类信息
export function getMediaTypes(platform) {
    return {
        type: GET_MEDIA_TYPES,
        payload: apiMedia.getMediaTypes(platform)
    };
}

// POST /api/v1/{client}/{channel}/media/type 新增媒体文件分类
export function addMediaType(params) {
    return {
        type: ADD_MEDIA_TYPE,
        payload: apiMedia.addMediaType(params)
    };
}

export function deleteMediaType(id) {
    return {
        type: DELETE_MEDIA_TYPE,
        payload: apiMedia.deleteMediaType(id)
    };
}

export function updateMediaType(id, params) {
    return {
        type: UPDATE_MEDIA_TYPE,
        payload: apiMedia.updateMediaType(id, params)
    };
}

