import  * as apiNotice from  '../../../common/api/notice';
//系统通知列表和搜索
export const GET_NOTICE_LIST = 'GET_NOTICE_LIST';
export const GET_NOTICE_LIST_PENDING = 'GET_NOTICE_LIST_PENDING';
export const GET_NOTICE_LIST_SUCCESS = 'GET_NOTICE_LIST_SUCCESS';
export const GET_NOTICE_LIST_FAILURE = 'GET_NOTICE_LIST_FAILURE';

//  系统通知详情
export const GET_NOTICE_DETAIL = 'GET_NOTICE_DETAIL';
export const GET_NOTICE_DETAIL_PENDING = 'GET_NOTICE_DETAIL_PENDING';
export const GET_NOTICE_DETAIL_SUCCESS = 'GET_NOTICE_DETAIL_SUCCESS';
export const GET_NOTICE_DETAIL_FAILURE = 'GET_NOTICE_DETAIL_FAILURE';

export function getNoticeList(params) {
    return {
        type: GET_NOTICE_LIST,
        payload: apiNotice.getNoticeList(params)
    };
}

/*export function getNoticeAbleStatus(id, status) {
 return {
 type: GET_NOTICE_ABLE_STATUS,
 payload: apiNotice.getNoticeAbleStatus(id, status)
 };
 }*/


//平台消息服务中心 : 平台消息服务中心
export const GET_NOTICE_HEART = 'GET_NOTICE_HEART';
export const GET_NOTICE_HEART_PENDING = 'GET_NOTICE_HEART_PENDING';
export const GET_NOTICE_HEART_SUCCESS = 'GET_NOTICE_HEART_SUCCESS';
export const GET_NOTICE_HEART_FAILURE = 'GET_NOTICE_HEART_FAILURE';


export const GET_NOTICE_MESSAGE_LIST = 'GET_NOTICE_MESSAGE_LIST';
export const GET_NOTICE_MESSAGE_LIST_PENDING = 'GET_NOTICE_MESSAGE_LIST_PENDING';
export const GET_NOTICE_MESSAGE_LIST_SUCCESS = 'GET_NOTICE_MESSAGE_LIST_SUCCESS';
export const GET_NOTICE_MESSAGE_LIST_FAILURE = 'GET_NOTICE_MESSAGE_LIST_FAILURE';

export const GET_NOTICE_MESSAGE_TOTAL = 'get_Notice_Message_Total';
export const GET_NOTICE_MESSAGE_TOTAL_PENDING = 'GET_NOTICE_MESSAGE_TOTAL_PENDING';
export const GET_NOTICE_MESSAGE_TOTAL_SUCCESS = 'GET_NOTICE_MESSAGE_TOTAL_SUCCESS';
export const GET_NOTICE_MESSAGE_TOTAL_FAILURE = 'GET_NOTICE_MESSAGE_TOTAL_FAILURE';

export const GET_USER_NOTICE = 'GET_USER_NOTICE';
export const GET_USER_NOTICE_PENDING = 'GET_USER_NOTICE_PENDING';
export const GET_USER_NOTICE_SUCCESS = 'GET_USER_NOTICE_SUCCESS';
export const GET_USER_NOTICE_FAILURE = 'GET_USER_NOTICE_FAILURE';

export const READ_USER_NOTICE_MESSAGE = 'READ_USER_NOTICE_MESSAGE';
export const READ_USER_NOTICE_MESSAGE_PENDING = 'READ_USER_NOTICE_MESSAGE_PENDING';
export const READ_USER_NOTICE_MESSAGE_SUCCESS = 'READ_USER_NOTICE_MESSAGE_SUCCESS';
export const READ_USER_NOTICE_MESSAGE_FAILURE = 'READ_USER_NOTICE_MESSAGE_FAILURE';

// 心跳消息
export function getNoticeHeart() {
    return {
        type: GET_NOTICE_HEART,
        payload: apiNotice.getNoticeMessageList({
            page: 0,
            size: 3,
            hasRead: false,
            readed: false
        }),
        meta: {
            slient: true,
            operation: false
        }
    };
}

export function getNoticeMessageList(params) {
    return {
        type: GET_NOTICE_MESSAGE_LIST,
        payload: apiNotice.getNoticeMessageList(params)
    };
}

export function getNoticeMessageTotal(params) {
    return {
        type: GET_NOTICE_MESSAGE_TOTAL,
        payload: apiNotice.getNoticeMessageTotal(params)
    };
}

export function getUserNotice(id) {
    return {
        type: GET_USER_NOTICE,
        payload: apiNotice.getUserNotice(id)
    };
}

export function readUserNoticeMessage() {
    return {
        type: READ_USER_NOTICE_MESSAGE,
        payload: apiNotice.readUserNoticeMessage()
    };
}

