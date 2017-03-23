import http from '../http';
import config from '../config';

// GET /api/v1/{client}/{channel}/admin/account/type/list 平台账户类型列表服务
export function getAccountTypeList({
    disabled,
    page,
    size = config.SIZE,
    sort,
    order,
}) {
    return http.get(config.API_ILOKA_URL + '/admin/account/type/list', {
        disabled,
        page,
        size,
        sort,
        order
    });
}

// GET /api/v1/{client}/{channel}/admin/account/type/{id} 获取平台账户类型
export function getAccountType(id) {
    return http.get(config.API_ILOKA_URL + '/admin/account/type/{id}', {
        id
    });
}

// POST /api/v1/{client}/{channel}/platadmin/account/type 添加平台账户类型
export function addAccountType(data) {
    return http.post(config.API_ILOKA_URL + '/platadmin/account/type', data);
}

// POST /api/v1/{client}/{channel}/platadmin/account/type/{id} 修改平台账户类型
export function updateAccountType({
    id,
    data
}) {
    return http.post(config.API_ILOKA_URL + '/platadmin/account/type/{id}', data,
        {
            params: {
                id
            }
        });
}

// PUT /api/v1/{client}/{channel}/platadmin/account/type/status/{id} 禁/启用平台账户类型
export function switchAccountTypeStatus({
    id,
    disabled
}) {
    return http.put(config.API_ILOKA_URL + '/platadmin/account/type/status/{id}', null, {
        params: {
            id,
            disabled
        }
    });
}

// PUT /api/v1/{client}/{channel}/platadmin/account/type/{id} 复制平台账户类型
export function copyAccountType(id) {
    return http.put(config.API_ILOKA_URL + '/platadmin/account/type/{id}', null, {
        params: {
            id
        }
    });
}


