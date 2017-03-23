import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
} from './action';

const initialState = fromJS({});
export default createReducer(initialState, {});


