import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {} from './action';

const initialState = fromJS({
    list: null,
});

export default createReducer(initialState, {});
