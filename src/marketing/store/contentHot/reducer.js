import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {getMediaUrl} from 'common/util/media';
import {dateFormat} from 'common/util';
import {
    FAV_CONTENT_HOT_SUCCESS,
    CANCEL_FAV_CONTENT_HOT_SUCCESS,
    GET_HOT_CONTENT_LIST_SUCCESS,
    GET_CONTENT_HOT_DETAIL_INFO_SUCCESS
} from './action';
import {DEFAULT_LIST} from 'common/config/model';
import _ from 'lodash';
const initialState = fromJS({
    hotContentList: DEFAULT_LIST,
    contentDetailInfo: {}
});

// 以下为异步action成功返回
export default createReducer(initialState, {
// 用户获取热点资讯模板数据
    [GET_HOT_CONTENT_LIST_SUCCESS]: (state, {payload}) => {
        let {data} = payload;

        _.each(data.content, (item) => {
            _resolveItem(item, true);
        });

        return state.set('hotContentList', fromJS(data));
    },

    // 收藏平台热点资讯
    [FAV_CONTENT_HOT_SUCCESS]: (state, {payload}) => {
        return state.updateIn(['hotContentList', 'content'], content => {
            return content.map(item => item.get('id') == payload.params.id ? item.set('faved', true) : item);
        });
    },
    //取消收藏平台热点资讯
    [CANCEL_FAV_CONTENT_HOT_SUCCESS]: (state, {payload}) => {
        return state.updateIn(['hotContentList', 'content'], content => {
            return content.map(item => item.get('id') == payload.params.id ? item.set('faved', false) : item);
        });
    },
    [GET_CONTENT_HOT_DETAIL_INFO_SUCCESS]: (state, {payload}) => {
        payload.data.createdDate = dateFormat(payload.data.createdDate);
        return state.set('contentDetailInfo', fromJS(payload.data));
    },
});
function _resolveItem(item) {
    if (item.thumbMediaId) {
        item.imgUrl = getMediaUrl(item.thumbMediaId);
    }
    item.createdDate = dateFormat(item.createdDate);
    return item;
}
