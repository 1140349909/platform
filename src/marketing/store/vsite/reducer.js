import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {getSafeValue} from 'common/util';
import {
    GET_VSITE_CONFIG_SUCCESS,
} from './action';

const initialState = fromJS({
    mallBasic: null,
});

export default createReducer(initialState, {

    // 获取商城信息
    [GET_VSITE_CONFIG_SUCCESS]: (state, {payload}) => {
        return state.set('mallBasic', fromJS(getSafeValue(payload.data,{

            'banner': true,
            // 'banners': [],
            'layout': 'listCoverLeft',

            'siteAuth':{
                'brandAuth': 'FALSE',
                'contentAuth': 'FALSE',
                'mallAuth': 'FALSE',
                'mallOpMode': 'S',
                'partnerAuth': 'FALSE',
                'yygAuth': 'FALSE'
            }
        })));
    },
});
