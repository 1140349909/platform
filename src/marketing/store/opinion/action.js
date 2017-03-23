import * as apiContentOpinion from '../../../common/api/contentOpinion';

// 删除资讯评论
export const DEL_CONTENT_OPINION = 'DEL_CONTENT_OPINION';
export const DEL_CONTENT_OPINION_PENDING = 'DEL_CONTENT_OPINION_PENDING';
export const DEL_CONTENT_OPINION_SUCCESS = 'DEL_CONTENT_OPINION_SUCCESS';
export const DEL_CONTENT_OPINION_FAILURE = 'DEL_CONTENT_OPINION_FAILURE';

// 资讯评论列表
export const GET_CONTENT_OPINION_LIST = 'GET_CONTENT_OPINION_LIST';
export const GET_CONTENT_OPINION_LIST_PENDING = 'GET_CONTENT_OPINION_LIST_PENDING';
export const GET_CONTENT_OPINION_LIST_SUCCESS = 'GET_CONTENT_OPINION_LIST_SUCCESS';
export const GET_CONTENT_OPINION_LIST_FAILURE = 'GET_CONTENT_OPINION_LIST_FAILURE';

// 发布资讯评论
export const PUT_CONTENT_OPINION_PUBLISH = 'PUT_CONTENT_OPINION_PUBLISH';
export const PUT_CONTENT_OPINION_PUBLISH_PENDING = 'PUT_CONTENT_OPINION_PUBLISH_PENDING';
export const PUT_CONTENT_OPINION_PUBLISH_SUCCESS = 'PUT_CONTENT_OPINION_PUBLISH_SUCCESS';
export const PUT_CONTENT_OPINION_PUBLISH_FAILURE = 'PUT_CONTENT_OPINION_PUBLISH_FAILURE';

// 删除资讯评论
export function delContentOpinion(id) {
    return {
        type: DEL_CONTENT_OPINION,
        payload: apiContentOpinion.delContentOpinion(id)
    };
}


// 资讯评论列表服务
export function getContentOpinionList(params) {
    return {
        type: GET_CONTENT_OPINION_LIST,
        payload: apiContentOpinion.getContentOpinionList(params)
    };
}

// 发布资讯评论
export function updateContentOpinionPublish(id) {
    return {
        type: PUT_CONTENT_OPINION_PUBLISH,
        payload: apiContentOpinion.updateContentOpinionPublish(id)
    };
}





