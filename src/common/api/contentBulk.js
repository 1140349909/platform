import http from '../http';
import config from '../config';

// 资讯块管理服务 : 管理资讯块

// DELETE /api/v1/{client}/{channel}/manager/content/bulk/{bulkType}/{id} 删除资讯块
export function deleteContentBulk(id, bulkType) {
    return http.delete(config.API_ILOKA_URL + '/manager/content/bulk/{bulkType}/{id}', {
        id,
        bulkType
    });
}

// GET /api/v1/{client}/{channel}/manager/content/bulk/fav/list 资讯块列表收藏列表服务
export function getContentBulkFavList({
    resType,
    bulkType,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    return http.get(config.API_ILOKA_URL + '/manager/content/bulk/fav/list', {
        resType,
        bulkType,
        page,
        size,
        sort,
        order
    });
}

// GET /api/v1/{client}/{channel}/manager/content/bulk/bought/list 资讯块列表己购列表服务
export function getContentBulkBoughtList({
    resType,
    bulkType,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    return http.get(config.API_ILOKA_URL + '/manager/content/bulk/bought/list', {
        resType,
        bulkType,
        page,
        size,
        sort,
        order
    });
}

// GET /api/v1/{client}/{channel}/manager/content/bulk/list 资讯块列表服务
export function getContentBulkList({
    resType,
    bulkType,
    page = 0,
    size = config.SIZE,
    sort = 'createdDate',
    order = 'desc'
}) {
    return http.get(config.API_ILOKA_URL + '/manager/content/bulk/list', {
        resType,
        bulkType,
        page,
        size,
        sort,
        order
    });
}

// GET /api/v1/{client}/{channel}/manager/content/bulk/{bulkType}/{id} 获取资讯块
export function getContentBulk(id, bulkType) {
    return http.get(config.API_ILOKA_URL + '/manager/content/bulk/{bulkType}/{id}', {
        bulkType,
        id
    });
}

// POST /api/v1/{client}/{channel}/manager/content/bulk/{bulkType} 添加资讯块
export function addContentBulk(item, bulkType) {
    return http.post(config.API_ILOKA_URL + '/manager/content/bulk/{bulkType}', item, {
        params: {
            bulkType
        }
    });
}

// POST /api/v1/{client}/{channel}/manager/content/bulk/{bulkType}/{id} 修改资讯块
export function updateContentBulk(item, bulkType) {
    return http.post(config.API_ILOKA_URL + '/manager/content/bulk/{bulkType}/{id}', item, {
        params: {
            id: item.id,
            bulkType
        }
    });
}

// PUT /api/v1/{client}/{channel}/manager/content/bulk/fav/cancel/{bulkType}/{id} 取消收藏资讯块
export function cancelFavContentBulk(id, bulkType) {
    return http.put(config.API_ILOKA_URL + '/manager/content/bulk/fav/cancel/{bulkType}/{id}', null, {
        params: {
            id,
            bulkType
        }
    });
}

// PUT /api/v1/{client}/{channel}/manager/content/bulk/fav/{bulkType}/{id} 收藏资讯块
export function favContentBulk(id, bulkType) {
    return http.put(config.API_ILOKA_URL + '/manager/content/bulk/fav/{bulkType}/{id}', null, {
        params: {
            id,
            bulkType
        }
    });
}
