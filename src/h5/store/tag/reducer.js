import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_TAGS_LIST_SUCCESS,
} from './action';

const initialState = fromJS({
    // 用户获取媒体资源列表
    tagList: [],
});

export default createReducer(initialState, {
    // 用户获取媒体资源列表
    [GET_TAGS_LIST_SUCCESS]: (state, {payload}) => state.set('tagList', fromJS(payload.data)),
});


