import http from '../http';
import config from '../config';

// 返回当前账户下的客户所有分发
export function getDistributeList({
    idChannel,
    resType,
    dateRange,
    userId,
    distributeStatus,
    page = 0,
    size = 10,
    sort,
    order,
    status,
}) {
    return http.get(config.API_ILOKA_URL + '/manager/distribute/list', {
        idChannel,
        resType,
        dateRange,
        userId,
        distributeStatus,
        page,
        size,
        sort,
        order,
        status,
    });
}

// 新增开放平台
export function addDistribute(data) {
    return http.post(config.API_ILOKA_URL + '/manager/distribute', data);
}

// 修改开放平台
export function updateDistribute(data, id) {
    return http.post(config.API_ILOKA_URL + '/manager/distribute/{id}', data, {
        params: {
            id
        }
    });
}

// 获取分发统计数据
export function getDistributeStatistics(id) {
    return http.get(config.API_ILOKA_URL + '/manager/distribute/statistics/{id}', {
        id
    });
}

// 获取资源最近一次分发配置 getDistributeResLatest
export function getDistributeResLatest(resId) {
    return http.get(config.API_ILOKA_URL + '/manager/distribute/res/latest/{resId}', {
        resId
    });
}

// 微信试推送
export function sendWxDistributeMessage({wxUin, resId, wxName, resArticles = null}) {
    return http.post(config.API_ILOKA_URL + '/manager/distribute/message/send/wx/{wxUin}/{resId}', resArticles, {
        params: {
            wxUin,
            resId,
            wxName
        }
    });
}

// 检查资源分发状态
export function getDistributeStatus() {
    return http.get(config.API_ILOKA_URL + '/manager/distribute/status');
}

