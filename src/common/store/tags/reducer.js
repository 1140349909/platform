import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_TAGS_LIST_SUCCESS
} from './action';

const initialState = fromJS({
    app: null,
    tpl: null,
    material: null
});

export default createReducer(initialState, {
    [GET_TAGS_LIST_SUCCESS]: (state, {payload}) => state.set(payload.params.tagType, fromJS(payload.data))
});
