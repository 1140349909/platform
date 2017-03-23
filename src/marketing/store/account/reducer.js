import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {DEFAULT_LIST} from 'common/config/model';
import {
    GET_ACCOUNT_TYPE_LIST_SUCCESS,
} from './action';

const initialState = fromJS({
    item: DEFAULT_LIST,
});

export default createReducer(initialState, {
    [GET_ACCOUNT_TYPE_LIST_SUCCESS]: (state, {payload}) => state.set('item', fromJS(payload.data)),
});
