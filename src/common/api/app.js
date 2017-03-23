import http from '../http';
import config from '../config';

// DELETE /api/v1/{client}/{channel}/user/app/data/{appid} 作品数据服务
// GET /api/v1/{client}/{channel}/app/preview/{id} 作品预览
// GET /api/v1/{client}/{channel}/user/app/category/{categorytype} 作品列表服务
// GET /api/v1/{client}/{channel}/user/app/data/{id} 作品数据服务
// POST /api/v1/{client}/{channel}/search/app 作品搜索服务
// POST /api/v1/{client}/{channel}/user/app/data 作品数据服务
// PUT /api/v1/{client}/{channel}/manager/app/vsite/cancel/{id} 作品V站下架
// PUT /api/v1/{client}/{channel}/user/app/close/{appid} 作品取消公开服务
// PUT /api/v1/{client}/{channel}/user/app/oppen/{appid} 作品公开服务
// PUT /api/v1/{client}/{channel}/user/app/shareinfo/{appid} 作品分享信息服务


// GET /api/v1/{client}/{channel}/app/preview/{id} 作品预览
export function getAppPreview(id) {
    return http.get(config.API_ILOKA_URL + '/app/preview/{id}', {
        id
    });
}


//作品数据服务（保存）
export function updateAppData(params) {
    return http.post(config.API_ILOKA_URL + '/user/app/data', params);
}

//提供用户获取作品数据服务
export function getAppData(id) {
    return http.get(config.API_ILOKA_URL + '/user/app/data/{id}', {id: id});
}

//GET /api/v1/{client}/{channel}/user/app/category/{categorytype} 作品列表服务
export function getAppDataList({
    categorytype,
    tags,
    resType,
    editorType = 'main',
    dateRange,
    status,
    channels,
    page = 0,
    size = config.SIZE,
    sort,
    order,
    idChannel
}) {
    if (!dateRange || dateRange == 'all') {
        dateRange = undefined;
    }
    if (!channels || channels == 'all') {
        channels = undefined;
    }
    return http.get(config.API_ILOKA_URL + '/user/app/category/{categorytype}', {
        categorytype,
        tags,
        resType,
        editorType,
        dateRange,
        status,
        channels,
        page,
        size,
        sort,
        order,
        idChannel
    });
}

//PUT /api/v1/{client}/{channel}/manager/app/vsite/cancel/{id} 作品V站下架
export function cancelAppVsite(id) {
    return http.put(config.API_ILOKA_URL + '/manager/app/vsite/cancel/{id}', null, {
        params: {
            id
        }
    });
}
//DELETE /api/v1/{client}/{channel}/user/app/data/{appid} 提供用户删除自己的作品服务
export function deleteAppData(appid) {
    return http.delete(config.API_ILOKA_URL + '/user/app/data/{appid}', null, {
        params: {
            appid
        }
    });
}

// 作品-获取表单 /api/{version}/{client}/{channel}/app/collect/data/{appid}',
export function collectAppData({
    appid,
    formId,
    startDate,
    endDate,
    page,
    size,
    sort,
    order
}) {
    return http.get(config.API_ILOKA_URL + '/app/collect/data/{appid}', {
        appid,
        formId,
        startDate,
        endDate,
        page,
        size,
        sort,
        order,
    });
}

//导出数据列表 get /api/v1/{client}/{channel}/app/collect/data/export/{appid}  应用收集数据服务
export function exportAppCollectData(appid) {
    return http.get(config.API_ILOKA_URL + '/app/collect/data/export/{appid}', {
        appid,
    });
}
