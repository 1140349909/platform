import  * as apiContent from '../../../common/api/content';
import  * as apiApp from '../../../common/api/app';

/*艾乐卡*/

// 查询资讯状态
export const UPDATE_CONTENT_STATUS = 'UPDATE_CONTENT_STATUS';
export const UPDATE_CONTENT_STATUS_PENDING = 'UPDATE_CONTENT_STATUS_PENDING';
export const UPDATE_CONTENT_STATUS_SUCCESS = 'UPDATE_CONTENT_STATUS_SUCCESS';
export const UPDATE_CONTENT_STATUS_FAILURE = 'UPDATE_CONTENT_STATUS_FAILURE';

// 获取资讯
export const GET_CONTENT = 'GET_CONTENT';
export const GET_CONTENT_PENDING = 'GET_CONTENT_PENDING';
export const GET_CONTENT_SUCCESS = 'GET_CONTENT_SUCCESS';
export const GET_CONTENT_FAILURE = 'GET_CONTENT_FAILURE';

// 获取资讯
export const GET_APP_DATA = 'GET_APP_DATA';
export const GET_APP_DATA_PENDING = 'GET_APP_DATA_PENDING';
export const GET_APP_DATA_SUCCESS = 'GET_APP_DATA_SUCCESS';
export const GET_APP_DATA_FAILURE = 'GET_APP_DATA_FAILURE';

// 提供用户获取资讯列表数据服务
export const GET_CONTENT_LIST = 'GET_CONTENT_LIST';
export const GET_CONTENT_LIST_PENDING = 'GET_CONTENT_LIST_PENDING';
export const GET_CONTENT_LIST_SUCCESS = 'GET_CONTENT_LIST_SUCCESS';
export const GET_CONTENT_LIST_FAILURE = 'GET_CONTENT_LIST_FAILURE';

// 查询资讯状态
export function checkContent(data) {
    return {
        type: UPDATE_CONTENT_STATUS,
        payload: apiContent.checkContent(data)
    };
}

//获取资讯详情
export function getContent(id) {
    return {
        type: GET_CONTENT,
        payload: apiContent.getContent(id)
    };
}

//提供用户获取作品数据服务
export function getAppData(id) {
    return {
        type: GET_APP_DATA,
        payload: apiApp.getAppData(id)
    };
}

// 提供用户获取资讯列表数据服务
export function getContentList(params) {
    return {
        type: GET_CONTENT_LIST,
        payload: apiContent.getContentList(params)
    };
}


