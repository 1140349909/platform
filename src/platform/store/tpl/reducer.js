import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_TPL_DATA_SUCCESS,
    GET_TPL_BASEINFO_SUCCESS,
    GET_PLAT_TPL_INFO_SUCCESS,
} from './action';

const initialState = fromJS({
    tplData: {},
    tplBaseInfo: {},
    platTplInfo: {},//后台管理 获取模板数据服务
});

// 以下为异步action成功返回
export default createReducer(initialState, {
    [GET_TPL_DATA_SUCCESS]: (state, {payload}) => {
        return state.set('tplData', fromJS(payload.data));
    },
    [GET_TPL_BASEINFO_SUCCESS]: (state, {payload}) => {
        return state.set('tplBaseInfo', fromJS(payload.data));
    },
    [GET_PLAT_TPL_INFO_SUCCESS]: (state, {payload}) => {
        return state.set('platTplInfo', fromJS(payload.data));
    },
});
