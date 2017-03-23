import  * as apiContent from  '../../../common/api/content';
import  * as apiMedia from  '../../../common/api/media';
import _ from 'lodash';

// 根据内容Id获取内容详情
export const GET_CONTENT = 'GET_CONTENT';
export const GET_CONTENT_PENDING = 'GET_CONTENT_PENDING';
export const GET_CONTENT_SUCCESS = 'GET_CONTENT_SUCCESS';
export const GET_CONTENT_FAILURE = 'GET_CONTENT_FAILURE';

// 新增内容
export const ADD_CONTENT = 'ADD_CONTENT';
export const ADD_CONTENT_PENDING = 'ADD_CONTENT_PENDING';
export const ADD_CONTENT_SUCCESS = 'ADD_CONTENT_SUCCESS';
export const ADD_CONTENT_FAILURE = 'ADD_CONTENT_FAILURE';

// 修改内容
export const UPDATE_CONTENT = 'UPDATE_CONTENT';
export const UPDATE_CONTENT_PENDING = 'UPDATE_CONTENT_PENDING';
export const UPDATE_CONTENT_SUCCESS = 'UPDATE_CONTENT_SUCCESS';
export const UPDATE_CONTENT_FAILURE = 'UPDATE_CONTENT_FAILURE';

// 修改内容
export const UPDATE_TOUTIAO_CONTENT = 'UPDATE_TOUTIAO_CONTENT';
export const UPDATE_TOUTIAO_CONTENT_PENDING = 'UPDATE_TOUTIAO_CONTENT_PENDING';
export const UPDATE_TOUTIAO_CONTENT_SUCCESS = 'UPDATE_TOUTIAO_CONTENT_SUCCESS';
export const UPDATE_TOUTIAO_CONTENT_FAILURE = 'UPDATE_TOUTIAO_CONTENT_FAILURE';

export const RESET_CONTENT = 'RESET_CONTENT';

// 获取左侧菜单
export const GET_CONTENT_MENU = 'GET_CONTENT_MENU';
export const GET_CONTENT_MENU_PENDING = 'GET_CONTENT_MENU_PENDING';
export const GET_CONTENT_MENU_SUCCESS = 'GET_CONTENT_MENU_SUCCESS';
export const GET_CONTENT_MENU_FAILURE = 'GET_CONTENT_MENU_FAILURE';

// 初始化菜单栏
export const INIT_CONTENT_MENU = 'INIT_CONTENT_MENU';
// 选择左侧菜单
export const SELECT_CONTENT_MENU = 'SELECT_CONTENT_MENU';

export const SYNC_MEDIA = 'SYNC_MEDIA';

export const SYNC_CONTENT = 'SYNC_CONTENT';

// 根据内容Id获取内容详情
export function getContent(id) {
    return {
        type: GET_CONTENT,
        payload: apiContent.getContent(id)
    };
}

// 新增内容
export function addContent(item) {
    return {
        type: ADD_CONTENT,
        payload: apiContent.addContent(item),
        meta: {
            silent: true
        }
    };

    // 示例:误删
    // return function (dispatch, getState) {
    //
    //     dispatch({
    //         type: ADD_CONTENT_PENDING
    //     });
    //
    //     return apiContent.addContent(item).then((addResult)=> {
    //         const contentId = addResult.data;
    //         const params = addResult.params;
    //         params.id = contentId;
    //         apiContent.getContent(contentId).then((result)=> {
    //             // 添加成功,获取数据成功
    //             dispatch({
    //                 type: ADD_CONTENT_SUCCESS,
    //                 payload: result
    //             });
    //         }, ()=> {
    //             // 添加成功,获取数据失败
    //             dispatch({
    //                 type: ADD_CONTENT_SUCCESS,
    //                 payload: params
    //             });
    //         });
    //     }, (error)=> {
    //         // 添加失败
    //         dispatch({
    //             type: ADD_CONTENT_FAILURE,
    //             payload: error
    //         });
    //     });
    // };
}

// 修改内容
export function updateContent(item) {
    return {
        type: UPDATE_CONTENT,
        payload: apiContent.updateContent(item),
        meta: {
            silent: true
        }
    };
}

// 修改内容
export function updateTouTiaoContent(item) {
    return {
        type: UPDATE_TOUTIAO_CONTENT,
        payload: apiContent.updateTouTiaoContent(item),
        meta: {
            silent: true
        }
    };
}

// 保存内容
export function saveContent(item) {
    let release = ['wx', 'wb', 'vsite', 'toutiao'];
    _.forEach(release, (key) => {
        if(item[key].imgId) {
            _.forEach(release, (key2)=> {
                if (!item[key2].imgId) {
                    item[key2].imgId = item[key].imgId;
                }
            });
        }
    });
    return item.id ? updateContent(item) : addContent(item);
}

// 同步图片
export function syncMedia(ids) {
    return {
        type: SYNC_MEDIA,
        payload: ids
    };
}

// 自动同步内容
export function syncContent(item) {
    return {
        type: SYNC_CONTENT,
        payload: item
    };
}

// 重置内容
export function resetContent() {
    return {
        type: RESET_CONTENT
    };
}

// 获取编辑器侧栏菜单
export function getContentMenu() {
    return {
        type: GET_CONTENT_MENU,
        payload: apiMedia.getMediaTypes('iloka')
    };
}

// 初始化菜单栏
export function initContentMenu({type, cate, scope, tag}) {
    return {
        type: INIT_CONTENT_MENU,
        payload: {
            type,
            cate,
            scope,
            tag
        }
    };
}

// 选择菜单项目
export function selectContentMenu({type, cate, scope, tag}) {
    return {
        type: SELECT_CONTENT_MENU,
        payload: {
            type,
            cate,
            scope,
            tag
        }
    };
}

