/**
 * Created by iris on 2016/10/28.
 */
import http from '../http';
import config from '../config';

//TODO 接口需要优化(platadmin Tag 和平台Tag) -- add by iris
// GET /api/v1/{client}/{channel}/tags/list 平台标签列表服务
export function getTagsList(tagType) {
    return http.get(config.API_ILOKA_URL + '/platadmin/tags/list', {
        tagType
    });
}

//get  /api/v1/{client}/{channel}/tags/list 平台标签列表服务
export function getUserTagsList(tagType) {
    return http.get(config.API_ILOKA_URL + '/tags/list', {tagType});
}
// GET /api/v1/{client}/{channel}/platadmin/tags/{id} 获取平台标签
export function getTag(id) {
    return http.get(config.API_ILOKA_URL + '/platadmin/tags/{id}', {
        id
    });
}
// DELETE /api/v1/{client}/{channel}/platadmin/tags/{id} 删除平台标签
export function deleteTag(id) {
    return http.delete(config.API_ILOKA_URL + '/platadmin/tags/{id}', {id});
}
//POST /api/v1/{client}/{channel}/platadmin/tags 添加平台标签
export function addTags(para) {
    return http.post(config.API_ILOKA_URL + '/platadmin/tags', para);
}

// POST /api/v1/{client}/{channel}/platadmin/tags/tag/{id} 添加单个平台标签
export function addTag(rootTagId, parentId, para) {

    return http.post(config.API_ILOKA_URL + '/platadmin/tags/tag/{id}', para, {
        params: {
            id: rootTagId,
            parentId: parentId,
        }
    });
}

//POST /api/v1/{client}/{channel}/platadmin/tags/{id} 修改平台标签
export function updateTag(rootTagId, para) {
    return http.post(config.API_ILOKA_URL + '/platadmin/tags/{id}', para, {
        params: {
            id: rootTagId
        }
    });
}

// POST /api/v1/{client}/{channel}/platadmin/tags/name/{id} 修改平台标签名称
export function updateTagName(id, para) {
    return http.post(config.API_ILOKA_URL + '/platadmin/tags/name/{id}', para, {
        params: {
            id
        }
    });
}

// PUT /api/v1/{client}/{channel}/platadmin/tags/seq/{id} 修改平台标签顺序
export function updateTagSeq(id, para) {
    return http.put(config.API_ILOKA_URL + '/platadmin/tags/seq/{id}', para, {
        params: {
            id
        }
    });
}

// PUT /api/v1/{client}/{channel}/platadmin/tags/status/{id} 修改平台标签状态
export function updateTagStatus(id, para) {
    return http.put(config.API_ILOKA_URL + '/platadmin/tags/status/{id}', para, {
        params: {
            id
        }
    });
}

//POST /api/v1/{client}/{channel}/tags/agg 平台标签统计聚合服务
export function updateTagAgg(para) {
    return http.post(config.API_ILOKA_URL + '/platadmin/tags/agg', para);
}


// POST /api/v1/{client}/{channel}/platadmin/tags/tag/links/{id} 添加平台标签资源链接
export function addTagLinks({
    rootTagId,
    tagId,
    linkIds
}) {
    return http.post(config.API_ILOKA_URL + '/platadmin/tags/tag/links/{id}', {
        tagId,
        linkIds: linkIds
    }, {
        params: {
            id: rootTagId
        }
    });
}

// DELETE /api/v1/{client}/{channel}/platadmin/tags/tag/links/{id} 删除平台标签资源链接
export function deleteTagLinks({
    rootTagId,
    tagId,
    linkIds
}) {
    return http.delete(config.API_ILOKA_URL + '/platadmin/tags/tag/links/{id}', null, {
        data: {
            tagId,
            linkIds
        },
        params: {
            id: rootTagId
        }
    });
}
