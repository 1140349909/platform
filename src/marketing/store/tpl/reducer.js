import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {getMediaUrl} from 'common/util/media';
import {dateFormat} from 'common/util';
import {GET_TPL_LIST_SUCCESS, FAVORITE_TPL_SUCCESS, CANCEL_FAV_TPL_SUCCESS,GET_TPL_DATA_SUCCESS} from './action';

const initialState = fromJS({
    activityList: {},
    mineList: {},
    items: {},
    myFavoriteList: {},
    item: {}
});

// 以下为异步action成功返回
export default createReducer(initialState, {
    [GET_TPL_LIST_SUCCESS]: (state, {payload}) => {
        let items = {};
        payload.data.content.map((item, index) => {
            items[index] = _resolveItem(item);
        });
        return state.merge({
            activityList: payload.data,
            items
        });
    },

    [FAVORITE_TPL_SUCCESS]: (state, {payload}) => {
        const {tplid} = payload.params;
        let contentItems = state.get('activityList').toJS();
        _setFavoritedStatus(contentItems, tplid);
        return state.set('activityList', fromJS(contentItems));
    },

    [CANCEL_FAV_TPL_SUCCESS]: (state, {payload}) => {
        const {tplid} = payload.params;
        let contentItems = state.get('activityList').toJS();
        _setFavoritedStatus(contentItems, tplid);
        return state.set('activityList', fromJS(contentItems));
    },

    [GET_TPL_DATA_SUCCESS]: (state, {payload}) => state.set('item', fromJS(payload.data))

});

function _resolveItem(item) {

    // 缩略图片
    if (item.coverMediaId) {
        item.imgUrl = getMediaUrl(item.coverMediaId);
    }
    item.createdDate = dateFormat(item.createdDate);
    return item;
}

function _setFavoritedStatus(contentItems, tplid) {
    contentItems.content.map((item) => {
        item.favorited = item.id != tplid;
    });
    return contentItems;
}
