import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {getMediaUrl} from 'common/util/media';
import {dateFormat} from 'common/util';
import {
    GET_CONTENT_LIST_SUCCESS,
    GET_CONTENT_DETAIL_INFO_SUCCESS
} from './action';

const initialState = fromJS({
    list: {},//保存未經格式的數據
    mineList: {},
    conentStatus: {},
    params: {},
    tmpList: {},
    contentDetailInfo: {}
});

let mineList = {};
export default createReducer(initialState, {
    // 用户获取"我的"资讯数据
    [GET_CONTENT_LIST_SUCCESS]: (state, {payload}) => {
        const params = payload.params;
        if ((params.dateRange || params.idChannel || params.distributeStatus ) && params.page != 0) {
            mineList = state.get('mineList').toJS();
        } else if (params.page == 0) {
            mineList = {};
        }
        payload.data.content && payload.data.content.map((item) => {
            _resolveItem(item);
            if (params.status == 'edit') {
                if (!mineList[item.dateArray.lastModifiedDate]) {
                    mineList[item.dateArray.lastModifiedDate] = [];
                }
                mineList[item.dateArray.lastModifiedDate].push(item);
            } else {
                if (!mineList[item.dateArray.publishedDate]) {
                    mineList[item.dateArray.publishedDate] = [];
                }
                mineList[item.dateArray.publishedDate].push(item);
            }

        });
        return state.merge({
            list: payload.data,
            mineList: mineList,
            params: payload.params
        });
    },
    [GET_CONTENT_DETAIL_INFO_SUCCESS]: (state, {payload}) => {
        return state.merge({'contentDetailInfo': payload.data});
    },
});

function _resolveItem(item) {

    if (item.vsite && (item.vsite.imgId || item.vsite.imgUrl)) {
        item.imgUrl = {
            imgId: item.vsite.imgId,
            imgUrl: item.vsite.imgUrl
        };
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
                case 'toutiao':
                    channels.toutiao = true;
                    break;
            }
        });
    }
    item.channels = channels;
    return item;
}
