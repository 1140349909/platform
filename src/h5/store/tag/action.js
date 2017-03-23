import * as apiTag from '../../../common/api/tag';

// 用户获取媒体资源
export const GET_TAGS_LIST = 'GET_TAGS_LIST';
export const GET_TAGS_LIST_PENDING = 'GET_TAGS_LIST_PENDING';
export const GET_TAGS_LIST_SUCCESS = 'GET_TAGS_LIST_SUCCESS';
export const GET_TAGS_LIST_FAILURE = 'GET_TAGS_LIST_FAILURE';


// GET /api/v1/{client}/{channel}/tags/list 平台标签列表服务
export function getUserTagsList(params) {
    return {
        type: GET_TAGS_LIST,
        payload: apiTag.getUserTagsList(params)
    };
}

