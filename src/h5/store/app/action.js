import * as apiApp from '../../../common/api/app';
import * as apiMedia from  '../../../common/api/media';
import * as apiTag from  '../../../common/api/tag';


// 获取作品数据
export const GET_APP_DATA = 'GET_APP_DATA';
export const GET_APP_DATA_PENDING = 'GET_APP_DATA_PENDING';
export const GET_APP_DATA_SUCCESS = 'GET_APP_DATA_SUCCESS';
export const GET_APP_DATA_FAILURE = 'GET_APP_DATA_FAILURE';

// 更新作品数据
export const UPDATE_APP_DATA = 'UPDATE_APP_DATA';
export const UPDATE_APP_DATA_PENDING = 'UPDATE_APP_DATA_PENDING';
export const UPDATE_APP_DATA_SUCCESS = 'UPDATE_APP_DATA_SUCCESS';
export const UPDATE_APP_DATA_FAILURE = 'UPDATE_APP_DATA_FAILURE';

// 自动同步作品数据
export const SYNC_APP_DATA = 'SYNC_APP_DATA';

// 获取左侧菜单
export const GET_CONTENT_MENU = 'GET_CONTENT_MENU';
export const GET_CONTENT_MENU_PENDING = 'GET_CONTENT_MENU_PENDING';
export const GET_CONTENT_MENU_SUCCESS = 'GET_CONTENT_MENU_SUCCESS';
export const GET_CONTENT_MENU_FAILURE = 'GET_CONTENT_MENU_FAILURE';

// 初始化菜单栏
export const INIT_CONTENT_MENU = 'INIT_CONTENT_MENU';

// 选择左侧菜单
export const SELECT_CONTENT_MENU = 'SELECT_CONTENT_MENU';

// 根据内容Id获取内容详情
export function getAppData(id) {
    return {
        type: GET_APP_DATA,
        payload: apiApp.getAppData(id)
    };
}

// 更新作品数据
export function updateAppData(item) {
    return {
        type: UPDATE_APP_DATA,
        payload: apiApp.updateAppData(item),
    };
}

// 自动同步数据
export function syncApp(item) {
    return {
        type: SYNC_APP_DATA,
        payload: item,
    };
}


// // 获取编辑器侧栏菜单
export function getContentMenu(type) {
    return {
        type: GET_CONTENT_MENU,
        payload: Promise.all([
            apiMedia.getMediaTypes('iloka'),
            apiTag.getUserTagsList('h5Tpl')
        ]).then((res) => {
            return {
                res: {
                    menuMediaData: res[0],
                    menuTplData: res[1]
                },
                type
            };
        })
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





