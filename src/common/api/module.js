/**
 * Created by Asoiso on 16/12/21.
 * 平台模块管理
 */
import http from '../http';
import config from '../config';

// DELETE /api/v1/{client}/{channel}/platadmin/module/{id} 删除平台模块
export function deletePlatformModule(id) {
    return http.delete(config.API_ILOKA_URL + '/platadmin/module/{id}', {
        id
    });
}

// GET /api/v1/{client}/{channel}/admin/module/info 获取平台产品模块信息
export function getPlatformModuleInfo({
    tagId
}) {
    return http.get(config.API_ILOKA_URL + '/admin/module/info', {
        tagId
    });
}

// GET /api/v1/{client}/{channel}/platadmin/module/list 平台模块列表服务
export function getPlatformModuleList({
    tagIds,
    page = 0,
    size = 10,
    sort,
    order = config.ORDER
}) {
    return http.get(config.API_ILOKA_URL + '/platadmin/module/list', {
        tagIds,
        page,
        size,
        sort,
        order
    });
}

// GET /api/v1/{client}/{channel}/platadmin/module/{id} 获取平台模块
export function getPlatformModule(id) {
    return http.get(config.API_ILOKA_URL + '/platadmin/module/{id}', {
        id
    });
}

// POST /api/v1/{client}/{channel}/platadmin/module 添加平台模块
export function addPlatformModule(item) {
    if (typeof item.roles == 'string') {
        item.roles = item.roles.split(',');
    }
    return http.post(config.API_ILOKA_URL + '/platadmin/module', item);
}

// POST /api/v1/{client}/{channel}/platadmin/module/{id} 修改平台模块
export function updatePlatformModule(item) {
    if (typeof item.roles == 'string') {
        item.roles = item.roles.split(',');
    }
    return http.post(config.API_ILOKA_URL + '/platadmin/module/{id}', item, {
        params: {
            id: item.id
        }
    });
}
