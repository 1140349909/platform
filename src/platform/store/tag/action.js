import * as apiTag from '../../../common/api/tag';

// 用户获取媒体资源
export const GET_TAGS_LIST = 'GET_TAGS_LIST';
export const GET_TAGS_LIST_PENDING = 'GET_TAGS_LIST_PENDING';
export const GET_TAGS_LIST_SUCCESS = 'GET_TAGS_LIST_SUCCESS';
export const GET_TAGS_LIST_FAILURE = 'GET_TAGS_LIST_FAILURE';

// 删除媒体文件
export const DELETE_TAG = 'DELETE_TAG';
export const DELETE_TAG_PENDING = 'DELETE_TAG_PENDING';
export const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS';
export const DELETE_TAG_FAILURE = 'DELETE_TAG_FAILURE';

//
export const ADD_TAGS = 'ADD_TAGS';
export const ADD_TAGS_PENDING = 'ADD_TAGS_PENDING';
export const ADD_TAGS_SUCCESS = 'ADD_TAGS_SUCCESS';
export const ADD_TAGS_FAILURE = 'ADD_TAGS_FAILURE';

export const ADD_TAG = 'ADD_TAG';
export const ADD_TAG_PENDING = 'ADD_TAG_PENDING';
export const ADD_TAG_SUCCESS = 'ADD_TAG_SUCCESS';
export const ADD_TAG_FAILURE = 'ADD_TAG_FAILURE';


export const UPDATE_TAG = 'UPDATE_TAG';
export const UPDATE_TAG_PENDING = 'UPDATE_TAG_PENDING';
export const UPDATE_TAG_SUCCESS = 'UPDATE_TAG_SUCCESS';
export const UPDATE_TAG_FAILURE = 'UPDATE_TAG_FAILURE';


export const GET_TAG = 'GET_TAG';
export const GET_TAG_PENDING = 'GET_TAG_PENDING';
export const GET_TAG_SUCCESS = 'GET_TAG_SUCCESS';
export const GET_TAG_FAILURE = 'GET_TAG_FAILURE';

export const UPDATE_TAG_NAME = 'UPDATE_TAG_NAME';
export const UPDATE_TAG_NAME_PENDING = 'UPDATE_TAG_NAME_PENDING';
export const UPDATE_TAG_NAME_SUCCESS = 'UPDATE_TAG_NAME_SUCCESS';
export const UPDATE_TAG_NAME_FAILURE = 'UPDATE_TAG_NAME_FAILURE';

export const UPDATE_TAG_STATUS = 'UPDATE_TAG_STATUS';
export const UPDATE_TAG_STATUS_PENDING = 'UPDATE_TAG_STATUS_PENDING';
export const UPDATE_TAG_STATUS_SUCCESS = 'UPDATE_TAG_STATUS_SUCCESS';
export const UPDATE_TAG_STATUS_FAILURE = 'UPDATE_TAG_STATUS_FAILURE';

export const UPDATE_TAG_SEQ = 'UPDATE_TAG_SEQ';
export const UPDATE_TAG_SEQ_PENDING = 'UPDATE_TAG_SEQ_PENDING';
export const UPDATE_TAG_SEQ_SUCCESS = 'UPDATE_TAG_SEQ_SUCCESS';
export const UPDATE_TAG_SEQ_FAILURE = 'UPDATE_TAG_SEQ_FAILURE';

export const UPDATE_TAG_AGG = 'UPDATE_TAG_AGG';
export const UPDATE_TAG_AGG_PENDING = 'UPDATE_TAG_AGG_PENDING';
export const UPDATE_TAG_AGG_SUCCESS = 'UPDATE_TAG_AGG_SUCCESS';
export const UPDATE_TAG_AGG_FAILURE = 'UPDATE_TAG_AGG_FAILURE';


export const ADD_TAG_LINKS = 'ADD_TAG_LINKS';
export const ADD_TAG_LINKS_PENDING = 'ADD_TAG_LINKS_PENDING';
export const ADD_TAG_LINKS_SUCCESS = 'ADD_TAG_LINKS_SUCCESS';
export const ADD_TAG_LINKS_FAILURE = 'ADD_TAG_LINKS_FAILURE';


export const DELETE_TAG_LINKS = 'DELETE_TAG_LINKS';
export const DELETE_TAG_LINKS_PENDING = 'DELETE_TAG_LINKS_PENDING';
export const DELETE_TAG_LINKS_SUCCESS = 'DELETE_TAG_LINKS_SUCCESS';
export const DELETE_TAG_LINKS_FAILURE = 'DELETE_TAG_LINKS_FAILURE';

// GET /api/v1/{client}/{channel}/tags/list 平台标签列表服务
export function getTagsList(params) {
    return {
        type: GET_TAGS_LIST,
        payload: apiTag.getTagsList(params)
    };
}


// DELETE /api/v1/{client}/{channel}/platadmin/tags/{id} 删除平台标签
export function deleteTag(id) {
    return {
        type: DELETE_TAG,
        payload: apiTag.deleteTag(id)
    };
}

//POST /api/v1/{client}/{channel}/platadmin/tags 添加平台标签
export function addTags(para) {
    return {
        type: ADD_TAGS,
        payload: apiTag.addTags(para)
    };
}

//POST /api/v1/{client}/{channel}/platadmin/tags 添加平台标签
export function addTag(rootTagId, parentId, para) {
    return {
        type: ADD_TAG,
        payload: apiTag.addTag(rootTagId, parentId, para)
    };
}

export function updateTag(rootTagId, para) {
    return {
        type: UPDATE_TAG,
        payload: apiTag.updateTag(rootTagId, para)
    };
}

//POST /api/v1/{client}/{channel}/platadmin/tags/{id} 修改平台标签
export function updateTagName(id, para) {
    return {
        type: UPDATE_TAG_NAME,
        payload: apiTag.updateTagName(id, para)
    };
}

// GET /api/v1/{client}/{channel}/platadmin/tags/{id} 获取平台标签
export function getTag(id) {
    return {
        type: GET_TAG,
        payload: apiTag.getTag(id)
    };
}

// PUT /api/v1/{client}/{channel}/platadmin/tags/status/{id} 修改平台标签状态
export function updateTagStatus(id, para) {
    return {
        type: UPDATE_TAG_STATUS,
        payload: apiTag.updateTagStatus(id, para)
    };
}

// PUT /api/v1/{client}/{channel}/platadmin/tags/seq/{id} 修改平台标签顺序
export function updateTagSeq(id, para) {
    return {
        type: UPDATE_TAG_SEQ,
        payload: apiTag.updateTagSeq(id, para)
    };
}

//POST /api/v1/{client}/{channel}/tags/agg 平台标签统计聚合服务
export function updateTagAgg(para) {
    return {
        type: UPDATE_TAG_AGG,
        payload: apiTag.updateTagAgg(para)
    };
}

export function addTagLinks(para) {
    return {
        type: ADD_TAG_LINKS,
        payload: apiTag.addTagLinks(para)
    };
}


export function deleteTagLinks(para) {
    return {
        type: DELETE_TAG_LINKS,
        payload: apiTag.deleteTagLinks(para)
    };
}
