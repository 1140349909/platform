import http from '../http';
import config from '../config';
/*
 delete /api/v1/{client}/{channel}/user/tpl/data/{tplid}
 模板数据服务
 get /api/v1/{client}/{channel}/user/tpl/category/{categorytype}
 模板列表服务
 get /api/v1/{client}/{channel}/user/tpl/data/{id}
 模板数据服务
 post /api/v1/{client}/{channel}/search/tpl
 模板搜索服务
 post /api/v1/{client}/{channel}/user/tpl/data
 模板数据服务
 put /api/v1/{client}/{channel}/user/tpl/fav/cancel/{id}
 取消收藏模板
 put /api/v1/{client}/{channel}/user/tpl/fav/{id}
 收藏模板  */

//删除模板
export function deleteUserTemplate(tplid) {
    return http.delete(config.API_ILOKA_URL + '/user/tpl/data/{tplid}', null, {
        params: {
            tplid
        }
    });
}
// 模板列表服务
export function getTplList({
    categorytype,
    tags,
    appType,
    minLedou,
    maxLedou,
    auditStatus,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    if (!tags) {
        tags = undefined;
    }
    return http.get(config.API_ILOKA_URL + '/user/tpl/category/{categorytype}', {
        categorytype,
        tags,
        appType,
        minLedou,
        maxLedou,
        auditStatus,
        page,
        size,
        sort,
        order
    });
}

// 模板数据服务
export function getTplData(id) {
    return http.get(config.API_ILOKA_URL + '/user/tpl/data/{id}', {
        id,
    });
}

//模板搜索服务
export function searchTpl({
    keyword,
    page,
    size,
    sort,
    order
}) {
    return http.post(config.API_ILOKA_URL + '/search/tpl', {
        keyword,
        page,
        size,
        sort,
        order
    });
}

//h5 收藏模板 favoriteTpl
export function favTpl(id) {
    return http.put(config.API_ILOKA_URL + '/user/tpl/fav/{id}', null, {
        params: {
            id
        }
    });
}

//h5 取消收藏 deleteFavoriteTpl
export function cancelFavTpl(id) {
    return http.put(config.API_ILOKA_URL + '/user/tpl/fav/cancel/{id}', null, {
        params: {
            id
        }
    });
}
//get /api/v1/{client}/{channel}/platadmin/tpl/{id} 获取模板基本信息
export function getTplBaseInfo(id) {
    return http.get(config.API_ILOKA_URL + '/platadmin/tpl/{id}', {
        id,
    });
}

//put /api/v1/{client}/{channel}/platadmin/tpl/ledou/{ledou}/{id} 模板定价服务
export function updateTplLedou({
    id, ledou
}) {
    return http.put(config.API_ILOKA_URL + '/platadmin/tpl/ledou/{ledou}/{id}', null, {
        params: {
            id, ledou
        }
    });
}

//post /api/v1/{client}/{channel}/user/tpl/data 模板数据服务
export function addTpl(params) {
    return http.post(config.API_ILOKA_URL + '/user/tpl/data', params);
}

//post /api/v1/{client}/{channel}/user/tpl/data 模板数据修改服务
export function updateTpl(params) {
    return http.post(config.API_ILOKA_URL + '/user/tpl/data/{id}', params, {
        params: {
            id: params.id
        }
    });
}

// GET /api/v1/{client}/{channel}/user/app/tpl/data/verification/{id} 核实应用是否能生成模板服务
export function getTplVerification(id) {
    return http.get(config.API_ILOKA_URL + '/user/app/tpl/data/verification/{id}', {
        id,
    });
}


//get /api/v1/{client}/{channel}/platadmin/tpl/data/{id} 获取模板数据服务
export function getPlatTplInfo(id) {
    return http.get(config.API_ILOKA_URL + '/platadmin/tpl/data/{id}', {
        id,
    });
}
