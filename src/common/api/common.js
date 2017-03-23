import http from '../http';
import config from '../config';

// 登陆
export function login(username, password) {
    return http.post('/iloka/security_check',
        'username=' + username + '&password=' + password, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        });
}

// 注销
export function logout() {
    return http.get('/iloka/logout');
}

// 获取地区信息
export function getRegionData() {
    return http.get(config.DATA_REGION_URL, null, {
        baseURL: location.origin
    });
}

// GET /api/v1/{client}/{channel}/platform/cmd/{cmd} 平台指令发送
export function platformCmd(cmd) {
    return http.get(config.API_ILOKA_URL + '/platform/cmd/{cmd}', {
        cmd
    });
}
