import http from '../http';
import config from '../config';

// DELETE /api/v1/{client}/{channel}/manager/content/hot/{id} 删除平台热点资讯
export function deleteContentHot(id) {
    return http.delete(config.API_ILOKA_URL + '/manager/content/hot/{id}', {
        id
    });
}

// GET /api/v1/{client}/{channel}/manager/content/hot/platform/list 平台热点资讯列表服务
export function getContentHotPlatformList({
    status,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    return http.get(config.API_ILOKA_URL + '/manager/content/hot/platform/list', {
        status,
        page,
        size,
        sort,
        order
    });
}

// POST /api/v1/{client}/{channel}/manager/content/hot 添加平台热点资讯
export function addContentHot(item) {
    return http.post(config.API_ILOKA_URL + '/manager/content/hot', item);
}

// POST /api/v1/{client}/{channel}/manager/content/hot/{id} 修改平台热点资讯
export function updateContentHot(item) {
    return http.post(config.API_ILOKA_URL + '/manager/content/hot/{id}', item, {
        params: {
            id: item.id
        }
    });
}

// GET /api/v1/{client}/{channel}/manager/content/hot/list 热点资讯列表服务
export function getContentHotList({
    type,
    tags,
    dateRange,
    date,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    return http.get(config.API_ILOKA_URL + '/manager/content/hot/{type}/list', {
        tags: (tags ? tags : undefined),
        dateRange,
        date: (date ? date : undefined),
        page,
        size,
        sort,
        order,
        type
    });
}

// GET /api/v1/{client}/{channel}/manager/content/hot/fav/list 平台热点资讯收藏列表服务
export function getContentHotFavList({
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    return http.get(config.API_ILOKA_URL + '/manager/content/hot/fav/list', {
        page,
        size,
        sort,
        order
    });
}


// GET /api/v1/{client}/{channel}/manager/content/hot/{id} 获取平台热点资讯
export function getContentHot(id) {
    return http.get(config.API_ILOKA_URL + '/manager/content/hot/{id}', {
        id
    });
}


// PUT /api/v1/{client}/{channel}/manager/content/hot/fav/{id} 收藏平台热点资讯
export function favContentHot(id) {
    return http.put(config.API_ILOKA_URL + '/manager/content/hot/fav/{id}', null, {
        params: {
            id
        }
    });
}

// PUT /api/v1/{client}/{channel}/manager/content/hot/fav/cancel/{id} 取消收藏平台热点资讯
export function cancelFavContentHot(id) {
    return http.put(config.API_ILOKA_URL + '/manager/content/hot/fav/cancel/{id}', null, {
        params: {
            id
        }
    });
}

//get /api/v1/{client}/{channel}/manager/content/hot/{id} 获取平台热点资讯
export function getContentHotDetail(id) {
    return http.get(config.API_ILOKA_URL + '/manager/content/hot/{id}', null, {
        params: {
            id
        }
    });
}


