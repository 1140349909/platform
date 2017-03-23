import http from '../http';
import config from '../config';

// DELETE /api/v1/{client}/{channel}/manager/content/{id} 删除资讯
export function deleteContent(id) {
    return http.delete(config.API_ILOKA_URL + '/manager/content/detail/{id}', {
        id
    });
}

// GET /api/v1/{client}/{channel}/content/preview/{id} 资讯预览
export function previewContent(id) {
    return http.get(config.API_ILOKA_URL + '/content/preview/{id}', {
        id
    });
}

// GET /api/v1/{client}/{channel}/manager/content/{id} 获取资讯
export function getContent(id) {
    return http.get(config.API_ILOKA_URL + '/manager/content/{id}', {
        id
    });
}

// GET /api/v1/{client}/{channel}/manager/content/list 资讯列表服务
export function getContentList({
    resType,
    status,
    dateRange,
    idChannel,
    channels,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    if (!dateRange || dateRange == 'all') {
        dateRange = undefined;
    }
    if (!channels || channels == 'all') {
        channels = undefined;
    }
    return http.get(config.API_ILOKA_URL + '/manager/content/list', {
        resType,
        status,
        dateRange,
        idChannel,
        channels,
        page,
        size,
        sort,
        order
    });
}

// POST /api/v1/{client}/{channel}/manager/content 添加资讯
export function addContent(item) {
    return http.post(config.API_ILOKA_URL + '/manager/content/detail', item);
}

// POST /api/v1/{client}/{channel}/manager/content/channel 添加资讯通道
export function addContentChannel(params) {
    return http.post(config.API_ILOKA_URL + '/manager/content/channel', params);
}

// POST /api/v1/{client}/{channel}/manager/content/{id} 修改资讯
export function updateContent(item) {
    return http.post(config.API_ILOKA_URL + '/manager/content/detail/{id}', item, {
        params: {
            id: item.id
        }
    });
}

// POST /api/v1/{client}/{channel}/manager/content/detail/toutiao/{id} 修改资讯头条详情
export function updateTouTiaoContent(item) {
    return http.post(config.API_ILOKA_URL + '/manager/content/detail/toutiao/{id}', {
        content: item.toutiaoContent ? item.toutiaoContent.content : item.content
    }, {
        params: {
            id: item.id
        }
    });
}

// PUT /api/v1/{client}/{channel}/manager/content/vsite/cancel/{id} 资讯V站下架
export function cancelContentVSite(id) {
    return http.put(config.API_ILOKA_URL + '/manager/content/vsite/cancel/{id}', null, {
        params: {
            id: id
        }
    });
}

// PUT /api/v1/{client}/{channel}/manager/content/channel/{resType}/status/{status}/{id} 资讯通道状态管理
export function updateContentChannelStatus({
    resType,
    status,
    id
}) {
    return http.put(config.API_ILOKA_URL + '/manager/content/channel/{resType}/status/{status}/{id}', null, {
        resType,
        status,
        id
    });
}
