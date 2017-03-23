import http from '../http';
import config from '../config';

// GET /api/pay/business 获取支付业务信息列表
export function getPayBusinessList({
    page = 0,
    size = config.SIZE,
    sort
}) {
    return http.get(config.API_ROOT + '/api/pay/business', {
        page,
        size,
        sort
    });
}

// GET /api/pay/business/{id} 获取支付业务信息
export function getPayBusiness(id) {
    return http.get(config.API_ROOT + '/api/pay/business/{id}', {
        id,
    });
}

// POST /api/pay/business 新增支付业务信息
export function updatePayBusiness(params) {
    return http.post(config.API_ROOT + '/api/pay/business', params);
}


// POST /api/pay/customer/version/progress 客户账户版本升级付费
export function updatePayCustomerVersionProgress(params) {
    return http.post(config.API_ROOT + '/api/pay/customer/version/progress', params);
}

// GET /api/pay/customer/buy/result/{businessId} 检验是否购买成功
export function getCustomerBuyResult(businessId) {
    return http.get(config.API_ROOT +  '/api/pay/customer/buy/result/{businessId}', {
        businessId,
    });
}
