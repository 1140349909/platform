import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_NOTICE_DETAIL_SUCCESS,
    GET_NOTICE_LIST_SUCCESS
} from './action';

const initialState = fromJS({
    list: {},
    noticeDetail: {},
});
export default createReducer(initialState, {
    [GET_NOTICE_DETAIL_SUCCESS]: (state, {payload}) => {
        return state.set('noticeDetail', payload.data);
    },
    [GET_NOTICE_LIST_SUCCESS]: (state, {payload}) => {
        return state.set('list', payload.data);
    },
});
