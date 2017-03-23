import http from '../http';
import config from '../config';
import md5 from '../util/md5';

// DELETE /api/v1/{client}/{channel}/media 删除媒体文件
export function deleteMedia(ids, mediaType) {
    return http.delete(config.API_ILOKA_URL + '/media/{mediaType}', {
        mediaType
    }, {
        data: {
            ids,
        }
    });
}

// DELETE /api/v1/{client}/{channel}/media/remove/all 删除所有媒体文件
export function deleteMediaAll(mediaType) {
    return http.delete(config.API_ILOKA_URL + '/media/remove/all/{mediaType}', {mediaType});
}

// DELETE /api/v1/{client}/{channel}/platadmin/media 平台用户删除媒体文件
export function deleteAdminMedia(ids) {
    return http.delete(config.API_ILOKA_URL + '/platadmin/media', null, {
        data: {
            ids,
        }
    });
}


// GET /api/v1/{client}/{channel}/media/list 用户获取媒体资源
export function getMediaList({
    owner,
    resType,
    mimeType,
    tags, // 逗号分割 1,2,3
    categoryId,
    faved,
    bought,
    page = 0,
    size = config.SIZE,
    sort,
    order,
}) {

    return http.get(config.API_ILOKA_URL + '/media/list', {
        owner,
        resType,
        mimeType,
        tags: tags ? tags : undefined,
        categoryId,
        faved,
        bought,
        page,
        size,
        sort,
        order
    });
}

// GET /api/v1/{client}/{channel}/admin/media/{owner}/{restype}/{mimetype} 管理员获取用户媒体文件
export function getAdminMediaList({
    restype,
    owner,
    mimetype,
    mediaStatus,
    username,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    return http.get(config.API_ILOKA_URL + '/admin/media/{owner}/{restype}/{mimetype}', {
        owner,
        restype,
        mimetype,
        mediaStatus,
        username,
        page,
        size,
        sort,
        order
    });
}

// GET /api/v1/{client}/{channel}/media/type 获取媒体文件分类信息
export function getMediaTypes(platform) {
    return http.get(config.API_ILOKA_URL + '/media/type', {
        platform
    });
}

// POST /api/v1/{client}/{channel}/media/{owner}/{restype} 上传媒体文件
export function addMedia(media, {
    client,
    channel = 'linkin',
    owner,
    restype,
    x,
    y,
    width,
    height,
    quality,
    categoryId,
    mediaId,
    isLib = false,
    uin,
    code,
    mediaChannel,
    ledou,
    tags
}) {
    return http.post(config.API_ILOKA_URL + '/media/{owner}/{restype}', media, {
        params: {
            client,
            channel,
            owner,
            restype,
            x,
            y,
            width,
            height,
            quality,
            categoryId,
            mediaId,
            isLib,
            uin,
            code,
            mediaChannel,
            ledou,
            tags
        }
    });
}

// POST /api/v1/{client}/{channel}/media/img/{owner}/{restype} 上传Base64图片媒体文件
export function addMediaImg({
    base64,
    bid,
    categoryId,
    fileName,
    lib,
    mediaId,
    quality = 0
}, {
    owner,
    restype
}) {
    return http.post(config.API_ILOKA_URL + '/media/img/{owner}/{restype}', {
        base64,
        bid,
        categoryId,
        fileName,
        lib,
        mediaId,
        quality
    }, {
        params: {
            owner,
            restype
        }
    });
}

// POST /api/v1/{client}/{channel}/media/info/{id} 修改媒体文件信息
export function updateMedia(id, data) {
    return http.post(config.API_ORIGIN + '/{platform}/api/v1/{client}/{channel}/media/info/{id}', data, {
        params: {
            id,
            platform: 'iloka',
            client: config.CLIENT,
            channel: config.CHANNEL,
        }
    });
}

// POST /api/v1/{client}/{channel}/media/type 新增媒体文件分类
export function addMediaType({
    code,
    name,
    seq,
    platform
}) {
    return http.post(config.API_ORIGIN + '/{platform}/api/v1/{client}/{channel}/media/type', {
        code,
        name,
        seq
    }, {
        params: {
            platform,
            client: config.CLIENT,
            channel: config.CHANNEL,
        }
    });
}

// DELETE /api/v1/{client}/{channel}/media/type/{id} 删除媒体文件分类
export function deleteMediaType(id) {
    return http.delete(config.API_ILOKA_URL + '/media/type/{id}', null,
        {
            params: {id}
        });
}

export function updateMediaType(id, {
    code,
    name,
    seq,
}) {
    return http.put(config.API_ILOKA_URL + '/media/type/{id}', {
        code,
        name,
        seq
    }, {
        params: {
            id
        }
    });
}

// PUT /api/v1/{client}/{channel}/media/fav/{id} 收藏媒体文件
export function favMedia(id) {
    return http.put(config.API_ILOKA_URL + '/media/fav/{id}', null, {
        params: {
            id
        }
    });
}

// PUT /api/v1/{client}/{channel}/media/fav/cancel/{id} 取消收藏媒体文件
export function cancelFavMedia(id) {
    return http.put(config.API_ILOKA_URL + '/media/fav/cancel/{id}', null, {
        params: {
            id
        }
    });
}


// Search Stickers 按照关键词搜索网络表情
export function getSearchStickers({
    q,
    page = 1,
    size = config.SIZE
}) {
    const url = config.BIAOQINGMM_ROOT + '/emojis/net/search';
    return http.get(url, _getSearchParsm(url, {
        q,
        p: page + 1,
        size
    }), {
        cache: true,
        withCredentials: false
    });
}

// 搜索表情云商店内表情
// 注：此接口返回表情均为正版表情图片，属于高级接口，需付费使用。
export function getSearchMojifStickers({
    q,
    page = 1,
    size = config.SIZE
}) {
    const url = config.BIAOQINGMM_ROOT + '/emojis/search';
    return http.get(url, _getSearchParsm(url, {
        q,
        p: page + 1,
        size
    }), {
        cache: true,
        withCredentials: false
    });
}

// 获取最新流行的表情
export function getTrending({
    page = 1,
    size = config.SIZE
}) {
    const url = config.BIAOQINGMM_ROOT + '/trending';
    return http.get(url, _getSearchParsm(url, {
        p: page + 1,
        size
    }), {
        cache: true,
        withCredentials: false
    });
}

function _getSearchParsm(url, params) {

    let data = {
        app_id: config.BIAOQINGMM_APP_ID,
        timestamp: new Date().getTime(),
        ...params
    };

    data.signature = _genSearchSignature(url, data);

    function _genSearchSignature(url, params) {
        let paramString = url;
        const names = Object.keys(params);

        names.sort();
        for (var nameIndex in names) {
            let key = names[nameIndex];
            let value = params[key];
            paramString += nameIndex == 0 ? '' : '&';
            paramString += key + '=' + value;
        }

        return md5(paramString).toUpperCase();
    }

    return {...data};
}



