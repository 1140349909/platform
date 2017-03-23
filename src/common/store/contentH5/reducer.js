import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {ADD_RELEASE_DATA} from './action';

// 发布表单默认
const _releaseDefault = {
    author: '',
    desc: '',
    imgId: '',
    imgUrl: '',
    title: '',
};

const initialState = fromJS({

    // 发布表单内容
    release: {

        vsite: _.defaults(_releaseDefault),
        wb: _.defaults(_releaseDefault),

        // TODO: 优化多于字段
        wx: _.defaults(_releaseDefault),
    },
});


export default createReducer(initialState, {

    [ADD_RELEASE_DATA]: (state, {payload}) => {
        
        const auto = payload.auto || false;
        const data = _.defaults(payload.data);

        // 表单数据转换为API对应数据格式 false为不转换直接读取payload.data数据
        if (!auto) {

            return state.mergeDeep({release: _getRleaseData(data)});

        } else {

            const key = Object.keys(data)[0];
            let keys;

            // 一级名称转为二级名称
            //  wbTitle => ['wb', 'Title']
            if (key.indexOf('vsite') !== -1) {
                keys = ['vsite', key.split('vsite')[1]];
            }
            if (key.indexOf('wb') !== -1) {
                keys = ['wb', key.split('wb')[1]];
            }
            if (key.indexOf('wx') !== -1) {
                keys = ['wx', key.split('wx')[1]];
            }

            // 首字转为小写
            const valueName = keys[1].replace(/(^|\s+)\w/g, function (s) {
                return s.toLowerCase();
            });
            const releaseName = keys[0];
            const value = data[key];

            return state.mergeDeep({
                release: {
                    [releaseName]: {
                        [valueName]: value,
                    }
                }
            });
        }
    }
});

// 使用state.mergeDeep不可直接对象赋值，需要把对象拆分成属性依次赋值
function _getRleaseData(data) {

    function _getRleaseDataChild({author, desc, imgId, imgUrl, title}) {
        return {
            author,
            desc,
            imgId,
            imgUrl,
            title,
        };
    }

    return {
        vsite: _getRleaseDataChild(data.vsite),
        wb: _getRleaseDataChild(data.wb),
        wx: _getRleaseDataChild(data.wx),
    };
}


