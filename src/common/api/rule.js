import http from '../http';
import config from '../config';

/*发票*/
// DELETE /api/v1/{client}/{channel}/platadmin/rule/invoice/{id} 删除单个发票规则
export function deleteInvoiceRule(id) {
    return http.delete('platadmin/rule/invoice/{id}', {
        id
    });
}

// GET /api/v1/{client}/{channel}/platadmin/rule/invoice/list 发票规则列表
export function getInvoiceRuleList({
    page = 0,
    size = config.SIZE,
    sort
}) {
    return http.get('platadmin/rule/invoice/list', {
        page,
        size,
        sort
    });
}

// GET /api/v1/{client}/{channel}/platadmin/rule/invoice/{id} 发票规则详情
export function getInvoiceRule(id) {
    return http.get('platadmin/rule/invoice/{id}', {
        id
    });
}
// GET /api/v1/{client}/{channel}/rule/invoice/{ruleId} 发票对应规则

export function getInvoiceRuleType(ruleId) {
    return http.get('rule/invoice/{ruleId}', {
        ruleId
    });
}

// POST /api/v1/{client}/{channel}/platadmin/rule/invoice 新增发票规则
export function addInvoiceRule(data) {
    return http.post('platadmin/rule/invoice', data);
}

// POST /api/v1/{client}/{channel}/platadmin/rule/invoice/{id} 修改发票规则
export function updateInvoiceRule({
    id,
    data
}) {
    return http.post('platadmin/rule/invoice/{id}', data,
        {
            params: {
                id
            }
        });
}

// PUT /api/v1/{client}/{channel}/platadmin/rule/invoice/{id}/{status} 发票规则历启用禁用
export function switchInvoiceRuleStatus({
    id,
    status
}) {
    return http.put('platadmin/rule/invoice/{id}/{status}', null, {
        params: {
            id,
            status
        }
    });
}

/*提现*/
// DELETE /api/v1/{client}/{channel}/platadmin/rule/withdraw/{id} 删除单个提现规则
export function deleteWithdrawRule(id) {
    return http.delete('platadmin/rule/withdraw/{id}', {
        id
    });
}

// GET /api/v1/{client}/{channel}/rule/withdraw/list 提现规则列表
export function getWithdrawRuleList({
    page = 0,
    size = config.SIZE,
    sort
}) {
    return http.get('rule/withdraw/list', {
        page,
        size,
        sort
    });
}

// GET /api/v1/{client}/{channel}/platadmin/rule/withdraw/{id} 提现规则详情
export function getWithdrawRule(id) {
    return http.get('platadmin/rule/withdraw/{id}', {
        id
    });
}

// POST /api/v1/{client}/{channel}/platadmin/rule/withdraw 新增提现规则
export function addWithdrawRule(data) {
    return http.post('platadmin/rule/withdraw', data);
}

// POST /api/v1/{client}/{channel}/platadmin/rule/withdraw/{id} 修改提现规则
export function updateWithdrawRule({
    id,
    data
}) {
    return http.post('platadmin/rule/withdraw/{id}', data,
        {
            params: {
                id
            }
        });
}

// PUT /api/v1/{client}/{channel}/platadmin/rule/withdraw/{id}/{status} 提现规则历启用禁用
export function switchWithdrawRuleStatus({
    id,
    status
}) {
    return http.put('platadmin/rule/withdraw/{id}/{status}', null, {
        params: {
            id,
            status
        }
    });
}
