
import  * as apiTag from  '../../../common/api/tag';

export const GET_TAGS_LIST = 'GET_TAGS_LIST';
export const GET_TAGS_LIST_PENDING = 'GET_TAGS_LIST_PENDING';
export const GET_TAGS_LIST_SUCCESS = 'GET_TAGS_LIST_SUCCESS';
export const GET_TAGS_LIST_FAILURE = 'GET_TAGS_LIST_FAILURE';

// 根据热门资讯Id,获取资讯详情
export function getTagsList(tagType) {
    return {
        type: GET_TAGS_LIST,
        payload: apiTag.getUserTagsList(tagType)
    };
}
