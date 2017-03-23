import http from '../http';
import config from '../config';

// GET /api/v1/{client}/{channel}/merchant/account 商户总收益查询
export function getMerchantAccount() {
    return http.get('merchant/account');
}

// GET /api/v1/{client}/{channel}/merchant/withdraw/list 商户提现列表
export function getMerchantWithdrawList({
    startDate,
    endDate,
    tradeStatus,
    platStatus,
    merchantStatus,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    startDate = startDate ? startDate + ' 00:00:00.000' : '';
    endDate = endDate ? endDate + ' 23:59:59.999' : '';
    return http.get('merchant/withdraw/list', {
        startDate,
        endDate,
        tradeStatus,
        platStatus,
        merchantStatus,
        page,
        size,
        sort,
        order
    });
}
// GET /api/v1/{client}/{channel}/manager/withdraw/list 商户提现列表
export function getManagerMerchantWithdrawList({
    startDate,
    endDate,
    tradeStatus,
    platStatus,
    merchantStatus,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    startDate = startDate ? startDate + ' 00:00:00.000' : '';
    endDate = endDate ? endDate + ' 23:59:59.999' : '';
    return http.get('manager/withdraw/list', {
        startDate,
        endDate,
        tradeStatus,
        platStatus,
        merchantStatus,
        page,
        size,
        sort,
        order
    });
}


// GET /api/v1/{client}/{channel}/tips/history/list 商户打赏流水列表
export function getMerchantTipsHistory({
    startDate,
    endDate,
    page,
    size = config.SIZE,
    sort,
    order
}) {
    startDate = startDate ? startDate + ' 00:00:00.000' : '';
    endDate = endDate ? endDate + ' 23:59:59.999' : '';
    return http.get(config.API_ILOKA_URL+'/tips/history/list', {
        startDate,
        endDate,
        page,
        size,
        sort,
        order
    });
}

// POST /api/v1/{client}/{channel}/merchant/withdraw 商户提现申请
export function addMerchantWithdraw(data) {
    return http.post('merchant/withdraw', data);
}

// POST /api/v1/{client}/{channel}/merchant/withdraw/{status}/{id} 商户提现审核
export function updateMerchantWithdraw({id,data}) {
    return http.post('merchant/withdraw/{id}', data, {
        params: {
            id
        }
    });
}

// /api/v1/{client}/{channel}/manager/withdraw/plat/rule/{id}/{accountType} 查询平台提现审核剩余
export function getWithdrawRuleAccount({id,accountType}) {
    return http.get('manager/withdraw/plat/rule/{id}/{accountType}',{
        id,
        accountType
    });
}
