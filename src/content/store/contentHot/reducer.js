import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {getMediaUrl} from 'common/util/media';
import {
    GET_CONTENT_HOT_SUCCESS,
    GET_CONTENT_HOT_FAV_LIST_SUCCESS,
    FAV_CONTENT_HOT_SUCCESS,
    CANCEL_FAV_CONTENT_HOT_SUCCESS
} from './action';
import {DEFAULT_LIST} from 'common/config/model';

const initialState = fromJS({
    item: null,
    list: DEFAULT_LIST,
    all: []
});


export default createReducer(initialState, {

    [GET_CONTENT_HOT_SUCCESS]: (state, {payload}) => state.merge({
        'item': _resolveItem(payload.data)
    }),

    [GET_CONTENT_HOT_FAV_LIST_SUCCESS]: (state, {payload}) => {
        let {data, params} = payload;

        _.each(data.content, (item) => {
            _resolveItem(item, true);
        });

        const content = fromJS(data.content);

        return state.merge({
            list: data,
            all: params.page == 0 ? content : state.get('all').concat(content)
        });
    },

    [CANCEL_FAV_CONTENT_HOT_SUCCESS]: (state, {payload}) => {
        return state.update('all', content => {
            return content.map(item => item.get('id') == payload.params.id ? item.set('faved', false) : item);
        });
    },

    [FAV_CONTENT_HOT_SUCCESS]: (state, {payload}) => {
        return state.update('all', content => {
            return content.map(item => item.get('id') == payload.params.id ? item.set('faved', true) : item);
        });
    }

});

function _resolveItem(item, faved) {
    if (_.has(item, 'thumbMediaId')) {
        item.thumbMediaUrl = getMediaUrl(item.thumbMediaId, '1x1');
    }

    if (faved != undefined) {
        item.faved = faved;
    }
    return item;
}
