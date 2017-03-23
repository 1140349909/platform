import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    LOGIN_HONGREN_SUCCESS,
    SPREAD_HONGREN_SUCCESS,
} from './action';

const initialState = fromJS({
    loginInfo: {},
    spreadInfo:{}
});
export default createReducer(initialState, {

    [LOGIN_HONGREN_SUCCESS]: (state, {payload}) => state.set('loginInfo', fromJS(payload.data)),

    [SPREAD_HONGREN_SUCCESS]: (state, {payload}) => state.set('spreadInfo', fromJS(payload.data))

});

