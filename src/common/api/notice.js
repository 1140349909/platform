import http from '../http';
import config from '../config';
// get  /api/v1/{client}/{channel}/platadmin/notice/tpl/list  系统通知列表和搜索
export function getNoticeList({
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    return http.get(config.API_ILOKA_URL + '/platadmin/notice/tpl/list', {
        page,
        size,
        sort,
        order
    });
}

// post  /api/v1/{client}/{channel}/platadmin/notice/tpl   系统通知添加
export function addNotice({
    mark,
    content,
    contentStatus,
    title
}) {
    return http.post(config.API_ILOKA_URL + '/platadmin/notice/tpl', {
        mark,
        content,
        contentStatus,
        title
    });
}

//post /api/v1/{client}/{channel}/platadmin/notice/tpl/{id}    系统通知修改
export function updateNotice(id, {
    mark,
    content,
    contentStatus,
    title
}) {
    return http.post(config.API_ILOKA_URL + '/platadmin/notice/tpl/{id}', {
        mark,
        content,
        contentStatus,
        title
    }, {
        params: {
            id
        }
    });
}

//put /api/v1/{client}/{channel}/platadmin/notice/detail/{id}    系统通知详情
export function getNoticeDetail(id) {
    return http.put(config.API_ILOKA_URL + '/platadmin/notice/detail/{id}', null, {
        params: {
            id,
        }
    });
}


//平台消息服务中心 : 平台消息服务中心
//get  /api/v1/{client}/{channel}/user/notice/message/list 平台消息列表
export function getNoticeMessageList({
    startDate,
    endDate,
    hasRead,
    readed,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    startDate = startDate ? startDate + ' 00:00:00.000' : '';
    endDate = endDate ? endDate + ' 23:59:59.999' : '';
    return http.get(config.API_ILOKA_URL + '/user/notice/message/list', {
        startDate,
        endDate,
        hasRead,
        readed,
        page,
        size,
        sort,
        order
    });
}

//get  /api/v1/{client}/{channel}/user/notice/message/total 消息总条数
export function getNoticeMessageTotal(hasRead) {
    return http.get(config.API_ILOKA_URL + '/user/notice/message/total', {
        hasRead
    });
}

//get  /api/v1/{client}/{channel}/user/notice/{id} 阅读通知
export function getUserNotice(id) {
    return http.get(config.API_ILOKA_URL + '/user/notice/{id}', null, {
        params: {
            id
        }
    });
}

//put  /api/v1/{client}/{channel}/user/notice/message/all 己阅读所有消息
export function readUserNoticeMessage() {
    return http.put(config.API_ILOKA_URL + '/user/notice/message/all');
}

