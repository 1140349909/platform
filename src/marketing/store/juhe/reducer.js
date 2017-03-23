import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_JUHE_TOUTIAO_LIST_SUCCESS,
    GET_JUHE_HISTORY_TODAY_LIST_SUCCESS,
    GET_JUHE_HISTORY_DETAIL_SUCCESS,
} from './action';

const initialState = fromJS({
    juHeList: {},
    juHeHistoryList: {},
    juHeHistoryDetail: {},
});

export default createReducer(initialState, {
    [GET_JUHE_TOUTIAO_LIST_SUCCESS]: (state, {payload}) => {
        return state.set('juHeList', fromJS(payload.data));
    },
    [GET_JUHE_HISTORY_TODAY_LIST_SUCCESS]: (state, {payload}) => {
        return state.set('juHeHistoryList', fromJS(payload.data));
    },
    [GET_JUHE_HISTORY_DETAIL_SUCCESS]: (state, {payload}) => {
        return state.set('juHeHistoryDetail', fromJS(payload.data));
    },
});
