import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {getMediaUrl} from 'common/util/media';
import {dateFormat} from 'common/util';
import _ from 'lodash';
import {
    GET_AUDIT_STATUS_LIST_SUCCESS,
} from './action';

const initialState = fromJS({
    list: null,
});

export default createReducer(initialState, {
    [GET_AUDIT_STATUS_LIST_SUCCESS]: (state, {payload}) => {
        let {data} = payload;
        _.each(data.content, (item) => {
            _resolveItem(item);
        });
        return state.set('list', fromJS(payload.data));
    },
});

function _resolveItem(item) {
    if (item.resOwner.coverMediaId) {
        item.imgUrl = getMediaUrl(item.resOwner.coverMediaId);
    }
    item.createdDate = dateFormat(item.createdDate);
    item.applyDate = dateFormat(item.applyDate);
    return item;
}
