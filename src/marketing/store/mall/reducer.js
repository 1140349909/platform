import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {getSafeValue} from 'common/util';
import {
    GET_MALL_BASIC_SUCCESS,
} from './action';

const initialState = fromJS({
    mallBasic: null,
});

export default createReducer(initialState, {

    // 获取商城信息
    [GET_MALL_BASIC_SUCCESS]: (state, {payload}) => {
        return state.set('mallBasic', fromJS(getSafeValue(payload.data,{
            'mallAuth':{
                'brandAuth': 'FALSE',
                'contentAuth': 'FALSE',
                'mallAuth': 'FALSE',
                'mallOpMode': 'S',
                'partnerAuth': 'FALSE',
                'yygAuth': 'FALSE'
            }
        })));
    }
});
