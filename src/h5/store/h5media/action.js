import  * as apiMedia from  '../../../common/api/media';

export const GET_RES_TYPES = 'GET_RES_TYPES';

export const GET_MEDIA_TYPES = 'GET_MEDIA_TYPES';
export const GET_MEDIA_TYPES_PENDING = 'GET_MEDIA_TYPES_PENDING';
export const GET_MEDIA_TYPES_SUCCESS = 'GET_MEDIA_TYPES_SUCCESS';
export const GET_MEDIA_TYPES_FAILURE = 'GET_MEDIA_TYPES_FAILURE';

export const ADD_MEDIA = 'ADD_MEDIA';
export const ADD_MEDIA_PENDING = 'ADD_MEDIA_PENDING';
export const ADD_MEDIA_SUCCESS = 'ADD_MEDIA_SUCCESS';
export const ADD_MEDIA_FAILURE = 'ADD_MEDIA_FAILURE';

export const ADD_MEDIA_IMG = 'ADD_MEDIA_IMG';
export const ADD_MEDIA_IMG_PENDING = 'ADD_MEDIA_IMG_PENDING';
export const ADD_MEDIA_IMG_SUCCESS = 'ADD_MEDIA_IMG_SUCCESS';
export const ADD_MEDIA_IMG_FAILURE = 'ADD_MEDIA_IMG_FAILURE';

export const DELETE_MEDIA = 'DELETE_MEDIA';
export const DELETE_MEDIA_PENDING = 'DELETE_MEDIA_PENDING';
export const DELETE_MEDIA_SUCCESS = 'DELETE_MEDIA_SUCCESS';
export const DELETE_MEDIA_FAILURE = 'DELETE_MEDIA_FAILURE';

export const DELETE_MEDIA_ALL = 'DELETE_MEDIA_ALL';
export const DELETE_MEDIA_ALL_PENDING = 'DELETE_MEDIA_ALL_PENDING';
export const DELETE_MEDIA_ALL_SUCCESS = 'DELETE_MEDIA_ALL_SUCCESS';
export const DELETE_MEDIA_ALL_FAILURE = 'DELETE_MEDIA_ALL_FAILURE';

export const GET_MEDIA_LIST = 'GET_MEDIA_LIST';
export const GET_MEDIA_LIST_PENDING = 'GET_MEDIA_LIST_PENDING';
export const GET_MEDIA_LIST_SUCCESS = 'GET_MEDIA_LIST_SUCCESS';
export const GET_MEDIA_LIST_FAILURE = 'GET_MEDIA_LIST_FAILURE';

export const FAV_MEDIA = 'FAV_MEDIA';
export const FAV_MEDIA_PENDING = 'FAV_MEDIA_PENDING';
export const FAV_MEDIA_SUCCESS = 'FAV_MEDIA_SUCCESS';
export const FAV_MEDIA_FAILURE = 'FAV_MEDIA_FAILURE';

export const CANCEL_FAV_MEDIA = 'CANCEL_FAV_MEDIA';
export const CANCEL_FAV_MEDIA_PENDING = 'CANCEL_FAV_MEDIA_PENDING';
export const CANCEL_FAV_MEDIA_SUCCESS = 'CANCEL_FAV_MEDIA_SUCCESS';
export const CANCEL_FAV_MEDIA_FAILURE = 'CANCEL_FAV_MEDIA_FAILURE';

export const GET_SEARCH_STICKERS = 'GET_SEARCH_STICKERS';
export const GET_SEARCH_STICKERS_PENDING = 'GET_SEARCH_STICKERS_PENDING';
export const GET_SEARCH_STICKERS_SUCCESS = 'GET_SEARCH_STICKERS_SUCCESS';
export const GET_SEARCH_STICKERS_FAILURE = 'GET_SEARCH_STICKERS_FAILURE';

// 购买素材
export const PURCHASE_MATERIAL = 'PURCHASE_MATERIAL';

// TODO:获取素材类型列表
export function getResTypes() {
    return {
        type: GET_RES_TYPES,
        payload: {}
    };
}

// 获取媒体文件分类信息
export function getMediaTypes(platform) {
    return {
        type: GET_MEDIA_TYPES,
        payload: apiMedia.getMediaTypes(platform)
    };
}

// 添加图片素材
export function addMedia(media, params) {
    return {
        type: ADD_MEDIA,
        payload: apiMedia.addMedia(media, params)
    };
}

// 添加base64的图片素材
export function addMediaImg(media, params) {
    return {
        type: ADD_MEDIA_IMG,
        payload: apiMedia.addMediaImg(media, params)
    };
}

// 删除图片素材
export function deleteMedia(ids, mediaType) {
    return {
        type: DELETE_MEDIA,
        payload: apiMedia.deleteMedia(ids, mediaType)
    };
}

// 清空图库
export function deleteMediaAll(mediaType) {
    return {
        type: DELETE_MEDIA_ALL,
        payload: apiMedia.deleteMediaAll(mediaType)
    };
}

// 根据素材分类获取系统的素材列表
export function getMediaList(params) {
    return {
        type: GET_MEDIA_LIST,
        payload: apiMedia.getMediaList(params)
    };
}

// 收藏素材
export function favMedia(id) {
    return {
        type: FAV_MEDIA,
        payload: apiMedia.favMedia(id)
    };
}

// 取消收藏素材
export function cancelFavMedia(id) {
    return {
        type: CANCEL_FAV_MEDIA,
        payload: apiMedia.cancelFavMedia(id)
    };
}

export function purchaseMaterial(id) {
    return {
        type: PURCHASE_MATERIAL,
        payload: {
            id
        }
    };
}

// 获取搜索网络表情
export function getSearchStickers(params) {

    let apiString = params.q ? 'getSearchStickers' : 'getTrending';

    return {
        type: GET_SEARCH_STICKERS,
        payload: apiMedia[apiString](params),
    };
}
