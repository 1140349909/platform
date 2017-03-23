import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_APP_DATA_LIST_SUCCESS,
    GET_CUSTOMER_UIN_SUCCESS,
} from './action';

const initialState = fromJS({
    mineList: {},
    uin: '',
});

export default createReducer(initialState, {
    [GET_APP_DATA_LIST_SUCCESS]: (state, {payload}) => state.set('mineList', fromJS(payload.data)),

    [GET_CUSTOMER_UIN_SUCCESS]: (state, {payload}) => state.set('uin', payload.data.uin)
});
