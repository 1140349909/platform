import * as apiContent from '../../api/content';
import * as apiApp from '../../api/app';
import * as apiDistribute from '../../api/distribute';

//用户获取“我的”资讯模板数据
export const GET_APPDATA_LIST = 'GET_APPDATA_LIST';
export const GET_APPDATA_LIST_PENDING = 'GET_APPDATA_LIST_PENDING';
export const GET_APPDATA_LIST_SUCCESS = 'GET_APPDATA_LIST_SUCCESS';
export const GET_APPDATA_LIST_FAILURE = 'GET_APPDATA_LIST_FAILURE';

//用户获取“我的”资讯模板数据
export const GET_CONTENT_LIST = 'GET_CONTENT_LIST';
export const GET_CONTENT_LIST_PENDING = 'GET_CONTENT_LIST_PENDING';
export const GET_CONTENT_LIST_SUCCESS = 'GET_CONTENT_LIST_SUCCESS';
export const GET_CONTENT_LIST_FAILURE = 'GET_CONTENT_LIST_FAILURE';

// 返回当前账户下的客户所有分发
export const GET_DISTRIBUTE_LIST = 'GET_DISTRIBUTE_LIST';
export const GET_DISTRIBUTE_LIST_PENDING = 'GET_DISTRIBUTE_LIST_PENDING';
export const GET_DISTRIBUTE_LIST_SUCCESS = 'GET_DISTRIBUTE_LIST_SUCCESS';
export const GET_DISTRIBUTE_LIST_FAILURE = 'GET_DISTRIBUTE_LIST_FAILURE';

// 新增
export const ADD_DISTRIBUTE = 'ADD_DISTRIBUTE';
export const ADD_DISTRIBUTE_PENDING = 'ADD_DISTRIBUTE_PENDING';
export const ADD_DISTRIBUTE_SUCCESS = 'ADD_DISTRIBUTE_SUCCESS';
export const ADD_DISTRIBUTE_FAILURE = 'ADD_DISTRIBUTE_FAILURE';

// 修改
export const UPDATE_DISTRIBUTE = 'UPDATE_DISTRIBUTE';
export const UPDATE_DISTRIBUTE_PENDING = 'UPDATE_DISTRIBUTE_PENDING';
export const UPDATE_DISTRIBUTE_SUCCESS = 'UPDATE_DISTRIBUTE_SUCCESS';
export const UPDATE_DISTRIBUTE_FAILURE = 'UPDATE_DISTRIBUTE_FAILURE';

// 获取统计数据
export const GET_DISTRIBUTE_STATISTICS = 'GET_DISTRIBUTE_STATISTICS';
export const GET_DISTRIBUTE_STATISTICS_PENDING = 'GET_DISTRIBUTE_STATISTICS_PENDING';
export const GET_DISTRIBUTE_STATISTICS_SUCCESS = 'GET_DISTRIBUTE_STATISTICS_SUCCESS';
export const GET_DISTRIBUTE_STATISTICS_FAILURE = 'GET_DISTRIBUTE_STATISTICS_FAILURE';

// 获取资源最近一次分发配置
export const GET_DISTRIBUTE_RES_LATEST = 'GET_DISTRIBUTE_RES_LATEST';
export const GET_DISTRIBUTE_RES_LATEST_PENDING = 'GET_DISTRIBUTE_RES_LATEST_PENDING';
export const GET_DISTRIBUTE_RES_LATEST_SUCCESS = 'GET_DISTRIBUTE_RES_LATEST_SUCCESS';
export const GET_DISTRIBUTE_RES_LATEST_FAILURE = 'GET_DISTRIBUTE_RES_LATEST_FAILURE';

// 微信试推送
export const SEND_WX_DISTRIBUTE_MESSAGE = 'SEND_WX_DISTRIBUTE_MESSAGE';
export const SEND_WX_DISTRIBUTE_MESSAGE_PENDING = 'SEND_WX_DISTRIBUTE_MESSAGE_PENDING';
export const SEND_WX_DISTRIBUTE_MESSAGE_SUCCESS = 'SEND_WX_DISTRIBUTE_MESSAGE_SUCCESS';
export const SEND_WX_DISTRIBUTE_MESSAGE_FAILURE = 'SEND_WX_DISTRIBUTE_MESSAGE_FAILURE';

// 检查资源分发状态
export const GET_DISTRIBUTE_STATUS = 'GET_DISTRIBUTE_STATUS';
export const GET_DISTRIBUTE_STATUS_PENDING = 'GET_DISTRIBUTE_STATUS_PENDING';
export const GET_DISTRIBUTE_STATUS_SUCCESS = 'GET_DISTRIBUTE_STATUS_SUCCESS';
export const GET_DISTRIBUTE_STATUS_FAILURE = 'GET_DISTRIBUTE_STATUS_FAILURE';


//用户获取“我的”活动模板数据
export function getAppDataList(params) {
    return {
        type: GET_APPDATA_LIST,
        payload: apiApp.getAppDataList(params)
    };
}

//用户获取“我的”资讯模板数据
export function getContentList(params) {
    return {
        type: GET_CONTENT_LIST,
        payload: apiContent.getContentList(params)
    };
}

// 返回当前账户下的客户所有分发
export function getDistributeList(params) {
    return {
        type: GET_DISTRIBUTE_LIST,
        payload: apiDistribute.getDistributeList(params)
    };
}

// 新增开放平台
export function addDistribute(data) {
    return {
        type: ADD_DISTRIBUTE,
        payload: apiDistribute.addDistribute(data)
    };
}

// 修改开放平台
export function updateDistribute(data, id) {
    return {
        type: UPDATE_DISTRIBUTE,
        payload: apiDistribute.updateDistribute(data, id)
    };
}

// 获取分发统计数据
export function getDistributeStatistics(id) {
    return {
        type: GET_DISTRIBUTE_STATISTICS,
        payload: apiDistribute.getDistributeStatistics(id)
    };
}

// 获取资源最近一次分发配置
export function getDistributeResLatest(resId) {
    return {
        type: GET_DISTRIBUTE_RES_LATEST,
        payload: apiDistribute.getDistributeResLatest(resId)
    };
}

// 微信试推送
export function sendWxDistributeMessage(params) {
    return {
        type: SEND_WX_DISTRIBUTE_MESSAGE,
        payload: apiDistribute.sendWxDistributeMessage(params)
    };
}

// 检查资源分发状态
export function getDistributeStatus() {
    return {
        type: GET_DISTRIBUTE_STATUS,
        payload: apiDistribute.getDistributeStatus(),
        meta: {
            silent: true
        }
    };
}
