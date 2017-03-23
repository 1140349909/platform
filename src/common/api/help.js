import http from '../http';
import config from '../config';
//delete  /api/v1/{client}/{channel}/platadmin/help/{id} 常见问题删除
export function deleteHelp(id) {
    return http.delete(config.API_ILOKA_URL + '/platadmin/help/{id}', null, {
        params: {
            id
        }
    });
}

//  get /api/v1/{client}/{channel}/platadmin/help/list  常见问题列表显示和搜索
export function getHelpList({
    page,
    size,
    sort,
    keyword,
    status,
    tags,
}) {
    return http.get(config.API_ILOKA_URL + '/help/list', {
        page,
        size,
        sort,
        keyword,
        status,
        tags,
    });
}

// post  /api/v1/{client}/{channel}/platadmin/help  常见问题添加
export function addHelpProblem({
    content,
    keyword,
    mark,
    title,
    contentStatus,
    tags
}) {
    return http.post(config.API_ILOKA_URL + '/platadmin/help', {
        content,
        keyword,
        mark,
        title,
        tags,
        contentStatus,
    });
}

// post /api/v1/{client}/{channel}/platadmin/help/{id}  常见问题修改
export function updateHelpProblem(id, {
    content,
    keyword,
    mark,
    title,
    contentStatus,
    tags

}) {
    return http.post(config.API_ILOKA_URL + '/platadmin/help/{id}', {
        content,
        keyword,
        mark,
        title,
        contentStatus,
        tags
    }, {
        params: {
            id
        }
    });
}

// /api/v1/{client}/{channel}/platadmin/help/{id}/{status}  常见问题禁用/启用
export function changeHelpStatus(id, status) {
    return http.put(config.API_ILOKA_URL + '/platadmin/help/{id}/{status}', null, {
        params: {
            id,
            status
        }
    });
}


// /api/v1/{client}/{channel}/platadmin/help/community/{id}社区帮助删除
export function deleteHelpCommunity(id) {
    return http.delete(config.API_ILOKA_URL + '/platadmin/help/community/{id}', null, {
        params: {
            id
        }
    });
}

///api/v1/{client}/{channel}/platadmin/help/community/list社区帮助显示
export function getHelpCommunityList({
    page,
    size = config.SIZE,
    sort,
    status
}) {
    return http.get(config.API_ILOKA_URL + '/help/community/list', {
        page,
        size,
        sort,
        status
    });
}

////api/v1/{client}/{channel}/platadmin/help/community  社区帮助添加
export function addHelpCommunity({
    mark,
    name,
    qrcode,
    contentStatus,
    qrcodeType
}) {
    return http.post(config.API_ILOKA_URL + '/platadmin/help/community', {
        mark,
        name,
        qrcode,
        contentStatus,
        qrcodeType
    });
}

// /api/v1/{client}/{channel}/platadmin/help/community/{id}  社区帮助修改
export function updateHelpCommunity(id, {
    mark,
    name,
    qrcode,
    contentStatus,
    qrcodeType
}) {
    return http.post(config.API_ILOKA_URL + '/platadmin/help/community/{id}', {
        mark,
        name,
        qrcode,
        contentStatus,
        qrcodeType
    }, {
        params: {
            id
        }
    });
}

//put   /api/v1/{client}/{channel}/platadmin/help/community/{id}/{status}  社区帮助启用/禁用
export function ableHelpCommunity(id, status) {
    return http.put(config.API_ILOKA_URL + '/platadmin/help/community/{id}/{status}', null, {
        params: {
            id,
            status
        }
    });
}

///api/v1/{client}/{channel}/manager/help/protype/del/{id} 常见问题类型删除
export function deleteHelpProtype(id) {
    return http.delete(config.API_ILOKA_URL + '/manager/help/protype/del/{id}', null, {
        params: {
            id
        }
    });
}
//get  /api/v1/{client}/{channel}/manager/help/protype/list 常见问题类型列表
export function getHelpProtypeList({
    page,
    size = config.SIZE,
    sort
}) {
    return http.get(config.API_ILOKA_URL + '/manager/help/protype/list', {
        page,
        size,
        sort
    });
}

//post  /api/v1/{client}/{channel}/manager/help/protype/add常见问题类型添加
export function addHelpProtype({
    contentStatus,
    mark,
    name
}) {
    return http.post(config.API_ILOKA_URL + '/manager/help/protype/add', {
        contentStatus,
        mark,
        name
    });
}
// /api/v1/{client}/{channel}/platadmin/help/{id}/{status}  常见问题类型禁用/启用
export function ableHelpProtype(id, status) {
    return http.put(config.API_ILOKA_URL + '/platadmin/help/{id}/{status}', null, {
        params: {
            id,
            status
        }
    });
}
//POST  /api/v1/{client}/{channel}/platadmin/help/{id} 常见问题类型修改
export function updateHelp(id, {
    contentStatus,
    mark,
    name
}) {
    return http.post(config.API_ILOKA_URL + '/platadmin/help/{id}', {
        contentStatus,
        mark,
        name
    }, {
        params: {
            id
        }
    });
}

// /api/v1/{client}/{channel}/platadmin/help/detail/{id}  常见问题详情
export function getHelpDetail(id) {
    return http.get(config.API_ILOKA_URL + '/help/detail/{id}', null, {
        params: {
            id
        }
    });
}

// /api/v1/{client}/{channel}/platadmin/help/community/detail/{id}  社区帮助详情
export function getHelpCommunityDetail(id) {
    return http.get(config.API_ILOKA_URL + '/help/community/detail/{id}', null, {
        params: {
            id
        }
    });
}

//get  /api/v1/{client}/{channel}/help/community/type 根据类型查询微信二维码
export function getHelpCommunityType({
    qrcodeType,
    size = config.SIZE,
    sort,
    page
}) {
    return http.get(config.API_ILOKA_URL + '/help/community/type', {
        qrcodeType,
        size,
        sort,
        page
    });
}


