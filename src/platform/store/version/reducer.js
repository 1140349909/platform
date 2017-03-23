import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_VERSION_LIST_SUCCESS,
    GET_VERSION_SUCCESS,

    GET_VERSION_MODULE_LIST_SUCCESS,
    GET_VERSION_MODULE_INFO_SUCCESS,
    GET_VERSION_AUTH_SUCCESS,

    GET_VERSION_INFO_SUCCESS,
    GET_VERSION_AUTH_INFO_SUCCESS,

    GET_VERSION_PARA_SUCCESS,
    GET_VERSION_PARA_LIST_SUCCESS
} from './action';

const initialState = fromJS({

    item: {},
    list: {},
    //平台
    platModule: {},
    platModuleInfo: {},
    platAuth: {},
    //当前客户
    version: {},
    auth: {},
    paraList: {},
    paraItem: {}
});

export default createReducer(initialState, {

    //
    [GET_VERSION_SUCCESS]: (state, {payload}) => {

        if(payload.data){
            payload.data.price /= 100;
        }
        return state.set('item', fromJS(payload.data));
    },

    //
    [GET_VERSION_LIST_SUCCESS]: (state, {payload}) => {

        /*if(payload.data){
            payload.data.map((item)=>{
                // console.log(item.rights)
                item.rights((subItem)=>{
                    if(subItem.unit == 'y_t_article' || subItem.unit == 'y_t_times' || subItem.unit == 't_times'){
                        subItem.defaultValue /= 1000;
                        subItem.minValue /= 1000;
                        subItem.maxValue /= 1000;
                        subItem.minBuyQuantity /= 1000;
                        subItem.price /= 1000;
                        subItem.threshold /= 1000;
                    }
                    return subItem;
                });

                return item;
            })
        }*/

        // console.dir(payload.data);

        return state.set('list', fromJS(payload.data));
    },

    //
    [GET_VERSION_MODULE_INFO_SUCCESS]: (state, {payload}) => state.set('platModuleInfo', fromJS(payload.data)),

    //
    [GET_VERSION_MODULE_LIST_SUCCESS]: (state, {payload}) => state.set('platModule', fromJS(payload.data)),

    //
    [GET_VERSION_AUTH_SUCCESS]: (state, {payload}) => state.set('platAuth', fromJS(payload.data)),

    //
    [GET_VERSION_INFO_SUCCESS]: (state, {payload}) => state.set('version', fromJS(payload.data)),

    //
    [GET_VERSION_AUTH_INFO_SUCCESS]: (state, {payload}) => state.set('auth', fromJS(payload.data)),

    //
    [GET_VERSION_PARA_SUCCESS]: (state, {payload}) => {

        if(payload.data){
            if(payload.data.unit == 'y_t_article' || payload.data.unit == 'y_t_times' || payload.data.unit == 't_times'){
                payload.data.defaultValue /= 1000;
                payload.data.minValue /= 1000;
                payload.data.maxValue /= 1000;
                payload.data.minBuyQuantity /= 1000;
                payload.data.price /= 1000;
                payload.data.threshold /= 1000;
            }
        }

        return state.set('paraItem', fromJS(payload.data));
    },

    //
    [GET_VERSION_PARA_LIST_SUCCESS]: (state, {payload}) => state.set('paraList', fromJS(payload.data)),

});
