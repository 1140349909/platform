import http from '../http';
import config from '../config';

//获取所有已经开通代言功能的会员
export function getManagerTkerList({
    mobile,
    page = 0,
    size = 10,
    sort,
    order
}) {
    return http.get(config.API_ROOT + '/manager/tker/member/list', {
        mobile,
        page,
        size,
        sort,
        order
    });
}

//获取代言会员红利提成
export function getManagerTkerProfit({
    id,
    level,
    page = 0,
    size = 10,
    sort,
    order
}) {
    return http.get(config.API_ROOT + '/manager/tker/member/profit/list/{id}', {
        id,
        level,
        page,
        size,
        sort,
        order
    });
}

//获取代言会员集客
export function getManagerTkerSubMember({
    memberId,
    mobile,
    page = 0,
    size = 10,
    sort,
    order
}) {
    return http.get(config.API_ROOT + '/manager/tker/member/sub/list/{memberId}', {
        memberId,
        mobile,
        page,
        size,
        sort,
        order
    });
}

//获取当前客户的代言分润设置
export function getManagerTkerConfig() {
    return http.get(config.API_ROOT + '/manager/tker/config');
}

//配置当前客户的代言分润设置
export function updateManagerTkerConfig(data) {
    return http.post(config.API_ROOT + '/manager/tker/config', data);
}

// 获取客户代言平台商品TOP榜
export function getManagerTkerProductTop(top = 10, type) {
    return http.get(config.API_ROOT + '/manager/tker/data/top/{type}/{top}', {
        type,
        top,
    });
}

// 获取客户代言平台会员TOP榜
export function getManagerTkerMemberTop(top = 10, type) {
    return http.get(config.API_ROOT + '/manager/tker/data/top/{type}/{top}', {
        type,
        top,
    });
}

// 获取客户代言平台汇总数据
export function getManagerTkerDataTotal() {
    return http.get(config.API_ROOT + '/manager/tker/data/total');
}

