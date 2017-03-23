/**
 * Created by Asoiso on 16/8/20.
 */
import * as apiModule from '../../../common/api/module';

// 模块管理管理
export const GET_PLATFORM_MODULE_INFO = 'GET_PLATFORM_MODULE_INFO';
export const GET_PLATFORM_MODULE_INFO_PENDING = 'GET_PLATFORM_MODULE_INFO_PENDING';
export const GET_PLATFORM_MODULE_INFO_SUCCESS = 'GET_PLATFORM_MODULE_INFO_SUCCESS';
export const GET_PLATFORM_MODULE_INFO_FAILURE = 'GET_PLATFORM_MODULE_INFO_FAILURE';

export const GET_PLATFORM_MODULE = 'GET_PLATFORM_MODULE';
export const GET_PLATFORM_MODULE_PENDING = 'GET_PLATFORM_MODULE_PENDING';
export const GET_PLATFORM_MODULE_SUCCESS = 'GET_PLATFORM_MODULE_SUCCESS';
export const GET_PLATFORM_MODULE_FAILURE = 'GET_PLATFORM_MODULE_FAILURE';

export const GET_PLATFORM_MODULE_LIST = 'GET_PLATFORM_MODULE_LIST';
export const GET_PLATFORM_MODULE_LIST_PENDING = 'GET_PLATFORM_MODULE_LIST_PENDING';
export const GET_PLATFORM_MODULE_LIST_SUCCESS = 'GET_PLATFORM_MODULE_LIST_SUCCESS';
export const GET_PLATFORM_MODULE_LIST_FAILURE = 'GET_PLATFORM_MODULE_LIST_FAILURE';

export const ADD_PLATFORM_MODULE = 'ADD_PLATFORM_MODULE';
export const ADD_PLATFORM_MODULE_PENDING = 'ADD_PLATFORM_MODULE_PENDING';
export const ADD_PLATFORM_MODULE_SUCCESS = 'ADD_PLATFORM_MODULE_SUCCESS';
export const ADD_PLATFORM_MODULE_FAILURE = 'ADD_PLATFORM_MODULE_FAILURE';

export const UPDATE_PLATFORM_MODULE = 'UPDATE_PLATFORM_MODULE';
export const UPDATE_PLATFORM_MODULE_PENDING = 'UPDATE_PLATFORM_MODULE_PENDING';
export const UPDATE_PLATFORM_MODULE_SUCCESS = 'UPDATE_PLATFORM_MODULE_SUCCESS';
export const UPDATE_PLATFORM_MODULE_FAILURE = 'UPDATE_PLATFORM_MODULE_FAILURE';

export const DELETE_PLATFORM_MODULE = 'DELETE_PLATFORM_MODULE';
export const DELETE_PLATFORM_MODULE_PENDING = 'DELETE_PLATFORM_MODULE_PENDING';
export const DELETE_PLATFORM_MODULE_SUCCESS = 'DELETE_PLATFORM_MODULE_SUCCESS';
export const DELETE_PLATFORM_MODULE_FAILURE = 'DELETE_PLATFORM_MODULE_FAILURE';


// 获取模块详情
export function getPlatformModule(id) {
    return {
        type: GET_PLATFORM_MODULE,
        payload: apiModule.getPlatformModule(id)
    };
}

// 获取模块列表
export function getPlatformModuleList(params) {
    return {
        type: GET_PLATFORM_MODULE_LIST,
        payload: apiModule.getPlatformModuleList(params)
    };
}

// 添加模块
export function addPlatformModule(item) {
    return {
        type: ADD_PLATFORM_MODULE,
        payload: apiModule.addPlatformModule(item)
    };
}

// 修改模块
export function updatePlatformModule(item) {
    return {
        type: UPDATE_PLATFORM_MODULE,
        payload: apiModule.updatePlatformModule(item)
    };
}

// 保存模块
export function savePlatformModule(item) {
    return item.id ? updatePlatformModule(item) : addPlatformModule(item);
}

// 删除模块
export function deletePlatformModule(id) {
    return {
        type: DELETE_PLATFORM_MODULE,
        payload: apiModule.deletePlatformModule(id)
    };
}

// 获取模块树列表
export function getPlatformModuleInfo(tagId) {
    return {
        type: GET_PLATFORM_MODULE_INFO,
        payload: apiModule.getPlatformModuleInfo({tagId})
    };
}
