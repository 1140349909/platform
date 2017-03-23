import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_CONTENT_BULK_FAV_LIST_SUCCESS,
    GET_CONTENT_BULK_LIST_SUCCESS,
    GET_CONTENT_BULK_BOUGHT_LIST_SUCCESS,
    CANCEL_FAV_CONTENT_BULK_SUCCESS,
    FAV_CONTENT_BULK_SUCCESS
} from './action';
import {DEFAULT_LIST} from 'common/config/model';

const initialState = fromJS({
    list: DEFAULT_LIST,
    all: []
});

export default createReducer(initialState, {

    [GET_CONTENT_BULK_LIST_SUCCESS]: (state, {payload}) => {
        let {data, params} = payload;

        const content = fromJS(data.content);

        return state.merge({
            list: data,
            all: params.page == 0 ? content : state.get('all').concat(content)
        });
    },

    [GET_CONTENT_BULK_FAV_LIST_SUCCESS]: (state, {payload}) => {
        let {data, params} = payload;

        const content = fromJS(data.content);

        return state.merge({
            list: data,
            all: params.page == 0 ? content : state.get('all').concat(content)
        });
    },

    [GET_CONTENT_BULK_BOUGHT_LIST_SUCCESS]: (state, {payload}) => {
        let {data, params} = payload;

        const content = fromJS(data.content);

        return state.merge({
            list: data,
            all: params.page == 0 ? content : state.get('all').concat(content)
        });
    },

    [CANCEL_FAV_CONTENT_BULK_SUCCESS]: (state, {payload}) => {
        return state.update('all', content => {
            return content.map(item => item.get('id') == payload.params.id ? item.set('faved', false) : item);
        });
    },
    [FAV_CONTENT_BULK_SUCCESS]: (state, {payload}) => {
        return state.update('all', content => {
            return content.map(item => item.get('id') == payload.params.id ? item.set('faved', true) : item);
        });
    }
});


