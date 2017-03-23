import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {getMediaUrl} from 'common/util/media';
import {dateFormat} from 'common/util';
import {
    GET_APP_DATA_LIST_SUCCESS,
    GET_APP_TEMPLATE_LIST_SUCCESS,
    COLLECT_APP_DATA_SUCCESS,
} from './action';

const initialState = fromJS({
    list: {},//保存未经格式化的数据
    mineList: {},
    conentStatus: {},
    params: {},
    templateList: {},//模板数据列表
    formDataList: {} //表单数据集合
});
let mineList = {};
export default createReducer(initialState, {
    [GET_APP_DATA_LIST_SUCCESS]: (state, {payload}) => {
        const params = payload.params;
        // console.log(params, 'reducer');
        if ((params.dateRange || params.channels ) && params.page != 0) {
            mineList = state.get('mineList').toJS();
        } else if (params.page == 0) {
            mineList = {};
        }

        payload.data.content && payload.data.content.map((item) => {
            _resolveItem(item);
            if (params.status == 'edit') {
                if (!mineList[item.dateArray.lastModifiedDate]) {
                    mineList[item.dateArray.lastModifiedDate] = [];
                }
                mineList[item.dateArray.lastModifiedDate].push(item);
            } else {
                if (!mineList[item.dateArray.publishedDate]) {
                    mineList[item.dateArray.publishedDate] = [];
                }
                mineList[item.dateArray.publishedDate].push(item);
            }
        });

        /* let items = payload.data;
         items.content && items.content.map((item) => {
         _getAppDataBase(item);
         });*/

        return state.merge({
            list: payload.data,
            mineList: mineList,
            params: payload.params
        });
    },
    [GET_APP_TEMPLATE_LIST_SUCCESS]: (state, {payload}) => {
        return state.set('templateList', payload.data);
    },
    [COLLECT_APP_DATA_SUCCESS]: (state, {payload}) => {
        payload.data.content.map((item) => {
            item.createdDate = dateFormat(item.createdDate, 'yyyy-MM-dd hh:mm');
        });
        return state.set('formDataList', fromJS(payload.data));
    },
});


function _resolveItem(item) {
    let channels = {};
    let distris = item.distributeChannels;
    if (distris && distris.length > 0) {
        distris.map((chan) => {
            switch (chan) {
                case 'vsite':
                    channels.vsite = true;
                    break;
                case 'wx':
                    channels.wx = true;
                    break;
                case 'wb' :
                    channels.wb = true;
                    break;
            }
        });
    }
    if (item.vsite && item.vsite.imgId) {
        item.imgUrl = getMediaUrl(item.vsite.imgId);
    } else {
        item.imgUrl = '';
    }
    let dateArray = {};
    dateArray.createdDate = dateFormat(item.createdDate, 'yyyy-MM-dd hh:mm');
    dateArray.publishedDate = dateFormat(parseInt(item.publishedDate), 'yyyy-MM-dd');
    dateArray.lastModifiedDate = dateFormat(parseInt(item.lastModifiedDate), 'yyyy-MM-dd');
    item.dateArray = dateArray;

    item.channels = channels;
    return item;
}

/*function _getAppDataBase(item) {
 item.imgUrl = getMediaUrl(item.coverMediaId);
 return item;
 }*/
