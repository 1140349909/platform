import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    UPDATE_PAY_CUSTOMER_VERSION_PROGRESS_SUCCESS,
} from './action';

const initialState = fromJS({

    // 支付回调信息
    payInfo: null,
});

export default createReducer(initialState, {

    [UPDATE_PAY_CUSTOMER_VERSION_PROGRESS_SUCCESS]: (state, {payload}) => state.set('payInfo', fromJS(payload.data)),

});
