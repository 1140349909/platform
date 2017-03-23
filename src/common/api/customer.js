import http from '../http';
import config from '../config';

//获取客户列表
export function getPlatformCustomers({
    name,
    type,
    page = 0,
    size = 10,
    order = config.ORDER
}) {
    return http.get(config.API_ILOKA_URL + '/platadmin/customer/list', {
        name,
        type,
        page,
        size,
        order
    });
}

//获取客户信息
export function getPlatformCustomer(id) {
    return http.get(config.API_ILOKA_URL + '/platadmin/customer/{id}', {
        id
    });
}

// 删除客户信息
export function deletePlatAdminCustomer(id) {
    return http.delete(config.API_ILOKA_URL + '/platadmin/customer/{id}', {
        id
    });
}

// 获取客户信息
export function getAdminCustomer() {
    return http.get(config.API_ILOKA_URL + '/admin/customer/uin');
}

// 修改客户信息
export function updateAdminCustomer(params) {
    return http.post(config.API_ILOKA_URL + '/admin/customer/{id}', params, {
        params: {
            id: params.id,
        }
    });
}

// 修改客户合作伙伴
export function updateAdminCustomerPartner({
    id,
    name,
    contact,
    logo,
}) {
    return http.post(config.API_ILOKA_URL + '/admin/customer/partner/info/{id}', {
        name,
        logo,
        contact: {
            name: contact.name,
            mobile: contact.mobile,
            email: contact.email,
        },
    }, {
        params: {
            id
        }
    });
}

// 新增客户合作伙伴
export function addAdminCustomerPartner(customerId, params) {
    return http.post(config.API_ILOKA_URL + '/admin/customer/partner/{customerId}', params, {
        params: {
            customerId,
        }
    });
}

//获取客户商城权限配置
export function getPlatformCustomerMallAuth(id) {
    return http.get(config.API_ILOKA_URL + '/platadmin/customer/mall/auth/{id}', {
        id
    });
}

//更新客户商城权限配置
/*{
 "brandAuth": "FALSE",
 "contentAuth": "FALSE",
 "mallAuth": "FALSE",
 "mallOpMode": "S",
 "partnerAuth": "FALSE",
 "yygAuth": "FALSE"
 }*/
export function updatePlatformCustomerMallAuth(id, data) {
    return http.post(config.API_ILOKA_URL + '/platadmin/customer/mall/auth/{id}', data, {
        params: {
            id: id
        }
    });
}


//更新客户状态
export function updatePlatformCustomerStatus(id, data) {
    return http.post(config.API_ILOKA_URL + '/platadmin/customer/approve/{id}', data, {
        params: {
            id: id
        }
    });
}


// 修改客户微信设置
/*{
 "appid": "string",
 "enable": true,
 "muchId": "string",
 "muchKey": "string",
 "secret": "string"
 "useSys": true
 }*/
export function updateCustomerWechat(id, data) {
    return http.post(config.API_ILOKA_URL + '/admin/customer/wechat/{id}', data, {
        params: {
            id
        }
    });
}

// 修改客户支付宝设置
/*
 {
 "account": "string",
 "enable": true,
 "key": "string",
 "pid": "string",
 "useSys": true
 }
 */
export function updateCustomerAlipay(id, data) {
    return http.post(config.API_ILOKA_URL + '/admin/customer/alipay/{id}', data, {
        params: {
            id
        }
    });
}

// 修改银联设置
export function updateCustomerUnionpay({
    id,
    data,
}) {
    return http.post(config.API_ILOKA_URL + '/admin/customer/unionpay/{id}', data, {
        params: {
            id
        }
    });
}

// 获取客户列表
export function getAdminCustomerList({
    type = 'PARTNER',
    partnerId,
    page = 0,
    size = config.SIZE,
    sort,
    order,
}) {
    return http.get(config.API_ILOKA_URL + '/admin/customer/list', {
        type,
        partnerId,
        page,
        size,
        sort,
        order,
    });
}

//获取客户积分兑换设置
export function getIntegralExchange() {
    return http.get(config.API_ILOKA_URL + '/admin/customer/integral/exchange');
}

//修改客户积分兑换设置
export function updateIntegralExchange(data) {
    return http.post(config.API_ILOKA_URL + '/admin/customer/integral/exchange/{id}', data.para, {
        params: {
            id: data.id,
            value: data.para.integral
        }
    });
}

// 获取会员卡风格
export function getCardStyle() {
    return http.get(config.API_ILOKA_URL + '/admin/customer/member/card/style');
}


// 设置会员卡风格
export function updateCardStyle(id, params) {
    return http.post(config.API_ILOKA_URL + '/admin/customer/member/card/style/{id}', {
        title: params.title,
        style: params.style,
    }, {
        params: {
            id
        }
    });
}


//get  /api/v1/{client}/{channel}/manager/customer/address 获取客户地址
export function getCustomerAddress({
    type
}) {
    return http.get(config.API_ILOKA_URL + '/manager/customer/address', {
        type
    });
}

//post /api/v1/{client}/{channel}/manager/customer/address 新增客户地址
export function addCustomerAddress(data) {
    return http.post(config.API_ILOKA_URL + '/manager/customer/address', data);
}

//post /api/v1/{client}/{channel}/manager/customer/address/{id} 修改客户地址
export function updateCustomerAddress(id, data) {
    return http.post(config.API_ILOKA_URL + '/manager/customer/address/{id}', data, {
        params: {
            id
        }
    });
}

//delete /api/v1/{client}/{channel}/manager/customer/address/{id} 删除客户地址
export function deleteCustomerAddress(id) {
    return http.delete(config.API_ILOKA_URL + '/manager/customer/address/{id}', null,
        {
            params: {
                id
            }
        });
}

//GET /api/v1/{client}/{channel}/manager/customer/config/info 获取客户用户配置
export function getCustomerConfigInfo() {
    return http.get(config.API_ILOKA_URL + '/manager/customer/config/info');
}

//post /api/v1/{client}/{channel}/manager/customer/config/shortcut/{shortcut} 新增用户快捷操作
export function updateCustomerConfigShortcut(shortcut) {
    return http.post(config.API_ILOKA_URL + '/manager/customer/config/shortcut/{shortcut}', null, {
        params: {
            shortcut
        }
    });
}

//DELETE /api/v1/{client}/{channel}/manager/customer/config/shortcut/{shortcut} 删除用户快捷操作
export function deleteCustomerConfigShortcut(shortcut) {
    return http.delete(config.API_ILOKA_URL + '/manager/customer/config/shortcut/{shortcut}', {
        shortcut
    });
}













