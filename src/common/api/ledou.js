import http from '../http';
import config from '../config';
// GET /api/v1/{client}/{channel}/ledou/amount 获取乐豆数量
export function getLedouAmount() {
    return http.get('ledou/amount');
}


// POST /api/v1/{client}/{channel}/ledou/buy 购买平台乐豆
export function buyLedou(params) {
    return http.post('ledou/buy', params);
}

// POST /api/v1/{client}/{channel}/ledou/trade 乐豆交易服务
export function tradeLedou(resType, params) {
    return http.post(config.API_ILOKA_URL + '/ledou/trade/{resType}', params, {
        params: {
            resType
        }
    });
}

// GET /api/v1/{client}/{channel}/ledou/buy/result/{businessId} 检测乐豆是否购买成功
export function getLedouBuyResult(businessId) {
    return http.get('ledou/buy/result/{businessId}', {
        businessId,
    });
}


/*结算中心*/

//get /api/v1/{client}/{channel}/manager/trans/config/account/withdraw 获取结算账户设置
export function getConfigAccountWithdraw() {
    return http.get('manager/trans/config/account/withdraw');
}

//get /api/v1/{client}/{channel}/manager/trans/config/invoice 获取发票设置

export function getConfigInvoice({
    check
}) {
    return http.get('manager/trans/config/invoice', {
        check
    });
}

//get /api/v1/{client}/{channel}/manager/trans/invoice/list 发票索取获取列表
export function getInvoiceList({
    dateRange,
    startDate,
    endDate,
    invocieProcessStatus,
    size,
    page,
    sort
}) {
    startDate = startDate ? startDate + ' 00:00:00.000' : '';
    endDate = endDate ? endDate + ' 23:59:59.999' : '';
    return http.get('manager/trans/invoice/list', {
        dateRange,
        startDate,
        endDate,
        invocieProcessStatus,
        size,
        page,
        sort
    });

}

//get /api/v1/{client}/{channel}/trans/invoice/list 发票索取获取列表
export function getTransInvoiceList({
    dateRange,
    startDate,
    endDate,
    invocieProcessStatus,
    size,
    page,
    sort
}) {
    startDate = startDate ? startDate + ' 00:00:00.000' : '';
    endDate = endDate ? endDate + ' 23:59:59.999' : '';
    return http.get('trans/invoice/list', {
        dateRange,
        startDate,
        endDate,
        invocieProcessStatus,
        size,
        page,
        sort
    });

}


//post /api/v1/{client}/{channel}/manager/trans/config/account/withdraw 结算账户设置
export function updateConfigAccountWithdraw(params) {
    return http.post('manager/trans/config/account/withdraw', params);
}

//post /api/v1/{client}/{channel}/manager/trans/config/invoice 发票设置
export function updateConfigInvoice(data) {
    return http.post('manager/trans/config/invoice', data);
}

//POST /api/v1/{client}/{channel}/manager/trans/invoice 发票索取
export function demandInvoice(data) {
    return http.post('manager/trans/invoice', data);
}

// POST /api/v1/{client}/{channel}/manager/trans/invoice/express/{id} 发票邮寄确认
export function confirmManagerLedouSentInvoice(id, data) {
    return http.post('manager/trans/invoice/express/{id}', data, {
        params: {
            id
        }
    });
}

//GET /api/v1/{client}/{channel}/manager/trans/trade/list 获取交易列表服务
export function getTransTradeList({
    dateRange,
    startDate,
    endDate,
    type,
    invocieStatus,
    size,
    page,
    sort,
}) {
    startDate = startDate ? startDate + ' 00:00:00.000' : '';
    endDate = endDate ? endDate + ' 23:59:59.999' : '';
    return http.get('manager/trans/trade/{type}/list', {
        dateRange,
        startDate,
        endDate,
        type,
        invocieStatus,
        size,
        page,
        sort,
    });
}
