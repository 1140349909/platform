import http from '../http';
import config from '../config';

// 返回当前客户的所有会员提现列表
export function getManagerWithdrawList({
    status = 'news',
    mobile,
    page = 0,
    size = 10,
    sort,
    order
}) {
    return http.get(config.API_ROOT + '/api/cash/manager/withdraw/{status}/list', {
        status,
        mobile,
        page,
        size,
        sort,
        order

    });
}

// 提供获取会员现金提现处理状态服务
export function updateManagerWithdrawStatus(data) {
    return http.post(config.API_ROOT + '/api/cash/manager/withdraw/status', data);
}

// 提供确认对会员提现自己的现金服务
export function updateManagerWithdrawConfirm(data) {
    return http.post(config.API_ROOT + '/api/cash/manager/withdraw/confirmation', data);
}



