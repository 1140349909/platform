import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {dateFormat} from 'common/util';
import {
    GET_NOTICE_DETAIL_SUCCESS,
    GET_NOTICE_LIST_SUCCESS,
    GET_NOTICE_MESSAGE_LIST_SUCCESS,
    GET_NOTICE_MESSAGE_TOTAL_SUCCESS,
    GET_USER_NOTICE_SUCCESS,
    GET_NOTICE_HEART_SUCCESS,
    READ_USER_NOTICE_MESSAGE_SUCCESS
} from './action';

const DEFAULT_HEART = {
    total: 0,
    content: []
};

const initialState = fromJS({
    list: {},
    notice: {},
    bsList: {},//平台消息列表
    bsTotal: {},//消息总条数
    bsNoticeDetail: {},
    // 消息心跳数据
    heart: DEFAULT_HEART
});
export default createReducer(initialState, {
    [GET_NOTICE_DETAIL_SUCCESS]: (state, {payload}) => {
        return state.set('notice', fromJS(payload.data));
    },

    [GET_NOTICE_LIST_SUCCESS]: (state, {payload}) => {
        return state.set('list', fromJS(payload.data));
    },

    //平台消息列表
    [GET_NOTICE_MESSAGE_LIST_SUCCESS]: (state, {payload}) => {
        payload.data.content.map((item) => {
            item.createdDate = dateFormat(item.createdDate, 'yyyy-MM-dd hh:mm');
        });
        return state.set('bsList', fromJS(payload.data));
    },

    //消息总条数
    [GET_NOTICE_MESSAGE_TOTAL_SUCCESS]: (state, {payload}) => {
        return state.set('bsTotal', payload.data);
    },

    //阅读通知
    [GET_USER_NOTICE_SUCCESS]: (state, {payload}) => {
        return state.set('bsNoticeDetail', payload.data);
    },

    // 心跳
    [GET_NOTICE_HEART_SUCCESS]: (state, {payload}) => {
        const {data} = payload;
        return state.set('heart', fromJS({
            // total: data.totalElements,
            total: data.content.length,
            content: data.content
        }));
    },
    // 全部标记已读
    [READ_USER_NOTICE_MESSAGE_SUCCESS]: (state) => {
        return state.merge({
            heart: DEFAULT_HEART
        });
    }
});
