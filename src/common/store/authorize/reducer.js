import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_CHANNEL_LIST_SUCCESS,
} from './action';

const initialState = fromJS({
    // 当前item
    item: null,
    // 列表map
    items: {},
    // 列表数据
    list: {
        wechat: null,
        weibo: null,
        toutiao:null
    }
});

export default createReducer(initialState, {

    // 获取授权平台列表
    [GET_CHANNEL_LIST_SUCCESS]: (state, {payload})=> {

        let channel = payload.params.channel;

        switch (channel) {
            case 'wechat':
                return state.setIn(['list', 'wechat'], fromJS(payload.data));
            case 'weibo':
                return state.setIn(['list', 'weibo'], fromJS(payload.data));
            case 'toutiao':
                return state.setIn(['list', 'toutiao'], fromJS(payload.data));
        }
    }

});
