import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {
    GET_CONFIG_ACCOUNT_WITHDRAW_SUCCESS,
} from './action';

const initialState = fromJS({

    // 结算账户设置
    configAccount: null,

});

export default createReducer(initialState, {
    [GET_CONFIG_ACCOUNT_WITHDRAW_SUCCESS]: (state, {payload}) => {
        let data = null;

        if (_.has(payload, 'data') && !_.isEqual(payload.data)) {
            data = payload.data;
        } else {
            data = {
                aliPay: {
                    name: '',
                    account: '',
                }
            };
        }
        return state.set('configAccount', fromJS(data));
    }
});
