import http from '../http';
import config from '../config';

// GET /api/v1/{client}/{channel}/manager/vsite/config 获取微站配置信息
export function getVSiteConfig() {
    return http.get(config.API_ILOKA_URL+'/manager/vsite/config');
}

// POST /api/v1/{client}/{channel}/manager/vsite/basic 设置微站基本信息
export function addVSiteBasic(data) {
    return http.post(config.API_ILOKA_URL+'/manager/vsite/basic', data);
}

// POST /api/v1/{client}/{channel}/manager/vsite/config 配置微站
export function addVSiteConfig(data) {
    return http.post(config.API_ILOKA_URL+'/manager/vsite/config', data);
}

// POST /api/v1/{client}/{channel}/manager/vsite/config/auth 配置微站模块
export function addVSiteConfigAuth(data) {
    return http.post(config.API_ILOKA_URL+'/manager/vsite/config/auth', data);
}

// POST /api/v1/{client}/{channel}/manager/vsite/cus 设置微站客服人员
export function addVSiteCus(data) {
    return http.post(config.API_ILOKA_URL+'/manager/vsite/cus', data);
}


