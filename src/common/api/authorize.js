import http from '../http';
import config from '../config';

// 获取授权平台列表（仅微信公众号）
export function getChannelList(channel,uinIds) {
    return http.get(config.API_ILOKA_ROOT +  '/api/' + channel + '/manager/authorize/' + channel + '/list', {
        channel,
        uinIds
    });
}
