import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_ACCOUNT_TYPE_LIST_SUCCESS,
    GET_ACCOUNT_TYPE_SUCCESS,
    GET_MODULE_INFO_SUCCESS
} from './action';

const initialState = fromJS({

    item:{},
    list:{},
    info:{}

});

export default createReducer(initialState, {

    //
    [GET_ACCOUNT_TYPE_SUCCESS]: (state, {payload}) => state.set('item',fromJS(payload.data)),

    //
    [GET_ACCOUNT_TYPE_LIST_SUCCESS]: (state, {payload}) => state.set('list', fromJS(payload.data)),

    //
    [GET_MODULE_INFO_SUCCESS]: (state, {payload}) => state.set('info', fromJS(payload.data)),


});
