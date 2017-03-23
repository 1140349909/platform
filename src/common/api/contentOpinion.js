import http from '../http';
import config from '../config';

// 删除资讯评论
export function delContentOpinion(id) {
    return http.delete(config.API_ILOKA_URL + '/manager/content/opinion/{id}', {
        id,
    });
}


// 资讯评论列表服务
export function getContentOpinionList({
    resType = 'content',
    resId,
    status,
    keyword,
    page = 0,
    size = config.SIZE,
    sort,
    order,
    name
}) {

    return http.get(config.API_ILOKA_URL + '/manager/content/{resType}/opinion/list', {
        resType,
        resId,
        status,
        keyword,
        page,
        size,
        sort,
        order,
        name,
    });
}

// 发布资讯评论
export function updateContentOpinionPublish(id) {
    return http.put(config.API_ILOKA_URL + '/manager/content/opinion/publish/{id}', null, {
        params: {
            id
        }
    });
}





