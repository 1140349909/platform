import  * as apiTag from  '../../../common/api/tag';

//获取标签列表
export const GET_TAG_LIST = 'GET_TAG_LIST';
export const GET_TAG_LIST_PENDING = 'GET_TAG_LIST_PENDING';
export const GET_TAG_LIST_SUCCESS = 'GET_TAG_LIST_SUCCESS';
export const GET_TAG_LIST_FAILURE = 'GET_TAG_LIST_FAILURE';

//获取用户标签列表
export const GET_USER_TAG_LIST = 'GET_USER_TAG_LIST';
export const GET_USER_TAG_LIST_PENDING = 'GET_USER_TAG_LIST_PENDING';
export const GET_USER_TAG_LIST_SUCCESS = 'GET_USER_TAG_LIST_SUCCESS';
export const GET_USER_TAG_LIST_FAILURE = 'GET_USER_TAG_LIST_FAILURE';

//标签列表
export function getTags(tagType) {
    return {
        type: GET_TAG_LIST,
        payload: apiTag.getTagsList(tagType)
    };
}

export function getUserTagsList(tagType) {
    return {
        type: GET_USER_TAG_LIST,
        payload: apiTag.getUserTagsList(tagType)
    };
}


//组装热门文章资讯标签数据
export const CREATE_USER_TAG_LIST = 'CREATE_USER_TAG_LIST';
export function createUserTagList(id, tag, itemName) {
    return {
        type: CREATE_USER_TAG_LIST,
        payload: {
            id,
            tag,
            itemName
        }
    };
}
export const CLEAR_SELECTED_TAGS = 'CLEAR_SELECTED_TAGS';
export const CLEAR_SELECTED_TAGS_SUCCESS = 'CLEAR_SELECTED_TAGS_SUCCESS';
export function clearSelectedTags(flag) {
    return {
        type: CLEAR_SELECTED_TAGS,
        payload: {
            flag
        }
    };
}

