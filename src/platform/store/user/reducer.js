import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {GET_USERS_SUCCESS} from './action';

const initialState = fromJS({
    list: {}
});


export default createReducer(initialState, {
    [GET_USERS_SUCCESS]: (state, {payload}) => {
        let {data} = payload;

        _.each(data.content, (item) => {
            _resolveItem(item);
        });

        return state.set('list', fromJS(payload.data));
    }
});


function _resolveItem(item) {
    return item;
}
