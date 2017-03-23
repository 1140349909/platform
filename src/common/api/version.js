import http from '../http';
import config from '../config';

// DELETE /api/v1/{client}/{channel}/platadmin/version/{id} 删除平台营销版本
export function deleteVersion(id) {
    return http.delete(config.API_ILOKA_URL + '/platadmin/version/{id}', {
        id
    });
}

// GET /api/v1/{client}/{channel}/version/price/{id} 获取营销版本的价格
export function getVersionPrice(id) {
    return http.get('version/price/{id}', {
        id
    });
}

// GET /api/v1/{client}/{channel}/platadmin/version/list 平台营销版本列表服务
export function getVersionList({
    disabled,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    return http.get(config.API_ILOKA_URL + '/platadmin/version/list', {
        disabled,
        page,
        size,
        sort,
        order
    });
}

// GET /api/v1/{client}/{channel}/version/info 获取当前客户的营销版本信息
export function getVersionInfo(versionId) {
    return http.get(config.API_ILOKA_URL + '/version/info', {
        versionId
    });
}

//GET /api/v1/{client}/{channel}/user/version/list 用户查看平台营销版本列表服务
export function getUserVersionList({
    page = 0,
    size = config.SIZE,
    sort,
}) {
    return http.get(config.API_ILOKA_URL + '/user/version/list', {
        page,
        size,
        sort,
    });
}

// GET /api/v1/{client}/{channel}/platadmin/version/module/info 获取平台营销产品模块信息
export function getVersionModuleInfo(tagId) {
    return http.get(config.API_ILOKA_URL + '/platadmin/version/module/info', {
        tagId
    });
}


// GET /api/v1/{client}/{channel}/platadmin/version/module/list 获取营销版本可用的平台模块列表服务
export function getVersionModuleList({
    tagId,
    used,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    return http.get(config.API_ILOKA_URL + '/platadmin/version/module/list', {
        tagId,
        used,
        page,
        size,
        sort,
        order
    });
}

// GET /api/v1/{client}/{channel}/platadmin/version/authorization/{id} 获取平台营销版本权限
export function getVersionAuth(id) {
    return http.get(config.API_ILOKA_URL + '/platadmin/version/authorization/{id}', {
        id
    });
}

// GET /api/v1/{client}/{channel}/platadmin/version/{id} 获取平台营销版本信息
export function getVersion(id) {
    return http.get(config.API_ILOKA_URL + '/platadmin/version/{id}', {
        id
    });
}

// GET /api/v1/{client}/{channel}/version/authorization/info 获取当前客户的营销版本权限信息
export function getVersionAuthInfo(versionId) {
    return http.get(config.API_ILOKA_URL + '/version/authorization/info', {
        versionId
    });
}

// POST /api/v1/{client}/{channel}/platadmin/version/authorization/{id} 分配平台营销版本权限
export function addVersionAuth({
    id,
    data
}) {
    return http.post(config.API_ILOKA_URL + '/platadmin/version/authorization/{id}', data,
        {
            params: {
                id
            }
        });
}

// POST /api/v1/{client}/{channel}/platadmin/version/rights/{versionId}/{id} 修改平台营销版本权益
export function addVersionRights({
    id,
    versionId,
    data
}) {
    return http.post(config.API_ILOKA_URL + '/platadmin/version/rights/{versionId}/{id}', data,
        {
            params: {
                id,
                versionId
            }
        });
}

// /api/v1/{client}/{channel}/platadmin/version/{id} 修改平台营销版本
export function updateVersion({
    id,
    data
}) {
    return http.post(config.API_ILOKA_URL + '/platadmin/version/{id}', data,
        {
            params: {
                id
            }
        });
}

// POST /api/v1/{client}/{channel}/platadmin/version 添加平台营销版本
export function addVersion(data) {
    return http.post(config.API_ILOKA_URL + '/platadmin/version', data);
}

// PUT /api/v1/{client}/{channel}/platadmin/version/{id} 复制平台营销版本
export function copyVersion(id) {
    return http.put(config.API_ILOKA_URL + '/platadmin/version/{id}', null, {
        params: {
            id
        }
    });
}

// PUT /api/v1/{client}/{channel}/platadmin/version/rights/{id} 平台营销版本初始化权益配置
export function resetVersionRights(id) {
    return http.put(config.API_ILOKA_URL + '/platadmin/version/rights/{id}', null, {
        params: {
            id
        }
    });
}

// PUT /api/v1/{client}/{channel}/platadmin/version/status/{id} 禁/启用平台营销版本
export function switchVersionStatus({
    id,
    disabled
}) {
    return http.put(config.API_ILOKA_URL + '/platadmin/version/status/{id}', null, {
        params: {
            id,
            disabled
        }
    });
}

/*平台产品管控中心-参数管理 : 管理参数*/

// DELETE /api/v1/{client}/{channel}/platadmin/version/para/{id} 删除平台产品参数
export function deleteVersionPara(id) {
    return http.delete(config.API_ILOKA_URL + '/platadmin/version/para/{id}', {
        id
    });
}

// GET /api/v1/{client}/{channel}/platadmin/version/para/list 平台产品参数列表服务
export function getVersionParaList() {
    return http.get(config.API_ILOKA_URL + '/platadmin/version/para/list');
}

// GET /api/v1/{client}/{channel}/platadmin/para/{id} 获取平台产品参数服务
export function getVersionPara(id) {
    return http.get(config.API_ILOKA_URL + '/platadmin/version/para/{id}', {
        id
    });
}

// /api/v1/{client}/{channel}/platadmin/version/para/{id} 修改平台产品参数
export function updateVersionPara({
    id,
    data
}) {
    return http.post(config.API_ILOKA_URL + '/platadmin/version/para/{id}', data,
        {
            params: {
                id
            }
        });
}

// POST /api/v1/{client}/{channel}/platadmin/version/para 添加平台产品参数
export function addVersionPara(data) {
    return http.post(config.API_ILOKA_URL + '/platadmin/version/para', data);
}

// GET /api/v1/{client}/{channel}/platadmin/version/para/sync/{id} 同步平台产品参数
export function synchronizePara(id) {
    return http.get(config.API_ILOKA_URL + '/platadmin/version/para/sync/{id}', {
        id
    });
}

