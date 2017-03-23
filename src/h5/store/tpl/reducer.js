import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
// import {getMediaUrl} from 'common/util/media';
// import {dateFormat} from 'common/util';
import {
    GET_TPL_DATA_SUCCESS,
    GET_TPL_BASEINFO_SUCCESS,
} from './action';

const initialState = fromJS({
    tplData: {},
    tplBaseInfo: {}
});

// 以下为异步action成功返回
export default createReducer(initialState, {
    [GET_TPL_DATA_SUCCESS]: (state, {payload}) => {
        return state.set('tplData', fromJS(payload.data));
    },
    [GET_TPL_BASEINFO_SUCCESS]: (state, {payload}) => {
        return state.set('tplBaseInfo', fromJS(payload.data));
    },
});

/*function _resolveItem(item) {
    // 缩略图片
    if (item.coverMediaId) {
        item.imgUrl = getMediaUrl(item.coverMediaId);
    }
    item.createdDate = dateFormat(item.createdDate);
    return item;
}*/
