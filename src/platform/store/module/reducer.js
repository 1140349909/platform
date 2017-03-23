import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {DEFAULT_LIST} from 'common/config/model';
import {
    GET_PLATFORM_MODULE_SUCCESS,
    GET_PLATFORM_MODULE_LIST_SUCCESS,
    GET_PLATFORM_MODULE_INFO_SUCCESS
} from './action';

const initialState = fromJS({
    // 模块数
    tree: {},
    // 模块项
    item: {},
    // 模块列表
    list: DEFAULT_LIST,
});

export default createReducer(initialState, {

    // 获取模块详情
    [GET_PLATFORM_MODULE_SUCCESS]: (state, {payload}) => state.set('item', fromJS(payload.data)),

    // 获取模块功能列表
    [GET_PLATFORM_MODULE_LIST_SUCCESS]: (state, {payload}) => state.set('list', fromJS(payload.data)),

    // 获取模块树
    [GET_PLATFORM_MODULE_INFO_SUCCESS]: (state, {payload}) => {
        payload.data.key = 'MARKETING';
        return state.set('tree', fromJS(payload.data));
    }
});
