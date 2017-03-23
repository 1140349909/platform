import * as apiAuthorize from '../../api/authorize';

// 授权平台列表
export const GET_CHANNEL_LIST = 'GET_CHANNEL_LIST';
export const GET_CHANNEL_LIST_PENDING = 'GET_CHANNEL_LIST_PENDING';
export const GET_CHANNEL_LIST_SUCCESS = 'GET_CHANNEL_LIST_SUCCESS';
export const GET_CHANNEL_LIST_FAILURE = 'GET_CHANNEL_LIST_FAILURE';

// 获取授权平台列表（仅微信公众号）
export function getChannelList(channel,uinIds) {
    return {
        type: GET_CHANNEL_LIST,
        payload: apiAuthorize.getChannelList(channel,uinIds)
    };
}

