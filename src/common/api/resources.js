import http from '../http';
import config from '../config';

// get /api/v1/{client}/{channel}/platadmin/audit/{status}/list  资源审查列表服务
export function getAuditStatusList({
    status,
    page,
    size = config.SIZE,
    sort,
    order,
    keyword
}) {
    return http.get(config.API_ILOKA_URL + '/platadmin/audit/list', {
        status,
        page,
        size,
        sort,
        order,
        keyword
    });
}
//put /api/v1/{client}/{channel}/platadmin/audit/{auditStatus}/{id} 资源审查
export function auditResources({
    id,
    auditStatus,
    content,
    extData
}) {
    return http.put(config.API_ILOKA_URL + '/platadmin/audit/{auditStatus}/{id}', {
        content, extData
    }, {
        params: {
            auditStatus,
            id,
        }
    });
}
// put /api/v1/{client}/{channel}/user/audit/res/{resType}/{resId} 资源申请审查
export function applyAuditResources({
    resType,
    resId
}) {
    return http.put(config.API_ILOKA_URL + '/user/audit/res/{resType}/{resId}', null, {
        params: {
            resType,
            resId
        }
    });
}
