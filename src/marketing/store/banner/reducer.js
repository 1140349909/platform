import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {GET_MANAGER_BANNER_SUCCESS} from './action';

const initialState = fromJS({
    bannerItems: {}
});

// 以下为异步action成功返回
export default createReducer(initialState, {

    // 获取广告条
    [GET_MANAGER_BANNER_SUCCESS]: (state, {payload})=> {
        return state.merge({
            bannerItems: payload.data ? payload.data : {
                'banners': []
            }
        });
    }
});

