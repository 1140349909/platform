import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {getMediaUrl} from 'common/util/media';
import {dateFormat} from 'common/util';
import {
    GET_CONTENT_LIST_SUCCESS,
    GET_APPDATA_LIST_SUCCESS,

    GET_DISTRIBUTE_LIST_SUCCESS,
    GET_DISTRIBUTE_STATISTICS_SUCCESS,
    GET_DISTRIBUTE_RES_LATEST_SUCCESS,
    GET_DISTRIBUTE_STATUS_SUCCESS,
    GET_DISTRIBUTE_STATUS_FAILURE
} from './action';

const initialState = fromJS({
    // 当前item
    item: null,
    // 列表map
    items: {},
    // 列表数据
    list: null,
    // 最近一次配置
    latest: null,
    // 发布状态
    status: null,

    mineList: {},
    params: {},

    contentMineList: {},
    contentList: {}
});

let mineList = {};

export default createReducer(initialState, {

    // 用户获取"我的"资讯数据
    [GET_CONTENT_LIST_SUCCESS]: (state, {payload})=> {
        const params = payload.params;
        if ((params.dateRange || params.idChannel || params.distributeStatus ) && params.page != 0) {
            mineList = state.get('contentMineList').toJS();
        } else if (params.page == 0) {
            mineList = {};
        }
        payload.data.content && payload.data.content.map((item) => {
            _resolveContentItem(item);
            if (!mineList[item.dateArray.lastModifiedDate]) {
                mineList[item.dateArray.lastModifiedDate] = [];
            }
            mineList[item.dateArray.lastModifiedDate].push(item);

        });
        return state.merge({
            contentList: payload.data,
            contentMineList: mineList,
            contentParams: payload.params
        });
    },

    [GET_APPDATA_LIST_SUCCESS]: (state, {payload})=> {
        const params = payload.params;
        if ((params.dateRange || params.idChannel || params.distributeStatus ) && params.page != 0) {
            mineList = state.get('contentMineList').toJS();
        } else if (params.page == 0) {
            mineList = {};
        }
        payload.data.content && payload.data.content.map((item) => {
            _resolveContentItem(item);
            if (!mineList[item.dateArray.lastModifiedDate]) {
                mineList[item.dateArray.lastModifiedDate] = [];
            }
            mineList[item.dateArray.lastModifiedDate].push(item);

        });
        return state.merge({
            contentList: payload.data,
            contentMineList: mineList,
            contentParams: payload.params
        });
    },

    // 获取开放平台列表
    [GET_DISTRIBUTE_LIST_SUCCESS]: (state, {payload})=> {

        const params = payload.params;
        if ((params.dateRange || params.idChannel || params.userId) && params.page != 0) {
            mineList = state.get('mineList').toJS();
        } else if (params.page == 0) {
            mineList = {};
        }
        payload.data.content && payload.data.content.map((item) => {
            _resolveItem(item);

            if (!mineList[item.dateArray.lastModifiedDate]) {
                mineList[item.dateArray.lastModifiedDate] = [];
            }
            mineList[item.dateArray.lastModifiedDate].push(item);

        });
        return state.merge({
            list: payload.data,
            mineList: mineList,
            params: payload.params
        });
    },

    [GET_DISTRIBUTE_STATISTICS_SUCCESS]: (state, {payload})=> {
        return state.merge({
            item: payload.data
        });
    },

    [GET_DISTRIBUTE_RES_LATEST_SUCCESS]: (state, {payload})=> {

        let items = {};

        if (payload.data) {
            payload.data.distributeChannel.map((item)=> {
                items[item.idChannel] = item;
            });
        }

        return state.merge({
            latest: items
        });
    },

    [GET_DISTRIBUTE_STATUS_SUCCESS]: (state, {payload})=> state.set('status', payload.errCode),

    [GET_DISTRIBUTE_STATUS_FAILURE]: (state, {payload})=> state.set('status', payload.errCode),


});

function _resolveContentItem(item) {

    if (item.vsite && item.vsite.imgId) {
        item.imgUrl = getMediaUrl(item.vsite.imgId);
    } else {
        item.imgUrl = '';
    }
    let dateArray = {};
    dateArray.createdDate = dateFormat(item.createdDate, 'yyyy-MM-dd hh:mm');
    dateArray.publishedDate = dateFormat(parseInt(item.publishedDate), 'yyyy-MM-dd');
    dateArray.lastModifiedDate = dateFormat(parseInt(item.lastModifiedDate), 'yyyy-MM-dd');
    item.dateArray = dateArray;

    let channels = {};
    let distris = item.distributeChannels;
    if (distris && distris.length > 0) {
        distris.map((chan) => {
            switch (chan) {
                case 'vsite':
                    channels.vsite = true;
                    break;
                case 'wx':
                    channels.wx = true;
                    break;
                case 'wb' :
                    channels.wb = true;
                    break;
                case 'toutiao' :
                    channels.toutiao = true;
                    break;
            }
        });
    }
    item.channels = channels;
    return item;
}

function _resolveItem(item) {

    if (item.vsite && item.vsite.imgId) {
        item.imgUrl = getMediaUrl(item.vsite.imgId);
    } else {
        item.imgUrl = '';
    }
    let dateArray = {};
    dateArray.createdDate = dateFormat(item.createdDate, 'yyyy-MM-dd hh:mm');
    dateArray.publishedDate = dateFormat(parseInt(item.publishedDate), 'yyyy-MM-dd');
    dateArray.lastModifiedDate = dateFormat(parseInt(item.lastModifiedDate), 'yyyy-MM-dd');
    item.dateArray = dateArray;

    let channels = {};
    let distris = item.distributeChannel;
    if (distris && distris.length > 0) {
        distris.map((chan) => {
            switch (chan.idChannel) {
                case 'vsite':
                    channels.vsite = chan;
                    break;
                case 'wx':
                    channels.wx = chan;
                    break;
                case 'wb' :
                    channels.wb = chan;
                    break;
                case 'toutiao' :
                    channels.toutiao = chan;
                    break;
            }
        });
    }
    item.channels = channels;
    return item;
}
